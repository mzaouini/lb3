import { Button } from "@/components/ui/button";
import { Camera, ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";

export default function LivenessCheck() {
  const [, setLocation] = useLocation();
  const [isChecking, setIsChecking] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [instruction, setInstruction] = useState("Look straight at the camera");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isChecking && !completed) {
      const instructions = [
        "Look straight at the camera",
        "Turn your head slightly left",
        "Turn your head slightly right",
        "Smile naturally",
        "Verifying..."
      ];
      
      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        if (currentStep < instructions.length) {
          setInstruction(instructions[currentStep]);
          setProgress((currentStep / instructions.length) * 100);
        } else {
          clearInterval(interval);
          setCompleted(true);
          setProgress(100);
          sessionStorage.setItem("onboarding_liveness", "completed");
        }
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [isChecking, completed]);

  const handleStart = () => {
    setIsChecking(true);
  };

  const handleContinue = () => {
    setLocation("/onboarding/verification-complete");
  };

  return (
    <div className="mobile-container min-h-screen bg-navy text-white flex flex-col">
      {/* Header */}
      <div className="p-6">
        <button
          onClick={() => setLocation("/onboarding/scan-id-back")}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 px-8 py-8 space-y-8 animate-fade-in">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Liveness Check</h1>
          <div className="h-1 w-16 bg-mint rounded-full"></div>
          <p className="text-lg opacity-90">
            Follow the instructions to verify you're a real person
          </p>
        </div>

        {/* Camera Frame */}
        <div className="relative">
          <div className="aspect-square bg-white/10 rounded-full border-4 border-mint/50 flex items-center justify-center overflow-hidden max-w-sm mx-auto">
            {!isChecking ? (
              <div className="text-center space-y-4 p-8">
                <Camera className="w-20 h-20 mx-auto text-mint" />
                <p className="text-sm opacity-75">
                  Position your face in the center
                </p>
              </div>
            ) : !completed ? (
              <div className="w-full h-full bg-gradient-to-br from-mint/20 to-teal/20 flex items-center justify-center relative">
                {/* Simulated face outline */}
                <div className="w-48 h-56 border-4 border-mint rounded-full opacity-50"></div>
                
                {/* Scanning line animation */}
                <div 
                  className="absolute inset-0 bg-gradient-to-b from-transparent via-mint/30 to-transparent animate-pulse"
                  style={{
                    transform: `translateY(${progress}%)`,
                    transition: 'transform 2s linear'
                  }}
                ></div>
              </div>
            ) : (
              <div className="w-full h-full relative">
                <img 
                  src="/demo/liveness.png" 
                  alt="Liveness Check" 
                  className="w-full h-full object-cover rounded-full"
                />
                <div className="absolute top-4 right-4 bg-mint rounded-full p-2">
                  <svg
                    className="w-6 h-6 text-navy"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
            )}
          </div>

          {/* Progress Ring */}
          {isChecking && !completed && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <svg className="w-full h-full max-w-sm" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="48"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-mint"
                  strokeDasharray={`${progress * 3.01} 301`}
                  strokeLinecap="round"
                  style={{ transition: 'stroke-dasharray 0.5s ease' }}
                />
              </svg>
            </div>
          )}
        </div>

        {/* Instruction Text */}
        {isChecking && (
          <div className="text-center">
            <p className="text-xl font-semibold text-mint animate-pulse">
              {instruction}
            </p>
            <div className="mt-4 w-full bg-white/10 rounded-full h-2">
              <div 
                className="bg-mint h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Instructions */}
        {!isChecking && (
          <div className="space-y-3 text-sm opacity-90">
            <div className="flex items-start space-x-3">
              <div className="w-1.5 h-1.5 bg-mint rounded-full mt-2"></div>
              <p>Position your face in the center of the circle</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-1.5 h-1.5 bg-mint rounded-full mt-2"></div>
              <p>Ensure your face is well-lit and clearly visible</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-1.5 h-1.5 bg-mint rounded-full mt-2"></div>
              <p>Follow the on-screen instructions</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-1.5 h-1.5 bg-mint rounded-full mt-2"></div>
              <p>Remove glasses or face coverings if possible</p>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="p-8 space-y-4">
        {!isChecking ? (
          <Button
            onClick={handleStart}
            className="w-full liberty-button text-lg py-6"
          >
            Start Liveness Check
          </Button>
        ) : completed ? (
          <Button
            onClick={handleContinue}
            className="w-full liberty-button text-lg py-6"
          >
            Continue
          </Button>
        ) : (
          <div className="text-center text-sm opacity-75">
            Please follow the instructions...
          </div>
        )}
      </div>
    </div>
  );
}
