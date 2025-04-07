# Rasa Resume Chatbot

A chatbot built with Rasa that provides information about a resume.

## Features

- Menu-based interaction for easy navigation
- Access to resume sections:
  - Professional Summary
  - Education
  - Work Experience
  - Skills
  - Contact Information
- Simple and intuitive interface

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Train the model:
```bash
rasa train
```

3. Start the Rasa server (in one terminal):
```bash
rasa run --enable-api --cors "*"
```

4. Start the action server (in another terminal):
```bash
rasa run actions
```

5. Open the chat interface:
   - Open `rasa_chat.html` in your web browser
   - The interface will connect to the Rasa server running on http://localhost:5005

## Usage

1. When you open the chat interface, you'll see a menu with numbered options:
   - 1. About Me (Professional Summary)
   - 2. Education
   - 3. Work Experience
   - 4. Skills
   - 5. Contact Information

2. Type a number (1-5) to get information about that section
3. Type 'menu' at any time to see the options again

## Troubleshooting

1. **Connection Issues**
   - Ensure both Rasa server and action server are running
   - Check that the Rasa server is running on http://localhost:5005
   - Check that the action server is running on http://localhost:5055

2. **Model Issues**
   - Retrain the model if you make changes to the training data
   - Check the model file exists in the models/ directory

3. **Interface Issues**
   - Use the `rasa_chat.html` file (not index.html)
   - Clear your browser cache if you see outdated behavior

## Version Information

### Current Version: 1.2.0

This version includes:
- Streamlined configuration by removing unnecessary utterances and stories
- Focused on resume-related functionality
- Improved code organization and maintainability

### Important Setup Instructions
Before running any commands, you must:

1. **Train the model**:
   ```bash
   rasa train
   ```
   This creates a new model with all the latest changes.

2. **Start the Rasa server** (in one terminal):
   ```bash
   rasa run --enable-api --cors "*"
   ```
   This starts the main server on http://localhost:5005.

3. **Start the action server** (in another terminal):
   ```bash
   rasa run actions
   ```
   This starts the action server on http://localhost:5055.

4. **Open the chat interface**:
   - Open `rasa_chat.html` in your web browser
   - The interface will connect to the Rasa server

## License

This project is licensed under the MIT License - see the LICENSE file for details. 