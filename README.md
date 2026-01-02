# Cardiovascular Disease Risk Predictor

A full-stack web application that predicts cardiovascular disease risk using a neural network. Developed as part of CS 5342 (Artificial Intelligence) at the University of Missouri–St. Louis.

![React](https://img.shields.io/badge/React-19.0-blue)
![Python](https://img.shields.io/badge/Python-3.x-green)
![TensorFlow](https://img.shields.io/badge/TensorFlow-Keras-orange)
![Docker](https://img.shields.io/badge/Docker-Ready-blue)

## Overview

This application allows users to input health metrics and receive a cardiovascular disease risk assessment powered by a neural network model. The model was trained on the [Kaggle Cardiovascular Disease Dataset](https://www.kaggle.com/datasets/sulianova/cardiovascular-disease-dataset) containing 70,000 patient records.

## Features

* Interactive web form for health data input
* Real-time risk prediction with probability score
* Neural network with 16-8-1 architecture
* Imperial unit inputs (feet/inches, pounds) with automatic metric conversion
* Clean, responsive user interface
* Docker support for easy setup

## Model Development

### Data Preparation

* Started with 70,000 patient records containing 11 features
* Cleaned unrealistic blood pressure values (negative numbers, extreme readings)
* Final dataset: 68,709 records with balanced classes (49.5% positive, 50.5% negative)
* Applied z-score normalization using training set statistics

### Architecture Comparison

I tested 6 different neural network architectures to find the optimal model:

| Model | Architecture | Validation Accuracy |
| --- | --- | --- |
| Logistic Regression | 1 | 72.1% |
| Neural Network | 4-1 | 72.5% |
| Neural Network | 8-1 | 72.9% |
| Neural Network | 8-4-1 | 73.0% |
| **Neural Network** | **16-8-1** | **73.4%** |
| Neural Network | 16-8-4-1 | 73.2% |

The 16-8-1 architecture performed best. Interestingly, deeper networks didn't improve performance—the 16-8-4-1 model actually performed slightly worse, likely due to overfitting.

### Feature Importance Analysis

I analyzed which features contributed most to predictions by training single-feature models:

| Rank | Feature | Single-Feature Accuracy |
| --- | --- | --- |
| 1 | Systolic BP | 71.1% |
| 2 | Diastolic BP | 66.2% |
| 3 | Age | 59.3% |
| 4 | Cholesterol | 58.9% |
| 5 | Weight | 57.9% |
| 6-11 | Gender, smoking, alcohol, etc. | 50-53% |

**Key finding:** Blood pressure alone achieves 71% accuracy—nearly as good as all 11 features combined. Gender and smoking had minimal predictive value on their own.

### Final Model Performance

| Metric | Value |
| --- | --- |
| Architecture | 16-8-1 (two hidden layers) |
| Validation Accuracy | 73.41% |
| AUC Score | 0.80 |
| Improvement over random | +22.8 percentage points |

## Tech Stack

**Frontend:**

* React 19 (Vite)
* JavaScript/JSX
* CSS-in-JS styling

**Backend:**

* Python Flask
* TensorFlow/Keras
* NumPy

**Training:**

* Binary cross-entropy loss
* Adam optimizer
* Early stopping (patience=20)

**DevOps:**

* Docker
* Docker Compose

## Quick Start with Docker

The easiest way to run this project:

```bash
# Clone the repo
git clone https://github.com/vstjohn/cardio-predictor.git
cd cardio-predictor

# Build and run both containers
docker-compose up --build

# Open http://localhost:5173 in your browser
```

To stop: `Ctrl+C` then `docker-compose down`

## Manual Installation

If you prefer not to use Docker:

### Prerequisites

* Node.js (v20+)
* Python 3.x
* pip

### Backend Setup

```bash
cd backend
pip install flask flask-cors tensorflow numpy
python app.py
```

The Flask server will run on `http://localhost:5000`

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The React app will run on `http://localhost:5173`

## Usage

1. Start the backend server (Flask)
2. Start the frontend development server (React)
3. Open `http://localhost:5173` in your browser
4. Enter health information in the form
5. Click "Get Prediction" to see your risk assessment

## Project Structure

```
cardio-predictor/
├── docker-compose.yml            # Container orchestration
│
├── notebooks/
│   ├── phase1.py                 # Data loading and exploration
│   ├── Phase2.ipynb              # Rule-based baseline
│   ├── phase3_overfit.ipynb      # Overfitting experiments
│   ├── Phase4_ModelSelection.ipynb    # Architecture comparison
│   ├── Phase5_FeatureImportanceTS.ipynb # Feature analysis
│   └── Phase6TS.ipynb            # Final model training
│
├── backend/
│   ├── Dockerfile                # Backend container config
│   ├── requirements.txt          # Python dependencies
│   ├── app.py                    # Flask API server
│   ├── cardio_model.keras        # Trained neural network model
│   └── normalization_params.json # Feature normalization parameters
│
└── frontend/
    ├── Dockerfile                # Frontend container config
    ├── src/
    │   ├── App.jsx               # Main React component
    │   ├── index.css             # Global styles
    │   └── main.jsx              # React entry point
    ├── package.json
    └── vite.config.js
```

## Lessons Learned

* **Simpler models can match complex ones:** Logistic regression achieved 72.1% vs. the best neural network at 73.4%
* **Feature selection matters:** Removing 4 low-impact features only reduced accuracy by 0.67%
* **Domain knowledge aligns with results:** Blood pressure being the top predictor matches medical research on cardiovascular risk factors
* **More layers ≠ better:** The deepest network (16-8-4-1) underperformed the simpler 16-8-1

## Disclaimer

This application is for educational and demonstration purposes only. It is not intended for medical diagnosis or to replace professional medical advice.

## Author

Victoria St. John  
University of Missouri–St. Louis  
BS Computer Science & Mathematics (Expected 2027)

[GitHub](https://github.com/vstjohn)
