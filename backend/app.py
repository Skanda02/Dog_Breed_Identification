from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from PIL import Image
import json
import os
from utils import process_image
import tensorflow_hub as hub
import os
os.environ["TF_USE_LEGACY_KERAS"] = "1" # Force legacy behavior if needed

app = Flask(__name__)
CORS(app)

UPLODE_FOLDER = 'uplodes'
os.makedirs(UPLODE_FOLDER, exist_ok=True)

# Load the model
model = tf.keras.models.load_model(
    "Models/Full_img.h5",
    custom_objects = {"KerasLayer": hub.KerasLayer}
)

# Load labels
with open("labels.json","r") as f:
    class_name = json.load(f)

@app.route("/api/predict", methods=["POST"])
def predict():
    if "image" not in request.files:
        return jsonify({"error": "No image uploded"}), 400
    
    file = request.files["image"]
    file_path = os.path.join(UPLODE_FOLDER, file.filename)
    file.save(file_path)

    img = process_image(file_path)

    preds = model.predict(img)
    class_id = np.argmax(preds)
    confidence = float(np.max(preds))

    os.remove(file_path)

    return jsonify({
        "bread": class_name[str(class_id)],
        "confidence": round(confidence * 100, 2)
    })

if __name__ == "__main__":
    app.run(debug=True)