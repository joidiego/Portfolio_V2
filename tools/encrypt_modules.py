#!/usr/bin/env python3
"""Encrypt the PDFs in ../source-modules and write them to ../js/data/pdfs.js.

Usage:  python tools/encrypt_modules.py "your long passphrase"
Needs:  pip install cryptography pypdf
Each PDF is encrypted with AES-256-GCM; the key comes from PBKDF2-SHA256
(250000 iterations, random salt). Only ciphertext goes into js/data/pdfs.js.
"""
import base64, json, os, re, sys
from pathlib import Path
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from pypdf import PdfReader

ROOT = Path(__file__).resolve().parent.parent
ORDER = ["modul-fastapi.pdf", "modul-sql.pdf", "modul-ml.pdf", "modul-keamanan.pdf"]  # same order as the cards

if len(sys.argv) != 2 or len(sys.argv[1]) < 12:
    sys.exit('Usage: python tools/encrypt_modules.py "passphrase (12+ characters)"')
pw = sys.argv[1].encode()

items = []
for name in ORDER:
    path = ROOT / "source-modules" / name
    data = path.read_bytes()
    salt, iv = os.urandom(16), os.urandom(12)
    key = PBKDF2HMAC(algorithm=hashes.SHA256(), length=32, salt=salt, iterations=250000).derive(pw)
    blob = salt + iv + AESGCM(key).encrypt(iv, data, None)
    items.append({"f": name, "n": len(PdfReader(path).pages), "b": base64.b64encode(blob).decode()})

html_path = ROOT / "js" / "data" / "pdfs.js"
html = html_path.read_text(encoding="utf-8")
new, count = re.subn(r"const PDFS=\[.*?\];\n", lambda m: "const PDFS=" + json.dumps(items) + ";\n", html, count=1, flags=re.S)
if count != 1:
    sys.exit("Could not find `const PDFS=[...]` in js/data/pdfs.js")
html_path.write_text(new, encoding="utf-8")
print(f"Embedded {len(items)} encrypted PDFs into index.html")
