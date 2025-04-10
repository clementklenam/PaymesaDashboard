import { 
  Home,
  Clock,
  BarChart2,
  Users,
  Package2,
  Link,
  Repeat,
  File,
  CreditCard, 
  FileText,
  PieChart,
  Code,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const Sidebar = () => {
  return (
    <aside className="hidden md:block w-64 border-r border-gray-200 bg-white h-full overflow-y-auto">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="font-medium text-sm">Ohio Group</span>
            <ChevronDown className="h-4 w-4 ml-1 text-gray-500" />
          </div>
        </div>
      </div>

      <div className="mt-2">
        <nav>
          {/* Main Navigation */}
          <div className="space-y-1">
            <a href="#" className="sidebar-item-active">
              <Home className="h-4 w-4 mr-3" />
              <span>Home</span>
            </a>
            <a href="#" className="sidebar-item">
              <Clock className="h-4 w-4 mr-3 text-gray-500" />
              <span>Balances</span>
            </a>
            <a href="#" className="sidebar-item">
              <BarChart2 className="h-4 w-4 mr-3 text-gray-500" />
              <span>Transactions</span>
            </a>
            <a href="#" className="sidebar-item">
              <Users className="h-4 w-4 mr-3 text-gray-500" />
              <span>Customers</span>
            </a>
            <a href="#" className="sidebar-item">
              <Package2 className="h-4 w-4 mr-3 text-gray-500" />
              <span>Product catalog</span>
            </a>
          </div>

          {/* Shortcuts Section */}
          <h3 className="sidebar-heading">Shortcuts</h3>
          <div className="mt-2 space-y-1">
            <a href="#" className="sidebar-item">
              <BarChart2 className="h-4 w-4 mr-3 text-gray-500" />
              <span>Reports</span>
            </a>
            <a href="#" className="sidebar-item">
              <Link className="h-4 w-4 mr-3 text-gray-500" />
              <span>Payment Links</span>
            </a>
            <a href="#" className="sidebar-item">
              <Repeat className="h-4 w-4 mr-3 text-gray-500" />
              <span>Subscriptions</span>
            </a>
            <a href="#" className="sidebar-item">
              <File className="h-4 w-4 mr-3 text-gray-500" />
              <span>Invoices</span>
            </a>
            <a href="#" className="sidebar-item">
              <CreditCard className="h-4 w-4 mr-3 text-gray-500" />
              <span>Connect</span>
            </a>
          </div>

          {/* Products Section */}
          <h3 className="sidebar-heading">Products</h3>
          <div className="mt-2 space-y-1">
            <div className="sidebar-item justify-between cursor-pointer">
              <div className="flex items-center">
                <CreditCard className="h-4 w-4 mr-3 text-gray-500" />
                <span>Payments</span>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </div>
            <div className="sidebar-item justify-between cursor-pointer">
              <div className="flex items-center">
                <FileText className="h-4 w-4 mr-3 text-gray-500" />
                <span>Billing</span>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </div>
            <div className="sidebar-item justify-between cursor-pointer">
              <div className="flex items-center">
                <PieChart className="h-4 w-4 mr-3 text-gray-500" />
                <span>Reporting</span>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </div>
          </div>
          
          {/* Developers Section */}
          <div className="mt-8 mb-8">
            <a href="#" className="sidebar-item">
              <Code className="h-4 w-4 mr-3 text-gray-500" />
              <span>Developers</span>
            </a>
          </div>
        </nav>
      </div>
    </aside>
  );
};
