import pandas as pd
from pyBKT.models import Model
import os
import datetime

class StudentMasteryModel:
    def __init__(self, history_path='backend/student_history.csv'):
        self.history_path = history_path
        self.model = Model(seed = 42, num_fits = 1)
        
        # Initialize history file if it doesn't exist
        if not os.path.exists(self.history_path):
            df = pd.DataFrame(columns=['user_id', 'skill_name', 'correct', 'timestamp'])
            # Mock initial data to give the model some "priors"
            # user_id 0 is our 'template' user
            today = datetime.datetime.now().strftime("%Y-%m-%d")
            initial_data = [
                {'user_id': 0, 'skill_name': 'array_basics', 'correct': 1, 'timestamp': today},
                {'user_id': 0, 'skill_name': 'array_basics', 'correct': 1, 'timestamp': today},
                {'user_id': 0, 'skill_name': 'two_pointers', 'correct': 0, 'timestamp': today},
                {'user_id': 0, 'skill_name': 'two_pointers', 'correct': 1, 'timestamp': today}
            ]
            df = pd.concat([df, pd.DataFrame(initial_data)], ignore_index=True)
            df.to_csv(self.history_path, index=False)
            
    def add_attempt(self, user_id, skill_id, correct):
        df = pd.read_csv(self.history_path)
        timestamp = datetime.datetime.now().strftime("%Y-%m-%d")
        new_row = {
            'user_id': user_id, 
            'skill_name': skill_id, 
            'correct': 1 if correct else 0,
            'timestamp': timestamp
        }
        df = pd.concat([df, pd.DataFrame([new_row])], ignore_index=True)
        df.to_csv(self.history_path, index=False)
        return df

    def get_mastery_probability(self, user_id, skill_id):
        df = pd.read_csv(self.history_path)
        
        # We DO NOT call self.model.fit here because it's too slow to run on every API request.
        # pyBKT defaults parameters if not fitted, which is fine for our dynamic probability demo.
        try:
            preds = self.model.predict(data=df)
            user_skill_preds = preds[(preds['user_id'] == user_id) & (preds['skill_name'] == skill_id)]
            
            if not user_skill_preds.empty:
                return user_skill_preds.iloc[-1]['state_predictions']
        except Exception as e:
            # Fallback if prediction fails or misses keys
            pass
            
        # Fallback heuristic if no history or prediction fails
        user_history = df[(df['user_id'] == user_id) & (df['skill_name'] == skill_id)]
        if user_history.empty:
            return 0.1
        
        # Simple heuristic fallback
        successes = user_history['correct'].sum()
        total = len(user_history)
        return min(0.1 + (successes / max(total, 1)) * 0.8, 0.99)

    def get_user_stats(self, user_id):
        df = pd.read_csv(self.history_path)
        user_df = df[df['user_id'] == user_id]
        
        if user_df.empty:
            return {
                "total_solved": 0,
                "active_days": 0,
                "current_streak": 0,
                "heatmap_data": []
            }
            
        # Total Solved (Unique skills with at least one correct attempt)
        total_solved = user_df[user_df['correct'] == 1]['skill_name'].nunique()
        
        # Heatmap Data
        heatmap = user_df.groupby('timestamp').size().reset_index()
        heatmap.columns = ['date', 'count']
        heatmap_data = heatmap.to_dict('records')
        
        # Streak Calculation
        active_dates = sorted(user_df['timestamp'].unique(), reverse=True)
        current_streak = 0
        if active_dates:
            today = datetime.datetime.now().strftime("%Y-%m-%d")
            yesterday = (datetime.datetime.now() - datetime.timedelta(days=1)).strftime("%Y-%m-%d")
            
            # Start counting from today or yesterday
            if active_dates[0] in [today, yesterday]:
                current_streak = 1
                for i in range(len(active_dates)-1):
                    d1 = datetime.datetime.strptime(active_dates[i], "%Y-%m-%d")
                    d2 = datetime.datetime.strptime(active_dates[i+1], "%Y-%m-%d")
                    if (d1 - d2).days == 1:
                        current_streak += 1
                    else:
                        break
                        
        return {
            "total_solved": int(total_solved),
            "active_days": len(active_dates),
            "current_streak": current_streak,
            "heatmap_data": heatmap_data
        }

if __name__ == "__main__":
    tracker = StudentMasteryModel()
    
    user_id = 101
    skill = 'array_basics'
    
    print(f"--- BKT Mastery Test for {skill} ---")
    
    # Initial Attempt (Fail)
    tracker.add_attempt(user_id, skill, False)
    prob = tracker.get_mastery_probability(user_id, skill)
    print(f"Prob after 1 Failure: {prob:.2%}")
    
    # Second Attempt (Success)
    tracker.add_attempt(user_id, skill, True)
    prob = tracker.get_mastery_probability(user_id, skill)
    print(f"Prob after 1 Failure + 1 Success: {prob:.2%}")

    # Third Attempt (Success)
    tracker.add_attempt(user_id, skill, True)
    prob = tracker.get_mastery_probability(user_id, skill)
    print(f"Prob after 1 Failure + 2 Successes: {prob:.2%}")
