import os
import sys
from dotenv import load_dotenv

# Change to the directory of the script
os.chdir(os.path.dirname(os.path.abspath(__file__)))

load_dotenv()

# Test the actual engine import and call
try:
    from chatbot_engine import generate_chat_response
    print("Engine imported successfully")
    
    response = generate_chat_response("Explain recursion in one sentence.")
    print(f"Chatbot response: {response}")
    
    if "recursion" in response.lower() or "function" in response.lower():
        print("SUCCESS: AI response looks valid!")
    else:
        print("WARNING: Response might be a fallback.")
        
except Exception as e:
    print(f"Error: {e}")
