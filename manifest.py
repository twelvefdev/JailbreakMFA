import os
import hashlib
import json

# KONFIGURACJA
FOLDER_DO_PRZESKANOWANIA = "."  # główny folder repo
SCIEZKA_WYNIKOWA = "manifest.json"
SCIEZKA_DO_PLIKU_WERSJI = "gameversion.md"  # ścieżka do pliku z wersją

# Ignorowane foldery i pliki
IGNOROWANE_FOLDER = {".git", "_redist", "api", "engine", "__pycache__", "capture", "python"}
IGNOROWANE_PLIKI = {"manifest.py", "gameversion.md", "update_build.bat","CHANGELOG.md", "manifest.json", ".DS_Store", "app.inf", "app.log", "JailbreakController.pdn", "README.md", "sound_channels_list.txt", "launcher.inf", "Jailbreak Launcher.001", "Jailbreak Launcher.mfa", "Jailbreak Map Editor.001", "Jailbreak Map Editor.mfa", "Jailbreak Motif Generator.001", "Jailbreak Motif Generator.mfa", "Jailbreak Tools.001", "Jailbreak Tools.mfa", "Jailbreak Source Code.001", "Jailbreak Source Code.mfa", "JBUpdate.exe"}
IGNOROWANE_ROZSZERZENIA = {".pyc", ".log", ".tmp"}

def oblicz_hash_pliku(sciezka):
    sha256 = hashlib.sha256()
    with open(sciezka, "rb") as f:
        for blok in iter(lambda: f.read(4096), b""):
            sha256.update(blok)
    return sha256.hexdigest()

def pobierz_wersje_z_pliku(sciezka):
    """Funkcja do pobierania wersji z pliku check_version.md"""
    try:
        with open(sciezka, "r") as f:
            wersja = f.readline().strip()  # Odczytaj pierwszą linię
            return wersja
    except FileNotFoundError:
        print(f"Plik {sciezka} nie został znaleziony.")
        return "1.0.0"  # Wartość domyślna, jeśli plik nie istnieje

def generuj_manifest(folder_bazowy, wersja):
    manifest = {
        "version": wersja,  # Ustaw wersję na wartość z pliku
        "files": {}
    }

    for root, dirs, files in os.walk(folder_bazowy):
        # Filtruj foldery
        dirs[:] = [d for d in dirs if d not in IGNOROWANE_FOLDER]

        for filename in files:
            if filename in IGNOROWANE_PLIKI:
                continue
            if os.path.splitext(filename)[1] in IGNOROWANE_ROZSZERZENIA:
                continue

            pelna_sciezka = os.path.join(root, filename)
            relatywna_sciezka = os.path.relpath(pelna_sciezka, folder_bazowy)
            relatywna_sciezka = relatywna_sciezka.replace("\\", "/")  # dla Windows

            hash_pliku = oblicz_hash_pliku(pelna_sciezka)
            rozmiar_pliku = os.path.getsize(pelna_sciezka)

            manifest["files"][relatywna_sciezka] = {
                "hash": hash_pliku,
                "size": rozmiar_pliku
            }

    return manifest

def zapisz_manifest(manifest, sciezka_wynikowa):
    with open(sciezka_wynikowa, "w") as f:
        json.dump(manifest, f, indent=4)
    print(f"✅ Manifest zapisany jako {sciezka_wynikowa} ({len(manifest['files'])} plików)")

if __name__ == "__main__":
    wersja = pobierz_wersje_z_pliku(SCIEZKA_DO_PLIKU_WERSJI)  # Odczytaj wersję z pliku
    manifest = generuj_manifest(FOLDER_DO_PRZESKANOWANIA, wersja)  # Generuj manifest z wersją
    zapisz_manifest(manifest, SCIEZKA_WYNIKOWA)  # Zapisz manifest do pliku
