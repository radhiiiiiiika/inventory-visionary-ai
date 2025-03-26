
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, X, Check, Package, RefreshCw, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const ScanInterface = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<null | {
    name: string;
    quantity: number;
    confidence: number;
  }>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (isScanning) {
        stopCamera();
      }
    };
  }, [isScanning]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsScanning(true);
        toast.info("Camera activated. Point at an item to scan.");
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      toast.error("Could not access camera. Please check permissions.");
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsScanning(false);
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      
      if (context) {
        // Set canvas dimensions to match video
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        // Draw the current video frame to the canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Convert canvas to image URL
        const imageDataUrl = canvas.toDataURL("image/jpeg");
        setCapturedImage(imageDataUrl);
        
        // Simulate AI processing
        simulateAIProcessing();
        
        // Stop the camera
        stopCamera();
      }
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageDataUrl = e.target?.result as string;
        setCapturedImage(imageDataUrl);
        simulateAIProcessing();
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateAIProcessing = () => {
    toast.info("Processing image...");
    
    // Simulate processing delay
    setTimeout(() => {
      // Mock result - in a real app, this would come from an AI model
      const mockItems = [
        { name: "Office Chair", quantity: 3, confidence: 0.92 },
        { name: "Desk Lamp", quantity: 5, confidence: 0.85 },
        { name: "Notebook", quantity: 12, confidence: 0.97 },
        { name: "Pencil Set", quantity: 8, confidence: 0.89 },
      ];
      
      const randomIndex = Math.floor(Math.random() * mockItems.length);
      setScanResult(mockItems[randomIndex]);
      
      toast.success("Item identified successfully!");
    }, 2000);
  };

  const resetScan = () => {
    setCapturedImage(null);
    setScanResult(null);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col w-full max-w-3xl mx-auto p-4">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*"
        className="hidden"
      />

      <div className="aspect-[4/3] w-full relative overflow-hidden rounded-2xl border border-border shadow-sm mb-6">
        <AnimatePresence mode="wait">
          {capturedImage ? (
            <motion.div
              key="captured-image"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black flex items-center justify-center"
            >
              <img
                src={capturedImage}
                alt="Captured item"
                className="w-full h-full object-contain"
              />
              
              {scanResult && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-0 left-0 right-0 glass p-4 text-left"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-semibold">{scanResult.name}</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-sm text-muted-foreground">Quantity</p>
                      <p className="font-semibold">{scanResult.quantity}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Confidence</p>
                      <p className="font-semibold">{Math.round(scanResult.confidence * 100)}%</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ) : isScanning ? (
            <motion.div
              key="video-feed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black"
            >
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 border-2 border-primary/30 border-dashed m-8 rounded-lg pointer-events-none"></div>
              <div className="absolute top-4 left-4 glass-dark px-3 py-1 rounded-full text-sm">
                <span className="inline-block w-2 h-2 bg-red-500 rounded-full animate-pulse mr-2"></span>
                Scanning
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-muted/20 flex flex-col items-center justify-center"
            >
              <Camera className="w-16 h-16 text-muted-foreground mb-4" />
              <p className="text-lg font-medium mb-2">No image captured</p>
              <p className="text-sm text-muted-foreground max-w-xs text-center">
                Use the camera to scan items or upload an image
              </p>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Hidden canvas for capturing frames */}
        <canvas ref={canvasRef} className="hidden" />
      </div>

      <div className="flex flex-wrap gap-4 justify-center">
        {isScanning ? (
          <>
            <Button 
              variant="outline" 
              onClick={stopCamera}
              className="rounded-full"
            >
              <X className="mr-2 w-4 h-4" /> Cancel
            </Button>
            <Button 
              onClick={captureImage}
              className="rounded-full"
            >
              <Camera className="mr-2 w-4 h-4" /> Capture
            </Button>
          </>
        ) : capturedImage ? (
          <>
            <Button 
              variant="outline" 
              onClick={resetScan}
              className="rounded-full"
            >
              <RefreshCw className="mr-2 w-4 h-4" /> New Scan
            </Button>
            {scanResult && (
              <Button 
                onClick={() => {
                  toast.success(`Added ${scanResult.quantity} ${scanResult.name}(s) to inventory!`);
                  resetScan();
                }}
                className="rounded-full"
              >
                <Check className="mr-2 w-4 h-4" /> Confirm Count
              </Button>
            )}
          </>
        ) : (
          <>
            <Button 
              variant="outline" 
              onClick={triggerFileInput}
              className="rounded-full"
            >
              <ImageIcon className="mr-2 w-4 h-4" /> Upload Image
            </Button>
            <Button 
              onClick={startCamera}
              className="rounded-full"
            >
              <Camera className="mr-2 w-4 h-4" /> Start Camera
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
