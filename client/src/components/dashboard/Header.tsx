import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  BellIcon, 
  Settings, 
  HelpCircle, 
  Search, 
  BarChart2, 
  CreditCard, 
  AlertTriangle,
  Zap 
} from "lucide-react";

export const Header = () => {
  const [testMode, setTestMode] = useState(true);

  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50 h-16">
      <div className="flex justify-between items-center h-full px-4 md:px-6">
        <div className="flex items-center">
          <div className="mr-6 flex items-center">
            <Zap className="h-6 w-6 text-primary mr-2" />
            <span className="font-bold text-xl tracking-tight">Paymesa</span>
          </div>
          <div className="hidden md:block">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 font-medium">
              Test mode
            </Badge>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-4">
          <div className="text-xs text-gray-600 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-md flex items-center">
            <AlertTriangle className="h-3.5 w-3.5 text-amber-500 mr-1.5" />
            <span>Complete your business profile to accept live payments</span>
          </div>
          <a href="#" className="text-primary hover:text-primary/80 text-sm font-medium transition-colors">
            Complete profile
          </a>
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary/90 to-primary text-white flex items-center justify-center shadow-sm">
            <span className="text-sm font-medium">P</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center px-4 py-3 border-t border-gray-200 md:hidden">
        <div className="text-xs text-gray-600 flex items-center">
          <AlertTriangle className="h-3 w-3 text-amber-500 mr-1" />
          <span>Test mode enabled</span>
        </div>
        <a href="#" className="text-primary hover:text-primary/80 text-sm font-medium">
          Complete profile
        </a>
      </div>
    </header>
  );
};

export const SearchBar = () => {
  const [testMode, setTestMode] = useState(true);
  
  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
      <div className="relative max-w-md w-full">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="text-gray-400 h-4 w-4" />
        </div>
        <Input 
          type="text" 
          className="pl-10 pr-3 py-2 border-gray-200 bg-white shadow-sm focus:ring-2 focus:ring-primary/20" 
          placeholder="Search transactions, customers..."
        />
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="bg-white shadow-sm border border-gray-100 rounded-md px-3 py-1.5 flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">Test mode</span>
          <Switch 
            checked={testMode}
            onCheckedChange={setTestMode}
            className="data-[state=checked]:bg-primary"
          />
        </div>
        <div className="flex space-x-1">
          <button className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors">
            <BellIcon className="h-5 w-5" />
          </button>
          <button className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors">
            <BarChart2 className="h-5 w-5" />
          </button>
          <button className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors">
            <Settings className="h-5 w-5" />
          </button>
          <button className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors">
            <HelpCircle className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
