import os
import hashlib
import json
import requests

REPO_USER = "twelvefdev"
REPO_NAME = "JailbreakMFA"
BRANCH = "main"

BASE_URL = f"https://raw.githubusercontent.com/{REPO_USER}/{REPO_NAME}/{BRANCH}/"
MANIFEST_URL = BASE_URL + "manifest.json"
FOLDER_LOKALNY = "."

APP_INF = os.path.join(FOLDER_LOKALNY, "app.inf")

def pobierz_manifest():
    print("🔄 Pobieranie manifestu...")
    r = requests.get(MANIFEST_URL)
    r.raise_for_status()
    return r.json()

def oblicz_hash_pliku(sciezka):
    if not os.path.exists(sciezka):
        return None
    sha256 = hashlib.sha256()
    with open(sciezka, "rb") as f:
        for blok in iter(lambda: f.read(4096), b""):
            sha256.update(blok)
    return sha256.hexdigest()

def pobierz_i_zapisz_plik(sciezka_wzgledna):
    url = BASE_URL + sciezka_wzgledna
    lokalna_sciezka = os.path.join(FOLDER_LOKALNY, sciezka_wzgledna)

    print(f"⬇️  Pobieranie: {sciezka_wzgledna}")
    r = requests.get(url)
    if r.status_code == 200:
        os.makedirs(os.path.dirname(lokalna_sciezka), exist_ok=True)
        with open(lokalna_sciezka, "wb") as f:
            f.write(r.content)
    else:
        print(f"❌ Nie udało się pobrać: {sciezka_wzgledna} (HTTP {r.status_code})")

def aktualizuj_plik(plik, oczekiwany_hash):
    lokalna_sciezka = os.path.join(FOLDER_LOKALNY, plik)
    aktualny_hash = oblicz_hash_pliku(lokalna_sciezka)

    if aktualny_hash != oczekiwany_hash:
        pobierz_i_zapisz_plik(plik)
    else:
        print(f"✅ OK: {plik}")

def odczytaj_lokalna_wersje():
    if not os.path.exists(APP_INF):
        return None
    with open(APP_INF, "r") as f:
        wersja = f.readline().strip()
    return wersja or None

def zapisz_wersje_do_app_inf(wersja):
    with open(APP_INF, "w") as f:
        f.write(wersja + "\n")
        f.write("Updated by the official Jailbreak Patcher\n")

def aktualizuj_gre():
    manifest = pobierz_manifest()
    wersja_manifestu = manifest.get("version", "0.0.0")
    wersja_lokalna = odczytaj_lokalna_wersje()

    print(f"📦 Wersja zdalna: {wersja_manifestu}")
    print(f"💾 Wersja lokalna: {wersja_lokalna or 'brak'}")

    if wersja_manifestu == wersja_lokalna:
        print("🆗 Gra jest aktualna!")
        return

    print("🚀 Aktualizacja plików...")
    for plik, oczekiwany_hash in manifest["files"].items():
        aktualizuj_plik(plik, oczekiwany_hash)

    zapisz_wersje_do_app_inf(wersja_manifestu)
    print("\n✅ Aktualizacja zakończona!")

if __name__ == "__main__":
    aktualizuj_gre()
