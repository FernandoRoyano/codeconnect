from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import os
from werkzeug.security import generate_password_hash, check_password_hash
from PyPDF2 import PdfReader
import requests
import traceback

app = Flask(__name__)
CORS(app)

# Clave y configuración del modelo
API_KEY = "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"
API_URL = "https://openrouter.ai/api/v1/chat/completions"
MODEL = "mistralai/mistral-7b-instruct"

# Carpeta para subir archivos
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# ====== 🗂️ BASE DE DATOS ======
def init_db():
    conn = sqlite3.connect("users.db")
    c = conn.cursor()
    c.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
    """)
    conn.commit()
    conn.close()

init_db()

@app.route("/register", methods=["POST"])
def register():
    try:
        data = request.json
        name = data.get("name")
        email = data.get("email")
        password = data.get("password")

        if not name or not email or not password:
            return jsonify({"error": "Faltan datos"}), 400

        hashed_password = generate_password_hash(password)
        conn = sqlite3.connect("users.db")
        c = conn.cursor()
        c.execute("INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
                  (name, email, hashed_password))
        conn.commit()
        conn.close()

        return jsonify({"message": "Usuario registrado correctamente"}), 200

    except sqlite3.IntegrityError:
        return jsonify({"error": "Este email ya está registrado"}), 409
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/login", methods=["POST"])
def login():
    try:
        data = request.json
        email = data.get("email")
        password = data.get("password")

        conn = sqlite3.connect("users.db")
        c = conn.cursor()
        c.execute("SELECT name, password FROM users WHERE email = ?", (email,))
        row = c.fetchone()
        conn.close()

        if row and check_password_hash(row[1], password):
            return jsonify({"name": row[0], "email": email}), 200
        else:
            return jsonify({"error": "Credenciales incorrectas"}), 401

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ====== 💬 CHAT ======
@app.route("/chat", methods=["POST"])
def chat():
    try:
        data = request.json
        messages = data.get("messages", [])
        if not messages:
            return jsonify({"error": "No se proporcionaron mensajes"}), 400

        headers = {
            "Authorization": f"Bearer {API_KEY}",
            "Content-Type": "application/json",
            "HTTP-Referer": "http://localhost",
            "X-Title": "CodeConnect Assistant"
        }

        payload = {
            "model": MODEL,
            "messages": messages
        }

        response = requests.post(API_URL, headers=headers, json=payload)
        response.raise_for_status()
        result = response.json()

        if "choices" not in result or not result["choices"]:
            return jsonify({"error": "Respuesta inválida del modelo"}), 500

        reply = result["choices"][0]["message"]["content"]
        return jsonify({"response": reply})

    except requests.exceptions.RequestException as e:
        traceback.print_exc()
        return jsonify({"error": f"Error de solicitud: {str(e)}"}), 500
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

# ====== 📎 SUBIR DOCUMENTOS ======
@app.route("/upload", methods=["POST"])
def upload_file():
    try:
        if "file" not in request.files:
            return jsonify({"error": "No se envió ningún archivo"}), 400

        file = request.files["file"]
        if file.filename == "":
            return jsonify({"error": "Nombre de archivo vacío"}), 400

        ext = file.filename.split(".")[-1].lower()
        content = ""

        if ext == "txt":
            content = file.read().decode("utf-8", errors="ignore")
        elif ext == "pdf":
            reader = PdfReader(file)
            content = "\n".join([page.extract_text() for page in reader.pages if page.extract_text()])
        else:
            return jsonify({"error": "Solo se permiten archivos .txt o .pdf"}), 400

        content = content.strip()
        if not content:
            return jsonify({"error": "El archivo no tiene contenido válido"}), 400

        return jsonify({"content": content[:3000]})

    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": f"Error al procesar archivo: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True)
