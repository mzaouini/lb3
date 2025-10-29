import { Button } from "@/components/ui/button";
import { Clock, CheckCircle2 } from "lucide-react";
import { useLocation } from "wouter";

export default function VerificationComplete() {
  const [, setLocation] = useLocation();

  const handleContinue = () => {
    // Mark onboarding as complete
    sessionStorage.setItem("onboarding_complete", "true");
    // Redirect to login screen
    setLocation("/onboarding/login");
  };

  return (
    <div className="mobile-container min-h-screen bg-navy text-white flex flex-col">
      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-12 space-y-8 animate-fade-in">
        {/* Success Icon with Animation */}
        <div className="relative">
          {/* Outer pulse ring */}
          <div className="absolute inset-0 bg-mint/20 rounded-full animate-ping"></div>
          <div className="absolute inset-0 bg-mint/10 rounded-full animate-pulse"></div>
          
          {/* Main icon */}
          <div className="relative w-32 h-32 bg-gradient-to-br from-mint to-teal rounded-full flex items-center justify-center">
            <Clock className="w-16 h-16 text-navy" strokeWidth={2.5} />
          </div>
        </div>

        {/* Title */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Verification Submitted!</h1>
          <div className="h-1 w-16 bg-mint rounded-full mx-auto"></div>
        </div>

        {/* Status Message */}
        <div className="bg-white/10 rounded-2xl p-6 space-y-4 w-full">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-mint/20 rounded-full flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-6 h-6 text-mint" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">Under Review</h3>
              <p className="text-sm opacity-75">Your application is being processed</p>
            </div>
          </div>

          <div className="border-t border-white/10 pt-4 space-y-3 text-sm">
            <p className="opacity-90">
              We're reviewing your documents and information. This typically takes:
            </p>
            <div className="bg-mint/10 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-mint">24-48 hours</p>
              <p className="text-xs opacity-75 mt-1">Average processing time</p>
            </div>
          </div>
        </div>

        {/* What's Next */}
        <div className="w-full space-y-4">
          <h3 className="font-semibold text-lg">What happens next?</h3>
          
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-mint/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-mint text-xs font-bold">1</span>
              </div>
              <div className="flex-1">
                <p className="text-sm opacity-90">
                  Our team will verify your identity documents
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-mint/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-mint text-xs font-bold">2</span>
              </div>
              <div className="flex-1">
                <p className="text-sm opacity-90">
                  You'll receive a notification once approved
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-mint/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-mint text-xs font-bold">3</span>
              </div>
              <div className="flex-1">
                <p className="text-sm opacity-90">
                  Start accessing salary advances immediately after approval
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="w-full bg-gold/10 border border-gold/30 rounded-xl p-4">
          <p className="text-sm text-center">
            <span className="font-semibold text-gold">Note:</span> You can explore the app now, but salary advance features will be available after verification.
          </p>
        </div>
      </div>

      {/* Action Button */}
      <div className="p-8">
        <Button
          onClick={handleContinue}
          className="w-full liberty-button text-lg py-6"
        >
          Explore LibertyPay
        </Button>
      </div>
    </div>
  );
}
