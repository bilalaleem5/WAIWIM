Add-Type -AssemblyName System.IO.Compression.FileSystem

function Decode-PdfProperly($pdfPath, $outPath) {
    Write-Output "Processing $pdfPath..."
    $bytes = [System.IO.File]::ReadAllBytes($pdfPath)
    $latin = [System.Text.Encoding]::GetEncoding("ISO-8859-1").GetString($bytes)

    # 1. Parse all objects: "<num> <gen> obj ... endobj"
    $objMatches = [regex]::Matches($latin, '(\d+)\s+(\d+)\s+obj\b(.*?)\bendobj', [System.Text.RegularExpressions.RegexOptions]::Singleline)
    Write-Output "Found $($objMatches.Count) objects"

    # Map object id -> object raw string and decompressed stream bytes (if any)
    $objects = @{} # id -> @{ text = ...; stream = byte[] }
    foreach ($m in $objMatches) {
        $id = [int]$m.Groups[1].Value
        $content = $m.Groups[3].Value
        $streamBytes = $null
        
        $sIdx = $content.IndexOf("stream")
        if ($sIdx -ne -1) {
            $dictPart = $content.Substring(0, $sIdx)
            $start = $m.Index + $m.Groups[1].Length + 1 + $m.Groups[2].Length + 5 + $sIdx + 6
            if ($latin[$start] -eq "`r") { $start++ }
            if ($latin[$start] -eq "`n") { $start++ }
            $end = $latin.IndexOf("endstream", $start)
            if ($end -ne -1) {
                $len = $end - $start
                if ($len -gt 2 -and $bytes[$start] -eq 0x78) {
                    try {
                        $offset = [int]($start + 2)
                        $count = [int]($len - 2)
                        $ms = New-Object System.IO.MemoryStream($bytes, $offset, $count)
                        $ds = New-Object System.IO.Compression.DeflateStream($ms, [System.IO.Compression.CompressionMode]::Decompress)
                        $outMs = New-Object System.IO.MemoryStream
                        $ds.CopyTo($outMs)
                        $streamBytes = $outMs.ToArray()
                    } catch {}
                } elseif ($len -gt 0) {
                    $streamBytes = New-Object byte[] $len
                    [System.Array]::Copy($bytes, $start, $streamBytes, 0, $len)
                }
            }
        } else {
            $dictPart = $content
        }
        $objects[$id] = @{
            dict = $dictPart
            stream = $streamBytes
        }
    }

    # 2. Parse CMaps from objects that contain ToUnicode
    $fontCMaps = @{} # fontObjId -> CMap hashtable
    foreach ($id in $objects.Keys) {
        $obj = $objects[$id]
        if ($obj.stream) {
            $str = [System.Text.Encoding]::GetEncoding("ISO-8859-1").GetString($obj.stream)
            if ($str -match 'beginbfchar' -or $str -match 'beginbfrange') {
                $cMap = @{}
                $bfchars = [regex]::Matches($str, '<([0-9a-fA-F]+)>\s*<([0-9a-fA-F]+)>')
                foreach ($m in $bfchars) {
                    $src = [convert]::ToInt32($m.Groups[1].Value, 16)
                    $dstHex = $m.Groups[2].Value
                    if ($dstHex.Length -eq 4) {
                        $cMap[$src] = [string][char][convert]::ToInt32($dstHex, 16)
                    } elseif ($dstHex.Length -gt 4) {
                        $chars = ""
                        for ($k = 0; $k -lt $dstHex.Length; $k += 4) {
                            $chars += [char][convert]::ToInt32($dstHex.Substring($k, [Math]::Min(4, $dstHex.Length - $k)), 16)
                        }
                        $cMap[$src] = $chars
                    }
                }
                $bfranges = [regex]::Matches($str, '<([0-9a-fA-F]+)>\s*<([0-9a-fA-F]+)>\s*<([0-9a-fA-F]+)>')
                foreach ($m in $bfranges) {
                    $s = [convert]::ToInt32($m.Groups[1].Value, 16)
                    $e = [convert]::ToInt32($m.Groups[2].Value, 16)
                    $dst = [convert]::ToInt32($m.Groups[3].Value, 16)
                    for ($c = $s; $c -le $e; $c++) {
                        $cMap[$c] = [string][char]($dst + ($c - $s))
                    }
                }
                $fontCMaps[$id] = $cMap
            }
        }
    }
    Write-Output "Parsed $($fontCMaps.Count) CMaps"

    # 3. For each font object, find which CMap object it uses: /ToUnicode <id> 0 R
    $fontIdToCMap = @{} # fontObjId -> CMap hashtable
    foreach ($id in $objects.Keys) {
        $dict = $objects[$id].dict
        if ($dict -match '/Type\s*/Font\b' -or $dict -match '/Subtype\s*/Type0') {
            if ($dict -match '/ToUnicode\s+(\d+)\s+0\s+R') {
                $cMapId = [int]$matches[1]
                if ($fontCMaps.ContainsKey($cMapId)) {
                    $fontIdToCMap[$id] = $fontCMaps[$cMapId]
                }
            }
        }
    }
    Write-Output "Mapped $($fontIdToCMap.Count) fonts to CMaps"

    # 4. Find all Pages: /Type /Page
    $pageList = @()
    foreach ($id in $objects.Keys) {
        $dict = $objects[$id].dict
        if ($dict -match '/Type\s*/Page\b' -and -not ($dict -match '/Type\s*/Pages\b')) {
            $pageList += $id
        }
    }
    Write-Output "Found $($pageList.Count) pages"

    $docOutput = New-Object System.Text.StringBuilder

    foreach ($pageId in $pageList) {
        $pageObj = $objects[$pageId]
        # Resolve page fonts: in /Resources << /Font << /F1 10 0 R ... >> >>
        # (Could also be inherited from parent /Pages, but let's check page dict and parent)
        $fontNameMap = @{} # "/F1" -> CMap hashtable
        
        $resText = $pageObj.dict
        if ($pageObj.dict -match '/Parent\s+(\d+)\s+0\s+R') {
            $parentId = [int]$matches[1]
            if ($objects.ContainsKey($parentId)) {
                $resText += " " + $objects[$parentId].dict
            }
        }
        
        $fMatches = [regex]::Matches($resText, '/(F\w+|TT\w+|C\w+)\s+(\d+)\s+0\s+R')
        foreach ($fm in $fMatches) {
            $fname = "/" + $fm.Groups[1].Value
            $fObjId = [int]$fm.Groups[2].Value
            if ($fontIdToCMap.ContainsKey($fObjId)) {
                $fontNameMap[$fname] = $fontIdToCMap[$fObjId]
            }
        }

        # Get contents: /Contents <id> 0 R or [ <id> 0 R ... ]
        $contentIds = @()
        if ($pageObj.dict -match '/Contents\s+(\d+)\s+0\s+R') {
            $contentIds += [int]$matches[1]
        } elseif ($pageObj.dict -match '/Contents\s*\[(.*?)\]') {
            $cMatches = [regex]::Matches($matches[1], '(\d+)\s+0\s+R')
            foreach ($cm in $cMatches) {
                $contentIds += [int]$cm.Groups[1].Value
            }
        }

        [void]$docOutput.AppendLine("--- PAGE $pageId ---")

        foreach ($cId in $contentIds) {
            if (-not $objects.ContainsKey($cId) -or -not $objects[$cId].stream) { continue }
            $cStream = [System.Text.Encoding]::GetEncoding("ISO-8859-1").GetString($objects[$cId].stream)
            
            # Walk through tokens, tracking current font
            $currentCMap = $null
            # Also if there's only 1 font in fontNameMap, default to it
            if ($fontNameMap.Count -eq 1) {
                $currentCMap = ($fontNameMap.Values | Select-Object -First 1)
            }

            # Split into lines/commands
            $tokens = [regex]::Matches($cStream, '(/[A-Za-z0-9_-]+)\s+[\d.]+\s+Tf|\[(.*?)\]\s*TJ|<([0-9a-fA-F]+)>\s*Tj|\((.*?)\)\s*Tj')
            foreach ($t in $tokens) {
                $v = $t.Value
                if ($v -match '(/[A-Za-z0-9_-]+)\s+[\d.]+\s+Tf') {
                    $fontName = $matches[1]
                    if ($fontNameMap.ContainsKey($fontName)) {
                        $currentCMap = $fontNameMap[$fontName]
                    }
                } elseif ($v -match '\[(.*?)\]\s*TJ') {
                    $inner = $matches[1]
                    $hexTokens = [regex]::Matches($inner, '<([0-9a-fA-F]+)>')
                    $lineStr = ""
                    foreach ($h in $hexTokens) {
                        $hex = $h.Groups[1].Value
                        for ($i = 0; $i -lt $hex.Length; $i += 4) {
                            if ($i + 4 -le $hex.Length) {
                                $code = [convert]::ToInt32($hex.Substring($i, 4), 16)
                                if ($currentCMap -and $currentCMap.ContainsKey($code)) {
                                    $lineStr += $currentCMap[$code]
                                } elseif ($cMap -and $cMap.ContainsKey($code)) {
                                    # fallback
                                    $lineStr += $cMap[$code]
                                }
                            }
                        }
                    }
                    if ($lineStr.Trim().Length -gt 0) {
                        [void]$docOutput.AppendLine($lineStr.Trim())
                    }
                } elseif ($v -match '<([0-9a-fA-F]+)>\s*Tj') {
                    $hex = $matches[1]
                    $lineStr = ""
                    for ($i = 0; $i -lt $hex.Length; $i += 4) {
                        if ($i + 4 -le $hex.Length) {
                            $code = [convert]::ToInt32($hex.Substring($i, 4), 16)
                            if ($currentCMap -and $currentCMap.ContainsKey($code)) {
                                $lineStr += $currentCMap[$code]
                            }
                        }
                    }
                    if ($lineStr.Trim().Length -gt 0) {
                        [void]$docOutput.AppendLine($lineStr.Trim())
                    }
                }
            }
        }
    }

    $finalText = $docOutput.ToString()
    Set-Content -Path $outPath -Value $finalText -Encoding UTF8
    Write-Output "Successfully saved $($finalText.Length) characters to $outPath"
}

$pdf = Get-ChildItem -Path "data" -Filter "*MASTER-REQUIREMENTS*.pdf" | Select-Object -First 1
Decode-PdfProperly -pdfPath $pdf.FullName -outPath "data/master_requirements_clean.txt"
