@echo off
cd /d "%~dp0"
echo POPULOVE preview server
echo.
echo Keep this window open while previewing on your phone.
echo Phone URL:
echo   http://192.168.1.109:8000/index.html
echo.
C:\Python314\python.exe -m http.server 8000 --bind 192.168.1.109
pause
