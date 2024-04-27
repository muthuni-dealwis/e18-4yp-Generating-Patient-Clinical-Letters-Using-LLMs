from flask import Flask, jsonify, request
from flask_cors import CORS

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
    data = request.json  # Extract the JSON data sent in the request
    # Process the data as needed
    # For example, you could access a 'key' sent in the request
    # and return it in the response
    if 'patientName' in data:
        return jsonify({'patientName': data['patientName']})
    else:
        return jsonify({'error': 'Key not found in request'})



if __name__ == "__main__":
    app.run(debug=True, port=8080)