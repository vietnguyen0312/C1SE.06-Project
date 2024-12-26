import os
import subprocess
import glob

# Define paths
models_path = "models/"
actions_path = "C1SE.06-Project/Chatbot/actions"

# Function to start the actions server
def start_actions_server():
    print("Starting actions server...")
    subprocess.Popen(["rasa", "run", "actions", "--actions", actions_path])

# Function to run Rasa shell
def run_rasa_shell():
    print("Running Rasa shell...")
    subprocess.run(["rasa", "shell"])

# Function to run Rasa API
def run_rasa_api():
    print("Running Rasa API...")
    subprocess.run(["rasa", "run", "--enable-api", "--cors", "http://localhost:3000"])


if __name__ == "__main__":
    # Start the actions server
    start_actions_server()

    # Run Rasa shell
    run_rasa_shell()

    # Run Rasa API
    # run_rasa_api()
