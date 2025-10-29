import { Card } from "@/components/ui/card";
import { ChevronLeft, TrendingUp, Calendar, Wallet, DollarSign } from "lucide-react";
import { useLocation } from "wouter";
import { formatCurrency } from "@shared/currency";

export default function SalaryBreakdown() {
  const [, setLocation] = useLocation();

  // Salary calculation based on 14 days worked out of 30
  const monthlySalary = 1000000; // 10,000 Dhs in fils
  const daysInMonth = 30;
  const daysWorked = 14;
  const earnedSalary = Math.floor((monthlySalary / daysInMonth) * daysWorked);
  const availableAdvance = Math.floor(earnedSalary * 0.5); // 50% of earned
  const remainingDays = daysInMonth - daysWorked;

  return (
    <div className="mobile-container min-h-screen bg-gray-50">
      {/* Header */}
      <div className="liberty-gradient text-white p-6 rounded-b-3xl">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setLocation("/app/home")}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <span className="bg-mint text-navy px-3 py-1 rounded-full text-xs font-bold">
            BETA
          </span>
        </div>
        <h1 className="text-2xl font-bold mb-2">Salary Breakdown</h1>
        <p className="text-sm opacity-90">Track your earned wages in real-time</p>
      </div>

      <div className="px-6 -mt-8 space-y-4 pb-8">
        {/* Main Earnings Card */}
        <Card className="p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-teal/10 rounded-full flex items-center justify-center">
                <Wallet className="w-5 h-5 text-teal" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Earned This Month</p>
                <p className="text-2xl font-bold text-navy">{formatCurrency(earnedSalary)}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">of {formatCurrency(monthlySalary)}</p>
              <p className="text-sm font-semibold text-teal">{Math.floor((daysWorked / daysInMonth) * 100)}%</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-teal to-mint rounded-full transition-all duration-500"
              style={{ width: `${(daysWorked / daysInMonth) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span>Day {daysWorked}</span>
            <span>Day {daysInMonth}</span>
          </div>
        </Card>

        {/* Available for Advance */}
        <Card className="p-6 bg-gradient-to-br from-navy to-[#1a3a5c] text-white shadow-lg">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-mint/20 rounded-full flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-mint" />
            </div>
            <div>
              <p className="text-sm opacity-90">Available for Advance</p>
              <p className="text-3xl font-bold">{formatCurrency(availableAdvance)}</p>
            </div>
          </div>
          <div className="bg-white/10 rounded-lg p-3 mt-4">
            <p className="text-xs opacity-75 mb-1">Calculation:</p>
            <p className="text-sm">50% of {formatCurrency(earnedSalary)} earned</p>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {/* Days Worked */}
          <Card className="p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Calendar className="w-5 h-5 text-teal" />
              <p className="text-xs text-gray-600">Days Worked</p>
            </div>
            <p className="text-2xl font-bold text-navy">{daysWorked}</p>
            <p className="text-xs text-gray-500 mt-1">of {daysInMonth} days</p>
          </Card>

          {/* Remaining Days */}
          <Card className="p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Calendar className="w-5 h-5 text-orange-500" />
              <p className="text-xs text-gray-600">Days Left</p>
            </div>
            <p className="text-2xl font-bold text-navy">{remainingDays}</p>
            <p className="text-xs text-gray-500 mt-1">until payday</p>
          </Card>

          {/* Daily Rate */}
          <Card className="p-4">
            <div className="flex items-center space-x-2 mb-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              <p className="text-xs text-gray-600">Daily Rate</p>
            </div>
            <p className="text-2xl font-bold text-navy">{formatCurrency(Math.floor(monthlySalary / daysInMonth))}</p>
            <p className="text-xs text-gray-500 mt-1">per day</p>
          </Card>

          {/* Next Payday */}
          <Card className="p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Calendar className="w-5 h-5 text-purple-600" />
              <p className="text-xs text-gray-600">Next Payday</p>
            </div>
            <p className="text-lg font-bold text-navy">Nov 30</p>
            <p className="text-xs text-gray-500 mt-1">in {remainingDays} days</p>
          </Card>
        </div>

        {/* How it Works */}
        <Card className="p-6 bg-mint/5 border-mint/20">
          <h3 className="font-bold text-navy mb-3 flex items-center space-x-2">
            <span className="text-mint">✨</span>
            <span>How Earned Wage Access Works</span>
          </h3>
          <div className="space-y-3 text-sm text-gray-700">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-mint rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                1
              </div>
              <p>Your salary is calculated daily based on days worked</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-mint rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                2
              </div>
              <p>You can access up to 50% of your earned wages anytime</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-mint rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                3
              </div>
              <p>Small service fee of 60 Dhs per advance - no interest!</p>
            </div>
          </div>
        </Card>

        {/* Company Info */}
        <Card className="p-4 bg-white border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Employer</p>
              <p className="font-semibold text-navy">ACME</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Monthly Salary</p>
              <p className="font-semibold text-navy">{formatCurrency(monthlySalary)}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
