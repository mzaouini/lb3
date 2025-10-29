import { Card } from "@/components/ui/card";
import { ChevronLeft, Building2, User, Calendar, FileText, MapPin, Phone, Mail } from "lucide-react";
import { useLocation } from "wouter";

export default function EmployerInfo() {
  const [, setLocation] = useLocation();

  const employerData = {
    // Employee Info
    employeeId: 'EMP-2024-0142',
    fullName: 'Meryem Guezzour',
    department: 'Operations',
    position: 'Operations Manager',
    joinDate: '15 January 2024',
    contractType: 'Full-Time Permanent',
    
    // Employer Info
    companyName: 'ACME Corporation',
    companyAddress: 'Anfa Place, Casablanca, Morocco',
    companyPhone: '+212 522 123 456',
    companyEmail: 'hr@acme.ma',
    
    // Salary Info
    baseSalary: '10,000 Dhs',
    paymentFrequency: 'Monthly',
    nextPayday: 'November 30, 2025',
    
    // Work Schedule
    workingDays: 'Monday - Friday',
    workingHours: '9:00 AM - 6:00 PM',
    totalDaysPerMonth: 30,
  };

  return (
    <div className="mobile-container min-h-screen bg-navy text-white pb-24">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setLocation("/app/profile")}
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
            <Building2 className="w-8 h-8 text-mint" />
            <h1 className="text-3xl font-bold">Employer Details</h1>
          </div>
          <div className="h-1 w-16 bg-mint rounded-full"></div>
        </div>

        {/* Employee Information */}
        <Card className="bg-white/10 border-white/20 p-6 space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <User className="w-5 h-5 text-mint" />
            <h3 className="font-bold text-lg">Employee Information</h3>
          </div>
          
          <div className="space-y-3">
            <div>
              <p className="text-xs opacity-60 mb-1">Employee ID</p>
              <p className="font-semibold">{employerData.employeeId}</p>
            </div>
            
            <div>
              <p className="text-xs opacity-60 mb-1">Full Name</p>
              <p className="font-semibold">{employerData.fullName}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs opacity-60 mb-1">Department</p>
                <p className="font-semibold">{employerData.department}</p>
              </div>
              <div>
                <p className="text-xs opacity-60 mb-1">Position</p>
                <p className="font-semibold">{employerData.position}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs opacity-60 mb-1">Join Date</p>
                <p className="font-semibold">{employerData.joinDate}</p>
              </div>
              <div>
                <p className="text-xs opacity-60 mb-1">Contract Type</p>
                <p className="font-semibold">{employerData.contractType}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Company Information */}
        <Card className="bg-white/10 border-white/20 p-6 space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <Building2 className="w-5 h-5 text-mint" />
            <h3 className="font-bold text-lg">Company Information</h3>
          </div>
          
          <div className="space-y-3">
            <div>
              <p className="text-xs opacity-60 mb-1">Company Name</p>
              <p className="font-semibold">{employerData.companyName}</p>
            </div>
            
            <div>
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-mint mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-xs opacity-60 mb-1">Address</p>
                  <p className="font-semibold text-sm">{employerData.companyAddress}</p>
                </div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-mint" />
                <div className="flex-1">
                  <p className="text-xs opacity-60 mb-1">Phone</p>
                  <p className="font-semibold">{employerData.companyPhone}</p>
                </div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-mint" />
                <div className="flex-1">
                  <p className="text-xs opacity-60 mb-1">Email</p>
                  <p className="font-semibold">{employerData.companyEmail}</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Salary Information */}
        <Card className="bg-white/10 border-white/20 p-6 space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <FileText className="w-5 h-5 text-mint" />
            <h3 className="font-bold text-lg">Salary Information</h3>
          </div>
          
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs opacity-60 mb-1">Base Salary</p>
                <p className="font-semibold text-lg text-mint">{employerData.baseSalary}</p>
              </div>
              <div>
                <p className="text-xs opacity-60 mb-1">Payment Frequency</p>
                <p className="font-semibold">{employerData.paymentFrequency}</p>
              </div>
            </div>
            
            <div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-mint" />
                <div className="flex-1">
                  <p className="text-xs opacity-60 mb-1">Next Payday</p>
                  <p className="font-semibold">{employerData.nextPayday}</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Work Schedule */}
        <Card className="bg-white/10 border-white/20 p-6 space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <Calendar className="w-5 h-5 text-mint" />
            <h3 className="font-bold text-lg">Work Schedule</h3>
          </div>
          
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs opacity-60 mb-1">Working Days</p>
                <p className="font-semibold">{employerData.workingDays}</p>
              </div>
              <div>
                <p className="text-xs opacity-60 mb-1">Working Hours</p>
                <p className="font-semibold">{employerData.workingHours}</p>
              </div>
            </div>
            
            <div>
              <p className="text-xs opacity-60 mb-1">Total Days Per Month</p>
              <p className="font-semibold">{employerData.totalDaysPerMonth} days</p>
            </div>
          </div>
        </Card>

        {/* Info Card */}
        <Card className="bg-blue-500/20 border border-blue-400/30 p-4">
          <div className="flex items-start space-x-3">
            <Building2 className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold mb-1">BETA Feature</p>
              <p className="text-xs opacity-90">
                Detailed employer information helps you track your employment details and salary structure.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
