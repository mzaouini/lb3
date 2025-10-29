import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ChevronLeft, CreditCard, History, Home, User } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import { formatCurrency } from "@shared/currency";

export default function Transactions() {
  const [, setLocation] = useLocation();
  const [startDate, setStartDate] = useState("01 Oct, 2025");
  const [endDate, setEndDate] = useState("29 Oct, 2025");

  const transactions = [
    {
      id: 1,
      title: "Meryem - ACME",
      date: "29 Oct 2025 | 12:48 PM",
      amount: 206000, // 2,060 Dhs (2,000 + 60 fee)
      status: "completed",
    },
    {
      id: 2,
      title: "Meryem - ACME",
      date: "15 Oct 2025 | 09:30 AM",
      amount: 106000, // 1,060 Dhs (1,000 + 60 fee)
      status: "completed",
    },
  ];

  return (
    <div className="mobile-container min-h-screen bg-navy text-white pb-24">
      <div className="p-6">
        <button
          onClick={() => setLocation("/app/home")}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>

      <div className="px-8 py-6 space-y-6">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Transaction History</h1>
          <div className="h-1 w-16 bg-mint rounded-full"></div>
        </div>

        {/* Date Range */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm opacity-75 mb-2 block">Start Date</label>
            <Input
              type="text"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-white/10 border-white/20 text-white"
            />
          </div>
          <div>
            <label className="text-sm opacity-75 mb-2 block">End Date</label>
            <Input
              type="text"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="bg-white/10 border-white/20 text-white"
            />
          </div>
        </div>

        {/* Total */}
        <div className="text-center py-6">
          <p className="text-sm opacity-75 mb-2">Total Transaction</p>
          <p className="text-4xl font-bold text-mint">{formatCurrency(transactions.reduce((sum, tx) => sum + tx.amount, 0))}</p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 border-b border-white/20">
          <button className="pb-3 border-b-2 border-mint text-mint font-semibold">All</button>
          <button className="pb-3 opacity-50">Successful</button>
          <button className="pb-3 opacity-50">In-Progress</button>
          <button className="pb-3 opacity-50">Failed</button>
        </div>

        {/* Transactions List */}
        {transactions.length > 0 ? (
          <div className="space-y-4">
            <p className="text-mint font-semibold">October 29</p>
            {transactions.map((tx) => (
              <Card key={tx.id} className="bg-white/10 border-white/20 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      tx.status === 'completed' ? 'bg-green-500/20' : 'bg-orange-500/20'
                    }`}>
                      <span className={tx.status === 'completed' ? 'text-green-500' : 'text-orange-500'}>
                        {tx.status === 'completed' ? '✓' : '⚠️'}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold">{tx.title}</p>
                      <p className="text-sm opacity-75">{tx.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${
                      tx.status === 'completed' ? 'text-green-500' : 'text-orange-500'
                    }`}>{formatCurrency(tx.amount)}</p>
                    <p className="text-xs opacity-75">
                      {tx.status === 'completed' ? 'Instant' : 'In Progress'}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 opacity-50">
            <p>No transactions yet</p>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4">
        <div className="mobile-container flex justify-around items-center">
          <button onClick={() => setLocation("/app/home")} className="flex flex-col items-center space-y-1 text-gray-400">
            <Home className="w-8 h-8" />
            <span className="text-xs">Home</span>
          </button>
          <button className="flex flex-col items-center space-y-1 text-teal">
            <div className="w-8 h-8 bg-teal rounded-lg flex items-center justify-center">
              <History className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs font-semibold">Transactions</span>
          </button>
          <button onClick={() => setLocation("/app/cards")} className="flex flex-col items-center space-y-1 text-gray-400">
            <CreditCard className="w-8 h-8" />
            <span className="text-xs">Cards</span>
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
