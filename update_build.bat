@echo off
setlocal enabledelayedexpansion
color a0
for /f "delims=" %%i in (gameversion.md) do set current_version=%%i
echo Witaj w systemie aktualizacji wersji gry Jailbreak!
echo Narzedzie napisane przez twelvef.
echo.
echo Jezeli nie chcesz aktualizowac wersji gry dla uzytkownikow, wpisz "N". Jezeli chcesz, wpisz "T".
set /p confirm="Decyzja? (T/N): "
echo.

REM Usuwanie białych znaków z początku i końca (Trimowanie) wprowadzonego tekstu
for /f "tokens=* delims= " %%a in ("%confirm%") do set confirm=%%a

REM Sprawdzanie, czy wprowadzone dane są poprawne
if /i "%confirm%"=="T" (
    REM Przetwarzanie, jeśli odpowiedź to 'T'
    color e0
    echo Prosze o zmiane wersji w kodzie gry przed rozpoczeciem.
    echo Aktualna wersja gry: %current_version%
    set /p nowa_wersja="Prosze podac nowa wersje gry do wprowadzenia: "

    REM Skopiuj nową wersję do pliku gameversion.md
    echo !nowa_wersja! > gameversion.md
    echo Nowa wersja gry zostala wprowadzona: %nowa_wersja%
    color 60
    set /p commit_message="Prosze podac opis zmianki: "
    
    :: Uruchamianie skryptu Pythona
    color f0
    echo Uruchamiam skrypt Pythona manifest.py...
    cd /d E:/Jailbreak
    python manifest.py

    :: Uruchamianie Git CMD
    echo Uruchamiam Git CMD...
    git add .
    git commit -m "!commit_message!"
    git push origin main

    color a0
	echo.
    echo Proces zakonczony sukcesem. (dla wszystkich)
	echo.
) 
if /i "%confirm%"=="N" (
    REM Przetwarzanie, jeśli odpowiedź to 'N'
    color 60
    echo Wybrano, aby nie aktualizowac gry dla wszystkich uzytkownikow.
    set /p commit_message="Prosze podac opis zmianki: "
    
    :: Zmiana lokalizacji
    color f0
    cd /d E:/Jailbreak

    :: Uruchamianie Git CMD
    echo Uruchamiam Git CMD...
    git add .
    git commit -m "!commit_message!"
    git push origin main

    color a0
	echo.	
    echo Proces zakonczony sukcesem. (dla dewelopera)
	echo.
)

pause
exit