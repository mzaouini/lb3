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

        {/* Animated Money Stack */}
        <div className="relative animate-bounce-slow">
          {/* Money Stack - 3D Effect */}
          <div className="relative">
            {/* Stack Layer 3 (Back) */}
            <div className="absolute top-2 left-2 w-32 h-20 bg-gradient-to-br from-gray-400 to-gray-500 rounded-lg opacity-60"></div>
            
            {/* Stack Layer 2 (Middle) */}
            <div className="absolute top-1 left-1 w-32 h-20 bg-gradient-to-br from-gray-500 to-gray-600 rounded-lg opacity-80 flex items-center justify-center">
              {/* Money Band */}
              <div className="absolute w-full h-6 bg-[#00c48c] opacity-70"></div>
            </div>
            
            {/* Stack Layer 1 (Front) */}
            <div className="relative w-32 h-20 bg-gradient-to-br from-gray-600 to-gray-700 rounded-lg shadow-2xl flex items-center justify-center">
              {/* Money Band */}
              <div className="absolute w-full h-6 bg-[#00c48c]"></div>
              
              {/* Money Details */}
              <div className="relative z-10 text-white text-center">
                <div className="text-xs font-bold mb-1">💵</div>
                <div className="text-[10px] font-semibold">Dhs</div>
              </div>
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
