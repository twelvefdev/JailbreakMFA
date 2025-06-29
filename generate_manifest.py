import os
import hashlib
import json

# KONFIGURACJA
FOLDER_DO_PRZESKANOWANIA = "."  # główny folder repo
SCIEZKA_WYNIKOWA = "manifest.json"

# Ignorowane foldery i pliki
IGNOROWANE_FOLDER = {".git", "_redist", "api", "engine", "__pycache__", "capture"}
IGNOROWANE_PLIKI = {"generate_manifest.py", "manifest.json", ".DS_Store", "app.inf", "app.log", "JailbreakController.pdn", "README.md", "sound_channels_list.txt", "launcher.inf", "Jailbreak Launcher.001", "Jailbreak Launcher.mfa", "Jailbreak Map Editor.001", "Jailbreak Map Editor.mfa", "Jailbreak Motif Generator.001", "Jailbreak Motif Generator.mfa", "Jailbreak Tools.001", "Jailbreak Tools.mfa", "Jailbreak Source Code.001", "Jailbreak Source Code.mfa"}
IGNOROWANE_ROZSZERZENIA = {".pyc", ".log", ".tmp"}

def oblicz_hash_pliku(sciezka):
    sha256 = hashlib.sha256()
    with open(sciezka, "rb") as f:
        for blok in iter(lambda: f.read(4096), b""):
            sha256.update(blok)
    return sha256.hexdigest()

def generuj_manifest(folder_bazowy):
    manifest = {
        "version": "1.0.0",  # Możesz zmieniać to ręcznie lub skryptowo
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
    manifest = generuj_manifest(FOLDER_DO_PRZESKANOWANIA)
    zapisz_manifest(manifest, SCIEZKA_WYNIKOWA)
