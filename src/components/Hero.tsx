
import { motion } from "framer-motion";
import { ScanLine, Layers, PieChart, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const navigate = useNavigate();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const features = [
    {
      icon: ScanLine,
      title: "AI-Powered Scanning",
      description: "Instantly recognize and count inventory items with cutting-edge AI technology.",
    },
    {
      icon: Layers,
      title: "Intelligent Categorization",
      description: "Automatically organize items by type, size, and other attributes.",
    },
    {
      icon: PieChart,
      title: "Real-time Analytics",
      description: "Track inventory levels and gain insights with beautiful visualizations.",
    },
    {
      icon: CheckCircle,
      title: "Error Prevention",
      description: "Reduce counting errors with AI verification and duplicate detection.",
    },
  ];

  return (
    <div className="relative overflow-hidden pt-16">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block mb-6"
          >
            <span className="inline-flex items-center justify-center p-2 bg-primary/10 backdrop-blur-sm rounded-xl text-primary">
              <ScanLine className="w-6 h-6" />
            </span>
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Inventory Counting{" "}
            <span className="text-primary">Reimagined</span> with AI
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Streamline your inventory process with our intelligent AI-powered counting system. Fast, accurate, and effortless.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="rounded-full px-8 transition-all hover:shadow-lg"
              onClick={() => navigate("/scan")}
            >
              Start Scanning
              <ScanLine className="ml-2 w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-8 transition-all"
              onClick={() => navigate("/dashboard")}
            >
              View Dashboard
            </Button>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-24"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={item}
              className="glass rounded-2xl p-6 flex flex-col items-center text-center transition-all hover:shadow-md"
            >
              <div className="p-3 rounded-xl bg-primary/10 text-primary mb-4">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
