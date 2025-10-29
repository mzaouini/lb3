import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import { useLocation } from "wouter";

export default function OfficialDetails() {
  const [, setLocation] = useLocation();

  return (
    <div className="mobile-container min-h-screen bg-navy text-white">
      <div className="p-6">
        <button
          onClick={() => setLocation("/app/profile")}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>

      <div className="px-8 py-6 space-y-6">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Official Details</h1>
          <div className="h-1 w-16 bg-mint rounded-full"></div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="text-sm opacity-75 mb-2 block">Full Name</label>
            <Input
              type="text"
              value="Meryem Guezzour"
              disabled
              className="bg-white/10 border-white/20 text-white opacity-60"
            />
          </div>

          <div>
            <label className="text-sm opacity-75 mb-2 block">Mobile Number</label>
            <Input
              type="text"
              value="+212 612345678"
              disabled
              className="bg-white/10 border-white/20 text-white opacity-60"
            />
          </div>

          <div>
            <label className="text-sm opacity-75 mb-2 block">CIN</label>
            <Input
              type="text"
              value="AB100900"
              disabled
              className="bg-white/10 border-white/20 text-white opacity-60"
            />
          </div>

          <div>
            <label className="text-sm opacity-75 mb-2 block">Date of Birth</label>
            <Input
              type="text"
              value="01/01/2000"
              disabled
              className="bg-white/10 border-white/20 text-white opacity-60"
            />
          </div>

          <div>
            <label className="text-sm opacity-75 mb-2 block">Address</label>
            <Input
              type="text"
              value="Anfa Place, Casablanca"
              disabled
              className="bg-white/10 border-white/20 text-white opacity-60"
            />
          </div>

          <div>
            <label className="text-sm opacity-75 mb-2 block">Company</label>
            <Input
              type="text"
              value="ACME"
              disabled
              className="bg-white/10 border-white/20 text-white opacity-60"
            />
          </div>

          <div>
            <label className="text-sm opacity-75 mb-2 block">Net Salary Amount</label>
            <Input
              type="text"
              value="10,000 Dhs"
              disabled
              className="bg-white/10 border-white/20 text-white opacity-60"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
