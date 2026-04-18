import os
import sys

# Add the parent directory to sys.path so we can import from backend/
# Vercel's current directory is the root during execution of functions in api/
sys.path.append(os.path.join(os.path.dirname(__file__), "..", "backend"))

# Now import the FastAPI app from backend/main.py
try:
    from main import app
except ImportError as e:
    print(f"Error importing app: {e}")
    # Fallback/Debug if pathing is different on Vercel environment
    sys.path.append(os.path.join(os.getcwd(), "backend"))
    from main import app

# Vercel needs the app object to be available as 'app' or 'application'
# but it's already named 'app' in main.py
