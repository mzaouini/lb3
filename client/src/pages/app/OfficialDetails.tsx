import { Card } from "@/components/ui/card";
import { ChevronLeft, User, Building2, Calendar, Briefcase, MapPin, Phone, Mail, CreditCard } from "lucide-react";
import { useLocation } from "wouter";

export default function OfficialDetails() {
  const [, setLocation] = useLocation();

  const personalData = {
    fullName: 'Meryem Guezzour',
    mobile: '+212 612345678',
    cin: 'AB100900',
    dob: '01/01/2000',
    address: 'Anfa Place Living, Building A, Apt 502',
    city: 'Casablanca',
    postalCode: '20250',
  };

  const employmentData = {
    employeeId: 'EMP-2024-0142',
    company: 'ACME Corporation',
    department: 'Operations',
    position: 'Operations Manager',
    joinDate: '15 January 2024',
    contractType: 'Full-Time Permanent',
    baseSalary: '10,000 Dhs',
    paymentFrequency: 'Monthly',
    nextPayday: 'November 30, 2025',
    workingDays: 'Monday - Friday',
    workingHours: '9:00 AM - 6:00 PM',
  };

  const companyData = {
    name: 'ACME Corporation',
    address: 'Anfa Place, Casablanca, Morocco',
    phone: '+212 522 123 456',
    email: 'hr@acme.ma',
  };

  return (
    <div className="mobile-container min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="liberty-gradient text-white p-6 rounded-b-3xl">
        <button
          onClick={() => setLocation("/app/profile")}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors mb-4"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-bold">Personal & Employment Details</h1>
        <p className="text-sm opacity-90 mt-1">Your profile and employer information</p>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Personal Information */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center space-x-2 mb-2">
            <User className="w-5 h-5 text-navy" />
            <h3 className="font-bold text-lg text-navy">Personal Information</h3>
          </div>
          
          <div className="space-y-3">
            <div>
              <p className="text-xs text-gray-500 mb-1">Full Name</p>
              <p className="font-semibold text-navy">{personalData.fullName}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Mobile Number</p>
                <p className="font-semibold text-navy">{personalData.mobile}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">CIN</p>
                <p className="font-semibold text-navy">{personalData.cin}</p>
              </div>
            </div>
            
            <div>
              <p className="text-xs text-gray-500 mb-1">Date of Birth</p>
              <p className="font-semibold text-navy">{personalData.dob}</p>
            </div>
            
            <div>
              <p className="text-xs text-gray-500 mb-1">Address</p>
              <p className="font-semibold text-navy">{personalData.address}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">City</p>
                <p className="font-semibold text-navy">{personalData.city}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Postal Code</p>
                <p className="font-semibold text-navy">{personalData.postalCode}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Employment Information */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center space-x-2 mb-2">
            <Briefcase className="w-5 h-5 text-teal" />
            <h3 className="font-bold text-lg text-navy">Employment Information</h3>
          </div>
          
          <div className="space-y-3">
            <div>
              <p className="text-xs text-gray-500 mb-1">Employee ID</p>
              <p className="font-semibold text-navy">{employmentData.employeeId}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Department</p>
                <p className="font-semibold text-navy">{employmentData.department}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Position</p>
                <p className="font-semibold text-navy">{employmentData.position}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Join Date</p>
                <p className="font-semibold text-navy">{employmentData.joinDate}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Contract Type</p>
                <p className="font-semibold text-navy">{employmentData.contractType}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Working Days</p>
                <p className="font-semibold text-navy">{employmentData.workingDays}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Working Hours</p>
                <p className="font-semibold text-navy">{employmentData.workingHours}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Salary Information */}
        <Card className="p-6 space-y-4 bg-gradient-to-br from-teal/10 to-blue-50">
          <div className="flex items-center space-x-2 mb-2">
            <CreditCard className="w-5 h-5 text-teal" />
            <h3 className="font-bold text-lg text-navy">Salary Information</h3>
          </div>
          
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Base Salary</p>
                <p className="font-bold text-xl text-teal">{employmentData.baseSalary}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Payment Frequency</p>
                <p className="font-semibold text-navy">{employmentData.paymentFrequency}</p>
              </div>
            </div>
            
            <div>
              <p className="text-xs text-gray-500 mb-1">Next Payday</p>
              <p className="font-semibold text-navy">{employmentData.nextPayday}</p>
            </div>
          </div>
        </Card>

        {/* Company Information */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center space-x-2 mb-2">
            <Building2 className="w-5 h-5 text-navy" />
            <h3 className="font-bold text-lg text-navy">Company Information</h3>
          </div>
          
          <div className="space-y-3">
            <div>
              <p className="text-xs text-gray-500 mb-1">Company Name</p>
              <p className="font-semibold text-navy">{companyData.name}</p>
            </div>
            
            <div>
              <p className="text-xs text-gray-500 mb-1 flex items-center space-x-1">
                <MapPin className="w-3 h-3" />
                <span>Address</span>
              </p>
              <p className="font-semibold text-navy">{companyData.address}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-1 flex items-center space-x-1">
                  <Phone className="w-3 h-3" />
                  <span>Phone</span>
                </p>
                <p className="font-semibold text-navy">{companyData.phone}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1 flex items-center space-x-1">
                  <Mail className="w-3 h-3" />
                  <span>Email</span>
                </p>
                <p className="font-semibold text-navy">{companyData.email}</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
