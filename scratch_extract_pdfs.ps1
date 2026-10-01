Add-Type -AssemblyName System.IO.Compression.FileSystem

function Extract-TextFromPdfStream($streamBytes) {
    $text = [System.Text.Encoding]::UTF8.GetString($streamBytes)
    $sb = New-Object System.Text.StringBuilder
    
    # 1. Look for Tj
    $matchesTj = [regex]::Matches($text, '\((.*?)\)\s*Tj')
    foreach ($m in $matchesTj) {
        $val = $m.Groups[1].Value -replace '\\([\\()])', '$1'
        [void]$sb.AppendLine($val)
    }
    
    # 2. Look for TJ
    $matchesTJ = [regex]::Matches($text, '\[(.*?)\]\s*TJ')
    foreach ($m in $matchesTJ) {
        $inner = [regex]::Matches($m.Groups[1].Value, '\((.*?)\)')
        $t = foreach ($im in $inner) { $im.Groups[1].Value -replace '\\([\\()])', '$1' }
        if ($t) {
            [void]$sb.AppendLine(($t -join ''))
        }
    }

    # 3. Look for hex strings <...> Tj or TJ
    $matchesHexTj = [regex]::Matches($text, '<([0-9a-fA-F\s]+)>\s*Tj')
    foreach ($m in $matchesHexTj) {
        $hex = $m.Groups[1].Value -replace '\s+', ''
        if ($hex.Length % 2 -eq 0 -and $hex.Length -ge 4) {
            try {
                $bytes = for ($i = 0; $i -lt $hex.Length; $i += 2) { [convert]::ToByte($hex.Substring($i, 2), 16) }
                # Try UTF16-BE or UTF8
                $decoded = [System.Text.Encoding]::BigEndianUnicode.GetString($bytes)
                if ($decoded -match '[\p{L}]') {
                    [void]$sb.AppendLine($decoded)
                }
            } catch {}
        }
    }

    # 4. Look for raw words in stream if it's text
    $matchesWords = [regex]::Matches($text, '[\p{L}\d\s,.!?;:()/\-–]{8,}')
    foreach ($m in $matchesWords) {
        $v = $m.Value.Trim()
        if ($v.Length -gt 15 -and -not ($v -match '^[0-9\s.,]+$')) {
            # Check if it has actual letters
            if ($v -match '\p{L}{3,}') {
                # [void]$sb.AppendLine($v)
            }
        }
    }

    return $sb.ToString()
}

function Process-Pdf($pdfPath, $outPath) {
    Write-Output "Processing $pdfPath"
    $bytes = [System.IO.File]::ReadAllBytes($pdfPath)
    $latin = [System.Text.Encoding]::GetEncoding("ISO-8859-1").GetString($bytes)
    
    $fullText = New-Object System.Text.StringBuilder
    $pos = 0
    $streamCount = 0
    
    while (($pos = $latin.IndexOf("stream", $pos)) -ne -1) {
        $start = $pos + 6
        if ($latin[$start] -eq "`r") { $start++ }
        if ($latin[$start] -eq "`n") { $start++ }
        
        $end = $latin.IndexOf("endstream", $start)
        if ($end -eq -1) { break }
        
        $len = $end - $start
        if ($len -gt 2) {
            $streamCount++
            $decompBytes = $null
            # Check for zlib
            if ($bytes[$start] -eq 0x78) {
                try {
                    $ms = New-Object System.IO.MemoryStream($bytes, $start + 2, $len - 2)
                    $ds = New-Object System.IO.Compression.DeflateStream($ms, [System.IO.Compression.CompressionMode]::Decompress)
                    $outMs = New-Object System.IO.MemoryStream
                    $ds.CopyTo($outMs)
                    $decompBytes = $outMs.ToArray()
                } catch {}
            } else {
                # Uncompressed stream
                $decompBytes = New-Object byte[] $len
                [System.Array]::Copy($bytes, $start, $decompBytes, 0, $len)
            }
            
            if ($decompBytes) {
                $extracted = Extract-TextFromPdfStream -streamBytes $decompBytes
                if ($extracted.Trim().Length -gt 0) {
                    [void]$fullText.AppendLine($extracted)
                }
            }
        }
        $pos = $end + 9
    }
    
    $res = $fullText.ToString()
    Set-Content -Path $outPath -Value $res -Encoding UTF8
    Write-Output "Extracted $($res.Length) characters from $streamCount streams to $outPath"
}

$pdfFiles = Get-ChildItem -Path "data" -Filter "*.pdf"
foreach ($pdf in $pdfFiles) {
    $out = "data/$($pdf.BaseName)_text.txt"
    Process-Pdf -pdfPath $pdf.FullName -outPath $out
}
