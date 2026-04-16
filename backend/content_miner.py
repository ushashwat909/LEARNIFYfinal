import json
from youtubesearchpython import VideosSearch
import time

def mine_content(graph_path, output_path):
    with open(graph_path, 'r') as f:
        graph = json.load(f)
        
    resources = {}
    
    # Trusted high-quality channels for DSA
    TRUSTED_CHANNELS = ["FreeCodeCamp", "GeeksforGeeks", "NeetCode", "Take U Forward", "Abdul Bari"]
    
    for node in graph:
        query = f"tutorial on {node['title']} dsa"
        print(f"Searching for: {query}...")
        
        search = VideosSearch(query, limit=5)
        results = search.result()['result']
        
        # Filter for quality (mocked logic: pick the first one from a trusted channel or just the first one)
        selected_video = None
        for res in results:
            if any(channel.lower() in res['channel']['name'].lower() for channel in TRUSTED_CHANNELS):
                selected_video = {
                    "id": res['id'],
                    "title": res['title'],
                    "url": res['link'],
                    "duration": res['duration'],
                    "viewCount": res['viewCount']['short'],
                    "channel": res['channel']['name']
                }
                break
        
        # Fallback if no trusted channel found in top 5
        if not selected_video and results:
             res = results[0]
             selected_video = {
                "id": res['id'],
                "title": res['title'],
                "url": res['link'],
                "duration": res['duration'],
                "viewCount": res['viewCount']['short'],
                "channel": res['channel']['name']
            }
            
        resources[node['id']] = selected_video
        time.sleep(1) # Avoid rate limiting
        
    with open(output_path, 'w') as f:
        json.dump(resources, f, indent=4)
    print(f"Mining complete. Resources saved to {output_path}")

if __name__ == "__main__":
    mine_content('backend/dsa_graph.json', 'backend/resources.json')
