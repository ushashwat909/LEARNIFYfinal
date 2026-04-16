import re

KNOWLEDGE_TAGS = {
    "Loops": ["loop", "for", "while", "iteration", "recurring", "infinite"],
    "Data Structures": ["array", "tree", "graph", "stack", "queue", "linked list", "data structures"],
    "Variables": ["variable", "let", "const", "var", "assign"],
    "Functions": ["function", "method", "def", "return", "argument"]
}

WELLNESS_TAGS = {
    "Frustrated": ["burnout", "tired", "anxious", "overwhelmed", "failing", "hard"],
    "Confident": ["good", "excited", "understand", "clear", "easy", "mastered"]
}

def classify_text(text):
    text_lower = text.lower()
    
    # Keyword extraction logic
    detected_gaps = []
    for topic, keywords in KNOWLEDGE_TAGS.items():
        if any(keyword in text_lower for keyword in keywords):
            detected_gaps.append(topic)
            
    # Sentiment extraction logic
    detected_stress = []
    for sentiment, keywords in WELLNESS_TAGS.items():
        if any(keyword in text_lower for keyword in keywords):
            detected_stress.append(sentiment)

    sentiment_label = "Neutral"
    if detected_stress:
         sentiment_label = detected_stress[0] # Take primary emotion

    extracted_keywords = ", ".join(detected_gaps) if detected_gaps else "None"
         
    # Mocking confidence score
    confidence_score = 0.95 if detected_gaps or detected_stress else 0.55
    
    return sentiment_label, confidence_score, extracted_keywords

def generate_study_outline(keywords):
    """
    Simulates a generative AI creating a personalized Markdown syllabus 
    based on the specific concepts the student is struggling with.
    """
    topics = [k.strip() for k in keywords.split(',')]
    
    outline = "### 📚 Your Personalized Study Outline\n\n"
    outline += "*Based on your reflection, we've identified the following focus areas. Let's tackle them step-by-step:*\n\n"
    
    for i, topic in enumerate(topics, 1):
        outline += f"#### Module {i}: Mastering {topic}\n"
        if topic == "Data Structures":
            outline += "- **Day 1:** Visualizing arrays vs. linked lists.\n"
            outline += "- **Day 2:** Understanding Trees and Graphs.\n"
            outline += "- **Interactive Resource:** [Data Structures Visualizer](#)\n\n"
        elif topic == "Loops":
            outline += "- **Day 1:** Anatomy of `for` vs `while`.\n"
            outline += "- **Day 2:** Preventing infinite loops & debugging.\n"
            outline += "- **Interactive Resource:** [Loop Simulator Exercises](#)\n\n"
        elif topic == "Variables":
            outline += "- **Day 1:** Scope, Reassignment, and Memory.\n"
            outline += "- **Interactive Resource:** [Variable Scope Playground](#)\n\n"
        else:
            outline += f"- **Day 1:** Core concepts of {topic}.\n"
            outline += f"- **Day 2:** Applied practice exercises for {topic}.\n\n"
            
    outline += "---\n\n"
    outline += "💡 **Pro-Tip:** Take a 5-minute break after each 25-minute study session to prevent burnout!"
    return outline
