import cv2
import numpy as np
import os
import math

def create_glow_image(name, draw_func, size=300):
    # Create black transparent image (BGRA)
    img = np.zeros((size, size, 4), dtype=np.uint8)
    
    # Center
    cx, cy = size // 2, size // 2
    
    # Draw the specific asset
    draw_func(img, cx, cy, size)
    
    # Save
    path = os.path.join("vative-python-app", f"{name}.png") # Fix typo in plan, using actual folder next
    # Wait, let's just save to current dir or specify
    cv2.imwrite(f"{name}.png", img)
    print(f"Generated {name}.png")

def draw_brain(img, cx, cy, size):
    color = (255, 255, 0, 255) # Cyan
    # Outer Glow
    for r in range(size//2, size//3, -1):
        alpha = int(255 * (1 - (r - size//3)/(size//6)))
        cv2.ellipse(img, (cx, cy), (r, int(r*0.7)), 0, 0, 360, (255, 255, 0, alpha // 4), -1)
    # Lobe shapes
    cv2.ellipse(img, (cx-20, cy), (60, 45), 0, 0, 360, color, -1)
    cv2.ellipse(img, (cx+20, cy), (60, 45), 0, 0, 360, color, -1)
    # Inner lines
    cv2.circle(img, (cx, cy), 5, (255, 255, 255, 255), -1)

def draw_sun(img, cx, cy, size):
    color = (0, 255, 255, 255) # Yellow/Gold
    # Glow
    for r in range(size//2, size//4, -1):
        alpha = int(255 * (1 - (r - size//4)/(size//4)))
        cv2.circle(img, (cx, cy), r, (0, 165, 255, alpha // 4), -1)
    # Core
    cv2.circle(img, (cx, cy), size//4, color, -1)
    # Rays
    for a in range(0, 360, 30):
        rad = math.radians(a)
        x2 = int(cx + math.cos(rad) * (size//2))
        y2 = int(cy + math.sin(rad) * (size//2))
        cv2.line(img, (cx, cy), (x2, y2), color, 4)

def draw_water(img, cx, cy, size):
    color = (255, 200, 0, 255) # Blue
    # Glow
    for r in range(size//2, size//4, -1):
        alpha = int(255 * (1 - (r - size//4)/(size//4)))
        cv2.circle(img, (cx, cy), r, (255, 100, 0, alpha // 4), -1)
    # Tear drop
    pts = np.array([[cx, cy-80], [cx-50, cy+40], [cx+50, cy+40]], np.int32)
    cv2.fillPoly(img, [pts], color)
    cv2.circle(img, (cx, cy+40), 50, color, -1)

def draw_leaf(img, cx, cy, size):
    color = (0, 255, 0, 255) # Green
    # Glow
    for r in range(size//2, size//4, -1):
        alpha = int(255 * (1 - (r - size//4)/(size//4)))
        cv2.circle(img, (cx, cy), r, (0, 150, 0, alpha // 4), -1)
    # Leaf
    cv2.ellipse(img, (cx, cy), (80, 40), 45, 0, 360, color, -1)
    cv2.line(img, (cx-60, cy+60), (cx+60, cy-60), (200, 255, 200, 255), 3)

if __name__ == "__main__":
    create_glow_image("brain_glow", draw_brain)
    create_glow_image("sun_glow", draw_sun)
    create_glow_image("water_drop_glow", draw_water)
    create_glow_image("leaf_glow", draw_leaf)
    print("Done generating all assets!")
