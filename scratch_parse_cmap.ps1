Add-Type -AssemblyName System.IO.Compression.FileSystem

$f = Get-ChildItem -Path "data" -Filter "*MASTER-REQUIREMENTS*.pdf" | Select-Object -First 1
$bytes = [System.IO.File]::ReadAllBytes($f.FullName)
$latin = [System.Text.Encoding]::GetEncoding("ISO-8859-1").GetString($bytes)

$pos = 0
$idx = 0
$allText = New-Object System.Text.StringBuilder

# First build all ToUnicode maps
$toUnicodeMap = @{} # fontName/fontRef -> map of hex to char

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
            
            # Check if this is a ToUnicode CMap
            if ($txt -match 'beginbfchar' -or $txt -match 'beginbfrange') {
                Write-Output "Stream $idx is a CMap! Length: $($arr.Length)"
                # Parse bfchar: <0001> <0041>
                $bfchars = [regex]::Matches($txt, '<([0-9a-fA-F]+)>\s*<([0-9a-fA-F]+)>')
                foreach ($m in $bfchars) {
                    $src = [convert]::ToInt32($m.Groups[1].Value, 16)
                    $dstCode = [convert]::ToInt32($m.Groups[2].Value, 16)
                    $toUnicodeMap[$src] = [char]$dstCode
                }
                # Parse bfrange: <0001> <0005> <0041>
                $bfranges = [regex]::Matches($txt, '<([0-9a-fA-F]+)>\s*<([0-9a-fA-F]+)>\s*<([0-9a-fA-F]+)>')
                foreach ($m in $bfranges) {
                    $s = [convert]::ToInt32($m.Groups[1].Value, 16)
                    $e = [convert]::ToInt32($m.Groups[2].Value, 16)
                    $dst = [convert]::ToInt32($m.Groups[3].Value, 16)
                    for ($c = $s; $c -le $e; $c++) {
                        $toUnicodeMap[$c] = [char]($dst + ($c - $s))
                    }
                }
            }

            # Check if this stream has text commands Tj or TJ
            if ($txt -match 'Tj' -or $txt -match 'TJ') {
                Write-Output "Stream $idx has Tj/TJ text! Length: $($arr.Length)"
            }
        } catch {}
    }
    $idx++
    $pos = $end + 9
}

Write-Output "Total ToUnicode mappings collected: $($toUnicodeMap.Count)"
