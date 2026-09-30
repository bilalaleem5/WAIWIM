Add-Type -AssemblyName System.IO.Compression.FileSystem

function Decode-ObjStms($path, $outPath) {
    $bytes = [System.IO.File]::ReadAllBytes($path)
    $latin = [System.Text.Encoding]::GetEncoding("ISO-8859-1").GetString($bytes)
    
    $out = New-Object System.Text.StringBuilder
    $pos = 0
    while (($pos = $latin.IndexOf("stream", $pos)) -ne -1) {
        $dictStart = $latin.LastIndexOf("<<", $pos)
        $dict = if ($dictStart -ne -1) { $latin.Substring($dictStart, $pos - $dictStart) } else { "" }
        
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
                $decompBytes = $outMs.ToArray()
                $decomp = [System.Text.Encoding]::UTF8.GetString($decompBytes)
                
                # Check if it has readable words or sentences
                $matches = [regex]::Matches($decomp, '[A-Za-z\u0600-\u06FF]{3,}')
                if ($matches.Count -gt 5) {
                    $words = foreach ($m in $matches) { $m.Value }
                    [void]$out.AppendLine(($words -join " "))
                }
            } catch {}
        }
        $pos = $end + 9
    }
    
    $res = $out.ToString()
    Set-Content -Path $outPath -Value $res -Encoding UTF8
    Write-Output "Extracted $($res.Length) chars from $path"
}

Decode-ObjStms -path "data/AI-Drug-Innovation-Accelerator.pdf" -outPath "data/pdf1_text.txt"
Decode-ObjStms -path "data/From-Research-to-Innovation-From-Innovation-to-Market.pdf" -outPath "data/pdf2_text.txt"
