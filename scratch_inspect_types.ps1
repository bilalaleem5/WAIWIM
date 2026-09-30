$bytes = [System.IO.File]::ReadAllBytes("data/AI-Drug-Innovation-Accelerator.pdf")
$latin = [System.Text.Encoding]::GetEncoding("ISO-8859-1").GetString($bytes)

$matches = [regex]::Matches($latin, '/Subtype\s*/(\w+)')
foreach ($m in $matches) {
    Write-Output $m.Value
}

$matches2 = [regex]::Matches($latin, '/Type\s*/(\w+)')
$types = foreach ($m in $matches2) { $m.Value }
Write-Output "Unique Types: $(($types | Select-Object -Unique) -join ', ')"
