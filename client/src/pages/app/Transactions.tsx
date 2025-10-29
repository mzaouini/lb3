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

  // Expanded transaction history - each advance shows as 2 transactions (advance + fee)
  const transactions = [
    // October 29 - 2000 Dhs advance
    {
      id: 1,
      title: 'Salary Advance',
      subtitle: 'Meryem - ACME',
      date: '29 Oct 2025 | 12:48 PM',
      amount: 200000, // 2,000 Dhs in fils
      type: 'credit',
      status: 'completed',
      month: 'October'
    },
    {
      id: 2,
      title: 'Service Fee',
      subtitle: 'Transaction Fee',
      date: '29 Oct 2025 | 12:48 PM',
      amount: -6000, // -60 Dhs in fils
      type: 'debit',
      status: 'completed',
      month: 'October'
    },
    // October 15 - 1000 Dhs advance
    {
      id: 3,
      title: 'Salary Advance',
      subtitle: 'Meryem - ACME',
      date: '15 Oct 2025 | 09:30 AM',
      amount: 100000, // 1,000 Dhs in fils
      type: 'credit',
      status: 'completed',
      month: 'October'
    },
    {
      id: 4,
      title: 'Service Fee',
      subtitle: 'Transaction Fee',
      date: '15 Oct 2025 | 09:30 AM',
      amount: -6000, // -60 Dhs in fils
      type: 'debit',
      status: 'completed',
      month: 'October'
    },
    // October 8 - 500 Dhs advance
    {
      id: 5,
      title: 'Salary Advance',
      subtitle: 'Meryem - ACME',
      date: '08 Oct 2025 | 02:15 PM',
      amount: 50000, // 500 Dhs in fils
      type: 'credit',
      status: 'completed',
      month: 'October'
    },
    {
      id: 6,
      title: 'Service Fee',
      subtitle: 'Transaction Fee',
      date: '08 Oct 2025 | 02:15 PM',
      amount: -6000, // -60 Dhs in fils
      type: 'debit',
      status: 'completed',
      month: 'October'
    },
    // September 25 - 1500 Dhs advance
    {
      id: 7,
      title: 'Salary Advance',
      subtitle: 'Meryem - ACME',
      date: '25 Sep 2025 | 11:20 AM',
      amount: 150000, // 1,500 Dhs in fils
      type: 'credit',
      status: 'completed',
      month: 'September'
    },
    {
      id: 8,
      title: 'Service Fee',
      subtitle: 'Transaction Fee',
      date: '25 Sep 2025 | 11:20 AM',
      amount: -6000, // -60 Dhs in fils
      type: 'debit',
      status: 'completed',
      month: 'September'
    },
    // September 10 - 2000 Dhs advance
    {
      id: 9,
      title: 'Salary Advance',
      subtitle: 'Meryem - ACME',
      date: '10 Sep 2025 | 04:45 PM',
      amount: 200000, // 2,000 Dhs in fils
      type: 'credit',
      status: 'completed',
      month: 'September'
    },
    {
      id: 10,
      title: 'Service Fee',
      subtitle: 'Transaction Fee',
      date: '10 Sep 2025 | 04:45 PM',
      amount: -6000, // -60 Dhs in fils
      type: 'debit',
      status: 'completed',
      month: 'September'
    },
  ];

  return (
    <div className="mobile-container min-h-screen bg-gray-50 pb-24">
      <div className="liberty-gradient text-white p-6 rounded-b-3xl">
        <button
          onClick={() => setLocation("/app/home")}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors mb-4"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-bold">Transaction History</h1>
      </div>

      <div className="px-6 py-6 space-y-6">

        {/* Date Range */}
        <Card className="p-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600 mb-2 block">Start Date</label>
              <Input
                type="text"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-white border-gray-300"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-2 block">End Date</label>
              <Input
                type="text"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="bg-white border-gray-300"
              />
            </div>
          </div>
        </Card>

        {/* Total */}
        <Card className="p-6 text-center">
          <p className="text-sm text-gray-600 mb-2">Total Transaction</p>
          <p className="text-4xl font-bold text-teal">{formatCurrency(transactions.reduce((sum, tx) => sum + tx.amount, 0))}</p>
        </Card>

        {/* Tabs */}
        <div className="flex space-x-4 border-b border-gray-200">
          <button className="pb-3 border-b-2 border-teal text-teal font-semibold">All</button>
          <button className="pb-3 text-gray-500">Successful</button>
          <button className="pb-3 text-gray-500">In-Progress</button>
          <button className="pb-3 text-gray-500">Failed</button>
        </div>

        {/* Transactions List */}
        {transactions.length > 0 ? (
          <div className="space-y-6">
            {/* October Transactions */}
            <div className="space-y-4">
              <p className="text-teal font-semibold text-lg">October 2025</p>
              {transactions.filter(tx => tx.month === 'October').map((tx) => (
              <Card 
                key={tx.id} 
                className="p-4 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setLocation("/app/transaction-details")}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      tx.status === 'completed' ? 'bg-green-100' : 'bg-orange-100'
                    }`}>
                      <span className={tx.status === 'completed' ? 'text-green-600' : 'text-orange-600'}>
                        {tx.status === 'completed' ? '✓' : '⚠️'}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-navy">{tx.title}</p>
                      <p className="text-xs text-gray-600">{tx.subtitle}</p>
                      <p className="text-xs text-gray-500">{tx.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${
                      tx.type === 'credit' ? 'text-green-500' : 'text-red-500'
                    }`}>{tx.type === 'credit' ? '+' : ''}{formatCurrency(Math.abs(tx.amount))}</p>
                    <p className="text-xs opacity-75">
                      {tx.status === 'completed' ? 'Instant' : 'In Progress'}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
            </div>
            
            {/* September Transactions */}
            <div className="space-y-4">
              <p className="text-teal font-semibold text-lg">September 2025</p>
              {transactions.filter(tx => tx.month === 'September').map((tx) => (
              <Card 
                key={tx.id} 
                className="p-4 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setLocation("/app/transaction-details")}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      tx.status === 'completed' ? 'bg-green-100' : 'bg-orange-100'
                    }`}>
                      <span className={tx.status === 'completed' ? 'text-green-600' : 'text-orange-600'}>
                        {tx.status === 'completed' ? '✓' : '⚠️'}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-navy">{tx.title}</p>
                      <p className="text-xs text-gray-600">{tx.subtitle}</p>
                      <p className="text-xs text-gray-500">{tx.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${
                      tx.type === 'credit' ? 'text-green-600' : 'text-red-600'
                    }`}>{tx.type === 'credit' ? '+' : ''}{formatCurrency(Math.abs(tx.amount))}</p>
                    <p className="text-xs text-gray-500">
                      {tx.status === 'completed' ? 'Instant' : 'In Progress'}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
            </div>
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
