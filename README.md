# Cardiovascular Disease Risk Predictor

A full-stack web application that predicts cardiovascular disease risk using a neural network trained on health data.

![React](https://img.shields.io/badge/React-19.0-blue)
![Python](https://img.shields.io/badge/Python-3.x-green)
![TensorFlow](https://img.shields.io/badge/TensorFlow-Keras-orange)

## Overview

This application allows users to input health metrics and receive a cardiovascular disease risk assessment powered by a neural network model. The model was trained on the [Kaggle Cardiovascular Disease Dataset](https://www.kaggle.com/datasets/sulianova/cardiovascular-disease-dataset) containing 70,000 patient records.

## Features

- Interactive web form for health data input
- Real-time risk prediction with probability score
- Neural network with 16-8-1 architecture (two hidden layers)
- Imperial unit inputs (feet/inches, pounds) with automatic metric conversion
- Clean, responsive user interface

## Tech Stack

**Frontend:**
- React 19 (Vite)
- JavaScript/JSX
- CSS-in-JS styling

**Backend:**
- Python Flask
- TensorFlow/Keras
- NumPy

## Model Details

- **Architecture:** 16-8-1 (input → 16 neurons → 8 neurons → 1 output)
- **Activation:** ReLU (hidden layers), Sigmoid (output)
- **Training Data:** 70,000 patient records with 11 features
- **Features:** Age, gender, height, weight, blood pressure (systolic/diastolic), cholesterol, glucose, smoking, alcohol intake, physical activity

## Installation

### Prerequisites
- Node.js (v20+)
- Python 3.x
- pip

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
├── backend/
│   ├── app.py                    # Flask API server
│   ├── cardio_model.keras        # Trained neural network model
│   └── normalization_params.json # Feature normalization parameters
│
└── frontend/
    ├── src/
    │   ├── App.jsx               # Main React component
    │   ├── index.css             # Global styles
    │   └── main.jsx              # React entry point
    ├── package.json
    └── vite.config.js
```

## Disclaimer

This application is for educational and demonstration purposes only. It is not intended for medical diagnosis or to replace professional medical advice.

## Author

Victoria St. John - [GitHub](https://github.com/vstjohn)
