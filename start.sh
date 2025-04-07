#!/bin/bash

# Start the action server in the background
rasa run actions &

# Start the Rasa server
rasa run --enable-api --cors "*" --port 5005 