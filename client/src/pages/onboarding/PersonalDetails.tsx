import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

export default function PersonalDetails() {
  const [, setLocation] = useLocation();
  // Prefilled demo data (editable) - if changed, creates new user record
  const [formData, setFormData] = useState({
    fullName: "Meryem Guezzour",
    nationalId: "AB100900",
    email: "meryem.guezzour@acme.ma",
    company: "ACME",
    netSalary: "10000",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleContinue = () => {
    sessionStorage.setItem("onboarding_details", JSON.stringify(formData));
    setLocation("/onboarding/scan-id-front");
  };

  const isFormValid = formData.fullName && formData.nationalId && formData.email && formData.company && formData.netSalary;

  return (
    <div className="mobile-container min-h-screen bg-navy text-white flex flex-col">
      <div className="p-6">
        <button
          onClick={() => setLocation("/onboarding/confirm-pin")}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 px-8 py-6 space-y-6 animate-fade-in overflow-y-auto">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Personal Details</h1>
          <div className="h-1 w-16 bg-mint rounded-full"></div>
        </div>

        <p className="text-lg opacity-90">
          Please provide your information to complete registration
        </p>

        <div className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-white/75">Full Name</Label>
            <Input
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 py-6 rounded-lg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="nationalId" className="text-white/75">CIN (National ID)</Label>
            <Input
              id="nationalId"
              type="text"
              placeholder="123-3111-111"
              value={formData.nationalId}
              onChange={(e) => handleChange("nationalId", e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 py-6 rounded-lg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-white/75">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 py-6 rounded-lg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company" className="text-white/75">Company</Label>
            <Input
              id="company"
              type="text"
              placeholder="Your company name"
              value={formData.company}
              onChange={(e) => handleChange("company", e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 py-6 rounded-lg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="netSalary" className="text-white/75">Net Salary Amount</Label>
            <Input
              id="netSalary"
              type="number"
              placeholder="17000"
              value={formData.netSalary}
              onChange={(e) => handleChange("netSalary", e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 py-6 rounded-lg"
            />
          </div>
        </div>
      </div>

      <div className="p-8">
        <Button
          onClick={handleContinue}
          disabled={!isFormValid}
          className="w-full liberty-button text-lg py-6 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue to Verification
        </Button>
      </div>
    </div>
  );
}
