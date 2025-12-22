from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
import json

app = Flask(__name__)
CORS(app)

# Load model and normalization params
model = tf.keras.models.load_model('cardio_model.keras')

with open('normalization_params.json', 'r') as f:
    norm_params = json.load(f)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    
    # React already converts units, so use values directly
    features = np.array([[
        data['age'],         # already in days
        data['gender'],
        data['height'],      # already in cm
        data['weight'],      # already in kg
        data['ap_hi'],
        data['ap_lo'],
        data['cholesterol'],
        data['gluc'],
        data['smoke'],
        data['alco'],
        data['active']
    ]])
    
    # Normalize using training mean/std
    mean = np.array(norm_params['mean'])
    std = np.array(norm_params['std'])
    features_normalized = (features - mean) / std
    
    # Predict
    prediction = model.predict(features_normalized)[0][0]
    
    return jsonify({
        'probability': float(prediction),
        'risk': 'High' if prediction > 0.5 else 'Low'
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)