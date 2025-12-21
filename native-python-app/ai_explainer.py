import os
import requests
import json

# Fallback to a hardcoded key is NOT recommended for production/hackathons.
# We expect GEMINI_API_KEY in environment variables.
GEMINI_ENDPOINT = "https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash-exp:generateContent"

def get_ai_explanation(scripture_entry, pose_state, mudra_state, breath_state, session_context, enable_api=True):
    api_key = os.getenv("GEMINI_API_KEY")
    
    if not enable_api or not api_key:
        print("[AI] No API Key found or API disabled.")
        return _fallback(scripture_entry)
        
    prompt = _build_prompt(scripture_entry, pose_state, mudra_state, breath_state, session_context)
    
    try:
        resp = requests.post(
            GEMINI_ENDPOINT,
            params={"key": api_key},
            json={
                "contents": [{
                    "parts": [{"text": prompt}]
                }]
            },
            timeout=5 # Faster timeout for real-time app
        )
        
        if resp.status_code != 200:
            print(f"[AI Error] {resp.status_code}: {resp.text}")
            return _fallback(scripture_entry)
            
        data = resp.json()
        candidates = data.get("candidates", [])
        
        if not candidates:
            return _fallback(scripture_entry)
            
        return candidates[0]["content"]["parts"][0]["text"]
        
    except Exception as e:
        print(f"[AI Exception] {e}")
        return _fallback(scripture_entry)


def _fallback(entry):
    if entry:
        return f"{entry.get('hinglish', '')}: {entry.get('meaning', '')}"
    return "Focus on your breath and find your center."


def _build_prompt(entry, pose_state, mudra_state, breath_state, session_context):
    return f"""
    You are a wise, empathetic Yoga Guru (Agent).
    
    Context:
    - User is performing: {pose_state.get('pose', 'Unknown Pose')}
    - Mudra: {mudra_state.get('mudra', 'None')}
    - Session Context: {session_context}
    
    Scripture Reference (if active):
    {json.dumps(entry) if entry else "None"}
    
    Task:
    Provide a short, 1-2 sentence spoken guidance. 
    If the user is doing well, encourage them using the scripture.
    If they are stressed (high HR), calm them down.
    
    Tone: Calm, Indian wisdom, English with a touch of warmth.
    Output just the spoken text.
    """