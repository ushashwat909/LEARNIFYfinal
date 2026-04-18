import json
import os
from student_model import StudentMasteryModel

class GraphEngine:
    def __init__(self, graph_path=None):
        if graph_path is None:
            base_dir = os.path.dirname(os.path.abspath(__file__))
            graph_path = os.path.join(base_dir, 'dsa_graph.json')
        
        with open(graph_path, 'r', encoding='utf-8') as f:
            self.raw_nodes = json.load(f)
        self.mastery_model = StudentMasteryModel()

    def get_react_flow_data(self, user_id):
        nodes = []
        edges = []
        
        # Track which nodes are mastered for status calculation
        mastery_levels = {}
        for node in self.raw_nodes:
            prob = self.mastery_model.get_mastery_probability(user_id, node['id'])
            mastery_levels[node['id']] = prob
            
        # Layout calculation (Simple Layered)
        # 1. Group by prerequisites count or depth
        levels = {}
        def get_depth(node_id, visited=None):
            if visited is None: visited = set()
            if node_id in visited: return 0
            visited.add(node_id)
            node = next((n for n in self.raw_nodes if n['id'] == node_id), None)
            if not node or not node['prerequisites']: return 0
            return 1 + max(get_depth(p, visited) for p in node['prerequisites'])

        # Pre-calculate depths for layout
        node_depths = {n['id']: get_depth(n['id']) for n in self.raw_nodes}
        max_depth = max(node_depths.values()) if node_depths else 0
        
        # Group nodes by depth for X positioning
        depth_groups = {}
        for nid, d in node_depths.items():
            if d not in depth_groups: depth_groups[d] = []
            depth_groups[d].append(nid)

        # Create Nodes
        for d, nids in depth_groups.items():
            for i, nid in enumerate(nids):
                raw = next(n for n in self.raw_nodes if n['id'] == nid)
                prob = mastery_levels[nid]
                
                # Determine Status
                prereqs_met = all(mastery_levels.get(p, 0) >= 0.7 for p in raw['prerequisites'])
                
                status = 'locked'
                if prob >= 0.8:
                    status = 'mastered'
                elif prob > 0.3 or (prereqs_met and len(raw['prerequisites']) > 0):
                    status = 'in_progress'
                elif prereqs_met:
                    status = 'unlocked'
                
                # Special case for first node
                if not raw['prerequisites'] and status == 'locked':
                    status = 'unlocked'

                nodes.append({
                    'id': nid,
                    'type': 'knowledgeNode',
                    'data': {
                        'label': raw['title'],
                        'mastery': prob,
                        'status': status,
                        'category': raw['category'],
                        'difficulty': raw['difficulty']
                    },
                    # X = depth * 300, Y = index * 100 (centered)
                    'position': { 'x': d * 300, 'y': i * 150 - (len(nids) * 75) }
                })

        # Create Edges
        for node in self.raw_nodes:
            for prereq in node['prerequisites']:
                edges.append({
                    'id': f"e-{prereq}-{node['id']}",
                    'source': prereq,
                    'target': node['id'],
                    'animated': mastery_levels.get(prereq, 0) >= 0.7,
                    'style': { 'stroke': '#3fb950' if mastery_levels.get(prereq, 0) >= 0.7 else '#30363d' }
                })
                
        return { 'nodes': nodes, 'edges': edges }

if __name__ == "__main__":
    engine = GraphEngine()
    data = engine.get_react_flow_data(0)
    print(json.dumps(data, indent=2))
