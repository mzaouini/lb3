import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import { useLocation } from "wouter";
import { formatCurrency } from "@shared/currency";

export default function Review() {
  const [, setLocation] = useLocation();
  const amountInFils = parseInt(sessionStorage.getItem("advance_amount") || "15000");
  const serviceFee = 4000; // 40 Dhs
  const totalAmount = amountInFils + serviceFee;

  const handleConfirm = () => {
    setLocation("/app/success");
  };

  return (
    <div className="mobile-container min-h-screen bg-navy text-white flex flex-col">
      <div className="p-6">
        <button
          onClick={() => setLocation("/app/select-account")}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 px-8 py-6 space-y-6 overflow-y-auto">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Review</h1>
          <div className="h-1 w-16 bg-mint rounded-full"></div>
        </div>

        {/* Amount Card */}
        <Card className="bg-gradient-to-br from-purple-600 to-purple-800 border-0 p-6 text-white">
          <p className="text-sm opacity-75 mb-2">Amount</p>
          <p className="text-5xl font-bold">{formatCurrency(amountInFils)}</p>
        </Card>

        {/* Details */}
        <div className="space-y-4">
          <div className="flex justify-between py-3 border-b border-white/20">
            <span className="opacity-75">Service Charges</span>
            <span className="font-semibold">{formatCurrency(serviceFee)}</span>
          </div>

          <div className="flex justify-between py-3 border-b border-white/20">
            <span className="opacity-75">To Account Title</span>
            <span className="font-semibold text-right">DOrg FName53 DOrg LName53</span>
          </div>

          <div className="flex justify-between py-3 border-b border-white/20">
            <span className="opacity-75">To Account Number</span>
            <span className="font-semibold">7678232423445532242342424</span>
          </div>

          <div className="flex justify-between py-3 border-b border-white/20">
            <span className="opacity-75">Bank Name</span>
            <span className="font-semibold">Bank Muscat</span>
          </div>
        </div>

        <div className="bg-blue-500/20 border border-blue-400/30 rounded-lg p-4 flex items-start space-x-3">
          <div className="text-2xl">ℹ️</div>
          <p className="text-sm opacity-90">
            The amount and service fee will be deducted from your next salary that the employer processes
          </p>
        </div>
      </div>

      <div className="p-8">
        <Button
          onClick={handleConfirm}
          className="w-full liberty-button text-lg py-6"
        >
          ...
        </Button>
      </div>
    </div>
  );
}
