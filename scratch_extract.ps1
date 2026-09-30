Add-Type -AssemblyName System.IO.Compression.FileSystem

function Extract-DocxText($path) {
    $zip = [System.IO.Compression.ZipFile]::OpenRead($path)
    $entry = $zip.GetEntry('word/document.xml')
    $stream = $entry.Open()
    $reader = New-Object System.IO.StreamReader($stream)
    $xmlText = $reader.ReadToEnd()
    $reader.Close()
    $stream.Close()
    $zip.Dispose()
    
    # Extract text from w:t tags
    $matches = [regex]::Matches($xmlText, '<w:t[^>]*>(.*?)</w:t>')
    $texts = foreach ($m in $matches) { $m.Groups[1].Value }
    return ($texts -join ' ')
}

$docxPath = "data/with ai we innovate medicine ai website recommendation (1).docx"
$text = Extract-DocxText -path $docxPath
Set-Content -Path "data/extracted_docx_text.txt" -Value $text -Encoding UTF8
Write-Output "Done extracting docx, length: $($text.Length)"
