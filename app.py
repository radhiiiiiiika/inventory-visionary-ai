
from flask import Flask, request, jsonify
from flask_cors import CORS
from ultralytics import YOLO
import cv2
import base64
import numpy as np
import io
from PIL import Image

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load YOLOv8 pre-trained model
model = YOLO("yolov8n.pt")  # Using the 'n' (nano) version for fast inference

@app.route('/api/detect', methods=['POST'])
def detect_objects():
    try:
        # Get the image data from the request
        data = request.json
        if not data or 'image' not in data:
            return jsonify({'error': 'No image data provided'}), 400
        
        # Decode base64 image
        image_data = data['image'].split(',')[1] if ',' in data['image'] else data['image']
        image_bytes = base64.b64decode(image_data)
        
        # Convert to image
        image = Image.open(io.BytesIO(image_bytes))
        image_np = np.array(image)
        
        # Run YOLO object detection
        results = model(image_np)
        
        # Process results
        detected_items = {}
        
        for result in results:
            for box in result.boxes:
                conf = float(box.conf[0].item())  # Confidence score
                class_id = int(box.cls[0])
                label = result.names[class_id]  # Object class name
                
                # Count occurrences of each object
                if label in detected_items:
                    detected_items[label]['quantity'] += 1
                    # Update confidence if this instance has higher confidence
                    if conf > detected_items[label]['confidence']:
                        detected_items[label]['confidence'] = conf
                else:
                    detected_items[label] = {
                        'quantity': 1,
                        'confidence': conf
                    }
        
        # If no items were detected
        if not detected_items:
            return jsonify([]), 200
        
        # Convert to the expected output format - now returning all detected items
        response = []
        for item_name, item_data in detected_items.items():
            response.append({
                'name': item_name,
                'quantity': item_data['quantity'],
                'confidence': item_data['confidence']
            })
        
        return jsonify(response)
    
    except Exception as e:
        print(f"Error processing image: {str(e)}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
