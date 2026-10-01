Add-Type -AssemblyName System.IO.Compression.FileSystem

$f = Get-ChildItem -Path "data" -Filter "*MASTER-REQUIREMENTS*.pdf" | Select-Object -First 1
$bytes = [System.IO.File]::ReadAllBytes($f.FullName)
$latin = [System.Text.Encoding]::GetEncoding("ISO-8859-1").GetString($bytes)

# Search for /Filter
$matches = [regex]::Matches($latin, '<<[^>]*>>\s*stream')
Write-Output "Found $($matches.Count) stream headers"
for ($i = 0; $i -lt [Math]::Min(10, $matches.Count); $i++) {
    Write-Output ("Header " + $i + ": " + $matches[$i].Value.Substring(0, [Math]::Min(120, $matches[$i].Value.Length)))
}
