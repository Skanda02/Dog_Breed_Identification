import os
os.environ["TF_CPP_MIN_LOG_LEVEL"] = "2"  # Suppress TF warnings
from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from PIL import Image
import json
from utils import process_image


app = Flask(__name__)
# Enable CORS for all routes and all origins (for development)
CORS(app, resources={r"/api/*": {"origins": "*"}})

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Define variables (Must match your training setup)
IMG_SIZE = 224
UNIQUE_BREEDS = 120  # Number of dog breeds

# Load labels first
with open("labels.json", "r") as f:
    class_names = json.load(f)


def create_model(input_shape=(IMG_SIZE, IMG_SIZE, 3), output_shape=UNIQUE_BREEDS):
    """
    Recreate the exact model architecture used in training.
    Based on DOG_clf.ipynb - uses MobileNetV2 from keras.applications
    """
    base_model = tf.keras.applications.MobileNetV2(
        input_shape=input_shape,
        include_top=False,
        weights="imagenet"
    )
    base_model.trainable = False

    model = tf.keras.Sequential([
        base_model,
        tf.keras.layers.GlobalAveragePooling2D(),
        tf.keras.layers.Dense(output_shape, activation="softmax")
    ])
    return model


def load_dog_model(model_path):
    """Load the dog breed classification model"""
    print(f"Loading model from: {model_path}")
    
    try:
        # First, try loading the full model directly
        model = tf.keras.models.load_model(model_path)
        print("Model loaded directly!")
        return model
    except Exception as e:
        print(f"Direct load failed: {e}")
        print("Rebuilding model architecture and loading weights...")
        
        # Recreate the model architecture and load weights
        model = create_model()
        model.load_weights(model_path)
        print("Model weights loaded successfully!")
        return model


# Load model at startup
print("Loading Dog Breed Classification Model...")
model = load_dog_model("Models/Full_img.h5")


def format_breed_name(breed):
    """Format breed name for display (capitalize and replace underscores)"""
    return breed.replace("_", " ").title()


@app.route("/api/health", methods=["GET"])
def health_check():
    """Health check endpoint"""
    return jsonify({"status": "ok", "message": "Dog Breed API is running!"})


@app.route("/api/predict", methods=["POST"])
def predict():
    """Predict dog breed from uploaded image"""
    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400
    
    file = request.files["image"]
    
    if file.filename == "":
        return jsonify({"error": "No file selected"}), 400
    
    # Check file type
    allowed_extensions = {'png', 'jpg', 'jpeg', 'webp', 'gif'}
    file_ext = file.filename.rsplit('.', 1)[-1].lower() if '.' in file.filename else ''
    if file_ext not in allowed_extensions:
        return jsonify({"error": "Invalid file format. Please upload an image."}), 415
    
    try:
        file_path = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(file_path)

        # Process image and make prediction
        img = process_image(file_path)
        preds = model.predict(img, verbose=0)
        
        # Get top 5 predictions
        top_indices = np.argsort(preds[0])[::-1][:5]
        top_predictions = []
        
        for idx in top_indices:
            breed_name = format_breed_name(class_names[str(idx)])
            confidence = float(preds[0][idx]) * 100
            top_predictions.append({
                "breed": breed_name,
                "confidence": round(confidence, 2)
            })
        
        # Clean up uploaded file
        os.remove(file_path)

        # Return prediction results
        return jsonify({
            "breed": top_predictions[0]["breed"],
            "confidence": top_predictions[0]["confidence"],
            "topPredictions": top_predictions
        })
        
    except Exception as e:
        # Clean up file if it exists
        if os.path.exists(file_path):
            os.remove(file_path)
        print(f"Prediction error: {str(e)}")
        return jsonify({"error": "Failed to process image", "message": str(e)}), 500


@app.route("/api/breeds", methods=["GET"])
def get_breeds():
    """Get list of all supported dog breeds"""
    breeds = [format_breed_name(name) for name in class_names.values()]
    return jsonify({"breeds": sorted(breeds), "count": len(breeds)})


if __name__ == "__main__":
    print("Starting Dog Breed Classification API on http://localhost:5001")
    app.run(host="0.0.0.0", port=5001, debug=True)