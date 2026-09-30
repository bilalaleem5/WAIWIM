Add-Type -AssemblyName System.IO.Compression.FileSystem

function Extract-PdfText($path, $outFile) {
    $bytes = [System.IO.File]::ReadAllBytes($path)
    $text = [System.Text.Encoding]::ASCII.GetString($bytes)
    $streamMatches = [regex]::Matches($text, '(?s)stream\r?\n(.*?)endstream')
    
    $outText = New-Object System.Text.StringBuilder
    foreach ($m in $streamMatches) {
        $idx = $m.Groups[1].Index
        $len = $m.Groups[1].Length
        
        # Read the slice from bytes
        if ($len -gt 2 -and $bytes[$idx] -eq 0x78) {
            try {
                $ms = New-Object System.IO.MemoryStream($bytes, $idx + 2, $len - 2)
                $ds = New-Object System.IO.Compression.DeflateStream($ms, [System.IO.Compression.CompressionMode]::Decompress)
                $sr = New-Object System.IO.StreamReader($ds, [System.Text.Encoding]::UTF8)
                $decomp = $sr.ReadToEnd()
                
                # Match BT ... ET blocks or string literals
                $strMatches = [regex]::Matches($decomp, '\(([^()]{2,})\)')
                foreach ($sm in $strMatches) {
                    $val = $sm.Groups[1].Value
                    if ($val -match '[a-zA-Z\u0600-\u06FF]{3,}') {
                        [void]$outText.AppendLine($val)
                    }
                }
            } catch {}
        }
    }
    
    $result = $outText.ToString()
    Set-Content -Path $outFile -Value $result -Encoding UTF8
    Write-Output "Extracted $($result.Length) chars to $outFile"
}

Extract-PdfText -path "data/AI-Drug-Innovation-Accelerator.pdf" -outFile "data/pdf1_decompressed.txt"
Extract-PdfText -path "data/From-Research-to-Innovation-From-Innovation-to-Market.pdf" -outFile "data/pdf2_decompressed.txt"
