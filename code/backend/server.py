from flask import Flask, jsonify, request
from flask_cors import CORS
import ollama

# app instance
app = Flask(__name__)
CORS(app)

# /api/home
@app.route("/api/home", methods=['GET'])
def return_home():
    return jsonify({
        'message': "Message delivered successfully"
    })

@app.route("/api/home", methods=['POST'])
def receive_data():
    data = request.json

    if 'patientName' in data:
        return jsonify({'patientName': data['patientName']})
    else:
        return jsonify({'error': 'Key not found in request'})

@app.route('/api/chat', methods=['POST'])
def chat():
    # Get the user input from the request
    prompt = request.json.get('prompt')

    # # Call the OLLAMA chat function
    # stream = ollama.chat(
    #     model='llama3',
    #     messages=[{'role': 'user', 'content': prompt}],
    #     stream=True,
    # )

    # # Process the stream and construct the response
    # response = ''.join(chunk['message']['content'] for chunk in stream)

    return jsonify({'response': prompt})

if __name__ == "__main__":
    app.run(debug=True, port=8080)