import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import { useRef, useState } from "react";
import { useLocation } from "wouter";

export default function CreatePIN() {
  const [, setLocation] = useLocation();
  const [pin, setPin] = useState(["", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleContinue = () => {
    const pinCode = pin.join("");
    if (pinCode.length === 4) {
      sessionStorage.setItem("onboarding_pin", pinCode);
      setLocation("/onboarding/confirm-pin");
    }
  };

  return (
    <div className="mobile-container min-h-screen bg-navy text-white flex flex-col">
      <div className="p-6">
        <button
          onClick={() => setLocation("/onboarding/otp")}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 px-8 py-12 space-y-8 animate-fade-in">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Create Your PIN</h1>
          <div className="h-1 w-16 bg-mint rounded-full"></div>
        </div>

        <p className="text-lg opacity-90">
          Create a 4-digit PIN to secure your account
        </p>

        <div className="flex justify-center space-x-4 py-8">
          {pin.map((digit, index) => (
            <Input
              key={index}
              ref={(el) => { inputRefs.current[index] = el; }}
              type="password"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value.replace(/\D/g, ""))}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-16 h-16 text-center text-2xl font-bold bg-white/10 border-white/20 text-white rounded-lg"
            />
          ))}
        </div>

        <div className="space-y-3 text-sm opacity-75">
          <p>✓ Use a unique PIN</p>
          <p>✓ Don't share your PIN with anyone</p>
          <p>✓ Avoid using obvious numbers like 1234</p>
        </div>
      </div>

      <div className="p-8">
        <Button
          onClick={handleContinue}
          disabled={pin.join("").length < 4}
          className="w-full liberty-button text-lg py-6 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
