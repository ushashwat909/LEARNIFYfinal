import os
import httpx
from dotenv import load_dotenv

# Change to the directory of the script
os.chdir(os.path.dirname(os.path.abspath(__file__)))

load_dotenv()

key = os.environ.get("GEMINI_API_KEY", "")

try:
    with httpx.Client() as client:
        response = client.get(
            f"https://generativelanguage.googleapis.com/v1beta/models?key={key}"
        )
        if response.status_code == 200:
            data = response.json()
            print("Accessible Models:")
            for m in data.get('models', []):
                print(f"- {m['name']}")
        else:
            print(f"Error {response.status_code}: {response.text}")
except Exception as e:
    print(f"Error: {e}")
