import { Button } from "@/components/ui/button";
import { ChevronLeft, Download, Share2, CheckCircle2, Clock, Mail } from "lucide-react";
import { useLocation } from "wouter";
import { toast } from "sonner";

export default function TransactionDetails() {
  const [, setLocation] = useLocation();

  // Mock transaction data - in production, this would come from route params or API
  const transaction = {
    id: "TXN-2024-001",
    amount: 2000,
    fee: 60,
    total: 1940, // Amount received after fee deduction
    status: "Completed",
    date: "October 29, 2025",
    time: "12:48 PM",
    recipient: "Meryem Guezzour",
    bankName: "LibertyPay Nasp account",
    accountNumber: "XXXX XXXX XXXX 0401",
    iban: "MA64011519000001205000000141",
    reference: "REF-LP-2024-10-29-001",
    timeline: [
      { status: "Requested", time: "12:45 PM", completed: true },
      { status: "Processing", time: "12:46 PM", completed: true },
      { status: "Approved", time: "12:47 PM", completed: true },
      { status: "Transferred", time: "12:48 PM", completed: true },
    ],
  };

  return (
    <div className="mobile-container bg-navy text-white flex flex-col min-h-screen">
      {/* Header */}
      <div className="p-6 flex items-center justify-between">
        <button
          onClick={() => setLocation("/app/transactions")}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-semibold">Transaction Details</h1>
        <div className="w-10"></div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-6">
        {/* Status Card */}
        <div className="bg-white/10 rounded-2xl p-6 text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-green-400" />
            </div>
          </div>
          <div>
            <p className="text-sm opacity-75">Amount Received</p>
            <h2 className="text-4xl font-bold text-mint">{transaction.total} Dhs</h2>
          </div>
          <div className="inline-block px-4 py-2 bg-green-500/20 rounded-full">
            <p className="text-sm font-semibold text-green-400">{transaction.status}</p>
          </div>
        </div>

        {/* Amount Breakdown */}
        <div className="bg-white/10 rounded-2xl p-6 space-y-4">
          <h3 className="font-semibold text-lg">Amount Breakdown</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="opacity-75">Requested Amount</span>
              <span className="font-semibold">{transaction.amount} Dhs</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-75">Service Fee</span>
              <span className="font-semibold text-red-400">-{transaction.fee} Dhs</span>
            </div>
            <div className="h-px bg-white/20"></div>
            <div className="flex justify-between text-lg">
              <span className="font-semibold">Total Received</span>
              <span className="font-bold text-mint">{transaction.total} Dhs</span>
            </div>
          </div>
        </div>

        {/* Bank Details */}
        <div className="bg-white/10 rounded-2xl p-6 space-y-4">
          <h3 className="font-semibold text-lg">Bank Details</h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm opacity-75">Recipient</p>
              <p className="font-semibold">{transaction.recipient}</p>
            </div>
            <div>
              <p className="text-sm opacity-75">Bank Name</p>
              <p className="font-semibold">{transaction.bankName}</p>
            </div>
            <div>
              <p className="text-sm opacity-75">Account Number</p>
              <p className="font-semibold font-mono">{transaction.accountNumber}</p>
            </div>
            <div>
              <p className="text-sm opacity-75">IBAN</p>
              <p className="font-semibold font-mono text-sm">{transaction.iban}</p>
            </div>
          </div>
        </div>

        {/* Transaction Info */}
        <div className="bg-white/10 rounded-2xl p-6 space-y-4">
          <h3 className="font-semibold text-lg">Transaction Information</h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm opacity-75">Reference Number</p>
              <p className="font-semibold font-mono text-sm">{transaction.reference}</p>
            </div>
            <div>
              <p className="text-sm opacity-75">Date</p>
              <p className="font-semibold">{transaction.date}</p>
            </div>
            <div>
              <p className="text-sm opacity-75">Time</p>
              <p className="font-semibold">{transaction.time}</p>
            </div>
          </div>
        </div>

        {/* Status Timeline */}
        <div className="bg-white/10 rounded-2xl p-6 space-y-4">
          <h3 className="font-semibold text-lg">Status Timeline</h3>
          <div className="space-y-4">
            {transaction.timeline.map((item, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      item.completed ? "bg-green-500/20" : "bg-white/10"
                    }`}
                  >
                    {item.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-green-400" />
                    ) : (
                      <Clock className="w-5 h-5 opacity-50" />
                    )}
                  </div>
                  {index < transaction.timeline.length - 1 && (
                    <div className="w-0.5 h-8 bg-white/20 my-1"></div>
                  )}
                </div>
                <div className="flex-1 pt-1">
                  <p className="font-semibold">{item.status}</p>
                  <p className="text-sm opacity-75">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            variant="outline"
            className="liberty-button-outline w-full"
            onClick={() => {
              const receiptText = `
LIBERTY PAY - TRANSACTION RECEIPT
================================

Transaction Reference: ${transaction.reference}
Date: ${transaction.date} | ${transaction.time}
Status: ${transaction.status.toUpperCase()}

TRANSACTION DETAILS
-------------------
Requested Amount: ${transaction.amount} Dhs
Service Fee: ${transaction.fee} Dhs
Total Amount: ${transaction.total} Dhs

BANK DETAILS
------------
Recipient: ${transaction.recipient}
Bank Name: ${transaction.bankName}
Account Number: ${transaction.accountNumber}
IBAN: ${transaction.iban}

Thank you for using Liberty Pay!
For support, contact: support@libertypay.ma
              `.trim();
              
              const blob = new Blob([receiptText], { type: 'text/plain' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `LibertyPay_Receipt_${transaction.reference}.txt`;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              URL.revokeObjectURL(url);
              toast.success('Receipt downloaded successfully');
            }}
          >
            <Download className="w-5 h-5 mr-2" />
            Download Receipt
          </Button>
          <Button
            variant="outline"
            className="liberty-button-outline w-full"
            onClick={async () => {
              const receiptText = `Liberty Pay Receipt\nRef: ${transaction.reference}\nAmount: ${transaction.amount} Dhs\nFee: ${transaction.fee} Dhs\nTotal: ${transaction.total} Dhs\nDate: ${transaction.date} ${transaction.time}`;
              
              if (navigator.share) {
                try {
                  await navigator.share({
                    title: 'Liberty Pay Receipt',
                    text: receiptText,
                  });
                } catch (err) {
                  console.log('Share cancelled');
                }
              } else {
                await navigator.clipboard.writeText(receiptText);
                toast.success('Receipt copied to clipboard');
              }
            }}
          >
            <Share2 className="w-5 h-5 mr-2" />
            Share Receipt
          </Button>
          <Button
            variant="outline"
            className="liberty-button-outline w-full"
            onClick={() => {
              const subject = encodeURIComponent(`Liberty Pay Receipt - ${transaction.reference}`);
              const body = encodeURIComponent(`
Transaction Reference: ${transaction.reference}
Date: ${transaction.date} | ${transaction.time}

Requested Amount: ${transaction.amount} Dhs
Service Fee: ${transaction.fee} Dhs
Total Amount: ${transaction.total} Dhs

Bank: ${transaction.bankName}
Account: ${transaction.accountNumber}
Recipient: ${transaction.recipient}
              `.trim());
              
              window.location.href = `mailto:?subject=${subject}&body=${body}`;
            }}
          >
            <Mail className="w-5 h-5 mr-2" />
            Email Receipt
          </Button>
        </div>
      </div>
    </div>
  );
}
