import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ChevronLeft, ChevronRight, CreditCard, Banknote, Globe, Nfc, Diamond } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

export default function CardSettings() {
  const [, setLocation] = useLocation();
  const [onlinePayment, setOnlinePayment] = useState(true);
  const [atmWithdrawal, setAtmWithdrawal] = useState(true);
  const [paymentAbroad, setPaymentAbroad] = useState(false);
  const [nfcPayments, setNfcPayments] = useState(true);

  return (
    <div className="mobile-container min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setLocation("/app/cards")}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-xl font-semibold text-gray-900">Cards Actions</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Online Payment */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Online Payment</h3>
              <p className="text-sm text-gray-500">Enable online payments</p>
            </div>
          </div>
          <Switch
            checked={onlinePayment}
            onCheckedChange={setOnlinePayment}
          />
        </div>

        {/* ATM Withdrawal */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Banknote className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">ATM Withdrawal</h3>
              <p className="text-sm text-gray-500">Enable ATM withdrawing money</p>
            </div>
          </div>
          <Switch
            checked={atmWithdrawal}
            onCheckedChange={setAtmWithdrawal}
          />
        </div>

        {/* Payment Abroad */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Globe className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Payment Abroad</h3>
              <p className="text-sm text-gray-500">Enable using card internationally</p>
            </div>
          </div>
          <Switch
            checked={paymentAbroad}
            onCheckedChange={setPaymentAbroad}
          />
        </div>

        {/* NFC Payments */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-between">
              <Nfc className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">NFC Payments</h3>
              <p className="text-sm text-gray-500">Enable touch-less payments</p>
            </div>
          </div>
          <Switch
            checked={nfcPayments}
            onCheckedChange={setNfcPayments}
          />
        </div>

        {/* Card Benefits */}
        <button
          onClick={() => {
            // Navigate to card benefits page
            alert("Card Benefits feature coming soon!");
          }}
          className="w-full bg-white rounded-xl p-4 shadow-sm border border-gray-200 flex items-center justify-between hover:bg-background transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
              <Diamond className="w-6 h-6 text-pink-600" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-900">Card Benefits</h3>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
      </div>
    </div>
  );
}
