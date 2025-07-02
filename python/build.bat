@echo off
REM Ścieżka do twojego głównego pliku Pythona
set MAIN_SCRIPT=patcher.py

REM Ikona i wersja
set ICON=./icon.ico
set VERSION=version.txt

REM Opcje PyInstaller:
REM --onefile - pojedynczy plik exe
REM --noconsole - bez konsoli (jeśli chcesz GUI)
REM --icon - ikona
REM --version-file - info o wersji
REM --add-data - dodaj pliki danych (w formacie "źródło;cel" - separator ; na Windows)

REM Dodajemy pliki danych (bez _internal, bo to osobno)
REM Tutaj oddzielnie dodajemy wszystkie te trzy pliki do katalogu głównego (.)

pyinstaller --noconsole --icon=%ICON% --version-file=%VERSION% ^
--clean ^
--onefile ^
--add-data "fonts/Alagard.ttf;fonts" ^
--add-data "fonts/KiwiSoda.ttf;fonts" ^
--add-data "./icon.ico;." ^
%MAIN_SCRIPT%

pause