import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Splash from "./pages/onboarding/Splash";
import Welcome from "./pages/onboarding/Welcome";
import PhoneEntry from "./pages/onboarding/PhoneEntry";
import OTPVerification from "./pages/onboarding/OTPVerification";
import CreatePIN from "./pages/onboarding/CreatePIN";
import ConfirmPIN from "./pages/onboarding/ConfirmPIN";
import PersonalDetails from "./pages/onboarding/PersonalDetails";
import ScanIDFront from "./pages/onboarding/ScanIDFront";
import ScanIDBack from "./pages/onboarding/ScanIDBack";
import LivenessCheck from "./pages/onboarding/LivenessCheck";
import VerificationComplete from "./pages/onboarding/VerificationComplete";
import Login from "./pages/onboarding/Login";
import AppHome from "./pages/app/Home";
import Yalla from "./pages/app/Yalla";
import EnterAmount from "./pages/app/EnterAmount";
import SelectAccount from "./pages/app/SelectAccount";
import Review from "./pages/app/Review";
import Success from "./pages/app/Success";
import Transactions from "./pages/app/Transactions";
import Profile from "./pages/app/Profile";
import BankAccounts from "./pages/app/BankAccounts";
import Cards from "./pages/app/Cards";
import CardSettings from "./pages/app/CardSettings";
import SalaryBreakdown from "./pages/app/SalaryBreakdown";
import OfficialDetails from "./pages/app/OfficialDetails";
import TransactionDetails from "./pages/app/TransactionDetails";
import Notifications from "./pages/app/Notifications";
import EmployerInfo from "./pages/app/EmployerInfo";
import Limits from "./pages/app/Limits";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Splash} />
      
      {/* Onboarding Routes */}
      <Route path="/onboarding/splash" component={Splash} />
      <Route path="/onboarding/welcome" component={Welcome} />
      <Route path="/onboarding/phone" component={PhoneEntry} />
      <Route path="/onboarding/otp" component={OTPVerification} />
      <Route path="/onboarding/create-pin" component={CreatePIN} />
      <Route path="/onboarding/confirm-pin" component={ConfirmPIN} />
      <Route path="/onboarding/personal-details" component={PersonalDetails} />
      <Route path="/onboarding/scan-id-front" component={ScanIDFront} />
      <Route path="/onboarding/scan-id-back" component={ScanIDBack} />
      <Route path="/onboarding/liveness-check" component={LivenessCheck} />
      <Route path="/onboarding/verification-complete" component={VerificationComplete} />
      <Route path="/onboarding/login" component={Login} />
      
      {/* App Routes */}
      <Route path="/app/home" component={AppHome} />
      <Route path="/app/yalla" component={Yalla} />
      <Route path="/app/enter-amount" component={EnterAmount} />
      <Route path="/app/select-account" component={SelectAccount} />
      <Route path="/app/review" component={Review} />
      <Route path="/app/success" component={Success} />
      <Route path="/app/transactions" component={Transactions} />
      <Route path="/app/profile" component={Profile} />
      <Route path="/app/bank-accounts" component={BankAccounts} />
      <Route path="/app/cards" component={Cards} />
      <Route path="/app/card-settings" component={CardSettings} />
      <Route path="/app/salary-breakdown" component={SalaryBreakdown} />
      <Route path="/app/official-details" component={OfficialDetails} />
      <Route path="/app/transaction-details" component={TransactionDetails} />
      <Route path="/app/notifications" component={Notifications} />
      <Route path="/app/employer-info" component={EmployerInfo} />
      <Route path="/app/limits" component={Limits} />
      
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
