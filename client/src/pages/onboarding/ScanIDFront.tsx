import { Button } from "@/components/ui/button";
import { Camera, ChevronLeft } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

export default function ScanIDFront() {
  const [, setLocation] = useLocation();
  const [isScanning, setIsScanning] = useState(false);
  const [scanned, setScanned] = useState(false);

  const handleScan = () => {
    setIsScanning(true);
    // Simulate scanning process
    setTimeout(() => {
      setIsScanning(false);
      setScanned(true);
      sessionStorage.setItem("onboarding_id_front", "scanned");
    }, 2000);
  };

  const handleContinue = () => {
    setLocation("/onboarding/scan-id-back");
  };

  return (
    <div className="mobile-container min-h-screen bg-navy text-white flex flex-col">
      {/* Header */}
      <div className="p-6">
        <button
          onClick={() => setLocation("/onboarding/personal-details")}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 px-8 py-8 space-y-8 animate-fade-in">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Scan Your ID</h1>
          <div className="h-1 w-16 bg-mint rounded-full"></div>
          <p className="text-lg opacity-90">
            Position the front of your National ID card within the frame
          </p>
        </div>

        {/* Camera Frame */}
        <div className="relative">
          <div className="aspect-[1.586/1] bg-white/10 rounded-2xl border-2 border-dashed border-mint/50 flex items-center justify-center overflow-hidden">
            {!scanned ? (
              <div className="text-center space-y-4">
                <Camera className="w-16 h-16 mx-auto text-mint" />
                <p className="text-sm opacity-75">
                  {isScanning ? "Scanning..." : "Tap to scan ID front"}
                </p>
              </div>
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-mint/20 to-teal/20 flex items-center justify-center">
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 mx-auto bg-mint rounded-full flex items-center justify-center">
                    <svg
                      className="w-10 h-10 text-navy"
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
                  <p className="text-mint font-semibold">ID Front Captured!</p>
                </div>
              </div>
            )}
          </div>

          {/* Corner Guides */}
          {!scanned && (
            <>
              <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-mint rounded-tl-2xl"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-mint rounded-tr-2xl"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-mint rounded-bl-2xl"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-mint rounded-br-2xl"></div>
            </>
          )}
        </div>

        {/* Instructions */}
        <div className="space-y-3 text-sm opacity-90">
          <div className="flex items-start space-x-3">
            <div className="w-1.5 h-1.5 bg-mint rounded-full mt-2"></div>
            <p>Ensure all corners of the ID are visible</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-1.5 h-1.5 bg-mint rounded-full mt-2"></div>
            <p>Make sure the ID is well-lit and in focus</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-1.5 h-1.5 bg-mint rounded-full mt-2"></div>
            <p>Avoid glare and shadows on the ID</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-8 space-y-4">
        {!scanned ? (
          <Button
            onClick={handleScan}
            disabled={isScanning}
            className="w-full liberty-button text-lg py-6"
          >
            {isScanning ? (
              <span className="flex items-center justify-center space-x-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>Scanning...</span>
              </span>
            ) : (
              "Scan ID Front"
            )}
          </Button>
        ) : (
          <Button
            onClick={handleContinue}
            className="w-full liberty-button text-lg py-6"
          >
            Continue
          </Button>
        )}
      </div>
    </div>
  );
}
