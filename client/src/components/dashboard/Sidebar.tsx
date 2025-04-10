import { 
  Home,
  Clock,
  BarChart2,
  Users,
  Package2,
  Link as LinkIcon,
  Repeat,
  File,
  CreditCard, 
  FileText,
  PieChart,
  Code,
  ChevronDown,
  Building2,
  Star,
  Plus,
  CircleDollarSign,
  Landmark
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Link, useLocation } from "wouter";

export const Sidebar = () => {
  const [location] = useLocation();

  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <aside className="hidden md:block w-[260px] border-r border-gray-100 bg-white h-full overflow-y-auto shadow-sm">
      <div className="px-4 py-5 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Avatar className="h-7 w-7 rounded-md bg-primary/10">
              <AvatarFallback className="rounded-md text-primary text-xs font-medium">OG</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center">
                <span className="font-medium text-sm text-gray-800">Ohio Group</span>
                <ChevronDown className="h-3.5 w-3.5 ml-1 text-gray-500" />
              </div>
              <div className="text-xs text-gray-500">Workspace</div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-3 pb-4">
        <nav>
          {/* Main Navigation */}
          <div className="space-y-0.5 px-2">
            <Link href="/" className={isActive("/") ? "sidebar-item-active" : "sidebar-item"}>
              <Home className="h-4 w-4 mr-3" />
              <span>Overview</span>
            </Link>
            <Link href="/balances" className={isActive("/balances") ? "sidebar-item-active" : "sidebar-item"}>
              <Landmark className="h-4 w-4 mr-3 text-gray-500" />
              <span>Balances</span>
              <Badge className="ml-auto text-[10px] h-5 bg-green-100 text-green-800 hover:bg-green-100">$250.00</Badge>
            </Link>
            <Link href="/transactions" className={isActive("/transactions") ? "sidebar-item-active" : "sidebar-item"}>
              <BarChart2 className="h-4 w-4 mr-3 text-gray-500" />
              <span>Transactions</span>
              <Badge className="ml-auto text-[10px] h-5" variant="outline">8 new</Badge>
            </Link>
            <Link href="/customers" className={isActive("/customers") ? "sidebar-item-active" : "sidebar-item"}>
              <Users className="h-4 w-4 mr-3 text-gray-500" />
              <span>Customers</span>
            </Link>
            <Link href="/products" className={isActive("/products") ? "sidebar-item-active" : "sidebar-item"}>
              <Package2 className="h-4 w-4 mr-3 text-gray-500" />
              <span>Products</span>
            </Link>
          </div>

          {/* Shortcuts Section */}
          <h3 className="sidebar-heading">Growth</h3>
          <div className="px-2 space-y-0.5">
            <Link href="/payment-links" className={isActive("/payment-links") ? "sidebar-item-active" : "sidebar-item"}>
              <CircleDollarSign className="h-4 w-4 mr-3 text-gray-500" />
              <span>Payment Links</span>
            </Link>
            <Link href="/subscriptions" className={isActive("/subscriptions") ? "sidebar-item-active" : "sidebar-item"}>
              <Repeat className="h-4 w-4 mr-3 text-gray-500" />
              <span>Subscriptions</span>
              <Badge className="ml-auto text-[10px] h-5 bg-blue-100 text-blue-800 hover:bg-blue-100">New</Badge>
            </Link>
            <Link href="/invoices" className={isActive("/invoices") ? "sidebar-item-active" : "sidebar-item"}>
              <File className="h-4 w-4 mr-3 text-gray-500" />
              <span>Invoices</span>
            </Link>
            <Link href="/connect" className={isActive("/connect") ? "sidebar-item-active" : "sidebar-item"}>
              <Star className="h-4 w-4 mr-3 text-gray-500" />
              <span>Connect</span>
            </Link>
          </div>

          {/* Products Section */}
          <h3 className="sidebar-heading">Finance</h3>
          <div className="px-2 space-y-0.5">
            <Link href="/payments" className={isActive("/payments") ? "sidebar-item-active" : "sidebar-item justify-between"}>
              <div className="flex items-center">
                <CreditCard className="h-4 w-4 mr-3 text-gray-500" />
                <span>Payments</span>
              </div>
              <ChevronDown className="h-3.5 w-3.5 text-gray-500" />
            </Link>
            <Link href="/billing" className={isActive("/billing") ? "sidebar-item-active" : "sidebar-item justify-between"}>
              <div className="flex items-center">
                <FileText className="h-4 w-4 mr-3 text-gray-500" />
                <span>Billing</span>
              </div>
              <ChevronDown className="h-3.5 w-3.5 text-gray-500" />
            </Link>
            <Link href="/reports" className={isActive("/reports") ? "sidebar-item-active" : "sidebar-item justify-between"}>
              <div className="flex items-center">
                <PieChart className="h-4 w-4 mr-3 text-gray-500" />
                <span>Reports</span>
              </div>
              <ChevronDown className="h-3.5 w-3.5 text-gray-500" />
            </Link>
          </div>
          
          {/* Developers Section */}
          <h3 className="sidebar-heading">Developer</h3>
          <div className="px-2 space-y-0.5">
            <a href="#" className="sidebar-item">
              <Code className="h-4 w-4 mr-3 text-gray-500" />
              <span>API Access</span>
            </a>
            <a href="#" className="sidebar-item">
              <Building2 className="h-4 w-4 mr-3 text-gray-500" />
              <span>Business Settings</span>
            </a>
          </div>
        </nav>
      </div>
      
      <div className="px-4 pb-6">
        <Link href="/payment-links/new">
          <Button variant="default" size="sm" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Create Payment Link
          </Button>
        </Link>
      </div>
    </aside>
  );
};
