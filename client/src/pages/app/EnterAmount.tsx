import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import { formatCurrency, parseCurrencyToFils } from "@shared/currency";

export default function EnterAmount() {
  const [, setLocation] = useLocation();
  const [amount, setAmount] = useState("");
  const currentBalance = 1700000; // 17,000 Dhs in fils

  const handleNumberClick = (num: string) => {
    if (num === "." && amount.includes(".")) return;
    if (amount.split(".")[1]?.length >= 2) return;
    setAmount(amount + num);
  };

  const handleBackspace = () => {
    setAmount(amount.slice(0, -1));
  };

  const handleContinue = () => {
    const amountInFils = parseCurrencyToFils(amount);
    sessionStorage.setItem("advance_amount", amountInFils.toString());
    setLocation("/app/select-account");
  };

  return (
    <div className="mobile-container min-h-screen bg-navy text-white flex flex-col">
      <div className="p-6">
        <button
          onClick={() => setLocation("/app/yalla")}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 px-8 py-6 space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Enter Amount</h1>
          <div className="h-1 w-16 bg-mint rounded-full"></div>
        </div>

        <div className="space-y-4">
          <p className="text-sm opacity-75">Current Balance</p>
          <p className="text-2xl font-bold text-mint">{formatCurrency(currentBalance)}</p>
        </div>

        <div className="text-center py-8">
          <div className="text-6xl font-bold mb-2">
            {amount || "0"}
          </div>
          <div className="h-1 bg-white/20 mx-auto" style={{ width: Math.max(100, amount.length * 40) }}></div>
        </div>

        {/* Quick Amount Buttons */}
        <div className="grid grid-cols-3 gap-3 px-4">
          <button
            onClick={() => setAmount("500")}
            className="bg-white/10 hover:bg-white/20 border border-white/30 rounded-lg py-4 px-3 transition-colors"
          >
            <div className="text-lg font-bold">500</div>
            <div className="text-xs opacity-75">Dhs</div>
          </button>
          <button
            onClick={() => setAmount("1000")}
            className="bg-white/10 hover:bg-white/20 border border-white/30 rounded-lg py-4 px-3 transition-colors"
          >
            <div className="text-lg font-bold">1,000</div>
            <div className="text-xs opacity-75">Dhs</div>
          </button>
          <button
            onClick={() => setAmount("2000")}
            className="bg-white/10 hover:bg-white/20 border border-white/30 rounded-lg py-4 px-3 transition-colors"
          >
            <div className="text-lg font-bold">2,000</div>
            <div className="text-xs opacity-75">Dhs</div>
          </button>
        </div>
      </div>

      {/* Number Pad */}
      <div className="p-8 space-y-4">
        <div className="grid grid-cols-3 gap-4">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0"].map((num) => (
            <button
              key={num}
              onClick={() => handleNumberClick(num)}
              className="text-3xl font-semibold py-6 hover:bg-white/10 rounded-lg transition-colors"
            >
              {num}
            </button>
          ))}
          <button
            onClick={handleBackspace}
            className="text-2xl py-6 hover:bg-white/10 rounded-lg transition-colors"
          >
            ⌫
          </button>
        </div>

        <Button
          onClick={handleContinue}
          disabled={!amount || parseFloat(amount) <= 0}
          className="w-full liberty-button text-lg py-6 disabled:opacity-50"
        >
          ✓
        </Button>
      </div>
    </div>
  );
}
