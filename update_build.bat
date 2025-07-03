@echo off

:: Uruchamianie skryptu Pythona
echo Uruchamiam skrypt Pythona manifest.py...
cd /d E:/Jailbreak
python manifest.py

:: Uruchamianie Git CMD
echo Uruchamiam Git CMD...
git add .
git commit -m "Auto-update"
git push origin main

echo Proces zakonczony sukcesem.
pause
