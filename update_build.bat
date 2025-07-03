@echo off

:: Potwierdzenie od użytkownika
echo Czy wersja gry byla zmieniana w pliku gameversion.md i w kodzie gry? (Y/N)
set /p userinput=

if /i "%userinput%" neq "Y" (
    echo Skrypt zostal przerwany. Zmiana wersji gry jest wymagana.
    pause
    exit /b
)

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
