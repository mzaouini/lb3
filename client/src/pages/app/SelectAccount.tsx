import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ChevronLeft, Search } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import { formatCurrency } from "@shared/currency";

export default function SelectAccount() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const amountInFils = parseInt(sessionStorage.getItem("advance_amount") || "0");

  // Mock bank accounts
  const accounts = [
    {
      id: 1,
      title: "Meryem Guezzour",
      accountNumber: "XXXX XXXX XXXX 0401",
      iban: "MA64011519000001205000000141",
      bankName: "LibertyPay Nasp account"
    }
  ];

  const handleSelectAccount = (accountId: number) => {
    sessionStorage.setItem("selected_account_id", accountId.toString());
    setLocation("/app/review");
  };

  return (
    <div className="mobile-container min-h-screen bg-navy text-white flex flex-col">
      <div className="p-6">
        <button
          onClick={() => setLocation("/app/enter-amount")}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 px-8 py-6 space-y-6">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Select Account</h1>
          <div className="h-1 w-16 bg-mint rounded-full"></div>
        </div>

        <div className="space-y-4">
          <p className="text-sm opacity-75">Amount</p>
          <p className="text-3xl font-bold text-mint">{formatCurrency(amountInFils)}</p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
          <Input
            type="text"
            placeholder="Search Account"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 py-6 rounded-lg"
          />
        </div>

        {/* Accounts List */}
        <div className="space-y-4">
          {accounts.map((account) => (
            <Card
              key={account.id}
              onClick={() => handleSelectAccount(account.id)}
              className="bg-white/10 border-white/20 p-6 cursor-pointer hover:bg-white/15 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold">{account.title}</h3>
                <ChevronLeft className="w-5 h-5 rotate-180" />
              </div>
              <p className="text-sm opacity-75 mb-1">{account.accountNumber}</p>
              <p className="text-sm opacity-75">{account.bankName}</p>
            </Card>
          ))}
        </div>

        <Button
          onClick={() => setLocation("/app/bank-accounts")}
          className="w-full bg-transparent border-2 border-mint text-mint hover:bg-mint hover:text-navy transition-colors py-6 rounded-lg font-semibold"
        >
          ADD NEW ACCOUNT
        </Button>
      </div>
    </div>
  );
}
