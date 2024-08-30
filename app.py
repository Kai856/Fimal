import numpy as np
from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import load_img, img_to_array

app = Flask(__name__)
model = load_model('public/model/animal_classification.keras')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        files = request.files.getlist('file')
        results = []
        for file in files:
            img = load_img(file, target_size=(224, 224), color_mode='grayscale')
            img_array = img_to_array(img)
            img_array = np.expand_dims(img_array, axis=0)
            img_array = img_array / 255.0

            predictions = model.predict(img_array)
            predicted_class = np.argmax(predictions, axis=1)[0]

            class_names = [
                "Alligators", "Armadillos", "Bears", "Birds_Carrion", "Birds_Other", 
                "Birds_Raptors", "Birds_Wading", "Boar", "Bobcats", "Cattle", 
                "Coyotes", "Deer", "Dogs", "Negatives", "Opossum", "Otters", 
                "Panthers", "Rabbits", "Raccoons", "Sandhill_Crane", "Squirrels", "Turkey"
            ]

            predicted_label = class_names[predicted_class]
            results.append(predicted_label)
        return jsonify({'prediction': results})
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': str(e)}), 500
