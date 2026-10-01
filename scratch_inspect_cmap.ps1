Add-Type -AssemblyName System.IO.Compression.FileSystem

$f = Get-ChildItem -Path "data" -Filter "*MASTER-REQUIREMENTS*.pdf" | Select-Object -First 1
$bytes = [System.IO.File]::ReadAllBytes($f.FullName)
$latin = [System.Text.Encoding]::GetEncoding("ISO-8859-1").GetString($bytes)

$pos = 0
$idx = 0
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
            if ($txt -match 'beginbfchar') {
                Write-Output "=== CMap in Stream $idx ==="
                Write-Output $txt.Substring(0, [Math]::Min(500, $txt.Length))
                break
            }
        } catch {}
    }
    $idx++
    $pos = $end + 9
}
