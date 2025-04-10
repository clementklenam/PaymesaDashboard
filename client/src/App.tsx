import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/HomePage";
import BalancesPage from "@/pages/BalancesPage";
import TransactionsPage from "@/pages/TransactionsPage";
import CustomersPage from "@/pages/CustomersPage";
import ProductsPage from "@/pages/ProductsPage";
import PaymentLinksPage from "@/pages/PaymentLinksPage";
import SubscriptionsPage from "@/pages/SubscriptionsPage";
import InvoicesPage from "@/pages/InvoicesPage";
import ConnectPage from "@/pages/ConnectPage";
import PaymentsPage from "@/pages/PaymentsPage";
import BillingPage from "@/pages/BillingPage";
import ReportsPage from "@/pages/ReportsPage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/balances" component={BalancesPage} />
      <Route path="/transactions" component={TransactionsPage} />
      <Route path="/customers" component={CustomersPage} />
      <Route path="/products" component={ProductsPage} />
      <Route path="/payment-links" component={PaymentLinksPage} />
      <Route path="/subscriptions" component={SubscriptionsPage} />
      <Route path="/invoices" component={InvoicesPage} />
      <Route path="/connect" component={ConnectPage} />
      <Route path="/payments" component={PaymentsPage} />
      <Route path="/billing" component={BillingPage} />
      <Route path="/reports" component={ReportsPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
