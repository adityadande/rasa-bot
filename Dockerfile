# Use official Rasa image as base image
FROM rasa/rasa:3.4.*-full

# Set working directory
WORKDIR /app

# Copy your Rasa project files to the container
COPY . /app

# Install the required Python dependencies
RUN pip install -r requirements.txt

# Expose the port the app will run on
EXPOSE 5005

# Command to run Rasa
CMD ["rasa", "run", "--enable-api", "--cors", "*", "--port", "5005"]

FROM python:3.8-slim

# Install dependencies
COPY requirements.txt .
RUN python -m pip install --upgrade pip && pip install -r requirements.txt

