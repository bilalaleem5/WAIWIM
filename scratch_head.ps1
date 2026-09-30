$b = [System.IO.File]::ReadAllBytes('data/AI-Drug-Innovation-Accelerator.pdf')
$slice = $b[0..1500]
Write-Output ([System.Text.Encoding]::ASCII.GetString($slice))
