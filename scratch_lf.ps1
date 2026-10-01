Get-ChildItem -Path src -Recurse -Include *.ts,*.tsx | ForEach-Object {
    $text = [System.IO.File]::ReadAllText($_.FullName)
    $text = $text.Replace("`r`n", "`n")
    [System.IO.File]::WriteAllText($_.FullName, $text, [System.Text.Encoding]::UTF8)
}
Write-Host "Normalized to LF successfully"
