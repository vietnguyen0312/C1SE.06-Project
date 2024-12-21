FROM rasa/rasa:latest

# Copy the virtual environment into the container
COPY env /app/env

# Set the environment variable to use the virtual environment
ENV PATH="/app/env/bin:$PATH"

# Copy the necessary files into the container
COPY . /app

# Install MySQL client and python connector
RUN apt-get update && apt-get install -y default-libmysqlclient-dev build-essential pkg-config
RUN pip install mysqlclient SQLAlchemy

# Run Rasa server with specific CORS settings
CMD ["run", "-m", "models", "--enable-api", "--cors", "http://localhost:3000"]