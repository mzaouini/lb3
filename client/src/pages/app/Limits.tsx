import { Card } from "@/components/ui/card";
import { ChevronLeft, TrendingUp, Calendar, AlertCircle } from "lucide-react";
import { useLocation } from "wouter";
import { formatCurrency } from "@shared/currency";

export default function Limits() {
  const [, setLocation] = useLocation();

  const limits = {
    dailyLimit: 500000, // 5,000 Dhs
    monthlyLimit: 800000, // 8,000 Dhs
    currentMonthUsage: 312000, // 3,120 Dhs (2000 + 1000 + 500 - fees)
    dailyUsage: 200000, // 2,000 Dhs
    remainingDaily: 300000, // 3,000 Dhs
    remainingMonthly: 488000, // 4,880 Dhs
  };

  const dailyPercentage = (limits.dailyUsage / limits.dailyLimit) * 100;
  const monthlyPercentage = (limits.currentMonthUsage / limits.monthlyLimit) * 100;

  return (
    <div className="mobile-container min-h-screen bg-navy text-white pb-24">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setLocation("/app/home")}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center space-x-2">
            <span className="bg-mint text-navy px-2 py-1 rounded-full text-xs font-bold">BETA</span>
          </div>
        </div>
      </div>

      <div className="px-8 py-6 space-y-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <TrendingUp className="w-8 h-8 text-mint" />
            <h1 className="text-3xl font-bold">Limits & Usage</h1>
          </div>
          <div className="h-1 w-16 bg-mint rounded-full"></div>
        </div>

        {/* Daily Limit Card */}
        <Card className="bg-white/10 border-white/20 p-6 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-mint" />
              <h3 className="font-bold text-lg">Daily Limit</h3>
            </div>
            <span className="text-xs bg-white/10 px-2 py-1 rounded-full">Today</span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="opacity-75">Used</span>
              <span className="font-semibold">{formatCurrency(limits.dailyUsage)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="opacity-75">Remaining</span>
              <span className="font-semibold text-mint">{formatCurrency(limits.remainingDaily)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="opacity-75">Total Limit</span>
              <span className="font-semibold">{formatCurrency(limits.dailyLimit)}</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-mint to-teal h-full rounded-full transition-all duration-500"
                style={{ width: `${dailyPercentage}%` }}
              ></div>
            </div>
            <p className="text-xs text-center opacity-75">
              {dailyPercentage.toFixed(1)}% of daily limit used
            </p>
          </div>
        </Card>

        {/* Monthly Limit Card */}
        <Card className="bg-white/10 border-white/20 p-6 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-mint" />
              <h3 className="font-bold text-lg">Monthly Limit</h3>
            </div>
            <span className="text-xs bg-white/10 px-2 py-1 rounded-full">October</span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="opacity-75">Used</span>
              <span className="font-semibold">{formatCurrency(limits.currentMonthUsage)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="opacity-75">Remaining</span>
              <span className="font-semibold text-mint">{formatCurrency(limits.remainingMonthly)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="opacity-75">Total Limit</span>
              <span className="font-semibold">{formatCurrency(limits.monthlyLimit)}</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-mint to-teal h-full rounded-full transition-all duration-500"
                style={{ width: `${monthlyPercentage}%` }}
              ></div>
            </div>
            <p className="text-xs text-center opacity-75">
              {monthlyPercentage.toFixed(1)}% of monthly limit used
            </p>
          </div>
        </Card>

        {/* Usage Breakdown */}
        <Card className="bg-white/10 border-white/20 p-6 space-y-4">
          <h3 className="font-bold text-lg mb-4">October Usage Breakdown</h3>

          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-white/10">
              <div>
                <p className="font-semibold">Week 1</p>
                <p className="text-xs opacity-60">Oct 1-7</p>
              </div>
              <p className="font-bold text-mint">0 Dhs</p>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-white/10">
              <div>
                <p className="font-semibold">Week 2</p>
                <p className="text-xs opacity-60">Oct 8-14</p>
              </div>
              <p className="font-bold text-mint">500 Dhs</p>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-white/10">
              <div>
                <p className="font-semibold">Week 3</p>
                <p className="text-xs opacity-60">Oct 15-21</p>
              </div>
              <p className="font-bold text-mint">1,000 Dhs</p>
            </div>

            <div className="flex justify-between items-center py-2">
              <div>
                <p className="font-semibold">Week 4</p>
                <p className="text-xs opacity-60">Oct 22-29</p>
              </div>
              <p className="font-bold text-mint">2,000 Dhs</p>
            </div>
          </div>
        </Card>

        {/* Info Card */}
        <Card className="bg-blue-500/20 border border-blue-400/30 p-4">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold mb-1">About Limits</p>
              <p className="text-xs opacity-90">
                Daily and monthly limits help you manage your salary advances responsibly. Limits reset automatically.
              </p>
            </div>
          </div>
        </Card>

        {/* BETA Info */}
        <Card className="bg-mint/20 border border-mint/30 p-4">
          <div className="flex items-start space-x-3">
            <TrendingUp className="w-5 h-5 text-mint flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold mb-1">BETA Feature</p>
              <p className="text-xs opacity-90">
                Advanced usage tracking and analytics are being developed. Stay tuned for more insights!
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
