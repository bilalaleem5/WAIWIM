Add-Type -AssemblyName System.IO.Compression.FileSystem

$docxFiles = Get-ChildItem -Path "data" -Filter "*.docx"
foreach ($f in $docxFiles) {
    Write-Output "Processing Docx: $($f.Name)"
    $zip = [System.IO.Compression.ZipFile]::OpenRead($f.FullName)
    $entry = $zip.GetEntry('word/document.xml')
    if ($entry) {
        $stream = $entry.Open()
        $reader = New-Object System.IO.StreamReader($stream)
        $xml = $reader.ReadToEnd()
        $reader.Close()
        $stream.Close()
        
        $pMatches = [regex]::Matches($xml, '<w:p\b[^>]*>(.*?)</w:p>')
        $paragraphs = foreach ($p in $pMatches) {
            $tMatches = [regex]::Matches($p.Groups[1].Value, '<w:t[^>]*>(.*?)</w:t>')
            $line = ($tMatches | ForEach-Object { $_.Groups[1].Value }) -join ''
            if ($line.Trim()) { $line.Trim() }
        }
        $outPath = "data/$($f.BaseName)_content.txt"
        $paragraphs | Out-File -FilePath $outPath -Encoding utf8
        Write-Output "Saved $($paragraphs.Count) paragraphs to $outPath"
    }
    $zip.Dispose()
}
