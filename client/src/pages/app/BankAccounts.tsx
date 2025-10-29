import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import { useLocation } from "wouter";

export default function BankAccounts() {
  const [, setLocation] = useLocation();

  const accounts = [
    {
      id: 1,
      title: "DOrg FName53 DOrg LName53",
      accountNumber: "7678232423445532242342424",
      bankName: "Bank Muscat",
    },
  ];

  return (
    <div className="mobile-container min-h-screen bg-navy text-white">
      <div className="p-6">
        <button
          onClick={() => setLocation("/app/profile")}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>

      <div className="px-8 py-6 space-y-6">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Bank Accounts</h1>
          <div className="h-1 w-16 bg-mint rounded-full"></div>
        </div>

        {/* Accounts List */}
        <div className="space-y-4">
          {accounts.map((account) => (
            <Card
              key={account.id}
              className="bg-white/10 border-white/20 p-6 hover:bg-white/15 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold">{account.title}</h3>
                <button className="text-teal">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </button>
              </div>
              <p className="text-sm opacity-75 mb-1">{account.accountNumber}</p>
              <p className="text-sm opacity-75">{account.bankName}</p>
            </Card>
          ))}
        </div>

        <Button
          onClick={() => alert("Feature coming soon")}
          className="w-full liberty-button text-lg py-6"
        >
          ADD NEW ACCOUNT
        </Button>
      </div>
    </div>
  );
}
