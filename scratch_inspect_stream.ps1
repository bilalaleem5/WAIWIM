Add-Type -AssemblyName System.IO.Compression.FileSystem

$bytes = [System.IO.File]::ReadAllBytes("data/AI-Drug-Innovation-Accelerator.pdf")
$latin = [System.Text.Encoding]::GetEncoding("ISO-8859-1").GetString($bytes)
$pos = 0
$count = 0
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
            if ($decompText -match 'BT' -or $decompText -match 'Tf') {
                Write-Output "Stream $count has BT/Tf, sample:"
                Write-Output ($decompText.Substring(0, [Math]::Min(300, $decompText.Length)))
                Write-Output "---"
            }
        } catch {}
    }
    $count++
    $pos = $end + 9
}
