import asyncio
import os
from dotenv import load_dotenv

os.chdir(os.path.dirname(os.path.abspath(__file__)))
load_dotenv()

async def test_proactive():
    from chatbot_engine import generate_proactive_checkin
    
    print("Testing Proactive Check-in...")
    
    # Test case 1: Python student with 5 problems solved
    stats = {
        "username": "Devvrat",
        "study_track": "Python Backend",
        "problems_solved": 5,
        "current_streak": 3
    }
    
    msg = await generate_proactive_checkin(1, stats)
    print(f"Generated Proactive Message: {msg}")
    
    if "python" in msg.lower() or "backend" in msg.lower() or "study" in msg.lower():
        print("SUCCESS: Message is personalized! ✅")
    else:
        print("WARNING: Message might be generic.")

if __name__ == "__main__":
    asyncio.run(test_proactive())
