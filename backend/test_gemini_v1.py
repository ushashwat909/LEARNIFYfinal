import os
import google.generativeai as genai
from dotenv import load_dotenv

# Change to the directory of the script
os.chdir(os.path.dirname(os.path.abspath(__file__)))

load_dotenv()

key = os.environ.get("GEMINI_API_KEY", "")
print(f"Key found: {key[:5]}...{key[-5:]}" if key else "No key found")

try:
    genai.configure(api_key=key)
    print("Gemini (v1) configured successfully")
    
    # List models to see what's available
    print("Available models:")
    for m in genai.list_models():
        if 'generateContent' in m.supported_generation_methods:
            print(f"- {m.name}")
            
    # Test a simple prompt
    model = genai.GenerativeModel('gemini-1.5-flash')
    response = model.generate_content("Hello, say 'The AI (v1) is working' if you see this.")
    print(f"Gemini response: {response.text}")
except Exception as e:
    print(f"Error: {e}")
