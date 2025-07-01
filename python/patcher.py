import sys
import os
import hashlib
import json
import base64
import requests
import tkinter as tk
from tkinter import scrolledtext, ttk, messagebox
from threading import Thread
import tkinter.font as tkFont
from tkinter import font as tkfont
import ctypes
from pathlib import Path
import time
from PyInstaller.utils.hooks import collect_data_files

def resource_path(relative_path):
    try:
        base_path = sys._MEIPASS
    except AttributeError:
        base_path = os.path.abspath(".")
    return os.path.join(base_path, relative_path)

_ENCODED_TOKEN = "Z2l0aHViX3BhdF8xMUJNRlg0S1kwVVdLdGs1eGpqSk1aX3FvT1p6MlJ1OFdKZzB5aTU0RlFjcmxUTlE0Mm5IZEluVFdyQjB0a2hzNDVKRlVYV1Q2RHVya3E1OVpE"
GITHUB_TOKEN = base64.b64decode(_ENCODED_TOKEN).decode()

REPO_USER = "twelvefdev"
REPO_NAME = "JailbreakMFA"
BRANCH = "main"
BASE_URL = f"https://raw.githubusercontent.com/{REPO_USER}/{REPO_NAME}/{BRANCH}/"
MANIFEST_URL = BASE_URL + "manifest.json"
FOLDER_LOKALNY = "."

APP_INF = os.path.abspath("app.inf")

progress_callback = None
status_callback = None

def load_custom_fonts():
    fonts_dir = resource_path("fonts")
    for font_file in ["Alagard.ttf", "KiwiSoda.ttf"]:
        path = os.path.join(fonts_dir, font_file)
        if os.path.exists(path):
            # Load font permanently for process
            try:
                added = ctypes.windll.gdi32.AddFontResourceExW(path, 0x10, 0)
                if added == 0:
                    print(f"⚠️ Czcionka nie została załadowana: {font_file}")
                else:
                    print(f"✅ Załadowano czcionkę: {font_file}")
            except Exception as e:
                print(f"❌ Błąd ładowania {font_file}: {e}")
        else:
            print(f"❌ Nie znaleziono czcionki: {path}")

def set_progress_callback(callback):
    global progress_callback
    progress_callback = callback

def set_status_callback(callback):
    global status_callback
    status_callback = callback

def has_internet():
    try:
        requests.get("https://github.com", timeout=5)
        return True
    except:
        return False

def fetch_manifest():
    headers = {"Authorization": f"token {GITHUB_TOKEN}"}
    r = requests.get(MANIFEST_URL, headers=headers)
    r.raise_for_status()
    return r.json()

def calculate_file_hash(path):
    if not os.path.exists(path):
        return None
    sha256 = hashlib.sha256()
    with open(path, "rb") as f:
        for block in iter(lambda: f.read(4096), b""):
            sha256.update(block)
    return sha256.hexdigest()

def download_and_save_file(relative_path):
    url = BASE_URL + relative_path
    local_path = os.path.join(FOLDER_LOKALNY, relative_path)
    headers = {"Authorization": f"token {GITHUB_TOKEN}"}
    r = requests.get(url, headers=headers)
    if r.status_code == 200:
        os.makedirs(os.path.dirname(local_path), exist_ok=True)
        with open(local_path, "wb") as f:
            f.write(r.content)
    else:
        raise RuntimeError(f"Failed to download {relative_path}")

def create_backup(path):
    if os.path.exists(path):
        backup_path = path + ".bak"
        os.makedirs(os.path.dirname(backup_path), exist_ok=True)
        with open(path, "rb") as orig, open(backup_path, "wb") as bak:
            bak.write(orig.read())

def restore_backups():
    for dirpath, _, filenames in os.walk(FOLDER_LOKALNY):
        for filename in filenames:
            if filename.endswith(".bak"):
                original = os.path.join(dirpath, filename[:-4])
                backup = os.path.join(dirpath, filename)
                with open(backup, "rb") as f_bak, open(original, "wb") as f_orig:
                    f_orig.write(f_bak.read())

def remove_backups():
    for dirpath, _, filenames in os.walk(FOLDER_LOKALNY):
        for filename in filenames:
            if filename.endswith(".bak"):
                os.remove(os.path.join(dirpath, filename))

def update_file(file, expected_hash):
    local_path = os.path.join(FOLDER_LOKALNY, file)
    current_hash = calculate_file_hash(local_path)
    if current_hash != expected_hash:
        if os.path.exists(local_path):
            create_backup(local_path)
        download_and_save_file(file)

def read_local_version():
    if not os.path.exists(APP_INF):
        return None
    with open(APP_INF, "r") as f:
        version = f.readline().strip()
    return version or None

def save_version_to_app_inf(version):
    with open(APP_INF, "w") as f:
        f.write(version + "\n")
        f.write("Updated by Jailbreak Updater\n")

class PatcherGUI:
    def __init__(self, root):
        self.root = root
        self.root.title("Jailbreak Updater")
        self.root.geometry("700x500")
        self.root.resizable(False, False)  # Prevent resizing in both directionss
        self.root.iconbitmap(resource_path("icon.ico"))

        load_custom_fonts()
        self.setup_styles()

        self.title_font = tkFont.Font(family="Alagard", size=22)
        self.log_font = tkFont.Font(family="Alagard", size=11)
        self.button_font = tkFont.Font(family="KiwiSoda", size=11)

        self.label = tk.Label(root, text="Jailbreak Updater", font=self.title_font)
        self.label.pack(pady=10)

        self.log_area = scrolledtext.ScrolledText(root, wrap=tk.WORD, width=80, height=20, font=self.log_font)
        self.log_area.pack(pady=5)

        self.status_label = tk.Label(root, text="", font=self.log_font)
        self.status_label.pack(pady=2)

        self.progress = ttk.Progressbar(root, orient=tk.HORIZONTAL, length=600, mode="determinate", style="Custom.Horizontal.TProgressbar")
        self.progress.pack(pady=5)

        frame = tk.Frame(root)
        frame.pack(pady=5)

        self.check_button = tk.Button(frame, text="Check for updates", font=self.button_font, command=self.check_update)
        self.check_button.grid(row=0, column=0, padx=5)

        self.update_button = tk.Button(frame, text="Update", font=self.button_font, command=self.run_update)
        self.update_button.grid(row=0, column=1, padx=5)

        self.exit_button = tk.Button(frame, text="Exit", font=self.button_font, command=self.safe_quit)
        self.exit_button.grid(row=0, column=2, padx=5)

        self.running = False

        if not has_internet():
            messagebox.showerror("No internet", "Internet connection is required to start.")
            self.root.destroy()

    def setup_styles(self):
        self.style = ttk.Style()
        self.style.theme_use("default")
        self.style.configure("Custom.Horizontal.TProgressbar", troughcolor='white', background='#00ccff')

    def log(self, msg):
        self.log_area.config(state=tk.NORMAL)
        self.log_area.insert(tk.END, msg + "\n")
        self.log_area.see(tk.END)
        self.log_area.config(state=tk.DISABLED)
        self.root.update_idletasks()

    def update_progress(self, value):
        self.progress["value"] = value
        color = "#00ccff" if value < 50 else "#00ff88" if value < 90 else "#00ff00"
        self.style.configure("Custom.Horizontal.TProgressbar", background=color)
        self.root.update_idletasks()

    def update_status_text(self, text):
        self.status_label.config(text=text)
        self.root.update_idletasks()

    def run_update(self):
        self.log_area.config(state=tk.NORMAL)
        self.log_area.delete(1.0, tk.END)
        self.log_area.config(state=tk.DISABLED)
        self.log("🔄 Starting update...")
        self.status_label.config(text="")
        self.progress["value"] = 0
        set_progress_callback(self.update_progress)
        set_status_callback(self.update_status_text)
        self.running = True
        Thread(target=self._run_update).start()

    def _run_update(self):
        try:
            if not has_internet():
                raise Exception("No internet connection during update.")

            manifest = fetch_manifest()
            files_info = manifest["files"]
            files = list(files_info.items())
            total = len(files)

            total_bytes = sum(info["size"] for _, info in files)
            downloaded_bytes = 0
            start_time = time.time()

            for i, (file, info) in enumerate(files, 1):
                if not self.running:
                    return

                expected_hash = info["hash"]
                file_size = info["size"]

                update_file(file, expected_hash)
                downloaded_bytes += file_size
                percent = downloaded_bytes / total_bytes * 100

                elapsed = time.time() - start_time
                speed = downloaded_bytes / elapsed if elapsed > 0 else 0
                speed_str = f"{speed / 1024:.1f} KB/s" if speed < 1024 * 1024 else f"{speed / (1024 ** 2):.1f} MB/s"
                remaining = total_bytes - downloaded_bytes
                readable = f"{remaining / (1024 ** 2):.1f} MB"
                eta = remaining / speed if speed > 0 else 0
                eta_str = f"{int(eta // 60)}m {int(eta % 60)}s" if eta >= 60 else f"{int(eta)}s"

                if progress_callback:
                    progress_callback(percent)
                if status_callback:
                    status_callback(
                        f"Updating {i}/{total} ({percent:.1f}%) — remaining: {readable} - {speed_str} - ETA: {eta_str}"
                    )

                self.log(f"✅ Updated: {file}")

            save_version_to_app_inf(manifest.get("version", "0.0.0"))
            self.log("\n✅ Update complete!")
            remove_backups()

        except Exception as e:
            self.log(f"❌ Error: {str(e)}")
            messagebox.showerror("Update failed", str(e))
            self.safe_quit()

        finally:
            self.running = False

    def check_update(self):
        self.log_area.config(state=tk.NORMAL)
        self.log_area.delete(1.0, tk.END)
        self.log_area.config(state=tk.DISABLED)
        try:
            manifest = fetch_manifest()
            remote_version = manifest.get("version", "0.0.0")
            local_version = read_local_version()
            self.log(f"📦 Remote version: {remote_version}")
            self.log(f"💾 Local version: {local_version or 'none'}")
            if remote_version == local_version:
                self.log("🆗 The game is up to date!")
            else:
                update_size = sum(info["size"] for info in manifest.get("files", {}).values())
                size_str = f"{update_size / (1024 ** 2):.1f} MB"
                self.log(f"🚨 A new version is available! (Total size: {size_str})")
        except Exception as e:
            self.log(f"❌ Error: {str(e)}")
            messagebox.showerror("Connection error", str(e))

    def safe_quit(self):
        if self.running:
            self.running = False
            self.log("⚠️ Update interrupted. Restoring original files...")
            restore_backups()
            self.log("✅ Files restored from backup.")
        self.root.quit()

if __name__ == "__main__":
    root = tk.Tk()
    app = PatcherGUI(root)
    root.mainloop()
