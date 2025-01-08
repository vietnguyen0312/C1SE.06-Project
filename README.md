Project Overview

This project is a full-stack application consisting of three main components:

Backend: Developed using Spring Boot.

Frontend: Built with ReactJS.

Chatbot: Implemented using Rasa for natural language understanding and responses.

The application aims to provide seamless user interactions with a responsive frontend, a robust backend, and an intelligent chatbot.

Features


Backend:

RESTful API for communication.

Secure user authentication and authorization.

Integration with a relational database using JPA/Hibernate.

Centralized error handling and logging.


Frontend:

Modern UI/UX using ReactJS.

State management with Redux (if applicable).

API integration with the backend.

Chatbot:

Custom-trained NLP models using Rasa.

Interactive conversational capabilities.

Easy integration with the frontend.

Requirements


Backend:

Java 21 or later

Gradle Wrapper

Database (MySQL 8.0)

Frontend:

Node.js (version 10. or later)

npm


Chatbot:

Python 3.8 or later

Rasa Framework


Setup and Installation

clone project:
git clone https://github.com/vietnguyen0312/C1SE.06-Project.git

Backend

Configure the Application:

Update application.properties for database and environment settings.

Build and Run:

./gradlew build
./gradlew bootRun

The backend will run at http://localhost:8080.

Frontend

Install Dependencies:

npm install

Start the Development Server:

npm run dev

The frontend will be accessible at http://localhost:3000.

Chatbot

Set Up Virtual Environment:

python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

Install Dependencies:

pip install -r requirements.txt

Train the Model:

rasa train

Run the Chatbot:

rasa run

The chatbot will be accessible at http://localhost:5005.

Integration

The backend and chatbot APIs are integrated with the frontend for seamless user interactions.

Use environment variables or configuration files to link the services together.

Folder Structure

Backend: Contains Spring Boot source code and configurations.

Frontend: ReactJS components, assets, and build configurations.

Chatbot: Rasa models, training data, and configurations.

API Documentation

Backend API: Use Swagger UI (if enabled) at /swagger-ui.html.

Chatbot API: Refer to Rasa's endpoints documentation.

Contributing

Fork the repository.

Create a feature branch.

Commit your changes.

Open a pull request.

License

This project is licensed under the MIT License.

Contact

For any queries or issues, contact [vietnguyen0312] at [vietnguyen0312@gmail.com].
