import { Card } from "@/components/ui/card";
import { ChevronLeft, Bell, CheckCircle2, AlertCircle, Info } from "lucide-react";
import { useLocation } from "wouter";

export default function Notifications() {
  const [, setLocation] = useLocation();

  const notifications = [
    {
      id: 1,
      type: 'success',
      title: 'Salary Advance Approved',
      message: 'Your request for 2,000 Dhs has been approved and transferred to your account.',
      time: '2 hours ago',
      read: false,
    },
    {
      id: 2,
      type: 'info',
      title: 'New Salary Breakdown Available',
      message: 'Your October salary breakdown is now available. Check your earnings!',
      time: '1 day ago',
      read: false,
    },
    {
      id: 3,
      type: 'success',
      title: 'Transaction Completed',
      message: '1,000 Dhs advance has been successfully transferred.',
      time: '2 days ago',
      read: true,
    },
    {
      id: 4,
      type: 'warning',
      title: 'Monthly Limit Reminder',
      message: 'You have used 3,120 Dhs of your 8,000 Dhs monthly limit.',
      time: '3 days ago',
      read: true,
    },
    {
      id: 5,
      type: 'info',
      title: 'Welcome to Liberty Pay',
      message: 'Your account has been verified. You can now request salary advances!',
      time: '1 week ago',
      read: true,
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-6 h-6 text-green-400" />;
      case 'warning':
        return <AlertCircle className="w-6 h-6 text-orange-400" />;
      case 'info':
      default:
        return <Info className="w-6 h-6 text-blue-400" />;
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-500/20';
      case 'warning':
        return 'bg-orange-500/20';
      case 'info':
      default:
        return 'bg-blue-500/20';
    }
  };

  return (
    <div className="mobile-container min-h-screen bg-gray-50 pb-24">
      <div className="liberty-gradient text-white p-6 rounded-b-3xl">
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
        <h1 className="text-2xl font-bold mt-4">Notifications</h1>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Unread Count */}
        <Card className="p-4">
          <p className="text-sm text-gray-600">You have <span className="font-bold text-teal">{notifications.filter(n => !n.read).length}</span> unread notifications</p>
        </Card>

        {/* Notifications List */}
        <div className="space-y-4">
          {notifications.map((notification) => (
            <Card 
              key={notification.id}
              className={`p-4 cursor-pointer hover:shadow-md transition-shadow ${
                notification.read ? 'bg-white' : 'bg-blue-50'
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${getBgColor(notification.type)}`}>
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-semibold text-navy">{notification.title}</h3>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-teal rounded-full flex-shrink-0 ml-2 mt-2"></div>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                  <p className="text-xs text-gray-500">{notification.time}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Info Card */}
        <Card className="bg-blue-500/20 border border-blue-400/30 p-4">
          <div className="flex items-start space-x-3">
            <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold mb-1">BETA Feature</p>
              <p className="text-xs opacity-90">
                This notification center is a new feature. We're continuously improving it based on user feedback.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
