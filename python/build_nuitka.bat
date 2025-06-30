@echo off
REM -----------------------------------------------------------
REM Kompilacja patcher.py przy użyciu Nuitki (one‑file, bez konsoli), konwertuje kod do C
REM -----------------------------------------------------------

REM Ścieżka do Twojego głównego pliku Pythona
set MAIN_SCRIPT=patcher.py

REM Ikona aplikacji
set ICON=./content/up32.ico

REM ----------------------------------------
echo [1/2] Kompiluję %MAIN_SCRIPT% ...

python -m nuitka ^
    --windows-disable-console ^
	--enable-plugin=tk-inter ^
    --windows-icon-from-ico=%ICON% ^
    --output-filename=JailbreakUpdater.exe ^
    --include-data-files="Alagard.ttf=Alagard.ttf" ^
    --include-data-files="KiwiSoda.ttf=KiwiSoda.ttf" ^
	--include-data-files=./content/up32.ico=./content/up32.ico ^
    %MAIN_SCRIPT%

echo [2/2] Gotowe!  Wynik: patcher.exe
pause
