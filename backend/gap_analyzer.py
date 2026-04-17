"""
Knowledge Gap Analyzer Engine
Uses Gemini AI to identify semantic misunderstandings in student explanations.
"""
import os
import json
import re

GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", "")

GAP_ANALYSIS_PROMPT = """You are an expert Computer Science professor and pedagogical analyst.
A student is explaining a specific concept to you using the Feynman Technique.
Your goal is to identify specific **semantic misunderstandings** (mental model errors) and generate a **micro-learning path**.

## Task:
1. Compare the student's explanation against the ground truth for the concept: "{topic}".
2. Identify what they got right (Correct Concepts).
3. Identify specific gaps or misunderstandings (Semantic Gaps). Do not focus on missing keywords, focus on conceptual errors.
4. Generate a 3-step Micro-Learning Path to help them bridge the gap.

## Rules:
- Be encouraging but technically precise.
- Return ONLY a JSON object with the following structure:
{{
  "identified_gaps": ["gap 1", "gap 2"],
  "correct_concepts": ["correct 1", "correct 2"],
  "micro_path": [
    {{"step": 1, "task": "Task description", "resource_tip": "Specific tip or concept to review"}},
    {{"step": 2, "task": "Task description", "resource_tip": "Specific tip or concept to review"}},
    {{"step": 3, "task": "Task description", "resource_tip": "Specific tip or concept to review"}}
  ],
  "confidence_score": 0.0-1.0,
  "summary": "A brief overview of their current understanding level."
}}

## Student's Explanation of {topic}:
{explanation}
"""

# ============================================
# KNOWLEDGE TREASURY (For Fallback Analysis)
# ============================================
KNOWLEDGE_TREASURY = {
    "Recursion": {
        "essential": ["base case", "recursive case", "stack", "self-calling"],
        "correct": "Function calls itself to solve smaller subproblems.",
        "common_gaps": ["Missing or incorrect base case (infinite recursion)", "Not reducing problem size", "Understanding stack overflow"],
        "path": ["Review Base Cases in Factorial/Fibonacci", "Trace recursion with a stack diagram", "Practice Head vs Tail recursion"]
    },
    "Pointers & Memory": {
        "essential": ["address", "reference", "dereference", "memory", "allocation", "heap", "stack"],
        "correct": "Variables that store the memory address of another variable.",
        "common_gaps": ["Manual memory management (leaks)", "Pointer arithmetic vs Indexing", "Dangling pointers"],
        "path": ["Draw a memory map for pointer assignments", "Review malloc/free or new/delete", "Practice pointer arithmetic on arrays"]
    },
    "Big O Notation": {
        "essential": ["worst case", "time complexity", "space", "asymptotic", "scaling"],
        "correct": "Describes how algorithm performance grows with input size.",
        "common_gaps": ["Ignoring constants/lower terms", "Confusing O(n) with O(log n)", "Worst vs Average case distinction"],
        "path": ["Graph n, n log n, and n^2 side by side", "Practice complexity analysis of nested loops", "Learn common algorithm categories"]
    },
    "Dynamic Programming": {
        "essential": ["memoization", "tabulation", "overlapping", "subproblems", "optimal substructure"],
        "correct": "Optimizing recursion by storing results of subproblems.",
        "common_gaps": ["Identifying optimal substructure", "Top-down vs Bottom-up choice", "State definition errors"],
        "path": ["Solve 0/1 Knapsack step-by-step", "Practice identifying overlapping subproblems", "Implementation of Memoization vs Tabulation"]
    },
}

def _fallback_analysis(topic: str, explanation: str):
    """
    Rule-based analyzer when AI is hit by rate limits.
    """
    text = explanation.lower()
    data = KNOWLEDGE_TREASURY.get(topic, {
        "essential": [], "correct": "Conceptual understanding.", 
        "common_gaps": ["Deeper technical nuances"], 
        "path": ["Review core theory", "Practice standard problems"]
    })

    found = [word for word in data["essential"] if word in text]
    missing = [word for word in data["essential"] if word not in text]

    gaps = []
    if not found:
        gaps.append("Fundamental conceptual void")
    for m in missing:
        if m == "base case": gaps.append("Risk of infinite recursion (Missing base case)")
        elif m == "address": gaps.append("Lack of understanding of memory physical addresses")
        else: gaps.append(f"Missing mention of {m}")

    return {
        "identified_gaps": gaps[:3] or ["Conceptual depth check recommended"],
        "correct_concepts": [f"Understands {f}" for f in found[:3]] or ["Basic introduction shared"],
        "micro_path": [{"step": i+1, "task": t, "resource_tip": "Focus on the basics"} for i, t in enumerate(data["path"])],
        "confidence_score": 0.5,
        "summary": "Using fallback analyzer due to high traffic. Your explanation shows some basics but might miss specific technical keywords."
    }

async def analyze_semantic_gap(topic: str, explanation: str):
    """
    Analyzes the user's concept explanation for semantic misunderstandings via asynchronous REST API.
    """
    from chatbot_engine import GEMINI_ENDPOINT  # Share the verified endpoint
    import httpx

    if not GEMINI_API_KEY or "YOUR_FREE" in GEMINI_API_KEY:
        return {"status": "success", "analysis": _fallback_analysis(topic, explanation)}

    try:
        prompt = GAP_ANALYSIS_PROMPT.format(topic=topic, explanation=explanation)
        
        # Use httpx for non-blocking REST call
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{GEMINI_ENDPOINT}?key={GEMINI_API_KEY}",
                json={
                    "contents": [{"role": "user", "parts": [{"text": prompt}]}],
                    "generationConfig": {"response_mime_type": "application/json"}
                },
                timeout=30.0
            )
            
        if response.status_code == 200:
            data = response.json()
            raw_text = data['candidates'][0]['content']['parts'][0]['text']
            # Sometimes Gemini wraps JSON in code blocks
            clean_json = re.sub(r'^```json\n|```$', '', raw_text, flags=re.MULTILINE).strip()
            result = json.loads(clean_json)
            return {"status": "success", "analysis": result}
        else:
            print(f"[GapAnalyzer] API error {response.status_code}: {response.text}")

    except Exception as e:
        print(f"[GapAnalyzer] Error: {e}")
    
    # Final Fallback
    print(f"[GapAnalyzer] Using rule-based fallback.")
    return {
        "status": "success", 
        "analysis": _fallback_analysis(topic, explanation),
        "warning": "Gemini API unavailable or key issues. Showing curated results."
    }
