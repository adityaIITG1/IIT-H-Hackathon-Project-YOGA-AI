# Round 2 Technical Report: YogaAI Detection System

**Author:** [Your Name/Team Name]
**Date:** [Current Date]
**Competition:** [Competition Name - Round 2]

---

## 1. Problem Statement & Objective
The goal of this phase was to develop a robust AI/ML solution for [describe specific problem, e.g., detecting yoga poses/hand mudras] using the provided dataset. The specific objectives were:
- Train a detection model to accurately localize and classify [objects/classes].
- Generate predictions in YOLO format for the test set.
- Document the technical pipeline and design decisions.

## 2. Methodology & Pipeline

### 2.1 Dataset Preparation
- **Splitting:** The dataset was split into Training (80%) and Validation (20%) sets to ensure robust evaluation.
- **Preprocessing:** Images were resized to 640x640 (standard YOLO input). Labels were properly formatted in standard YOLO TXT format (class, x_center, y_center, width, height).
- **Augmentation:** Standard YOLOv8 augmentations were applied during training (Flip, Scale, Mosaic) to improve generalization.

### 2.2 Model Architecture Selection
We chose **YOLOv8 (You Only Look Once - Version 8)** [specifically YOLOv8 Nano/Small] for the following reasons:
1.  **Real-time Performance:** YOLOv8 offers state-of-the-art inference speeds, crucial for "live" yoga feedback applications.
2.  **Accuracy:** It incorporates anchor-free detection and a decoupled head, providing superior mAP scores compared to older versions like SSD or Reduced-RCNN.
3.  **Ease of Deployment:** The Ultralytics framework allows for easy export to ONNX/TFLite, suitable for edge deployment in future phases.

### 2.3 Training Configuration
The training was executed with the following hyperparameters:
- **Framework:** PyTorch / Ultralytics
- **Base Model:** `yolo11n.pt` (Pretrained on COCO)
- **Epochs:** 50 (with Early Stopping patience=10)
- **Batch Size:** 16
- **Optimizer:** AdamW
- **Loss Function:** Box Loss (CIoU) + Class Loss (BCE) + DFL Loss

## 3. Experiments & Results

### 3.1 Training Metrics
*(Replace with actual graphs/screenshots from runs/detect/train/)*
- **mAP@50:** [Value, e.g., 0.92]
- **mAP@50-95:** [Value, e.g., 0.75]
- **Precision:** [Value]
- **Recall:** [Value]

The model showed steady convergence, with training and validation loss decreasing consistently. The "Mosaic" augmentation helped significantly in detecting smaller objects [if applicable].

### 3.2 Validation Performance
On the validation set, the model achieved an mAP@50 of [X.XX]. Confusion matrix analysis showed minimal class confusion, with [Class A] being the most accurately detected.

## 4. Conclusion & Future Work
The trained YOLOv8 model successfully meets the requirements of Round 2, delivering accurate bounding box predictions. 
**Future improvements** could include:
- Hyperparameter tuning (Genetic Evolution).
- Adding more diverse background data.
- Quantization for mobile deployment.

---
**Attachments:**
- Source Code (`train.py`, `predict.py`)
- `predictions/` folder (YOLO TXT files)
- Weights (`best.pt`)
