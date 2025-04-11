
import { 
  Home, Clock, BarChart2, Users, Package2, Link as LinkIcon, 
  Repeat, File, CreditCard, FileText, PieChart, Code, 
  ChevronDown, Building2, Star, Plus, CircleDollarSign, 
  Landmark, Menu, X
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export const Sidebar = () => {
  const [location] = useLocation();
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const isActive = (path: string) => {
    return location === path;
  };

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-md"
        onClick={toggleMobileMenu}
      >
        {isMobileMenuOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>

      <aside 
        className={`
          ${isExpanded ? 'w-[260px]' : 'w-[70px]'} 
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          fixed left-0 h-full bg-white border-r border-gray-100 shadow-sm
          transition-all duration-300 ease-in-out z-40 overflow-y-auto
          md:block
        `}
      >
        <div className="px-4 py-5 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Avatar className="h-7 w-7 rounded-md bg-primary/10">
                <AvatarFallback className="rounded-md text-primary text-xs font-medium">OG</AvatarFallback>
              </Avatar>
              {isExpanded && (
                <div>
                  <div className="flex items-center">
                    <span className="font-medium text-sm text-gray-800">Ohio Group</span>
                    <ChevronDown className="h-3.5 w-3.5 ml-1 text-gray-500" />
                  </div>
                  <div className="text-xs text-gray-500">Workspace</div>
                </div>
              )}
            </div>
            <button 
              className="hidden md:block p-1 rounded-md hover:bg-gray-100"
              onClick={toggleSidebar}
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>

        <nav className="pt-3 pb-4">
          <div className="space-y-0.5 px-2">
            {[
              { path: "/", icon: Home, label: "Overview" },
              { path: "/balances", icon: Landmark, label: "Balances", badge: "$250.00" },
              { path: "/transactions", icon: BarChart2, label: "Transactions", badge: "8 new" },
              { path: "/customers", icon: Users, label: "Customers" },
              { path: "/products", icon: Package2, label: "Products" }
            ].map((item) => (
              <Link 
                key={item.path}
                href={item.path} 
                className={isActive(item.path) ? "sidebar-item-active" : "sidebar-item"}
                onClick={() => isMobile && setIsMobileMenuOpen(false)}
              >
                <item.icon className="h-4 w-4 mr-3" />
                {isExpanded && (
                  <>
                    <span>{item.label}</span>
                    {item.badge && (
                      <Badge 
                        className="ml-auto text-[10px] h-5" 
                        variant={item.badge.includes('$') ? 'success' : 'outline'}
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
              </Link>
            ))}
          </div>

          {isExpanded && (
            <>
              <h3 className="sidebar-heading">Growth</h3>
              <div className="px-2 space-y-0.5">
                {[
                  { path: "/payment-links", icon: CircleDollarSign, label: "Payment Links" },
                  { path: "/subscriptions", icon: Repeat, label: "Subscriptions", badge: "New" },
                  { path: "/invoices", icon: File, label: "Invoices" },
                  { path: "/connect", icon: Star, label: "Connect" }
                ].map((item) => (
                  <Link 
                    key={item.path}
                    href={item.path} 
                    className={isActive(item.path) ? "sidebar-item-active" : "sidebar-item"}
                    onClick={() => isMobile && setIsMobileMenuOpen(false)}
                  >
                    <item.icon className="h-4 w-4 mr-3 text-gray-500" />
                    <span>{item.label}</span>
                    {item.badge && (
                      <Badge className="ml-auto text-[10px] h-5 bg-blue-100 text-blue-800 hover:bg-blue-100">
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                ))}
              </div>

              <h3 className="sidebar-heading">Finance</h3>
              <div className="px-2 space-y-0.5">
                {[
                  { path: "/payments", icon: CreditCard, label: "Payments" },
                  { path: "/billing", icon: FileText, label: "Billing" },
                  { path: "/reports", icon: PieChart, label: "Reports" }
                ].map((item) => (
                  <Link 
                    key={item.path}
                    href={item.path} 
                    className={isActive(item.path) ? "sidebar-item-active" : "sidebar-item justify-between"}
                    onClick={() => isMobile && setIsMobileMenuOpen(false)}
                  >
                    <div className="flex items-center">
                      <item.icon className="h-4 w-4 mr-3 text-gray-500" />
                      <span>{item.label}</span>
                    </div>
                    <ChevronDown className="h-3.5 w-3.5 text-gray-500" />
                  </Link>
                ))}
              </div>

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
            </>
          )}
        </nav>
        
        {isExpanded && (
          <div className="px-4 pb-6">
            <Link href="/payment-links/new">
              <Button variant="default" size="sm" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Create Payment Link
              </Button>
            </Link>
          </div>
        )}
      </aside>
    </>
  );
};
