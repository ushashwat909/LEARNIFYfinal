import json
import os

class AdaptiveEngine:
    def __init__(self, graph_path):
        with open(graph_path, 'r', encoding='utf-8') as f:
            self.graph = json.load(f)
        self.student_mastery = {node['id']: 0.0 for node in self.graph}
        
    def update_mastery(self, topic_id, passed):
        """
        Simulates Bayesian update. 
        In a full version, this would use pyBKT.
        """
        if passed:
            self.student_mastery[topic_id] = min(1.0, self.student_mastery[topic_id] + 0.3)
        else:
            self.student_mastery[topic_id] = max(0.0, self.student_mastery[topic_id] - 0.2)
            
    def get_recommendation(self, last_topic_id, last_passed):
        # 1. Update based on last attempt
        self.update_mastery(last_topic_id, last_passed)
        
        # 2. Check for "Review" Trigger
        # If student fails, check if we should drop back to prerequisites
        if not last_passed:
            current_node = next(n for n in self.graph if n['id'] == last_topic_id)
            if current_node['prerequisites']:
                # Suggest the first pre-req for review
                review_topic = current_node['prerequisites'][0]
                return f"Review Required: You're struggling with {current_node['title']}. We suggest revisiting {review_topic}."

        # 3. Identify the "Frontier" (Wait list of nodes where pre-reqs are met)
        frontier = []
        for node in self.graph:
            # Skip if already mastered
            if self.student_mastery[node['id']] >= node['mastery_threshold']:
                continue
                
            # Check if all prerequisites are mastered
            pre_reqs_met = all(
                self.student_mastery[pid] >= next(n for n in self.graph if n['id'] == pid)['mastery_threshold']
                for pid in node['prerequisites']
            )
            
            if pre_reqs_met:
                frontier.append(node)
        
        if not frontier:
            return "Course Complete: You have mastered all topics in the graph!"
            
        # Return the easiest topic in the frontier
        nxt = min(frontier, key=lambda x: x['difficulty'])
        return f"Next Lesson: Based on your performance, you are ready for {nxt['title']}."

if __name__ == "__main__":
    # Test simulation
    engine = AdaptiveEngine('backend/dsa_graph.json')
    
    print("--- Adaptive Path Logic Test ---")
    print("Scenario: You just took a test on 'Array Basics' and PASSED.")
    print(engine.get_recommendation('array_basics', True))
    
    print("\nScenario: You tried 'Two Pointers' but FAILED.")
    # Set mastery of array_basics to high so we can reach two_pointers
    engine.student_mastery['array_basics'] = 0.9
    print(engine.get_recommendation('two_pointers', False))
