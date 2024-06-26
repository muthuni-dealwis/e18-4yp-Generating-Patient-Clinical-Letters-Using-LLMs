from flask import Flask, jsonify, request
from flask_cors import CORS
import ollama
from werkzeug.security import generate_password_hash, check_password_hash

import mysql.connector

# app instance
app = Flask(__name__)
CORS(app)


mydb = mysql.connector.connect(
    host = "localhost",
    user = "root",
    password = "",
    database = "fyp",
)

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

    # Call the OLLAMA chat function
    stream = ollama.chat(
        model='llama3',
        messages=[{'role': 'user', 'content': prompt}],
        stream=True,
    )

    # Process the stream and construct the response
    response = ''.join(chunk['message']['content'] for chunk in stream)

    return jsonify({'response': response})


@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.json
    username = data.get('name')
    password = data.get('password')
    email = data.get('email')

    mycursor = mydb.cursor() 
    mycursor.execute("SELECT * FROM user WHERE name = %s", (username,))
    user = mycursor.fetchone()

    if user:
        return jsonify({"message": "User already exists"}), 400

    hashed_password = generate_password_hash(password)
    mycursor.execute("INSERT INTO user (name, password,email) VALUES (%s, %s, %s)", (username, hashed_password, email))
    mydb.commit()
    mycursor.close()

    return jsonify({"message": "User created successfully"}), 201

@app.route('/api/login', methods=['POST'])
def login():
    """
    Authenticate a user based on the provided email and password.

    Returns:
    - JSON response indicating whether the login was successful or not.
    """
    mycursor = mydb.cursor() 
    data = request.json
    email = data.get('email')
    password = data.get('password')

    mycursor.execute("SELECT * FROM user WHERE email = %s", (email,))
    user = mycursor.fetchone()

    if not user or not check_password_hash(user[2], password):
        return jsonify({"message": "Invalid credentials"}), 401

    mycursor.close()

    return jsonify({"message": "Login successful"}), 200

if __name__ == "__main__":
    app.run(debug=True, port=8080)