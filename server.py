from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import traceback

app = Flask(__name__)
CORS(app)

API_KEY = "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"
API_URL = "https://openrouter.ai/api/v1/chat/completions"

@app.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        messages = data.get("messages")  # Recibimos el historial completo

        if not messages or not isinstance(messages, list):
            return jsonify({"error": "No se recibieron mensajes válidos"}), 400

        headers = {
            "Authorization": f"Bearer {API_KEY}",
            "Content-Type": "application/json",
            "HTTP-Referer": "http://localhost",  # Cambia a tu dominio si lo subes online
            "X-Title": "CodeConnect Assistant"
        }

        payload = {
            "model": "mistralai/mistral-7b-instruct",
            "messages": messages
        }

        response = requests.post(API_URL, headers=headers, json=payload)
        response.raise_for_status()

        result = response.json()

        if "choices" not in result or not result["choices"]:
            return jsonify({"error": "Respuesta inválida del modelo"}), 500

        ai_response = result["choices"][0]["message"]["content"]
        return jsonify({"response": ai_response})

    except requests.exceptions.RequestException as req_err:
        print("❌ Error de solicitud:", req_err)
        traceback.print_exc()
        return jsonify({"error": f"Error de solicitud: {str(req_err)}"}), 500

    except Exception as e:
        print("❌ Error general:", e)
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
