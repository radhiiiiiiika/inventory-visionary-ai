
import { Layout } from "@/components/Layout";
import { ScanInterface } from "@/components/ScanInterface";

const Scan = () => {
  return (
    <Layout>
      <div className="pt-24 min-h-screen flex flex-col">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Scan Inventory</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Use your camera or upload an image to identify and count items in your inventory using YOLO object detection.
            </p>
          </div>
          <ScanInterface />
          <div className="mt-8 text-center">
            <div className="text-sm text-muted-foreground">
              <p className="font-medium">Powered by YOLOv8 object detection</p>
            </div>
            <div className="mt-4 p-4 bg-muted/30 rounded-lg max-w-2xl mx-auto text-sm">
              <h3 className="font-medium mb-2">Backend Setup:</h3>
              <ol className="list-decimal list-inside text-left space-y-1">
                <li>Install Python dependencies: <code className="bg-muted px-1 py-0.5 rounded">pip install -r requirements.txt</code></li>
                <li>Run the Flask server: <code className="bg-muted px-1 py-0.5 rounded">python server.py</code></li>
                <li>Set <code className="bg-muted px-1 py-0.5 rounded">VITE_USE_REAL_API=true</code> to use the YOLO backend</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Scan;
