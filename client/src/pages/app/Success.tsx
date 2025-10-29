import { Button } from "@/components/ui/button";
import { Download, Share2 } from "lucide-react";
import { useLocation } from "wouter";
import { formatCurrency } from "@shared/currency";

export default function Success() {
  const [, setLocation] = useLocation();
  const amountInFils = parseInt(sessionStorage.getItem("advance_amount") || "11000");
  const serviceFee = 6000; // 60 Dhs fixed fee
  const totalAmount = amountInFils + serviceFee;
  const transactionRef = `SA-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;

  const handleDownloadReceipt = () => {
    // Create receipt content
    const receiptContent = `
═══════════════════════════════
       LIBERTYPAY RECEIPT
═══════════════════════════════

Transaction Reference:
${transactionRef}

Date: ${new Date().toLocaleDateString('en-MA', { 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric' 
})}
Time: ${new Date().toLocaleTimeString('en-MA')}

───────────────────────────────
TRANSACTION DETAILS
───────────────────────────────

Salary Advance:     ${formatCurrency(amountInFils)}
Service Fee:        ${formatCurrency(serviceFee)}
                    ─────────────
Total Amount:       ${formatCurrency(totalAmount)}

───────────────────────────────
STATUS
───────────────────────────────

Status: Approved ✓
Processing: Instant
Expected in Account: Within 24 hours

═══════════════════════════════

Thank you for using LibertyPay!
For support: support@libertypay.ma

═══════════════════════════════
    `;

    // Create blob and download
    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `LibertyPay-Receipt-${transactionRef}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleShareReceipt = () => {
    const shareText = `LibertyPay Transaction\n\nAmount: ${formatCurrency(amountInFils)}\nFee: ${formatCurrency(serviceFee)}\nTotal: ${formatCurrency(totalAmount)}\nRef: ${transactionRef}\n\nStatus: Approved ✓`;
    
    if (navigator.share) {
      navigator.share({
        title: 'LibertyPay Receipt',
        text: shareText,
      }).catch(() => {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(shareText);
        alert('Receipt copied to clipboard!');
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareText);
      alert('Receipt copied to clipboard!');
    }
  };

  return (
    <div className="mobile-container min-h-screen bg-navy text-white flex flex-col items-center justify-center p-8">
      <div className="text-center space-y-8 animate-fade-in">
        <div className="w-32 h-32 bg-mint rounded-full flex items-center justify-center mx-auto shadow-2xl">
          <svg className="w-16 h-16 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-mint">Success!</h1>
          <p className="text-6xl font-bold">{formatCurrency(amountInFils)}</p>
          <p className="text-lg opacity-90">will be transferred to your account</p>
          
          {/* Transaction Reference */}
          <div className="bg-white/10 rounded-lg p-4 mt-6">
            <p className="text-xs opacity-75 mb-1">Transaction Reference</p>
            <p className="text-sm font-mono font-semibold">{transactionRef}</p>
          </div>
          
          {/* Fee Breakdown */}
          <div className="bg-white/5 rounded-lg p-4 text-sm space-y-2">
            <div className="flex justify-between">
              <span className="opacity-75">Advance Amount</span>
              <span className="font-semibold">{formatCurrency(amountInFils)}</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-75">Service Fee</span>
              <span className="font-semibold">{formatCurrency(serviceFee)}</span>
            </div>
            <div className="border-t border-white/20 pt-2 flex justify-between font-bold">
              <span>Total</span>
              <span className="text-mint">{formatCurrency(totalAmount)}</span>
            </div>
          </div>
        </div>

        <div className="flex space-x-4 pt-8">
          <button 
            onClick={handleDownloadReceipt}
            className="flex-1 flex items-center justify-center space-x-2 p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
          >
            <Download className="w-5 h-5" />
            <span className="text-sm font-semibold">Download Receipt</span>
          </button>
          <button 
            onClick={handleShareReceipt}
            className="flex-1 flex items-center justify-center space-x-2 p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
          >
            <Share2 className="w-5 h-5" />
            <span className="text-sm font-semibold">Share</span>
          </button>
        </div>

        <Button
          onClick={() => setLocation("/app/home")}
          className="w-full liberty-button text-lg py-6 mt-8"
        >
          Done
        </Button>
      </div>
    </div>
  );
}
