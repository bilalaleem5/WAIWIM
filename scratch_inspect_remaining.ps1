Add-Type -AssemblyName System.IO.Compression.FileSystem

function Inspect-PdfRaw($pdfPath) {
    Write-Output "=== Inspecting $pdfPath ==="
    $bytes = [System.IO.File]::ReadAllBytes($pdfPath)
    $latin = [System.Text.Encoding]::GetEncoding("ISO-8859-1").GetString($bytes)
    
    $pos = 0
    $streamIdx = 0
    $foundText = New-Object System.Text.StringBuilder
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
                $decomp = [System.Text.Encoding]::GetEncoding("ISO-8859-1").GetString($arr)
                
                # Check for ( ... ) Tj
                $parens = [regex]::Matches($decomp, '\(([^)]+)\)\s*Tj')
                foreach ($p in $parens) {
                    [void]$foundText.AppendLine($p.Groups[1].Value)
                }
                # Check for /BaseFont
                $fonts = [regex]::Matches($decomp, '/BaseFont\s*/([A-Za-z0-9_-]+)')
                foreach ($f in $fonts) {
                    Write-Output "Font: $($f.Groups[1].Value)"
                }
            } catch {}
        }
        $streamIdx++
        $pos = $end + 9
    }
    $res = $foundText.ToString()
    Write-Output "Paren text count: $($res.Length)"
    if ($res.Length -gt 0) {
        Write-Output "Sample: $($res.Substring(0, [Math]::Min(500, $res.Length)))"
    }
}

Inspect-PdfRaw -pdfPath "data/WAIWIM_Brand_Identity_Guidelines_2026 (1) (1).pdf"
Inspect-PdfRaw -pdfPath "data/With-AI-We-Innovate-Medicine-WAII (2) (1).pdf"
