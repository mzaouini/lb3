import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useLocation } from "wouter";

export default function OTPVerification() {
  const [, setLocation] = useLocation();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Auto-focus first input
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return; // Only allow single digit
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const otpCode = otp.join("");
    if (otpCode.length === 6) {
      // Store that advance was completed
      sessionStorage.setItem("advance_completed", "true");
      setLocation("/app/success");
    }
  };

  const isComplete = otp.every(digit => digit !== "");

  return (
    <div className="mobile-container min-h-screen bg-gray-50">
      {/* Header */}
      <div className="liberty-gradient text-white p-6 rounded-b-3xl">
        <button
          onClick={() => setLocation("/app/select-account")}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors mb-4"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-bold">Verify OTP</h1>
        <p className="text-sm opacity-90 mt-1">Enter the 6-digit code sent to your phone</p>
      </div>

      <div className="px-6 py-12 space-y-8">
        {/* OTP Input */}
        <div className="flex justify-center space-x-3">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => { inputRefs.current[index] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:border-teal focus:outline-none transition-colors"
            />
          ))}
        </div>

        {/* Demo hint */}
        <div className="bg-mint/10 border border-mint/30 rounded-lg p-4">
          <p className="text-sm text-navy text-center">
            <span className="font-semibold">Demo:</span> Enter any 6 digits to continue
          </p>
        </div>

        {/* Resend */}
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-2">Didn't receive the code?</p>
          <button
            onClick={() => alert("OTP resent!")}
            className="text-teal font-semibold text-sm hover:underline"
          >
            Resend OTP
          </button>
        </div>

        {/* Verify Button */}
        <Button
          onClick={handleVerify}
          disabled={!isComplete}
          className="w-full bg-navy hover:bg-navy/90 text-white py-6 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Verify & Continue
        </Button>
      </div>
    </div>
  );
}
