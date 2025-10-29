import { Card } from "@/components/ui/card";
import { ChevronLeft, CreditCard, History, Home, Lock, Settings, User } from "lucide-react";
import { useLocation } from "wouter";
import { formatCurrency } from "@shared/currency";

export default function Cards() {
  const [, setLocation] = useLocation();
  const balance = 233333; // 2,333.33 Dhs (50% of earned salary for 14 days)

  return (
    <div className="mobile-container min-h-screen bg-gray-50 pb-24">
      <div className="liberty-gradient text-white p-6 rounded-b-3xl">
        <button
          onClick={() => setLocation("/app/home")}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors mb-4"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-bold">My Card</h1>
      </div>

      <div className="px-6 -mt-16 space-y-6">
        {/* Prepaid Card with Decorative Pattern */}
        <Card className="relative bg-[#2d1b4e] text-white p-8 shadow-2xl overflow-hidden">
          {/* Decorative teal pattern on right side */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-30">
            <svg viewBox="0 0 200 300" className="h-full w-full">
              <path d="M 100 50 Q 150 80, 180 120 Q 200 150, 180 180 Q 150 220, 120 240" 
                    stroke="#00d4aa" strokeWidth="8" fill="none" strokeLinecap="round"/>
              <path d="M 120 40 Q 160 70, 190 110 Q 210 140, 190 170 Q 160 210, 130 230" 
                    stroke="#00d4aa" strokeWidth="8" fill="none" strokeLinecap="round"/>
              <path d="M 80 60 Q 130 90, 160 130 Q 180 160, 160 190 Q 130 230, 100 250" 
                    stroke="#00d4aa" strokeWidth="8" fill="none" strokeLinecap="round"/>
            </svg>
          </div>

          <div className="relative z-10">
            <div className="flex justify-between items-start mb-8">
              {/* LibertyPay Logo */}
              <div className="flex items-center space-x-2">
                <div className="flex flex-col space-y-0.5">
                  <div className="h-1 w-8 bg-[#ff9800] rounded"></div>
                  <div className="h-1 w-8 bg-[#ff9800] rounded"></div>
                  <div className="h-1 w-8 bg-[#ff9800] rounded"></div>
                </div>
                <span className="text-sm font-bold">LibertyPay</span>
              </div>
              {/* Small A logo (placeholder for brand) */}
              <div className="text-mint text-xl font-bold">Ⓐ</div>
            </div>

            {/* Chip */}
            <div className="mb-8">
              <div className="w-12 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded flex items-center justify-center">
                <div className="text-xs">📶</div>
              </div>
            </div>

            {/* Card Number */}
            <div className="mb-6">
              <p className="text-lg font-mono tracking-widest">5335 7600 0000 1983</p>
            </div>

            {/* Card Holder and Mastercard */}
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[10px] opacity-60 mb-1">© Client - 142 345 678</p>
                <p className="text-sm font-semibold tracking-wide">MERYEM GUEZZOUR</p>
              </div>
              <div className="flex space-x-1">
                <div className="w-8 h-8 bg-red-500 rounded-full"></div>
                <div className="w-8 h-8 bg-orange-400 rounded-full -ml-3"></div>
              </div>
            </div>
          </div>
        </Card>

        {/* Balance */}
        <Card className="p-6">
          <p className="text-sm text-gray-600 mb-2">Current Balance</p>
          <p className="text-4xl font-bold text-navy">{formatCurrency(balance)}</p>
        </Card>

        {/* Actions */}
        <div className="grid grid-cols-3 gap-4">
          <button
            onClick={() => alert("Feature coming soon")}
            className="flex flex-col items-center space-y-2 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Lock className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-xs text-gray-700 font-medium">Lock Card</span>
          </button>
          <button
            onClick={() => alert("Feature coming soon")}
            className="flex flex-col items-center space-y-2 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Settings className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-xs text-gray-700 font-medium">Limits</span>
          </button>
          <button
            onClick={() => alert("Feature coming soon")}
            className="flex flex-col items-center space-y-2 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <History className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-xs text-gray-700 font-medium">History</span>
          </button>
        </div>

        {/* Recent Transactions */}
        <Card className="p-6">
          <h3 className="font-bold text-navy mb-4">Recent Transactions</h3>
          <div className="text-center py-8 text-gray-400">
            <p className="text-sm">No card transactions yet</p>
          </div>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4">
        <div className="mobile-container flex justify-around items-center">
          <button onClick={() => setLocation("/app/home")} className="flex flex-col items-center space-y-1 text-gray-400">
            <Home className="w-8 h-8" />
            <span className="text-xs">Home</span>
          </button>
          <button onClick={() => setLocation("/app/transactions")} className="flex flex-col items-center space-y-1 text-gray-400">
            <History className="w-8 h-8" />
            <span className="text-xs">Transactions</span>
          </button>
          <button className="flex flex-col items-center space-y-1 text-teal">
            <div className="w-8 h-8 bg-teal rounded-lg flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs font-semibold">Cards</span>
          </button>
          <button onClick={() => setLocation("/app/profile")} className="flex flex-col items-center space-y-1 text-gray-400">
            <User className="w-8 h-8" />
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}
