
import { toast } from "sonner";

export interface DetectionResult {
  name: string;
  quantity: number;
  confidence: number;
}

// The API URL from environment variables or default to localhost during development
const API_URL = import.meta.env.VITE_DETECTION_API_URL || 'http://localhost:5000/api/detect';

// Flag to toggle between real API and mock data (for development/testing)
export const USE_REAL_API = import.meta.env.VITE_USE_REAL_API !== 'false';

export const detectObjects = async (imageData: string): Promise<DetectionResult | null> => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image: imageData }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error during object detection:', error);
    toast.error('Failed to process image. Please try again.');
    return null;
  }
};

// For development and testing when the backend isn't available
export const mockDetectObjects = (): Promise<DetectionResult> => {
  return new Promise((resolve) => {
    // Simulate API latency
    setTimeout(() => {
      // Mock results to simulate YOLO detection
      const mockItems = [
        { name: "Chair", quantity: 3, confidence: 0.92 },
        { name: "Desk Lamp", quantity: 5, confidence: 0.85 },
        { name: "Book", quantity: 12, confidence: 0.97 },
        { name: "Pen", quantity: 8, confidence: 0.89 },
      ];
      
      const randomIndex = Math.floor(Math.random() * mockItems.length);
      resolve(mockItems[randomIndex]);
    }, 2000);
  });
};
