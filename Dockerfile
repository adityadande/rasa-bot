# Use official Rasa image as base image
FROM rasa/rasa:3.6.20-full

# Set working directory
WORKDIR /app

# Copy requirements first to leverage Docker cache
COPY requirements.txt /app/

# Install the required Python dependencies
RUN pip install -r requirements.txt

# Copy your Rasa project files to the container
COPY . /app

# Train the model
RUN rasa train

# Expose the ports the app will run on
EXPOSE 5005
EXPOSE 5055

# Create a script to run both Rasa and Action server
COPY start.sh /app/
RUN chmod +x /app/start.sh

# Command to run the start script
CMD ["/app/start.sh"]

FROM python:3.8-slim

# Install dependencies
COPY requirements.txt .
RUN python -m pip install --upgrade pip && pip install -r requirements.txt

