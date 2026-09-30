Add-Type -AssemblyName System.IO.Compression.FileSystem

function Dump-Pdf-Streams($pdfPath, $outPath) {
    $bytes = [System.IO.File]::ReadAllBytes($pdfPath)
    $latin = [System.Text.Encoding]::GetEncoding("ISO-8859-1").GetString($bytes)
    
    $out = New-Object System.Text.StringBuilder
    $pos = 0
    while (($pos = $latin.IndexOf("stream", $pos)) -ne -1) {
        $start = $pos + 6
        if ($latin[$start] -eq "`r") { $start++ }
        if ($latin[$start] -eq "`n") { $start++ }
        
        $end = $latin.IndexOf("endstream", $start)
        if ($end -eq -1) { break }
        
        $len = $end - $start
        if ($len -gt 2) {
            # Check for zlib header (0x78)
            $firstByte = $bytes[$start]
            $secondByte = $bytes[$start + 1]
            if ($firstByte -eq 0x78) {
                try {
                    $ms = New-Object System.IO.MemoryStream($bytes, $start + 2, $len - 2)
                    $ds = New-Object System.IO.Compression.DeflateStream($ms, [System.IO.Compression.CompressionMode]::Decompress)
                    $outMs = New-Object System.IO.MemoryStream
                    $ds.CopyTo($outMs)
                    $decompBytes = $outMs.ToArray()
                    $decompText = [System.Text.Encoding]::UTF8.GetString($decompBytes)
                    
                    # Look for Tj, TJ, or raw readable text
                    $matches = [regex]::Matches($decompText, '\((.*?)\)\s*Tj')
                    foreach ($m in $matches) {
                        [void]$out.AppendLine($m.Groups[1].Value)
                    }
                    
                    $matchesTJ = [regex]::Matches($decompText, '\[(.*?)\]\s*TJ')
                    foreach ($m in $matchesTJ) {
                        $inner = [regex]::Matches($m.Groups[1].Value, '\((.*?)\)')
                        $t = foreach ($im in $inner) { $im.Groups[1].Value }
                        [void]$out.AppendLine(($t -join ""))
                    }
                } catch {}
            }
        }
        $pos = $end + 9
    }
    
    $res = $out.ToString()
    Set-Content -Path $outPath -Value $res -Encoding UTF8
    Write-Output "$($pdfPath) extracted $($res.Length) chars"
}

Dump-Pdf-Streams -pdfPath "data/AI-Drug-Innovation-Accelerator.pdf" -outPath "data/pdf1_extracted.txt"
Dump-Pdf-Streams -pdfPath "data/From-Research-to-Innovation-From-Innovation-to-Market.pdf" -outPath "data/pdf2_extracted.txt"
