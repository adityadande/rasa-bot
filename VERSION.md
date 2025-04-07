# Rasa Resume Chatbot - Version History

## Version 1.1.0 (2025-04-07)

### New Features
- Added handling for unclear queries
- Implemented dynamic response generation based on available resume data
- Added a custom action to provide a list of available information when the bot doesn't understand a query
- Enhanced error handling in the action server

### Changes
- Updated domain.yml with new intent and response for unclear queries
- Added examples of unclear queries in nlu.yml
- Created a new custom action (ActionHandleUnclearQuery) in actions.py
- Added new stories and rules for handling unclear queries
- Improved the resume data handling to dynamically check available information

### Important Instructions for New Versions

When updating to a new version of the chatbot, you **must** follow these steps in order:

1. **Train the model with the new data**:
   ```bash
   rasa train
   ```
   This command will create a new model file in the `models/` directory with the latest changes.

2. **Start the Rasa server** (in one terminal):
   ```bash
   rasa run --enable-api --cors "*"
   ```
   This command starts the main Rasa server on http://localhost:5005.

3. **Start the action server** (in another terminal):
   ```bash
   rasa run actions
   ```
   This command starts the action server on http://localhost:5055.

4. **Test the chatbot** by opening the `rasa_chat.html` file in a web browser.

### Troubleshooting

If you encounter issues after updating:

1. **Check if both servers are running**:
   - The Rasa server should show "Rasa server is up and running" in the console
   - The action server should show "Action endpoint is up and running on http://0.0.0.0:5055"

2. **Verify the model was trained successfully**:
   - Look for "Your Rasa model is trained and saved at 'models\[timestamp]-[name].tar.gz'" in the console output

3. **Check for errors in the console**:
   - Look for any error messages in both terminal windows

4. **Restart both servers** if you're still having issues:
   - Stop both servers (Ctrl+C)
   - Start them again in the correct order (Rasa server first, then action server)

## Version 1.0.0 (2025-04-01)

### Initial Release
- Basic resume chatbot functionality
- Ability to answer questions about work experience, skills, education, and contact information
- Web interface for interacting with the chatbot
- Custom actions for processing resume data 