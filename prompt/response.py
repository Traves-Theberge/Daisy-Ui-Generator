# --- Backend (Python Flask) ---
# Improved Server Code with Logging and Configurations

# File: /chat-app-python/server.py

from flask import Flask, request, jsonify
import logging

# Setup logging
logging.basicConfig(level=logging.INFO)

app = Flask(__name__)

@app.route('/api/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message', '')
    if not user_message:
        logging.warning('No message received from user')
        return jsonify(response="Please provide a message."), 400

    # Simulate GPT-4 response
    gpt4_response = f"Echo: {user_message}"
    logging.info(f"Received message: {user_message}, responding with: {gpt4_response}")

    return jsonify(response=gpt4_response)

if __name__ == '__main__':
    logging.info("Starting GPT-4 Simulation Server on http://localhost:3000")
    app.run(port=3000)

# --- Client (Python CLI) ---
# Enhanced Client Application with Better Error Handling and User Prompts

# File: /chat-app-python/client.py

import requests
import logging

# Setup logging
logging.basicConfig(level=logging.INFO)

SERVER_URL = 'http://localhost:3000/api/chat'


def send_message(message):
    try:
        logging.debug(f"Sending message: {message}")
        response = requests.post(SERVER_URL, json={'message': message})
        response.raise_for_status()  # Raises error for bad HTTP statuses
        response_data = response.json().get('response')
        logging.debug(f"Received response: {response_data}")
        return response_data
    except requests.exceptions.RequestException as e:
        logging.error(f"Error sending message: {e}")
        return "An error occurred while communicating with the server."


def main():
    print("Welcome to the enhanced GPT-4 Chat Application (Python CLI)")
    print("Type 'exit' to close the chat application.")
    
    while True:
        user_input = input("You: ").strip()
        if user_input.lower() == 'exit':
            print("Exiting the chat application.")
            break
        if not user_input:
            print("Please enter a message to send.")
            continue

        response = send_message(user_input)
        print(f"GPT-4: {response}")


if __name__ == '__main__':
    main()
