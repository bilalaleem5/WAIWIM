Add-Type -AssemblyName System.IO.Compression.FileSystem

function Inspect-Pdf($path, $name) {
    $bytes = [System.IO.File]::ReadAllBytes($path)
    $text = [System.Text.Encoding]::ASCII.GetString($bytes)
    Write-Output "=== $name ==="
    Write-Output "File size: $($bytes.Length) bytes"
    
    # Check for /Title, /Author, /Subject, etc.
    $matches = [regex]::Matches($text, '/(Title|Subject|Keywords|Author|Creator)\s*\(([^)]+)\)')
    foreach ($m in $matches) {
        Write-Output "$($m.Groups[1].Value): $($m.Groups[2].Value)"
    }
}

Inspect-Pdf -path "data/AI-Drug-Innovation-Accelerator.pdf" -name "PDF 1"
Inspect-Pdf -path "data/From-Research-to-Innovation-From-Innovation-to-Market.pdf" -name "PDF 2"
