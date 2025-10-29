import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";

export default function OTPVerification() {
  const [, setLocation] = useLocation();
  const [otp, setOtp] = useState(["1", "2", "3", "4", "5", "6"]); // Prefilled demo OTP (editable)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [resendTimer, setResendTimer] = useState(60);

  useEffect(() => {
    const timer = setInterval(() => {
      setResendTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const otpCode = otp.join("");
    if (otpCode.length === 6) {
      // For testing: Accept fixed OTP 123456 or any 6-digit code
      // In production, this should validate against server-sent OTP
      const FIXED_OTP = "123456";
      
      if (otpCode === FIXED_OTP || process.env.NODE_ENV === "development") {
        sessionStorage.setItem("onboarding_otp", otpCode);
        setLocation("/onboarding/create-pin");
      } else {
        alert("Invalid OTP. For testing, use: 123456");
        setOtp(["", "", "", "", "", ""]);
        inputRefs.current[0]?.focus();
      }
    }
  };

  const phoneNumber = sessionStorage.getItem("onboarding_phone") || "";

  return (
    <div className="mobile-container min-h-screen bg-navy text-white flex flex-col">
      {/* Header */}
      <div className="p-6">
        <button
          onClick={() => setLocation("/onboarding/phone")}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 px-8 py-12 space-y-8 animate-fade-in">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Verify Your Number</h1>
          <div className="h-1 w-16 bg-mint rounded-full"></div>
        </div>

        <p className="text-lg opacity-90">
          Enter the 6-digit code sent to
          <br />
          <span className="font-semibold text-mint">+212 {phoneNumber}</span>
        </p>

        {/* OTP Input */}
        <div className="flex justify-between space-x-3">
          {otp.map((digit, index) => (
            <Input
              key={index}
              ref={(el) => { inputRefs.current[index] = el; }}
              type="tel"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-14 h-14 text-center text-2xl font-bold bg-white/10 border-white/20 text-white rounded-lg"
            />
          ))}
        </div>

        {/* Resend Code */}
        <div className="text-center">
          {resendTimer > 0 ? (
            <p className="text-sm opacity-75">
              Resend code in {resendTimer}s
            </p>
          ) : (
            <button
              onClick={() => setResendTimer(60)}
              className="text-sm text-mint font-semibold underline"
            >
              Resend Code
            </button>
          )}
        </div>
      </div>

      {/* Verify Button */}
      <div className="p-8">
        <Button
          onClick={handleVerify}
          disabled={otp.join("").length < 6}
          className="w-full liberty-button text-lg py-6 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Verify
        </Button>
      </div>
    </div>
  );
}
