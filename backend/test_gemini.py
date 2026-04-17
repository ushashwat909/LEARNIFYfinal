import os
from dotenv import load_dotenv
import sys

# Change to the directory of the script
os.chdir(os.path.dirname(os.path.abspath(__file__)))

load_dotenv()

key = os.environ.get("GEMINI_API_KEY", "")
print(f"Key found: {key[:5]}...{key[-5:]}" if key else "No key found")

try:
    from google import genai
    client = genai.Client(api_key=key)
    print("Gemini client initialized successfully")
    
    for model_name in ["gemini-1.5-flash", "gemini-2.0-flash"]:
        print(f"\nTesting model: {model_name}")
        try:
            response = client.models.generate_content(
                model=model_name,
                contents="Hello, say 'The AI is working' if you see this."
            )
            print(f"Success! Response: {response.text}")
        except Exception as e:
            print(f"Error for {model_name}: {e}")
            
except Exception as e:
    print(f"General Error: {e}")
