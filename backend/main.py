from flask import Flask
from tensorflow.keras.models import load_model


app = Flask(__name__)

model = None

def model_setup():
    global model
    model = load_model("../Models/Full_img.h5")

def pre_process(image):
    pass

@app.route("/api/predict", methods = ['POST'])
def predict():
    image = request.files['image']
    if image 
    try:
        imread("")
    except Exception as e:
        return 415
    pre_process()

if __name__ == "__main__":
    model_setup()
    app.run(port=5000, debug=True)