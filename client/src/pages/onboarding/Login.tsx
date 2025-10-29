import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useLocation } from "wouter";

export default function Login() {
  const [, setLocation] = useLocation();
  const [phone, setPhone] = useState("+212612345678");
  const [pin, setPin] = useState("1234");
  const [error, setError] = useState("");

  const handleLogin = () => {
    // Test credentials: +212 612345678, PIN: 1234
    if (phone === "+212612345678" || phone === "212612345678" || phone === "612345678") {
      if (pin === "1234") {
        // Store login state
        sessionStorage.setItem("isLoggedIn", "true");
        sessionStorage.setItem("userName", "Meryem Guezzour");
        setLocation("/app/home");
      } else {
        setError("Incorrect PIN. Try 1234");
      }
    } else {
      setError("Phone number not found. Try +212 612345678");
    }
  };

  return (
    <div className="mobile-container min-h-screen liberty-gradient flex flex-col items-center justify-center p-6 text-white">
      <div className="w-full max-w-sm space-y-8">
        {/* Logo */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <div className="flex flex-col space-y-1">
              <div className="h-2 w-12 bg-[#ff9800] rounded"></div>
              <div className="h-2 w-12 bg-[#ff9800] rounded"></div>
              <div className="h-2 w-12 bg-[#ff9800] rounded"></div>
            </div>
            <h1 className="text-3xl font-bold">Liberty Pay</h1>
          </div>
          <p className="text-lg opacity-90">Welcome Back</p>
        </div>

        {/* Login Form */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Phone Number</label>
            <Input
              type="tel"
              placeholder="+212 612345678"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                setError("");
              }}
              className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">PIN</label>
            <Input
              type="password"
              placeholder="Enter your 4-digit PIN"
              maxLength={4}
              value={pin}
              onChange={(e) => {
                setPin(e.target.value.replace(/\D/g, ""));
                setError("");
              }}
              className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
            />
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3">
              <p className="text-sm text-red-100">{error}</p>
            </div>
          )}

          <Button
            onClick={handleLogin}
            disabled={!phone || pin.length !== 4}
            className="w-full liberty-button text-lg py-6"
          >
            Login
          </Button>

          <div className="text-center space-y-2">
            <button
              onClick={() => setLocation("/onboarding/phone")}
              className="text-sm text-mint hover:underline"
            >
              Forgot PIN?
            </button>
            <div className="text-sm opacity-75">
              Don't have an account?{" "}
              <button
                onClick={() => setLocation("/onboarding/welcome")}
                className="text-mint hover:underline font-semibold"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>

        {/* Test Credentials Helper */}
        <div className="bg-white/10 rounded-lg p-4 text-xs space-y-1">
          <p className="font-semibold text-mint">Test Credentials:</p>
          <p>Phone: +212 612345678</p>
          <p>PIN: 1234</p>
        </div>
      </div>
    </div>
  );
}
