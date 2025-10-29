import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { APP_TITLE } from "@/const";
import { formatCurrency } from "@shared/currency";
import { ArrowRight, CreditCard, History, User } from "lucide-react";
import { useLocation } from "wouter";

export default function AppHome() {
  const [, setLocation] = useLocation();
  
  // Mock data - will be replaced with real data from tRPC
  const availableBalance = 1685000; // 16,850 Dhs in fils
  const userName = "demo";

  return (
    <div className="mobile-container min-h-screen bg-gray-50">
      {/* Header with gradient */}
      <div className="liberty-gradient text-white p-8 pb-32 rounded-b-3xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Hi, {userName}</h1>
          <button
            onClick={() => setLocation("/app/profile")}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <User className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Balance Card - Overlapping */}
      <div className="px-6 -mt-24 mb-6">
        <Card className="liberty-card shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-navy rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">LP</span>
              </div>
              <span className="text-sm text-gray-600">{APP_TITLE}</span>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <div className="w-1 h-1 bg-gray-400 rounded-full mb-1"></div>
              <div className="w-1 h-1 bg-gray-400 rounded-full mb-1"></div>
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            </button>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-gray-600">Available Balance</p>
            <p className="text-4xl font-bold text-navy">
              {formatCurrency(availableBalance)}
            </p>
          </div>

          <Button
            onClick={() => setLocation("/app/yalla")}
            className="w-full mt-6 liberty-button text-lg py-6"
          >
            YALLA
          </Button>
        </Card>
      </div>

      {/* Recent Transactions */}
      <div className="px-6 space-y-4 pb-24">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-navy">Recent Transactions</h2>
          <button
            onClick={() => setLocation("/app/transactions")}
            className="text-teal font-semibold text-sm flex items-center space-x-1"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mock transaction */}
        <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <History className="w-6 h-6 text-gold" />
              </div>
              <div>
                <p className="font-semibold text-navy">DOrg FName53 DOrg LName53</p>
                <p className="text-sm text-gray-500">29 Oct 2025 | 12:48 PM</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-orange-600">Dhs 104</p>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                <p className="text-xs text-gray-500">In Progress</p>
              </div>
            </div>
          </div>
        </Card>

        <div className="text-center py-8 text-gray-400">
          <p className="text-sm">No more transactions</p>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4">
        <div className="mobile-container flex justify-around items-center">
          <button
            onClick={() => setLocation("/app/home")}
            className="flex flex-col items-center space-y-1 text-teal"
          >
            <div className="w-8 h-8 bg-teal rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </div>
            <span className="text-xs font-semibold">Home</span>
          </button>

          <button
            onClick={() => setLocation("/app/transactions")}
            className="flex flex-col items-center space-y-1 text-gray-400"
          >
            <History className="w-8 h-8" />
            <span className="text-xs">Transactions</span>
          </button>

          <button
            onClick={() => setLocation("/app/cards")}
            className="flex flex-col items-center space-y-1 text-gray-400"
          >
            <CreditCard className="w-8 h-8" />
            <span className="text-xs">Cards</span>
          </button>

          <button
            onClick={() => setLocation("/app/profile")}
            className="flex flex-col items-center space-y-1 text-gray-400"
          >
            <User className="w-8 h-8" />
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}
