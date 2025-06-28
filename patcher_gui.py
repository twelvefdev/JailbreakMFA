import tkinter as tk
from tkinter import scrolledtext
from threading import Thread
import patcher

class PatcherGUI:
    def __init__(self, root):
        self.root = root
        self.root.title("Jailbreak Game Patcher")
        self.root.geometry("600x400")
        
        self.label = tk.Label(root, text="Jailbreak Game Patcher", font=("Arial", 16))
        self.label.pack(pady=10)

        self.log_area = scrolledtext.ScrolledText(root, wrap=tk.WORD, width=70, height=20)
        self.log_area.pack(pady=10)

        self.update_button = tk.Button(root, text="🔄 Sprawdź i aktualizuj", command=self.run_patcher)
        self.update_button.pack(pady=5)

    def log(self, msg):
        self.log_area.insert(tk.END, msg + "\n")
        self.log_area.see(tk.END)
        self.root.update_idletasks()

    def run_patcher(self):
        self.log_area.delete(1.0, tk.END)
        self.update_button.config(state=tk.DISABLED)
        Thread(target=self._run_update).start()

    def _run_update(self):
        # Przechwycenie logów z patchera przez podmianę print
        import builtins
        oryginalny_print = print
        try:
            print = self.log
            patcher.aktualizuj_gre()
        finally:
            print = oryginalny_print
            self.update_button.config(state=tk.NORMAL)

if __name__ == "__main__":
    root = tk.Tk()
    app = PatcherGUI(root)
    root.mainloop()