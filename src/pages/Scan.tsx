
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
          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>Powered by YOLOv8 object detection</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Scan;
