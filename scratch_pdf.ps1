$pdf1 = "data/AI-Drug-Innovation-Accelerator.pdf"
$pdf2 = "data/From-Research-to-Innovation-From-Innovation-to-Market.pdf"

function Extract-PdfStrings($path, $outPath) {
    $bytes = [System.IO.File]::ReadAllBytes($path)
    $text = [System.Text.Encoding]::ASCII.GetString($bytes)
    # Extract BT ... ET blocks or plain stream strings
    $matches = [regex]::Matches($text, '\(([^()]{3,})\)')
    $extracted = foreach ($m in $matches) { $m.Groups[1].Value }
    $res = $extracted -join " "
    Set-Content -Path $outPath -Value $res -Encoding UTF8
    Write-Output "Extracted from $path : $($res.Length) chars"
}

Extract-PdfStrings -path $pdf1 -outPath "data/pdf1_strings.txt"
Extract-PdfStrings -path $pdf2 -outPath "data/pdf2_strings.txt"
