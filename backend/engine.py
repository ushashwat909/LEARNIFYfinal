import json
import os
from adaptive_logic import AdaptiveEngine
from student_model import StudentMasteryModel
from practice_engine import PracticeEngine

class LearnifyCore:
    def __init__(self):
        self.base_dir = os.path.dirname(os.path.abspath(__file__))
        self.root_dir = os.path.dirname(self.base_dir)
        self.graph_path = os.path.join(self.base_dir, 'dsa_graph.json')
        self.resources_path = os.path.join(self.base_dir, 'resources.json')
        
        # Initialize engines
        self.adaptive = AdaptiveEngine(self.graph_path)
        self.mastery = StudentMasteryModel(os.path.join(self.base_dir, 'student_history.csv'))
        
        # Index problems from the dsa-practice folder
        problems_path = os.path.join(self.root_dir, 'dsa-practice', 'problems')
        self.practice = PracticeEngine(problems_path)
        
        with open(self.resources_path, 'r') as f:
            self.resources = json.load(f)

    def get_next_recommendation(self, user_id):
        # In a real app, we'd iterate the graph and find the 'Frontier' using BKT mastery
        # For the demo, let's find the first topic where mastery < threshold
        recommendation = None
        
        for node in self.adaptive.graph:
            prob = self.mastery.get_mastery_probability(user_id, node['id'])
            
            # If not mastered
            if prob < node['mastery_threshold']:
                # Verify prerequisites
                pre_reqs_met = True
                for pid in node['prerequisites']:
                    pre_prob = self.mastery.get_mastery_probability(user_id, pid)
                    if pre_prob < 0.7: # Threshold for pre-req
                        pre_reqs_met = False
                        # If pre-req not met, recommend THAT instead
                        recommendation = pid
                        break
                
                if pre_reqs_met and not recommendation:
                    recommendation = node['id']
                
                if recommendation:
                    break
                    
        topic_id = recommendation or "array_basics"
        return {
            "topic_id": topic_id,
            "resource": self.resources.get(topic_id),
            "mastery_prob": self.mastery.get_mastery_probability(user_id, topic_id)
        }

    def process_result(self, user_id, topic_id, passed):
        try:
            if not topic_id:
                return self.get_next_recommendation(user_id)
            self.mastery.add_attempt(user_id, topic_id, passed)
            return self.get_next_recommendation(user_id)
        except Exception as e:
            print(f"Error processing results: {e}")
            return self.get_next_recommendation(user_id)
