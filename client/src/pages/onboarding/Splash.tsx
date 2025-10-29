import { useEffect } from "react";
import { useLocation } from "wouter";

export default function Splash() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Auto-redirect to welcome screen after 2 seconds
    const timer = setTimeout(() => {
      setLocation("/onboarding/welcome");
    }, 2000);

    return () => clearTimeout(timer);
  }, [setLocation]);

  return (
    <div className="min-h-screen w-full liberty-gradient flex items-center justify-center">
      <div className="mobile-container flex items-center justify-center">
        {/* Liberty Pay Logo */}
        <div className="animate-fade-in">
          <div className="flex items-center space-x-3 px-8 py-6 border-2 border-mint rounded-2xl">
            {/* Logo Icon */}
            <div className="flex flex-col space-y-1">
              <div className="w-10 h-1.5 bg-gold rounded-full"></div>
              <div className="w-10 h-1.5 bg-gold rounded-full"></div>
              <div className="w-10 h-1.5 bg-gold rounded-full"></div>
            </div>
            {/* Text */}
            <h1 className="text-4xl font-bold text-white">Liberty Pay</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
