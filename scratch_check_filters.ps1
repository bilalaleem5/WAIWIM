$bytes = [System.IO.File]::ReadAllBytes("data/AI-Drug-Innovation-Accelerator.pdf")
$latin1 = [System.Text.Encoding]::GetEncoding("ISO-8859-1").GetString($bytes)
$matches = [regex]::Matches($latin1, '/Filter\s*/(\w+)')
foreach ($m in $matches) {
    Write-Output $m.Value
}
