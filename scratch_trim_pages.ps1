$filePath = "d:/WAIWIM/ai-health-bridge-main/src/components/site/pages.tsx"
$utf8NoBom = New-Object System.Text.UTF8Encoding $false
$text = [System.IO.File]::ReadAllText($filePath, $utf8NoBom)

$idx = $text.IndexOf("}00 shadow-2xs")
Write-Output "Found needle at: $idx"

if ($idx -gt 0) {
    $cleanText = $text.Substring(0, $idx + 1) + "`n"
    [System.IO.File]::WriteAllText($filePath, $cleanText, $utf8NoBom)
    Write-Output "Successfully trimmed trailing duplicate code in pages.tsx"
} else {
    Write-Error "Needle '}00 shadow-2xs' not found"
}
