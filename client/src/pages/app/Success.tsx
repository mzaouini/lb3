import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { formatCurrency } from "@shared/currency";

export default function Success() {
  const [, setLocation] = useLocation();
  const amountInFils = parseInt(sessionStorage.getItem("advance_amount") || "11000");

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
        </div>

        <div className="flex space-x-4 pt-8">
          <button className="p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </button>
          <button className="p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
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
