import sqlite3

def init_db():
    conn = sqlite3.connect('learnify.db')
    cursor = conn.cursor()

    # Table 1: The User Profile (with auth)
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS Students (
            student_id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password_hash TEXT,
            study_track TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    # Table 2: The Raw Input (What the student types)
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS Submissions (
            submission_id INTEGER PRIMARY KEY AUTOINCREMENT,
            student_id INTEGER,
            raw_text TEXT NOT NULL,
            submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (student_id) REFERENCES Students(student_id)
        )
    ''')

    # Table 3: The AI Engine Output
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS NLP_Insights (
            insight_id INTEGER PRIMARY KEY AUTOINCREMENT,
            submission_id INTEGER,
            sentiment_label TEXT,
            confidence_score REAL,
            extracted_keywords TEXT,
            FOREIGN KEY (submission_id) REFERENCES Submissions(submission_id)
        )
    ''')

    # Table 4: User Progress on coding problems
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS UserProgress (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            problem_id TEXT NOT NULL,
            language TEXT DEFAULT 'python',
            status TEXT DEFAULT 'attempted',
            solved_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES Students(student_id)
        )
    ''')

    # Table 5: Daily activity for streaks/heatmap
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS DailyActivity (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            activity_date DATE NOT NULL,
            problems_solved INTEGER DEFAULT 0,
            FOREIGN KEY (user_id) REFERENCES Students(student_id),
            UNIQUE(user_id, activity_date)
        )
    ''')

    # Migrate: add columns if missing (for existing DBs)
    try:
        cursor.execute("ALTER TABLE Students ADD COLUMN password_hash TEXT")
    except:
        pass
    try:
        cursor.execute("ALTER TABLE Students ADD COLUMN experience_level TEXT")
    except:
        pass

    conn.commit()
    conn.close()

if __name__ == '__main__':
    init_db()
    print("Database initialized successfully.")
