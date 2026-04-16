from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sqlite3
from typing import Optional

# Import our custom logic
from nlp_engine import classify_text, generate_study_outline
from db_schema import init_db
from engine import LearnifyCore

# Initialize Core
core = LearnifyCore()

# 1. Initialize the FastAPI App
app = FastAPI(
    title="Learnify API",
    description="Backend engine for processing student sentiment and knowledge gaps.",
    version="1.0.0"
)

# Allow CORS for React Frontend (Port 5173)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Database on startup
@app.on_event("startup")
def startup_event():
    init_db()

# 2. Define the Data Models
class StudentSubmission(BaseModel):
    student_id: int = 1 # Default to Alex Smith
    raw_text: str

class ChatMessage(BaseModel):
    message: str

def get_db_connection():
    conn = sqlite3.connect('learnify.db')
    conn.row_factory = sqlite3.Row
    return conn

# 3. The API Endpoint for Analysis
@app.post("/api/analyze")
async def process_submission(submission: StudentSubmission):
    # Step A: Run the NLP Analysis
    sentiment, confidence, keywords = classify_text(submission.raw_text)
    outline = generate_study_outline(keywords) if keywords != "None" else None
    
    # Step B: Connect to Database and Store Data
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Insert raw text
        cursor.execute("INSERT INTO Submissions (student_id, raw_text) VALUES (?, ?)", 
                       (submission.student_id, submission.raw_text))
        submission_id = cursor.lastrowid
        
        # Insert AI Insights
        cursor.execute("""
            INSERT INTO NLP_Insights (submission_id, sentiment_label, confidence_score, extracted_keywords) 
            VALUES (?, ?, ?, ?)
        """, (submission_id, sentiment, confidence, keywords))
        
        conn.commit()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        conn.close()

    # Step C: Return the structured data to the frontend
    return {
        "status": "success",
        "message": "Submission processed and logged safely.",
        "ai_insights": {
            "sentiment": sentiment,
            "confidence": confidence,
            "keywords": keywords
        },
        "generated_outline": outline
    }

# 4. Chatbot Endpoint (Learnify Buddy)
@app.post("/api/chat")
async def handle_chat(chat: ChatMessage):
    text = chat.message.lower()
    
    # Mock NLP Rule Engine for Learnify Buddy
    if "loop" in text:
        reply = "Loops are a way to repeat code! A `for` loop is great when you know exactly how many times to repeat something, like counting to 10. A `while` loop runs until a condition becomes false. Do you have a specific code example you're struggling with?"
    elif "data structure" in text or "tree" in text or "array" in text:
        reply = "Data structures help organize information. Think of an Array like a row of mailboxes, while a Tree is like a family tree splitting into branches. Which one feels more confusing right now?"
    elif "function" in text:
        reply = "A function is just a reusable recipe. You give it inputs (arguments), it performs steps, and then hands you back a result! Want me to write a quick example for you?"
    elif "hello" in text or "hi" in text:
        reply = "Hello! I am Learnify Buddy. Whether it's math, coding, or just managing study stress, I've got your back. What do you want to learn today?"
    else:
        reply = "That's a great question. Let's break it down step-by-step. What part of that concept is causing the most friction for you so far?"

    return {"reply": reply}

# 5. Optional Endpoint for Dashboard fetching
@app.get("/api/dashboard")
async def get_dashboard_data():
    conn = get_db_connection()
    try:
         df = conn.execute("""
            SELECT s.username, a.sentiment_label, a.extracted_keywords, a.confidence_score, sub.raw_text
            FROM NLP_Insights a
            JOIN Submissions sub ON a.submission_id = sub.submission_id
            JOIN Students s ON sub.student_id = s.student_id
            ORDER BY a.insight_id DESC LIMIT 10
         """).fetchall()
         
         results = [dict(row) for row in df]
         return {"data": results}
    except Exception as e:
         raise HTTPException(status_code=500, detail=str(e))
    finally:
         conn.close()

class AdaptiveSubmission(BaseModel):
    user_id: int
    topic_id: str
    passed: bool

class CodeSubmission(BaseModel):
    user_id: int
    problem_id: str
    code: str
    language: str = "python"

@app.get("/api/adaptive/recommend/{user_id}")
async def get_adaptive_recommendation(user_id: int):
    return core.get_next_recommendation(user_id)

@app.post("/api/adaptive/submit")
async def submit_adaptive_result(submission: AdaptiveSubmission):
    return core.process_result(submission.user_id, submission.topic_id, submission.passed)

@app.get("/api/adaptive/resource/{topic_id}")
async def get_resource_for_topic(topic_id: str):
    """Return the YouTube resource for a specific topic — used when user clicks a node."""
    resource = core.resources.get(topic_id)
    if not resource:
        raise HTTPException(status_code=404, detail=f"No resource found for topic: {topic_id}")
    return resource

# --- Practice Hub Endpoints ---

@app.get("/api/problems")
async def list_problems(category: Optional[str] = None, difficulty: Optional[str] = None):
    return {"problems": core.practice.list_problems(category, difficulty)}

@app.get("/api/problems/{problem_id}")
async def get_problem(problem_id: str):
    problem = core.practice.get_problem(problem_id)
    if not problem:
        raise HTTPException(status_code=404, detail="Problem not found")
    return problem

@app.get("/api/stats/{user_id}")
async def get_user_stats(user_id: int):
    return core.mastery.get_user_stats(user_id)

@app.post("/api/problems/{problem_id}/run")
async def run_problem_code(problem_id: str, submission: CodeSubmission):
    try:
        result = core.practice.run_code(problem_id, submission.code, submission.language)
        
        # If successful, auto-log results to the student model for Bayesian tracking
        if result.get("status") == "success":
            results_list = result.get("results", [])
            if results_list:
                all_passed = all(r.get("status") == "pass" for r in results_list)
                if all_passed:
                    problem = core.practice.get_problem(problem_id)
                    if problem:
                        topic_id = problem.get('category', '').replace('-', '_')
                        if topic_id in core.resources:
                            core.process_result(submission.user_id, topic_id, True)

        return result
    except Exception as e:
        print(f"Runner Error: {e}")
        return {"status": "error", "stderr": f"System execution fault: {str(e)}"}
