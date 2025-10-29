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
        {/* Prepaid Card with Navy to Orange Gradient */}
        <Card className="bg-gradient-to-br from-[#1a237e] via-[#283593] to-[#ff6f00] text-white p-8 shadow-2xl">
          <div className="flex justify-between items-start mb-12">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl font-bold">LP</span>
            </div>
            <div className="text-right">
              <div className="flex space-x-2">
                <div className="w-10 h-10 bg-red-500 rounded-full opacity-80"></div>
                <div className="w-10 h-10 bg-yellow-500 rounded-full opacity-80 -ml-4"></div>
              </div>
              <p className="text-xs mt-2 opacity-75">Mastercard</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-xs opacity-75 mb-1">Card Number</p>
              <p className="text-xl font-mono tracking-wider">**** **** **** 1983</p>
            </div>
            <div className="flex justify-between">
              <div>
                <p className="text-xs opacity-75 mb-1">Card Holder</p>
                <p className="font-semibold">Meryem Guezzour</p>
              </div>
              <div>
                <p className="text-xs opacity-75 mb-1">Expires</p>
                <p className="font-semibold">12/28</p>
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
