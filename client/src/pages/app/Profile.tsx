import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, CreditCard, History, Home, User as UserIcon, Bell, FileText, LogOut } from "lucide-react";
import { useLocation } from "wouter";

export default function Profile() {
  const [, setLocation] = useLocation();
  const userName = sessionStorage.getItem("userName") || "Meryem Guezzour";
  
  const logout = () => {
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("userName");
    setLocation("/");
  };

  const profileItems = [
    {
      icon: <UserIcon className="w-6 h-6 text-navy" />,
      title: "Personal & Employment Details",
      subtitle: "View your profile and employer information",
      action: () => setLocation("/app/official-details"),
    },
    {
      icon: <CreditCard className="w-6 h-6 text-navy" />,
      title: "Bank Accounts",
      subtitle: "Manage your linked bank accounts",
      action: () => setLocation("/app/bank-accounts"),
    },
  ];

  const betaItems = [
    {
      icon: <Bell className="w-6 h-6 text-teal" />,
      title: "Notifications",
      badge: "BETA",
      action: () => setLocation("/app/notifications"),
    },
    {
      icon: <FileText className="w-6 h-6 text-teal" />,
      title: "Receipt History",
      badge: "BETA",
      action: () => alert("Receipt history coming soon"),
    },
  ];

  return (
    <div className="mobile-container min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="liberty-gradient text-white p-6 rounded-b-3xl">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setLocation("/app/home")}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center space-x-2">
            <button className="px-4 py-2 bg-mint text-navy rounded-lg font-semibold text-sm">ENG</button>
            <button className="px-4 py-2 bg-white/20 rounded-lg text-sm">عربي</button>
          </div>
        </div>
        <h1 className="text-2xl font-bold">{userName}</h1>
        <p className="text-sm opacity-90 mt-1">Manage your account settings</p>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Profile Section */}
        <div className="space-y-3">
          <p className="text-sm text-gray-600 font-semibold px-2">Account</p>
          {profileItems.map((item, index) => (
            <Card
              key={index}
              onClick={item.action}
              className="p-4 cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-navy">{item.title}</p>
                    <p className="text-xs text-gray-500">{item.subtitle}</p>
                  </div>
                </div>
                <ChevronLeft className="w-5 h-5 rotate-180 text-gray-400" />
              </div>
            </Card>
          ))}
        </div>

        {/* BETA Features Section */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2 px-2">
            <p className="text-sm text-gray-600 font-semibold">New Features</p>
            <span className="bg-teal text-white px-2 py-0.5 rounded-full text-xs font-bold">BETA</span>
          </div>
          {betaItems.map((item, index) => (
            <Card
              key={index}
              onClick={item.action}
              className="p-4 cursor-pointer hover:shadow-md transition-shadow bg-blue-50"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-teal/10 rounded-full flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-navy">{item.title}</span>
                    {item.badge && (
                      <span className="bg-teal text-white px-2 py-0.5 rounded-full text-xs font-bold">
                        {item.badge}
                      </span>
                    )}
                  </div>
                </div>
                <ChevronLeft className="w-5 h-5 rotate-180 text-gray-400" />
              </div>
            </Card>
          ))}
        </div>

        {/* Logout Button */}
        <div className="pt-4">
          <Button
            onClick={logout}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-6 text-lg font-semibold flex items-center justify-center space-x-2"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </Button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4">
        <div className="mobile-container flex justify-around items-center">
          <button onClick={() => setLocation("/app/home")} className="flex flex-col items-center space-y-1 text-gray-400">
            <Home className="w-6 h-6" />
            <span className="text-xs">Home</span>
          </button>
          <button onClick={() => setLocation("/app/transactions")} className="flex flex-col items-center space-y-1 text-gray-400">
            <History className="w-6 h-6" />
            <span className="text-xs">Transactions</span>
          </button>
          <button onClick={() => setLocation("/app/cards")} className="flex flex-col items-center space-y-1 text-gray-400">
            <CreditCard className="w-6 h-6" />
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
