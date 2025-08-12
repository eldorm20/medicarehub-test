import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useAuth } from "@/hooks/useAuth";
import { i18n } from "@/lib/i18n";
import { useEffect } from "react";

// Pages
import Home from "@/pages/home";
import Orders from "@/pages/orders";
import MedicineSearch from "@/pages/medicine-search";
import AIConsultation from "@/pages/ai-consultation";
import Profile from "@/pages/profile";
import HelpCenter from "@/pages/help-center";
import ContactSupport from "@/pages/contact-support";
import PrescriptionAnalysis from "@/pages/prescription-analysis";
import SymptomChecker from "@/pages/symptom-checker";
import TermsOfService from "@/pages/legal/terms-of-service";
import PrivacyPolicy from "@/pages/legal/privacy-policy";
import MedicalDisclaimer from "@/pages/legal/medical-disclaimer";
import NotFound from "@/pages/not-found";

// Auth & Dashboards
import Login from "@/pages/auth/login";
import ClientDashboard from "@/pages/dashboards/client-dashboard";
import PharmacySellerDashboard from "@/pages/dashboards/pharmacy-seller-dashboard";
import PharmacyOwnerDashboard from "@/pages/dashboards/pharmacy-owner-dashboard";
import SuperAdminDashboard from "@/pages/dashboards/super-admin-dashboard";

function Router() {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login />;
  }

  const getDashboardComponent = () => {
    switch (user?.role) {
      case 'super_admin':
        return SuperAdminDashboard;
      case 'pharmacy_owner':
        return PharmacyOwnerDashboard;
      case 'pharmacy_seller':
        return PharmacySellerDashboard;
      default:
        return ClientDashboard;
    }
  };

  const DashboardComponent = getDashboardComponent();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/dashboard" component={DashboardComponent} />
          <Route path="/client-dashboard" component={ClientDashboard} />
          <Route path="/seller-dashboard" component={PharmacySellerDashboard} />
          <Route path="/owner-dashboard" component={PharmacyOwnerDashboard} />
          <Route path="/admin-dashboard" component={SuperAdminDashboard} />
          <Route path="/medicine-search" component={MedicineSearch} />
          <Route path="/medicines" component={MedicineSearch} />
          <Route path="/ai-consultation" component={AIConsultation} />
          <Route path="/consultation" component={AIConsultation} />
          <Route path="/orders" component={Orders} />
          <Route path="/profile" component={Profile} />
          <Route path="/help-center" component={HelpCenter} />
          <Route path="/help" component={HelpCenter} />
          <Route path="/contact-support" component={ContactSupport} />
          <Route path="/contact" component={ContactSupport} />
          <Route path="/prescription-analysis" component={PrescriptionAnalysis} />
          <Route path="/symptom-checker" component={SymptomChecker} />
          <Route path="/legal/terms" component={TermsOfService} />
          <Route path="/legal/privacy" component={PrivacyPolicy} />
          <Route path="/legal/disclaimer" component={MedicalDisclaimer} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  useEffect(() => {
    // Initialize i18n
    i18n.init();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
