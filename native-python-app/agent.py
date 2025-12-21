import os
import time
import json
from ai_explainer import get_ai_explanation

class YogaAgent:
    """
    The 'Brain' of the Yoga AI. 
    It observes the user's state (Pose, HR, Stress) and decides the best action.
    It maintains a session memory to provide continuity.
    """
    def __init__(self):
        self.session_start = time.time()
        self.state = {
            "current_pose": None,
            "streak_count": 0,
            "energy_level": 50, # 0-100
            "stress_history": [],
            "last_guidance_time": 0
        }
        self.phase = "WARMUP" # WARMUP -> FLOW -> MEDITATION
        
    def update_state(self, pose_name, heart_rate, stress_index):
        """Update internal state with new sensor/vision data."""
        self.state["current_pose"] = pose_name
        
        # Simple history tracking
        if stress_index is not None:
            self.state["stress_history"].append(stress_index)
            if len(self.state["stress_history"]) > 20:
                self.state["stress_history"].pop(0)

    def decide_action(self):
        """
        Decide what to do next based on the current state.
        Returns a dict: {"action": "SPEAK"|"NONE", "content": "..."}
        """
        now = time.time()
        # Don't nag too often (e.g., every 15 seconds)
        if now - self.state["last_guidance_time"] < 15:
            return None

        # Check for High Stress
        avg_stress = 0
        if self.state["stress_history"]:
            avg_stress = sum(self.state["stress_history"]) / len(self.state["stress_history"])
        
        if avg_stress > 70:
            self.state["last_guidance_time"] = now
            return {
                "action": "guide_stress",
                "text": "I notice your stress levels are rising. Let's take a deep breath together. Inhale... Exhale...",
                "metadata": {"source": "biofeedback"}
            }

        # Check for specific pose mastery (Agentic Encouragement)
        if self.state["current_pose"] == "Gyan Mudra" and self.phase == "WARMUP":
            self.state["last_guidance_time"] = now
            self.phase = "FLOW" # Transition
            # Call the AI Explainer for a rich, generative response
            scripture = {
                "source": "Yoga Sutras", 
                "sanskrit": "Sthira Sukham Asanam", 
                "hinglish": "Steady and comfortable posture", 
                "meaning": "Find stillness in your pose."
            }
            # We pass a snapshot of our state
            explanation = get_ai_explanation(
                scripture, 
                {"pose": self.state["current_pose"]}, 
                {"mudra": "Gyan"}, 
                {"smoothness": 0.8, "rate": 15, "pranayama_count": 0},
                session_context="User has just achieved stability."
            )
            return {
                "action": "teach_philosophy",
                "text": explanation,
                "metadata": {"source": "gemini"}
            }

        return None
