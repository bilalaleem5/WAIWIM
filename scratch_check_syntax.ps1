$files = @(
    'src/components/site/pages.tsx',
    'src/components/site/primitives.tsx',
    'src/components/site/shell.tsx',
    'src/lib/site-content.ts'
)

foreach ($f in $files) {
    $content = [System.IO.File]::ReadAllText($f, [System.Text.Encoding]::UTF8)
    $openB = ($content.ToCharArray() | Where-Object { $_ -eq '{' }).Count
    $closeB = ($content.ToCharArray() | Where-Object { $_ -eq '}' }).Count
    $openP = ($content.ToCharArray() | Where-Object { $_ -eq '(' }).Count
    $closeP = ($content.ToCharArray() | Where-Object { $_ -eq ')' }).Count
    Write-Output "$f : Braces {$openB, $closeB}, Parens ($openP, $closeP)"
}
