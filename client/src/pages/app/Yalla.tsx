import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import { useLocation } from "wouter";

export default function Yalla() {
  const [, setLocation] = useLocation();

  const products = [
    {
      id: 1,
      title: "Salary Advance",
      description: "Access your salary effortlessly, anytime, anywhere",
      icon: "💰",
      action: () => setLocation("/app/enter-amount"),
    },
    {
      id: 2,
      title: "Family and Friends",
      description: "Send money to your friends from your salary",
      icon: "👥",
      action: () => alert("Feature coming soon"),
    },
  ];

  return (
    <div className="mobile-container min-h-screen bg-navy text-white">
      <div className="p-6">
        <button
          onClick={() => setLocation("/app/home")}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>

      <div className="px-8 py-6 space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Yalla</h1>
          <div className="h-1 w-16 bg-mint rounded-full"></div>
        </div>

        <div className="space-y-4">
          {products.map((product) => (
            <Card
              key={product.id}
              onClick={product.action}
              className="bg-white/10 border-white/20 p-6 cursor-pointer hover:bg-white/15 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="text-5xl">{product.icon}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
                  <p className="text-sm opacity-75">{product.description}</p>
                </div>
                <ChevronLeft className="w-6 h-6 rotate-180" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
