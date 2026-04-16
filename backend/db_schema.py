import sqlite3

def init_db():
    conn = sqlite3.connect('learnify.db')
    cursor = conn.cursor()

    # Table 1: The User Profile
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS Students (
            student_id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
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
    
    # Insert a dummy user if not exists
    cursor.execute("SELECT * FROM Students WHERE username='Alex Smith'")
    if not cursor.fetchone():
        cursor.execute("INSERT INTO Students (username, study_track) VALUES ('Alex Smith', 'Computer Science')")

    conn.commit()
    conn.close()

if __name__ == '__main__':
    init_db()
    print("Database initialized successfully.")
