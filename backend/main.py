from fastapi import FastAPI, HTTPException, Depends, Header
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sqlite3
import jwt
import bcrypt
import datetime
from typing import Optional

# Import our custom logic
from nlp_engine import classify_text, generate_study_outline
from syllabus_contextualizer import contextualize_transcript
from gap_analyzer import analyze_semantic_gap
from chatbot_engine import generate_chat_response
from db_schema import init_db
from graph_engine import GraphEngine
from engine import LearnifyCore

# JWT Config
JWT_SECRET = "learnify-secret-key-2026"
JWT_ALGORITHM = "HS256"

# Instantiate core logic
core = LearnifyCore()
graph_engine = GraphEngine()

# 1. Initialize the FastAPI App
app = FastAPI(
    title="Learnify API",
    description="Backend engine for personalized learning with auth and progress tracking.",
    version="2.0.0"
)

# Allow CORS for React Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173", 
        "http://localhost:5174",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Database on startup
@app.on_event("startup")
def startup_event():
    init_db()

# --- Data Models ---
class StudentSubmission(BaseModel):
    student_id: int = 1
    raw_text: str

class ChatMessage(BaseModel):
    message: str
    user_id: int = 0

class AuthRegister(BaseModel):
    username: str
    password: str

class AuthLogin(BaseModel):
    username: str
    password: str

class OnboardingData(BaseModel):
    career: str
    experience: str

class AdaptiveSubmission(BaseModel):
    user_id: int
    topic_id: str
    passed: bool

class CodeSubmission(BaseModel):
    user_id: int
    problem_id: str
    code: str
    language: str = "python"

class GapAnalysisRequest(BaseModel):
    topic: str
    explanation: str

class TranscriptSubmission(BaseModel):
    transcript: str

def get_db_connection():
    conn = sqlite3.connect('learnify.db')
    conn.row_factory = sqlite3.Row
    return conn

def create_token(user_id: int, username: str):
    payload = {
        "user_id": user_id,
        "username": username,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(days=7)
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

def verify_token(authorization: Optional[str] = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Not authenticated")
    token = authorization.split(" ")[1]
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

# ========================
# AUTH ENDPOINTS
# ========================

@app.post("/api/auth/register")
async def register(data: AuthRegister):
    if len(data.username) < 3:
        raise HTTPException(status_code=400, detail="Username must be at least 3 characters")
    if len(data.password) < 4:
        raise HTTPException(status_code=400, detail="Password must be at least 4 characters")

    conn = get_db_connection()
    try:
        # Check if username exists
        existing = conn.execute("SELECT * FROM Students WHERE username = ?", (data.username,)).fetchone()
        if existing:
            raise HTTPException(status_code=409, detail="Username already taken")

        # Hash password
        hashed = bcrypt.hashpw(data.password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

        # Insert user
        cursor = conn.execute(
            "INSERT INTO Students (username, password_hash, study_track) VALUES (?, ?, ?)",
            (data.username, hashed, "General")
        )
        conn.commit()
        user_id = cursor.lastrowid

        token = create_token(user_id, data.username)
        return {"status": "success", "token": token, "user": {"id": user_id, "username": data.username}}
    finally:
        conn.close()

@app.post("/api/auth/login")
async def login(data: AuthLogin):
    conn = get_db_connection()
    try:
        user = conn.execute("SELECT * FROM Students WHERE username = ?", (data.username,)).fetchone()
        if not user:
            raise HTTPException(status_code=401, detail="Invalid username or password")

        if not user['password_hash']:
            raise HTTPException(status_code=401, detail="Account has no password set. Please register again.")

        if not bcrypt.checkpw(data.password.encode('utf-8'), user['password_hash'].encode('utf-8')):
            raise HTTPException(status_code=401, detail="Invalid username or password")

        token = create_token(user['student_id'], user['username'])
        return {"status": "success", "token": token, "user": {"id": user['student_id'], "username": user['username']}}
    finally:
        conn.close()

@app.get("/api/auth/me")
async def get_me(payload: dict = Depends(verify_token)):
    conn = get_db_connection()
    try:
        user = conn.execute("SELECT student_id, username, study_track, experience_level, created_at FROM Students WHERE student_id = ?", (payload['user_id'],)).fetchone()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        solved = conn.execute("SELECT COUNT(DISTINCT problem_id) as total FROM UserProgress WHERE user_id = ? AND status = 'passed'", (payload['user_id'],)).fetchone()

        return {
            "id": user['student_id'],
            "username": user['username'],
            "study_track": user['study_track'],
            "experience_level": user['experience_level'] if 'experience_level' in user.keys() else None,
            "onboarded": bool(user['study_track'] and user['study_track'] != 'General'),
            "created_at": user['created_at'],
            "problems_solved": solved['total'] if solved else 0
        }
    finally:
        conn.close()

@app.post("/api/auth/onboard")
async def save_onboarding(data: OnboardingData, payload: dict = Depends(verify_token)):
    conn = get_db_connection()
    try:
        conn.execute(
            "UPDATE Students SET study_track = ?, experience_level = ? WHERE student_id = ?",
            (data.career, data.experience, payload['user_id'])
        )
        conn.commit()
        return {"status": "success"}
    finally:
        conn.close()

# ========================
# EXISTING ENDPOINTS
# ========================

@app.post("/api/analyze")
async def process_submission(submission: StudentSubmission):
    sentiment, confidence, keywords = classify_text(submission.raw_text)
    outline = generate_study_outline(keywords) if keywords != "None" else None

    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("INSERT INTO Submissions (student_id, raw_text) VALUES (?, ?)",
                       (submission.student_id, submission.raw_text))
        submission_id = cursor.lastrowid
        cursor.execute("""
            INSERT INTO NLP_Insights (submission_id, sentiment_label, confidence_score, extracted_keywords)
            VALUES (?, ?, ?, ?)
        """, (submission_id, sentiment, confidence, keywords))
        conn.commit()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        conn.close()

    return {
        "status": "success",
        "ai_insights": {"sentiment": sentiment, "confidence": confidence, "keywords": keywords},
        "generated_outline": outline
    }

@app.post("/api/analyze-gap")
async def process_gap_analysis(data: GapAnalysisRequest):
    return analyze_semantic_gap(data.topic, data.explanation)

@app.post("/api/contextualize")
async def process_transcript(data: TranscriptSubmission):
    return contextualize_transcript(data.transcript)

@app.get("/api/knowledge-graph/{user_id}")
async def get_brain_gps(user_id: int):
    return graph_engine.get_react_flow_data(user_id)

@app.post("/api/chat")
async def handle_chat(chat: ChatMessage):
    # Load user profile for personalization if user_id provided
    user_profile = None
    if chat.user_id:
        conn = get_db_connection()
        try:
            user = conn.execute("SELECT username, study_track, experience_level FROM Students WHERE student_id = ?", (chat.user_id,)).fetchone()
            if user:
                user_profile = dict(user)
        except:
            pass
        finally:
            conn.close()

    reply = generate_chat_response(chat.message, user_id=chat.user_id, user_profile=user_profile)
    return {"reply": reply}

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
         return {"data": [dict(row) for row in df]}
    except Exception as e:
         raise HTTPException(status_code=500, detail=str(e))
    finally:
         conn.close()

# ========================
# ADAPTIVE LEARNING
# ========================

@app.get("/api/adaptive/recommend/{user_id}")
async def get_adaptive_recommendation(user_id: int):
    return core.get_next_recommendation(user_id)

@app.post("/api/adaptive/submit")
async def submit_adaptive_result(submission: AdaptiveSubmission):
    return core.process_result(submission.user_id, submission.topic_id, submission.passed)

@app.get("/api/adaptive/resource/{topic_id}")
async def get_resource_for_topic(topic_id: str):
    resource = core.resources.get(topic_id)
    if not resource:
        raise HTTPException(status_code=404, detail=f"No resource found for topic: {topic_id}")
    return resource

# ========================
# PRACTICE HUB + CODE EXECUTION
# ========================

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
    conn = get_db_connection()
    try:
        # Total solved
        solved = conn.execute(
            "SELECT COUNT(DISTINCT problem_id) as total FROM UserProgress WHERE user_id = ? AND status = 'passed'",
            (user_id,)
        ).fetchone()

        # Recent activity (last 365 days)
        activity = conn.execute(
            "SELECT activity_date, problems_solved FROM DailyActivity WHERE user_id = ? ORDER BY activity_date DESC LIMIT 365",
            (user_id,)
        ).fetchall()

        # Calculate streak
        streak = 0
        today = datetime.date.today()
        for i in range(365):
            day = today - datetime.timedelta(days=i)
            day_str = day.isoformat()
            found = any(row['activity_date'] == day_str for row in activity)
            if found:
                streak += 1
            elif i > 0:  # Skip today if no activity yet
                break

        return {
            "total_solved": solved['total'] if solved else 0,
            "current_streak": streak,
            "activity": [{"date": row['activity_date'], "count": row['problems_solved']} for row in activity]
        }
    finally:
        conn.close()

@app.post("/api/problems/{problem_id}/run")
async def run_problem_code(problem_id: str, submission: CodeSubmission):
    try:
        result = core.practice.run_code(problem_id, submission.code, submission.language)

        # If all tests pass, record progress
        if result.get("status") == "success":
            results_list = result.get("results", [])
            if results_list and all(r.get("status") == "pass" for r in results_list):
                # Save to UserProgress
                conn = get_db_connection()
                try:
                    conn.execute(
                        "INSERT INTO UserProgress (user_id, problem_id, language, status) VALUES (?, ?, ?, ?)",
                        (submission.user_id, problem_id, submission.language, "passed")
                    )
                    # Update daily activity
                    today = datetime.date.today().isoformat()
                    conn.execute("""
                        INSERT INTO DailyActivity (user_id, activity_date, problems_solved) VALUES (?, ?, 1)
                        ON CONFLICT(user_id, activity_date) DO UPDATE SET problems_solved = problems_solved + 1
                    """, (submission.user_id, today))
                    conn.commit()
                finally:
                    conn.close()

                # Also update BKT mastery
                problem = core.practice.get_problem(problem_id)
                if problem:
                    topic_id = problem.get('category', '').replace('-', '_')
                    if topic_id in core.resources:
                        core.process_result(submission.user_id, topic_id, True)

        return result
    except Exception as e:
        print(f"Runner Error: {e}")
        return {"status": "error", "stderr": f"System execution fault: {str(e)}"}

# ========================
# USER PROGRESS
# ========================

@app.get("/api/progress/{user_id}")
async def get_user_progress(user_id: int):
    conn = get_db_connection()
    try:
        rows = conn.execute(
            "SELECT problem_id, language, status, solved_at FROM UserProgress WHERE user_id = ? ORDER BY solved_at DESC",
            (user_id,)
        ).fetchall()
        return {"progress": [dict(row) for row in rows]}
    finally:
        conn.close()
