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
        Uses Gemini to provide "Agentic Reasoning" over the current posture and biofeedback.
        """
        now = time.time()
        # [PROACTIVE] Reduced cooldown to 10 seconds for more visible AI activity
        if now - self.state["last_guidance_time"] < 10:
            return None

        # Check for High Stress
        avg_stress = 0
        if self.state["stress_history"]:
            avg_stress = sum(self.state["stress_history"]) / len(self.state["stress_history"])
        
        if avg_stress > 70:
            self.state["last_guidance_time"] = now
            return {
                "action": "guide_stress",
                "text": "I notice your pulse is elevating. Release any tension in your jaw and focus on a slow, steady exhale.",
                "metadata": {"source": "biofeedback"}
            }

        # [AGENTIC] Scriptural Insights for ALL Mudras
        if self.state["current_pose"] and self.state["current_pose"] != "Unknown":
            # If they just entered a new mudra (or stay in it), provide insight
            mudra = self.state["current_pose"].replace(" Mudra", "")
            
            # Map Mudras to their scriptural significance
            mudra_map = {
                "Gyan": {"sanskrit": "Jnana", "meaning": "Symbol of knowledge and concentration."},
                "Surya": {"sanskrit": "Agni", "meaning": "Symbol of fire and metabolic energy."},
                "Varun": {"sanskrit": "Jala", "meaning": "Symbol of water and emotional balance."},
                "Prana": {"sanskrit": "Prana", "meaning": "Symbol of life force and vital energy."}
            }

            if mudra in mudra_map:
                self.state["last_guidance_time"] = now
                entry = mudra_map[mudra]
                
                # Dynamic context for Gemini
                explanation = get_ai_explanation(
                    {"source": "Vedas", "sanskrit": entry["sanskrit"], "meaning": entry["meaning"]},
                    {"pose": self.state["current_pose"]},
                    {"mudra": mudra},
                    {"energy": self.state["energy_level"]},
                    session_context=f"The user is channeling the {mudra} element."
                )
                
                return {
                    "action": "teach_philosophy",
                    "text": explanation,
                    "metadata": {"source": "gemini"}
                }

        return None
