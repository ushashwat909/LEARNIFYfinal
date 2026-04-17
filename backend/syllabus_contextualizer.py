"""
Smart Syllabus Contextualizer Engine
Uses Gemini AI to parse transcripts, classify topics, and generate flashcards.
"""
import os
import json
from google import genai

GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", "")

CONTEXTUALIZER_PROMPT = """You are an expert Educational Content Architect.
You are given a raw lecture transcript. Your goal is to structure this content for a student.

## Tasks:
1. **Topic Classification**: Identify the core modules and subtopics mentioned in the transcript.
2. **Flashcard Generation**: Generate 8-10 high-quality flashcards in Question/Answer format. Focus on "bite-sized" interactive learning.
3. **Bulleted Summary**: Provide a 5-7 bullet point summary of the most important takeaways.
4. **Summary**: Provide a 2-sentence quick overview.

## Rules:
- Be technically accurate based ONLY on the provided transcript.
- Return ONLY a JSON object with the following structure:
{{
  "classified_topics": [
    {{ "module": "Module Name", "subtopics": ["Sub 1", "Sub 2"] }}
  ],
  "flashcards": [
    {{ "question": "Question text?", "answer": "Answer text.", "topic": "Module Name" }}
  ],
  "bullet_points": ["Point 1", "Point 2", "Point 3"],
  "summary": "Brief summary text."
}}

## Transcript Content:
{transcript}
"""

def _fallback_contextualizer(transcript: str):
    """
    Extractive rule-based parser when AI is rate-limited.
    Now better at extracting concepts from the actual user text.
    """
    import re
    text = transcript.replace('\n', ' ')
    text_lower = text.lower()
    
    # 1. Expanded Keyword Map for better coverage
    topics_map = {
        "Data Structures": ["array", "list", "tree", "graph", "stack", "queue", "heap", "hash"],
        "Algorithms": ["sort", "search", "dynamic", "recursion", "greedy", "complexity", "big o"],
        "AI & Machine Learning": ["ai", "machine learning", "neural", "network", "deep learning", "training", "model", "data"],
        "Operating Systems": ["kernel", "process", "thread", "memory", "paging", "deadlock", "scheduling"],
        "Databases": ["sql", "acid", "join", "transaction", "index", "normalization", "nosql", "mongo"],
        "Networking": ["tcp", "udp", "osi", "http", "ip", "dns", "api", "rest", "security"],
        "Web Development": ["html", "css", "javascript", "react", "frontend", "backend", "dom", "node"]
    }

    found_topics = []
    
    # 2. Extract potential "Definition" sentences for Flashcards
    # Look for "X is Y", "X refers to Y", "X means Y"
    sentences = re.split(r'[.!?]+', text)
    extracted_flashcards = []
    
    for sentence in sentences:
        sentence = sentence.strip()
        if len(sentence) < 20 or len(sentence) > 150: continue
        
        # Pattern matching for definitions
        match = re.search(r'^(.*?)\b(is|means|refers to|consists of|are)\b(.*)$', sentence, re.IGNORECASE)
        if match:
            term = match.group(1).strip()
            definition = match.group(3).strip()
            if len(term.split()) <= 4 and len(definition.split()) >= 3:
                extracted_flashcards.append({
                    "question": f"What is {term}?",
                    "answer": f"{term.capitalize()} {match.group(2)} {definition}.",
                    "topic": "Key Concepts"
                })

    # 3. Topic Identification
    for module, keywords in topics_map.items():
        subtopics = [k for k in keywords if k in text_lower]
        if subtopics:
            found_topics.append({"module": module, "subtopics": subtopics[:4]})

    # 4. Final Flashcard Assembly (Extractive + Pattern based)
    final_flashcards = extracted_flashcards[:6]
    
    # Add generic ones if extracted are too few
    for ft in found_topics[:2]:
        if len(final_flashcards) < 8:
            final_flashcards.append({
                "question": f"Key concepts in {ft['module']}?",
                "answer": f"This transcript covers {', '.join(ft['subtopics'])} basics.",
                "topic": ft["module"]
            })

    # 5. Fallback for completely unknown text
    if not found_topics:
        # Try to find common nouns or capitalized words
        potential_topic = "Custom Topic"
        proper_nouns = re.findall(r'\b[A-Z][a-z]+\b', text)
        if proper_nouns:
            potential_topic = proper_nouns[0]
        found_topics = [{"module": potential_topic, "subtopics": ["Analyzed from your text"]}]
        
    if not final_flashcards:
        final_flashcards = [
            {"question": "Main focus of the text?", "answer": f"The provided text discusses {potential_topic} and related ideas.", "topic": "General"}
        ]

    # 6. Dynamic Summary & Bullets
    # Use longer sentences as bullet points for the summary
    bullet_points = [s.strip() for s in sentences if len(s.strip().split()) > 8][:5]
    if not bullet_points:
        bullet_points = ["Focus on core definitions and relationships.", "Trace concepts through provided examples."]

    summary = f"Detected discussion on {', '.join([t['module'] for t in found_topics[:2]])}. "
    summary += "AI processing is currently in high-demand mode, so we've extracted these core takeaways directly from your text."

    return {
        "classified_topics": found_topics[:5],
        "flashcards": final_flashcards[:10],
        "bullet_points": bullet_points,
        "summary": summary
    }

def contextualize_transcript(transcript: str):
    """
    Parses a transcript into a structured syllabus and flashcards.
    """
    if not GEMINI_API_KEY:
        return {"status": "success", "data": _fallback_contextualizer(transcript)}

    # List of models to try in order
    models_to_try = ["gemini-2.0-flash", "gemini-2.0-flash-lite", "gemini-1.5-flash"]
    
    for model_name in models_to_try:
        try:
            client = genai.Client(api_key=GEMINI_API_KEY)
            prompt = CONTEXTUALIZER_PROMPT.format(transcript=transcript)
            
            response = client.models.generate_content(
                model=model_name,
                contents=prompt,
                config={
                    'response_mime_type': 'application/json'
                }
            )
            
            result = json.loads(response.text)
            return {"status": "success", "data": result}

        except Exception as e:
            error_msg = str(e)
            print(f"[SyllabusUI] Model {model_name} failed: {error_msg}")
            # If not a rate limit error, don't keep trying models
            if "429" not in error_msg and "RESOURCE_EXHAUSTED" not in error_msg:
                break
    
    # Final Fallback
    print(f"[SyllabusUI] All models exhausted. Using keyword-based fallback.")
    return {
        "status": "success", 
        "data": _fallback_contextualizer(transcript),
        "warning": "Gemini API quota exceeded. Showing rule-based results."
    }
