# Rasa Resume Chatbot Documentation

## Table of Contents
1. [Overview](#overview)
2. [Requirements](#requirements)
3. [Project Structure](#project-structure)
4. [Installation](#installation)
5. [Configuration](#configuration)
6. [Code Explanation](#code-explanation)
7. [Testing](#testing)
8. [Troubleshooting](#troubleshooting)
9. [Deployment](#deployment)
10. [Version Information](#version-information)

## Overview

This project implements a resume chatbot using Rasa, an open-source framework for conversational AI. The chatbot can answer questions about a resume, including experience, skills, education, and contact information. The system consists of:

- A Rasa server handling the core chatbot logic
- An action server for custom actions
- A web interface for user interaction

## Requirements

### System Requirements
- Python 3.10 or higher
- Windows 10/11, macOS, or Linux
- At least 4GB RAM
- 2GB free disk space

### Python Dependencies
```
rasa==3.6.15
rasa-sdk==3.6.2
tensorflow==2.15.0
sqlalchemy<2.0
```

## Project Structure

```
rasa-bot/
├── actions/
│   ├── __init__.py
│   └── actions.py         # Custom actions implementation
├── data/
│   ├── nlu.yml           # Training data for intent recognition
│   └── stories.yml       # Conversation flows
├── models/               # Trained model files
├── tests/               # Test files
├── config.yml           # Pipeline and policy configuration
├── credentials.yml      # API credentials
├── domain.yml           # Bot domain configuration
├── endpoints.yml        # Service endpoints
└── rasa_chat.html       # Web interface
```

## Installation

1. Create a virtual environment:
```bash
python -m venv venv
```

2. Activate the virtual environment:
- Windows:
```bash
venv\Scripts\activate
```
- Linux/macOS:
```bash
source venv/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

## Configuration

### 1. Rasa Server Configuration (config.yml)
```yaml
language: en
pipeline:
  - name: WhitespaceTokenizer
  - name: RegexFeaturizer
  - name: LexicalSyntacticFeaturizer
  - name: CountVectorsFeaturizer
  - name: CountVectorsFeaturizer
    analyzer: char_wb
    min_ngram: 1
    max_ngram: 4
  - name: DIETClassifier
    epochs: 100
  - name: EntitySynonymMapper
  - name: ResponseSelector
    epochs: 100
policies:
  - name: MemoizationPolicy
  - name: RulePolicy
  - name: UnexpecTEDIntentPolicy
    max_history: 5
    epochs: 100
  - name: TEDPolicy
    max_history: 5
    epochs: 100
```

### 2. Action Server Configuration (endpoints.yml)
```yaml
action_endpoint:
  url: "http://localhost:5055/webhook"
```

### 3. Web Interface Configuration (rasa_chat.html)
The web interface is configured to connect to:
- Rasa server: http://localhost:5005
- Action server: http://localhost:5055

## Code Explanation

### 1. Custom Actions (actions/actions.py)
```python
from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher

class ActionAnswerResume(Action):
    def name(self) -> Text:
        return "action_answer_resume"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        
        # Get the intent and entities from the user message
        intent = tracker.latest_message.get('intent', {}).get('name')
        entities = tracker.latest_message.get('entities', [])
        
        # Process the intent and generate appropriate response
        response = self.generate_response(intent, entities)
        
        # Send the response back to the user
        dispatcher.utter_message(text=response)
        return []
```

### 2. Web Interface (rasa_chat.html)
The web interface consists of three main components:

1. **HTML Structure**:
   - Chat container with header, messages area, and input section
   - Status indicator for server connection
   - Responsive design with modern styling

2. **CSS Styling**:
   - Modern chat interface design
   - Responsive layout
   - Message bubbles with different colors for user and bot
   - Status indicators with color coding

3. **JavaScript Functionality**:
   - Server connection check
   - Message sending and receiving
   - Error handling
   - UI updates

## Testing

### 1. Starting the Servers

1. Start the Rasa server:
```bash
rasa run --enable-api --cors "*"
```

2. Start the action server (in a new terminal):
```bash
rasa run actions
```

### 2. Testing the Web Interface

1. Open `rasa_chat.html` in a web browser
2. Check the status indicator at the top
3. Test the following scenarios:
   - Sending a message
   - Receiving a response
   - Error handling
   - Connection status

### 3. Testing Custom Actions

1. Send a message that triggers a custom action
2. Verify the response in the chat interface
3. Check the action server logs for execution details

### 4. Testing Different Intents

Test the following intents:
- Greeting
- Asking about experience
- Asking about skills
- Asking about education
- Asking about contact information

## Troubleshooting

### Common Issues and Solutions

1. **Rasa Server Not Starting**
   - Check if port 5005 is available
   - Verify Python version compatibility
   - Check for missing dependencies

2. **Action Server Issues**
   - Ensure the action server is running on port 5055
   - Check for syntax errors in actions.py
   - Verify endpoint configuration

3. **Web Interface Problems**
   - Check browser console for errors
   - Verify CORS settings
   - Ensure both servers are running

4. **Model Loading Issues**
   - Verify model file exists in models/ directory
   - Check model compatibility with Rasa version
   - Retrain the model if necessary

## Deployment

### Local Deployment

1. Ensure all requirements are installed
2. Start both servers
3. Access the web interface through a web browser

### Production Deployment

1. Set up a production server
2. Configure SSL certificates
3. Update endpoints in credentials.yml
4. Set up proper security measures
5. Configure environment variables
6. Set up monitoring and logging

## Security Considerations

1. **API Security**
   - Use HTTPS in production
   - Implement authentication
   - Set up proper CORS policies

2. **Data Protection**
   - Encrypt sensitive information
   - Implement proper data handling
   - Follow data protection regulations

## Maintenance

1. **Regular Updates**
   - Keep Rasa and dependencies updated
   - Monitor for security patches
   - Update training data regularly

2. **Monitoring**
   - Check server logs
   - Monitor performance
   - Track user interactions

3. **Backup**
   - Regular backup of training data
   - Backup of model files
   - Configuration backup

## Support

For issues and support:
1. Check the troubleshooting guide
2. Review Rasa documentation
3. Check GitHub issues
4. Contact the development team

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

For more detailed version information, see [VERSION.md](VERSION.md).

## License

This project is licensed under the MIT License - see the LICENSE file for details. 