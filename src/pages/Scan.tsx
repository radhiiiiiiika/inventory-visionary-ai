
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
              Use your camera or upload an image to instantly identify and count items in your inventory.
            </p>
          </div>
          <ScanInterface />
        </div>
      </div>
    </Layout>
  );
};

export default Scan;
