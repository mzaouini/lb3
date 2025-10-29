import { useEffect } from 'react';
import { useLocation } from 'wouter';

export default function ProcessingTransaction() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Auto-navigate to success screen after 2.5 seconds
    const timer = setTimeout(() => {
      setLocation('/app/success');
    }, 2500);

    return () => clearTimeout(timer);
  }, [setLocation]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      {/* Processing Message */}
      <h1 className="text-2xl font-semibold text-foreground text-center mb-12">
        Money is being sent to your account
      </h1>

      {/* Animated Money Stack Icon */}
      <div className="relative mb-16">
        {/* LibertyPay Logo */}
        <div className="flex justify-center mb-8 animate-pulse">
          <div className="w-16 h-16 bg-gradient-to-b from-[#00c48c] to-[#dc8b5e] rounded-lg flex items-center justify-center">
            <div className="space-y-1">
              <div className="w-10 h-1.5 bg-white rounded"></div>
              <div className="w-10 h-1.5 bg-white rounded"></div>
              <div className="w-10 h-1.5 bg-white rounded"></div>
            </div>
          </div>
        </div>

        {/* Animated Money Stack - USD Bills */}
        <div className="relative animate-bounce-slow">
          {/* Money Stack - 3D Effect */}
          <div className="relative">
            {/* Stack Layer 3 (Back) */}
            <div className="absolute top-2 left-2 w-40 h-24 bg-gradient-to-br from-green-600 to-green-700 rounded-sm opacity-60"></div>
            
            {/* Stack Layer 2 (Middle) */}
            <div className="absolute top-1 left-1 w-40 h-24 bg-gradient-to-br from-green-700 to-green-800 rounded-sm opacity-80 flex items-center justify-center">
              {/* Dollar Bill Pattern */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-green-300 text-4xl font-bold opacity-30">$</div>
              </div>
            </div>
            
            {/* Stack Layer 1 (Front - Main USD Bill) */}
            <div className="relative w-40 h-24 bg-gradient-to-br from-green-600 to-green-700 rounded-sm shadow-2xl border-2 border-green-800">
              {/* USD Bill Design */}
              <div className="absolute inset-0 p-2 flex flex-col justify-between">
                {/* Top Section */}
                <div className="flex justify-between items-start">
                  <div className="text-green-200 text-xs font-bold">USA</div>
                  <div className="text-green-100 text-2xl font-bold">$</div>
                  <div className="text-green-200 text-xs font-bold">100</div>
                </div>
                
                {/* Center - Large Dollar Sign */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-green-900 text-5xl font-bold opacity-20">$</div>
                </div>
                
                {/* Bottom Section */}
                <div className="flex justify-between items-end">
                  <div className="text-green-200 text-[10px] font-semibold">ONE HUNDRED</div>
                  <div className="text-green-100 text-lg font-bold">100</div>
                </div>
              </div>
              
              {/* Decorative Border Pattern */}
              <div className="absolute inset-0 border-4 border-green-400 opacity-10 rounded-sm"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Processing Indicator */}
      <div className="flex space-x-2">
        <div className="w-3 h-3 bg-[#00c48c] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-3 h-3 bg-[#00c48c] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-3 h-3 bg-[#00c48c] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>

      {/* Account Info */}
      <div className="mt-12 text-center">
        <p className="text-sm text-muted-foreground">
          LibertyPay Naps Account
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          XXXX XXXX XXXX 0401
        </p>
      </div>
    </div>
  );
}
