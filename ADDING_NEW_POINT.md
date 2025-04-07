# Adding a New Point to Resume Chatbot

This guide explains how to add a new section to your resume chatbot. We'll use "hobbies" as an example, but you can follow the same pattern for any new section you want to add.

## Example: Adding Hobbies Section

### 1. Update Resume Data (data/resume_data.json)

Add your new section to the resume data:
```json
{
  // ... existing resume data ...
  "hobbies": [
    "Reading",
    "Hiking",
    "Photography"
  ]
}
```

### 2. Update Domain File (data/domain.yml)

Add the following to your domain.yml:

#### Intents Section
```yaml
intents:
  - ask_hobbies  # Add your new intent
```

#### Responses Section
```yaml
responses:
  utter_hobbies:  # Add your new response
    - text: "Here are my hobbies: {hobbies}"
```

#### Actions Section
```yaml
actions:
  - action_handle_menu_choice  # Make sure this is included
```

### 3. Update NLU Data (data/nlu.yml)

Add training examples for your new intent:
```yaml
nlu:
  - intent: ask_hobbies  # Your new intent
    examples: |
      - what are your hobbies
      - tell me about your hobbies
      - what do you do for fun
      - what are your interests
      - what do you enjoy doing
```

### 4. Update Rules (data/rules.yml)

Add a rule to handle your new intent:
```yaml
rules:
  - rule: Handle hobbies request  # Your new rule
    steps:
      - intent: ask_hobbies  # Your new intent
      - action: action_handle_menu_choice
```

### 5. Update Actions (actions/actions.py)

Add a new case in the menu choice handler:
```python
elif choice == "6":  # Add this to your existing menu choices
    hobbies = resume_data.get('hobbies', [])
    if hobbies:
        hobbies_text = ", ".join(hobbies)
        dispatcher.utter_message(text=f"My hobbies include: {hobbies_text}")
    else:
        dispatcher.utter_message(text="Hobbies information not available.")
```

### 6. Update Chat Interface (rasa_chat.html)

Update the menu options in your chat interface:
```html
<div class="menu-options">
    <!-- ... existing options ... -->
    <div class="menu-option">6. Hobbies</div>
</div>
```

## General Steps for Adding Any New Point

1. **Data Structure**:
   - Add your new section to resume_data.json
   - Use appropriate data types (string, array, object)

2. **Intent Definition**:
   - Create a new intent in domain.yml
   - Add training examples in nlu.yml
   - Create a rule in rules.yml

3. **Action Handler**:
   - Add a new case in the menu choice handler
   - Handle the data retrieval and formatting
   - Provide appropriate fallback messages

4. **User Interface**:
   - Update the menu options
   - Ensure consistent numbering
   - Add appropriate styling

## Testing New Features

After adding any new section:
1. Retrain your model: `rasa train`
2. Restart both servers:
   - Rasa server: `rasa run --enable-api --cors "*"`
   - Action server: `rasa run actions`
3. Test the new feature:
   - Open rasa_chat.html
   - Try the new menu option
   - Test natural language queries

## Best Practices

1. **Data Organization**:
   - Keep related data together
   - Use consistent naming conventions
   - Include fallback values

2. **User Experience**:
   - Make menu options clear and concise
   - Provide helpful error messages
   - Maintain consistent formatting

3. **Code Structure**:
   - Follow existing patterns
   - Add comments for clarity
   - Keep the code DRY (Don't Repeat Yourself)

4. **Testing**:
   - Test with various inputs
   - Verify error handling
   - Check formatting and display 