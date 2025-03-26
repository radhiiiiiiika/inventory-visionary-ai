
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Dashboard as DashboardComponent } from "@/components/Dashboard";
import { InventoryList } from "@/components/InventoryList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutDashboard, List } from "lucide-react";

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <Layout>
      <div className="pt-24 min-h-screen flex flex-col">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="flex justify-center mb-8">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="overview" className="flex items-center justify-center">
                  <LayoutDashboard className="w-4 h-4 mr-2" />
                  Overview
                </TabsTrigger>
                <TabsTrigger value="inventory" className="flex items-center justify-center">
                  <List className="w-4 h-4 mr-2" />
                  Inventory
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="overview" className="w-full">
              <DashboardComponent />
            </TabsContent>
            
            <TabsContent value="inventory" className="w-full">
              <InventoryList />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
