import json
from typing import Any, Text, Dict, List
from rasa_sdk import Action
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk import Tracker  # Import Tracker here

class ActionAnswerResume(Action):
    def name(self) -> Text:
        return "action_answer_resume"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        
        # Load resume data from a JSON file
        with open("resume_data.json", "r") as file:
            resume = json.load(file)
        
        # Get the intent of the latest message
        intent = tracker.get_intent_of_latest_message()

        # Respond based on the detected intent
        if intent == "ask_full_name":
            # Example: Extract and respond with your full name from the resume
            full_name = resume.get("name", "John Doe")  # Use dynamic data if available in the resume
            dispatcher.utter_message(text=f"My full name is \n{full_name}")

        elif intent == "ask_experience":
            # List work experience
            experience = "\n".join([
                f"{job['role']} at {job['company']} ({job['duration']})"
                for job in resume["experience"]
            ])
            dispatcher.utter_message(text=f"My work experience includes:\n{experience}")

        elif intent == "ask_skills":
            # List skills
            skills = ", ".join(resume["skills"])
            dispatcher.utter_message(text=f"My skills are: {skills}")

        elif intent == "ask_education":
            # Respond with education details
            education = resume["education"][0]
            dispatcher.utter_message(text=f"I graduated from {education['institution']} "
                                           f"with a degree in {education['degree']} in {education['year']}.")

        elif intent == "ask_email":
            email = resume.get("email", "I don't have that information.")
            dispatcher.utter_message(text=f"My email address is: {email}")

        elif intent == "ask_phone":
            phone = resume.get("phone", "I don't have that information.")
            dispatcher.utter_message(text=f"My phone number is: {phone}")

        elif intent == "ask_summary":
            summary = resume.get("summary", "I don't have a summary in my resume.")
            dispatcher.utter_message(text=f"My professional summary is: {summary}")
        
        else:
            # Fallback response for unsupported questions
            dispatcher.utter_message(text="I don't have information about that.")
        
        return []

class ActionHandleUnclearQuery(Action):
    def name(self) -> Text:
        return "action_handle_unclear_query"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        
        # Load resume data to get available information
        try:
            with open("resume_data.json", "r") as file:
                resume = json.load(file)
                
            # Create a list of available information
            available_info = []
            
            # Check if each section has data
            if resume.get("experience"):
                available_info.append("work experience")
                
            if resume.get("skills"):
                available_info.append("skills")
                
            if resume.get("education"):
                available_info.append("education")
                
            if resume.get("email") or resume.get("phone"):
                available_info.append("contact information")
                
            if resume.get("summary"):
                available_info.append("professional summary")
                
            # Format the response
            if available_info:
                info_list = ", ".join(available_info)
                response = f"I'm not sure I understood that. You can ask me about my {info_list}. What would you like to know?"
            else:
                response = "I'm not sure I understood that. What would you like to know about me?"
                
        except Exception as e:
            # Fallback response if there's an error loading the resume data
            response = "I'm not sure I understood that. You can ask me about my work experience, skills, education, contact information, or a summary of my resume. What would you like to know?"
            
        # Send the response
        dispatcher.utter_message(text=response)
        return []



# This files contains your custom actions which can be used to run
# custom Python code.
#
# See this guide on how to implement these action:
# https://rasa.com/docs/rasa/custom-actions


# This is a simple example for a custom action which utters "Hello World!"

# from typing import Any, Text, Dict, List
#
# from rasa_sdk import Action, Tracker
# from rasa_sdk.executor import CollectingDispatcher
#
#
# class ActionHelloWorld(Action):
#
#     def name(self) -> Text:
#         return "action_hello_world"
#
#     def run(self, dispatcher: CollectingDispatcher,
#             tracker: Tracker,
#             domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
#
#         dispatcher.utter_message(text="Hello World!")
#
#         return []
