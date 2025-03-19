from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Define your flash cards data
flash_cards = [
    {"question": "What is the capital of France?", "answer": "Paris"},
    {"question": "What is 2 + 2?", "answer": "4"},
    {"question": "What is the largest planet in our solar system?", "answer": "Jupiter"}
]

# API endpoint to return flash cards data
@app.route('/api/flashcards', methods=['GET'])
def get_flashcards():
    return jsonify(flash_cards)

# New API endpoint to handle selected text
@app.route('/api/selected-text', methods=['POST'])
def handle_selected_text():
    try:
        data = request.get_json()
        selected_text = data.get("selectedText", "")

        if not selected_text:
            return jsonify({"error": "No text received"}), 400

        print(f"Received selected text: {selected_text}")

        # Respond to the frontend
        return jsonify({"message": "Text received successfully", "selectedText": selected_text})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
