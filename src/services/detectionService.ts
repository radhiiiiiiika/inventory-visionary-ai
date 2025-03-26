
import { toast } from "sonner";

export interface DetectionResult {
  name: string;
  quantity: number;
  confidence: number;
}

export const detectObjects = async (imageData: string): Promise<DetectionResult | null> => {
  try {
    // In a real implementation, this would be your API endpoint
    const apiUrl = import.meta.env.VITE_DETECTION_API_URL || '/api/detect';
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image: imageData }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
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
