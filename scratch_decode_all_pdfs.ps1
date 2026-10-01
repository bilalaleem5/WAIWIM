Add-Type -AssemblyName System.IO.Compression.FileSystem

function Decode-PdfWithCMap($pdfPath, $outPath) {
    Write-Output "Processing $pdfPath..."
    $bytes = [System.IO.File]::ReadAllBytes($pdfPath)
    $latin = [System.Text.Encoding]::GetEncoding("ISO-8859-1").GetString($bytes)

    $decompressedStreams = @()
    $pos = 0
    while (($pos = $latin.IndexOf("stream", $pos)) -ne -1) {
        $start = $pos + 6
        if ($latin[$start] -eq "`r") { $start++ }
        if ($latin[$start] -eq "`n") { $start++ }
        $end = $latin.IndexOf("endstream", $start)
        if ($end -eq -1) { break }
        $len = $end - $start
        if ($len -gt 2 -and $bytes[$start] -eq 0x78) {
            try {
                $offset = [int]($start + 2)
                $count = [int]($len - 2)
                $ms = New-Object System.IO.MemoryStream($bytes, $offset, $count)
                $ds = New-Object System.IO.Compression.DeflateStream($ms, [System.IO.Compression.CompressionMode]::Decompress)
                $outMs = New-Object System.IO.MemoryStream
                $ds.CopyTo($outMs)
                $arr = $outMs.ToArray()
                $txt = [System.Text.Encoding]::GetEncoding("ISO-8859-1").GetString($arr)
                $decompressedStreams += ,@($txt, $arr)
            } catch {}
        }
        $pos = $end + 9
    }

    # Extract all CMaps
    $cMap = @{}
    foreach ($item in $decompressedStreams) {
        $txt = $item[0]
        if ($txt -match 'beginbfchar' -or $txt -match 'beginbfrange') {
            # bfchar: <0001> <0041>
            $bfchars = [regex]::Matches($txt, '<([0-9a-fA-F]+)>\s*<([0-9a-fA-F]+)>')
            foreach ($m in $bfchars) {
                $src = [convert]::ToInt32($m.Groups[1].Value, 16)
                $dstHex = $m.Groups[2].Value
                if ($dstHex.Length -eq 4) {
                    $cMap[$src] = [string][char][convert]::ToInt32($dstHex, 16)
                } elseif ($dstHex.Length -gt 4) {
                    # multiple chars UTF16-BE
                    $chars = ""
                    for ($k = 0; $k -lt $dstHex.Length; $k += 4) {
                        $chars += [char][convert]::ToInt32($dstHex.Substring($k, [Math]::Min(4, $dstHex.Length - $k)), 16)
                    }
                    $cMap[$src] = $chars
                }
            }
            # bfrange: <0001> <0005> <0041>
            $bfranges = [regex]::Matches($txt, '<([0-9a-fA-F]+)>\s*<([0-9a-fA-F]+)>\s*<([0-9a-fA-F]+)>')
            foreach ($m in $bfranges) {
                $s = [convert]::ToInt32($m.Groups[1].Value, 16)
                $e = [convert]::ToInt32($m.Groups[2].Value, 16)
                $dst = [convert]::ToInt32($m.Groups[3].Value, 16)
                for ($c = $s; $c -le $e; $c++) {
                    $cMap[$c] = [string][char]($dst + ($c - $s))
                }
            }
        }
    }

    Write-Output "CMaps loaded: $($cMap.Count) entries"

    $docOutput = New-Object System.Text.StringBuilder

    foreach ($item in $decompressedStreams) {
        $txt = $item[0]
        if ($txt -match 'Tj' -or $txt -match 'TJ') {
            # Extract TJ blocks: [ ... ] TJ
            $tjMatches = [regex]::Matches($txt, '\[(.*?)\]\s*TJ', [System.Text.RegularExpressions.RegexOptions]::Singleline)
            foreach ($tj in $tjMatches) {
                $inner = $tj.Groups[1].Value
                $hexTokens = [regex]::Matches($inner, '<([0-9a-fA-F]+)>')
                $lineStr = ""
                foreach ($h in $hexTokens) {
                    $hex = $h.Groups[1].Value
                    for ($i = 0; $i -lt $hex.Length; $i += 4) {
                        if ($i + 4 -le $hex.Length) {
                            $code = [convert]::ToInt32($hex.Substring($i, 4), 16)
                            if ($cMap.ContainsKey($code)) {
                                $lineStr += $cMap[$code]
                            }
                        }
                    }
                }
                if ($lineStr.Trim().Length -gt 0) {
                    [void]$docOutput.AppendLine($lineStr.Trim())
                }
            }

            # Extract standalone <...> Tj
            $singleTj = [regex]::Matches($txt, '<([0-9a-fA-F]+)>\s*Tj')
            foreach ($st in $singleTj) {
                $hex = $st.Groups[1].Value
                $lineStr = ""
                for ($i = 0; $i -lt $hex.Length; $i += 4) {
                    if ($i + 4 -le $hex.Length) {
                        $code = [convert]::ToInt32($hex.Substring($i, 4), 16)
                        if ($cMap.ContainsKey($code)) {
                            $lineStr += $cMap[$code]
                        }
                    }
                }
                if ($lineStr.Trim().Length -gt 0) {
                    [void]$docOutput.AppendLine($lineStr.Trim())
                }
            }
        }
    }

    $finalText = $docOutput.ToString()
    Set-Content -Path $outPath -Value $finalText -Encoding UTF8
    Write-Output "Extracted $($finalText.Length) chars to $outPath"
}

$pdfFiles = Get-ChildItem -Path "data" -Filter "*.pdf"
foreach ($f in $pdfFiles) {
    $out = "data/$($f.BaseName)_decoded.txt"
    Decode-PdfWithCMap -pdfPath $f.FullName -outPath $out
}
