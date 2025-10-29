import { Card } from "@/components/ui/card";
import { ChevronLeft, CreditCard, History, Home, Lock, Shield, User as UserIcon } from "lucide-react";
import { useLocation } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";

export default function Profile() {
  const [, setLocation] = useLocation();
  const { user, logout } = useAuth();

  const menuItems = [
    {
      icon: <UserIcon className="w-6 h-6" />,
      title: "Official Details",
      action: () => setLocation("/app/official-details"),
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: "Bank Accounts",
      action: () => setLocation("/app/bank-accounts"),
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Change Pin",
      action: () => alert("Feature coming soon"),
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Biometric enable",
      action: () => alert("Feature coming soon"),
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Privacy Policy",
      action: () => alert("Feature coming soon"),
    },
  ];

  return (
    <div className="mobile-container min-h-screen bg-navy text-white pb-24">
      <div className="p-6 flex justify-between items-center">
        <button
          onClick={() => setLocation("/app/home")}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex items-center space-x-2">
          <button className="px-4 py-2 bg-mint text-navy rounded-lg font-semibold">ENG</button>
          <button className="px-4 py-2 bg-white/10 rounded-lg">عربي</button>
        </div>
      </div>

      <div className="px-8 py-6 space-y-8">
        <h1 className="text-3xl font-bold">{user?.name || "Meryem Guezzour"}</h1>

        {/* Profile Section */}
        <div className="space-y-4">
          <p className="text-sm opacity-75 font-semibold">Profile</p>
          <div className="space-y-3">
            {menuItems.slice(0, 2).map((item, index) => (
              <Card
                key={index}
                onClick={item.action}
                className="bg-white/10 border-white/20 p-4 cursor-pointer hover:bg-white/15 transition-colors flex items-center justify-between"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span className="font-semibold">{item.title}</span>
                </div>
                <ChevronLeft className="w-5 h-5 rotate-180" />
              </Card>
            ))}
          </div>
        </div>

        {/* Security Section */}
        <div className="space-y-4">
          <p className="text-sm opacity-75 font-semibold">Security</p>
          <div className="space-y-3">
            {menuItems.slice(2).map((item, index) => (
              <Card
                key={index}
                onClick={item.action}
                className="bg-white/10 border-white/20 p-4 cursor-pointer hover:bg-white/15 transition-colors flex items-center justify-between"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span className="font-semibold">{item.title}</span>
                </div>
                <ChevronLeft className="w-5 h-5 rotate-180" />
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4">
        <div className="mobile-container flex justify-around items-center">
          <button onClick={() => setLocation("/app/home")} className="flex flex-col items-center space-y-1 text-gray-400">
            <Home className="w-8 h-8" />
            <span className="text-xs">Home</span>
          </button>
          <button onClick={() => setLocation("/app/transactions")} className="flex flex-col items-center space-y-1 text-gray-400">
            <History className="w-8 h-8" />
            <span className="text-xs">Transactions</span>
          </button>
          <button onClick={() => setLocation("/app/cards")} className="flex flex-col items-center space-y-1 text-gray-400">
            <CreditCard className="w-8 h-8" />
            <span className="text-xs">Cards</span>
          </button>
          <button className="flex flex-col items-center space-y-1 text-teal">
            <div className="w-8 h-8 bg-teal rounded-lg flex items-center justify-center">
              <UserIcon className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs font-semibold">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}
