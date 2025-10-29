import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

export default function PhoneEntry() {
  const [, setLocation] = useLocation();
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleContinue = () => {
    if (phoneNumber.length >= 9) {
      // Store phone number in session storage for later use
      sessionStorage.setItem("onboarding_phone", phoneNumber);
      setLocation("/onboarding/otp");
    }
  };

  return (
    <div className="mobile-container min-h-screen bg-navy text-white flex flex-col">
      {/* Header */}
      <div className="p-6">
        <button
          onClick={() => setLocation("/onboarding/welcome")}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 px-8 py-12 space-y-8 animate-fade-in">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Enter Your Phone Number</h1>
          <div className="h-1 w-16 bg-mint rounded-full"></div>
        </div>

        <p className="text-lg opacity-90">
          We'll send you a verification code to confirm your number
        </p>

        {/* Phone Input */}
        <div className="space-y-4">
          <label className="block text-sm font-medium opacity-75">
            Mobile Number
          </label>
          <div className="flex items-center space-x-3">
            <div className="bg-white/10 rounded-lg px-4 py-3 text-lg font-semibold">
              +212
            </div>
            <Input
              type="tel"
              placeholder="6 XX XX XX XX"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
              maxLength={9}
              className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/50 text-lg py-6 rounded-lg"
            />
          </div>
        </div>

        <p className="text-sm opacity-75">
          By continuing, you agree to our{" "}
          <a href="#" className="underline text-mint">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="underline text-mint">
            Privacy Policy
          </a>
        </p>
      </div>

      {/* Continue Button */}
      <div className="p-8">
        <Button
          onClick={handleContinue}
          disabled={phoneNumber.length < 9}
          className="w-full liberty-button text-lg py-6 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
