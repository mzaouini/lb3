import { Button } from "@/components/ui/button";
import { APP_LOGO, APP_TITLE } from "@/const";
import { useLocation } from "wouter";

export default function Welcome() {
  const [, setLocation] = useLocation();

  return (
    <div className="mobile-container liberty-gradient flex flex-col items-center justify-between p-8 text-white">
      <div className="flex-1 flex flex-col items-center justify-center space-y-8 animate-fade-in">
        {/* Logo */}
        <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-2xl">
          {APP_LOGO ? (
            <img src={APP_LOGO} alt={APP_TITLE} className="w-24 h-24 object-contain" />
          ) : (
            <div className="text-navy text-4xl font-bold">LP</div>
          )}
        </div>

        {/* Title */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">{APP_TITLE}</h1>
          <p className="text-lg opacity-90">
            Access your salary effortlessly,
            <br />
            anytime, anywhere
          </p>
        </div>

        {/* Features */}
        <div className="space-y-4 text-center max-w-sm">
          <div className="space-y-2">
            <div className="text-mint text-2xl">✓</div>
            <p className="text-sm opacity-90">Instant salary advances</p>
          </div>
          <div className="space-y-2">
            <div className="text-mint text-2xl">✓</div>
            <p className="text-sm opacity-90">Secure and transparent</p>
          </div>
          <div className="space-y-2">
            <div className="text-mint text-2xl">✓</div>
            <p className="text-sm opacity-90">No hidden fees</p>
          </div>
        </div>
      </div>

      {/* Get Started Button */}
      <div className="w-full space-y-4 animate-fade-up">
        <Button
          onClick={() => setLocation("/onboarding/phone")}
          className="w-full liberty-button text-lg py-6"
        >
          Get Started
        </Button>
        <p className="text-center text-sm opacity-75">
          Already have an account?{" "}
          <button
            onClick={() => setLocation("/")}
            className="underline font-semibold"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
}
