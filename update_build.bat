@echo off
echo Witaj w systemie aktualizacji wersji gry Jailbreak!

REM Potwierdzenie zmiany wersji
echo Jezeli nie chcesz aktualizowac wersji gry dla uzytkownikow, kontynnuj z tak. Jezeli chcesz:
set /p confirm="Czy wersja gry zostala zmieniona w kodzie zrodlowym? (T/N): "
if /i "%confirm%"=="T" (
	echo Aktualna wersja gry:
    type gameversion.md
    set /p new_version="Prosze podac nowa wersje gry do wprowadzenia: "

    REM Skopiuj nową wersję do pliku gameversion.md
    echo %new_version% > gameversion.md
    echo Nowa wersja gry zostala wprowadzona: %new_version%

) else (
    echo Nie wprowadzam zadnych zmian. Koncze proces...
)

:: Uruchamianie skryptu Pythona
echo Uruchamiam skrypt Pythona manifest.py...
cd /d E:/Jailbreak
python manifest.py

:: Uruchamianie Git CMD
echo Uruchamiam Git CMD...
git add .
git commit -m "GitHub Auto-Update"
git push origin main

echo Proces zakonczony sukcesem.
pause
