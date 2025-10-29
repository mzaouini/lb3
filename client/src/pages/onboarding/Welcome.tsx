import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function Welcome() {
  const [, setLocation] = useLocation();

  return (
    <div className="mobile-container min-h-screen bg-[#1a237e] flex flex-col items-center justify-center p-8 text-white">
      <div className="flex-1 flex flex-col items-center justify-center space-y-12 animate-fade-in">
        {/* Logo with Orange Stacked Icon */}
        <div className="flex items-center space-x-3">
          <div className="flex flex-col space-y-1">
            <div className="h-2 w-12 bg-[#ff9800] rounded-full"></div>
            <div className="h-2 w-12 bg-[#ff9800] rounded-full"></div>
            <div className="h-2 w-12 bg-[#ff9800] rounded-full"></div>
          </div>
          <h1 className="text-4xl font-bold text-white">Liberty Pay</h1>
        </div>

        {/* Welcome Message */}
        <div className="text-center space-y-4 max-w-sm">
          <h2 className="text-3xl font-bold">Welcome to Liberty Pay</h2>
          <p className="text-base opacity-90 leading-relaxed">
            Get instant salary advances and manage your finances with ease
          </p>
        </div>
      </div>

      {/* Get Started Button */}
      <div className="w-full pb-8">
        <Button
          onClick={() => setLocation("/onboarding/phone")}
          className="w-full bg-[#00bfa5] hover:bg-[#00a896] text-white text-lg py-6 rounded-lg font-semibold"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
}
