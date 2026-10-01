Add-Type -AssemblyName System.IO.Compression.FileSystem

$f = Get-ChildItem -Path "data" -Filter "*MASTER-REQUIREMENTS*.pdf" | Select-Object -First 1
Write-Output "File: $($f.Name)"
$bytes = [System.IO.File]::ReadAllBytes($f.FullName)
$latin = [System.Text.Encoding]::GetEncoding("ISO-8859-1").GetString($bytes)

$pos = 0
$streams = 0
$hasBt = 0
while (($pos = $latin.IndexOf("stream", $pos)) -ne -1) {
    $start = $pos + 6
    if ($latin[$start] -eq "`r") { $start++ }
    if ($latin[$start] -eq "`n") { $start++ }
    $end = $latin.IndexOf("endstream", $start)
    if ($end -eq -1) { break }
    $len = $end - $start
    if ($len -gt 2 -and $bytes[$start] -eq 0x78) {
        try {
            $ms = New-Object System.IO.MemoryStream($bytes, $start + 2, $len - 2)
            $ds = New-Object System.IO.Compression.DeflateStream($ms, [System.IO.Compression.CompressionMode]::Decompress)
            $outMs = New-Object System.IO.MemoryStream
            $ds.CopyTo($outMs)
            $decompText = [System.Text.Encoding]::GetEncoding("ISO-8859-1").GetString($outMs.ToArray())
            if ($decompText -match 'BT' -or $decompText -match '/Type\s*/ObjStm') {
                $hasBt++
                Write-Output "Stream $streams len $len (Decomp: $($decompText.Length)): $($decompText.Substring(0, [Math]::Min(200, $decompText.Length)))"
            }
        } catch {}
    }
    $streams++
    $pos = $end + 9
}
Write-Output "Total streams: $streams, with BT/ObjStm: $hasBt"
