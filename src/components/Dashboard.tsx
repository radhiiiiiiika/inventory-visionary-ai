
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { AlertTriangle, ArrowUp, ArrowDown, Package2, Layers, ShoppingCart, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data for demo purposes
const mockInventoryData = {
  inventorySummary: [
    { name: "In Stock", value: 1823 },
    { name: "Low Stock", value: 245 },
    { name: "Out of Stock", value: 37 },
  ],
  categories: [
    { name: "Electronics", count: 520 },
    { name: "Furniture", count: 350 },
    { name: "Office Supplies", count: 720 },
    { name: "Books", count: 180 },
    { name: "Miscellaneous", count: 215 },
  ],
  recentActivity: [
    { date: "Jun 1", count: 42 },
    { date: "Jun 2", count: 38 },
    { date: "Jun 3", count: 65 },
    { date: "Jun 4", count: 28 },
    { date: "Jun 5", count: 95 },
    { date: "Jun 6", count: 57 },
    { date: "Jun 7", count: 63 },
  ],
  topItems: [
    { name: "Office Chair", quantity: 86, change: 12 },
    { name: "Desk Lamp", quantity: 42, change: -8 },
    { name: "Notebook Pack", quantity: 128, change: 35 },
    { name: "Wireless Keyboard", quantity: 36, change: 0 },
  ],
};

const COLORS = ["#3498db", "#f39c12", "#e74c3c"];

export const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(mockInventoryData);

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const StatCard = ({ title, value, icon: Icon, trend, trendValue, description }: any) => {
    const isPositive = trendValue >= 0;
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            <div className="p-2 bg-primary/10 rounded-full text-primary">
              <Icon className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isLoading ? "-" : value}</div>
            {trend && (
              <div className="flex items-center text-xs mt-1">
                <span className={`flex items-center ${isPositive ? "text-green-500" : "text-red-500"}`}>
                  {isPositive ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
                  {Math.abs(trendValue)}%
                </span>
                <span className="text-muted-foreground ml-2">{description}</span>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <div className="mb-8">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-2"
        >
          Inventory Dashboard
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground"
        >
          Overview of your current inventory status and recent activity.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Items"
          value={isLoading ? "-" : "2,105"}
          icon={Package2}
          trend={true}
          trendValue={8.2}
          description="since last month"
        />
        <StatCard
          title="Low Stock Items"
          value={isLoading ? "-" : "245"}
          icon={AlertTriangle}
          trend={true}
          trendValue={-4.5}
          description="since last week"
        />
        <StatCard
          title="Categories"
          value={isLoading ? "-" : "18"}
          icon={Layers}
          trend={false}
        />
        <StatCard
          title="Recent Orders"
          value={isLoading ? "-" : "63"}
          icon={ShoppingCart}
          trend={true}
          trendValue={12.3}
          description="since last week"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader>
              <CardTitle>Activity Trends</CardTitle>
              <CardDescription>Inventory movement over the past week</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="h-64 flex items-center justify-center">
                  <div className="animate-pulse w-4 h-4 bg-primary/50 rounded-full mr-1"></div>
                  <div className="animate-pulse w-4 h-4 bg-primary/50 rounded-full mr-1 animation-delay-200"></div>
                  <div className="animate-pulse w-4 h-4 bg-primary/50 rounded-full animation-delay-400"></div>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={data.recentActivity} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="date" stroke="#888888" fontSize={12} />
                    <YAxis stroke="#888888" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                        borderRadius: "0.5rem",
                        border: "1px solid #e2e8f0",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="count"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6, stroke: "white", strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Inventory Status</CardTitle>
              <CardDescription>Current stock level overview</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              {isLoading ? (
                <div className="h-64 flex items-center justify-center">
                  <div className="animate-pulse w-4 h-4 bg-primary/50 rounded-full mr-1"></div>
                  <div className="animate-pulse w-4 h-4 bg-primary/50 rounded-full mr-1 animation-delay-200"></div>
                  <div className="animate-pulse w-4 h-4 bg-primary/50 rounded-full animation-delay-400"></div>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={data.inventorySummary}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={2}
                      dataKey="value"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {data.inventorySummary.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              )}
              <div className="grid grid-cols-3 gap-2 text-xs text-center mt-4">
                {COLORS.map((color, index) => (
                  <div key={`legend-${index}`} className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full mb-1" style={{ backgroundColor: color }}></div>
                    <span className="text-muted-foreground">{data.inventorySummary[index]?.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Categories</CardTitle>
              <CardDescription>Items per category</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="h-64 flex items-center justify-center">
                  <div className="animate-pulse w-4 h-4 bg-primary/50 rounded-full mr-1"></div>
                  <div className="animate-pulse w-4 h-4 bg-primary/50 rounded-full mr-1 animation-delay-200"></div>
                  <div className="animate-pulse w-4 h-4 bg-primary/50 rounded-full animation-delay-400"></div>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart
                    data={data.categories}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                    <XAxis type="number" fontSize={12} />
                    <YAxis dataKey="name" type="category" fontSize={12} width={100} />
                    <Tooltip />
                    <Bar dataKey="count" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader>
              <CardTitle>Top Items</CardTitle>
              <CardDescription>Most stocked items in your inventory</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="h-64 flex items-center justify-center">
                  <div className="animate-pulse w-4 h-4 bg-primary/50 rounded-full mr-1"></div>
                  <div className="animate-pulse w-4 h-4 bg-primary/50 rounded-full mr-1 animation-delay-200"></div>
                  <div className="animate-pulse w-4 h-4 bg-primary/50 rounded-full animation-delay-400"></div>
                </div>
              ) : (
                <div className="space-y-4">
                  {data.topItems.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg transition-all hover:bg-muted/50">
                      <div className="flex items-center">
                        <div className="p-2 rounded-full bg-primary/10 text-primary mr-3">
                          <Package2 className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                        </div>
                      </div>
                      <div className={`flex items-center text-sm ${item.change > 0 ? "text-green-500" : item.change < 0 ? "text-red-500" : "text-muted-foreground"}`}>
                        {item.change > 0 ? (
                          <ArrowUp className="w-4 h-4 mr-1" />
                        ) : item.change < 0 ? (
                          <ArrowDown className="w-4 h-4 mr-1" />
                        ) : (
                          <TrendingUp className="w-4 h-4 mr-1 text-muted-foreground" />
                        )}
                        {item.change > 0 ? "+" : ""}{item.change}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};
