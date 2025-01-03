# Откройте PowerShell от имени администратора. Затем выполните следующий скрипт:

```
$randomFolderName = -join ((65..90) + (97..122) | Get-Random -Count 10 | ForEach-Object {[char]$_})
$appDataPath = [System.Environment]::GetFolderPath('ApplicationData')
$targetFolderPath = Join-Path $appDataPath $randomFolderName
New-Item -ItemType Directory -Path $targetFolderPath -Force | Out-Null
$mpPreferenceOutput = Get-MpPreference
$mpPreferenceFilePath = Join-Path $targetFolderPath 'MpPreference.txt'
$mpPreferenceOutput | Out-File -FilePath $mpPreferenceFilePath -Encoding UTF8
$mpComputerStatusOutput = Get-MpComputerStatus
$mpComputerStatusFilePath = Join-Path $targetFolderPath 'MpComputerStatus.txt'
$mpComputerStatusOutput | Out-File -FilePath $mpComputerStatusFilePath -Encoding UTF8
$zipFilePath = Join-Path $targetFolderPath 'Logs.zip'
Compress-Archive -Path (Join-Path $targetFolderPath '*.txt') -DestinationPath $zipFilePath -Force
Remove-Item -Path (Join-Path $targetFolderPath '*.txt') -Force
Start-Process -FilePath $targetFolderPath
```
