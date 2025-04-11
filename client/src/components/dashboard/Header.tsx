import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  BellIcon, 
  Settings, 
  HelpCircle, 
  Search, 
  BarChart2, 
  AlertTriangle,
  Zap,
  ChevronDown,
  ArrowRight,
  Bell
} from "lucide-react";

export const Header = () => {
  const [testMode, setTestMode] = useState(true);

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 fixed top-0 left-0 right-0 z-50 h-16">
      <div className="flex justify-between items-center h-full px-4 md:px-6">
        <div className="flex items-center">
          <div className="mr-6 flex items-center">
            <div className="bg-primary text-white p-1.5 rounded mr-2 shadow-sm">
              <Zap className="h-5 w-5" />
            </div>
            <span className="font-bold text-xl tracking-tight">Paymesa</span>
          </div>
          <div className="hidden md:block">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 font-medium">
              Test mode
            </Badge>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <div className="text-xs bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-md flex items-center">
            <AlertTriangle className="h-3.5 w-3.5 text-amber-500 mr-1.5" />
            <span className="text-amber-700">Complete your profile to accept live payments</span>
          </div>
          <a href="#" className="text-primary hover:text-primary/80 text-sm font-medium transition-colors flex items-center">
            Complete profile
            <ArrowRight className="h-3.5 w-3.5 ml-1" />
          </a>

          <div className="flex items-center ml-2">
            <button className="relative p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>

            <div className="flex items-center ml-4 cursor-pointer hover:opacity-90 transition-opacity">
              <Avatar className="h-8 w-8 border border-gray-200">
                <AvatarFallback className="text-sm font-medium bg-primary/10 text-primary">PM</AvatarFallback>
              </Avatar>
              <ChevronDown className="h-4 w-4 ml-1 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center px-4 py-3 border-t border-gray-200 md:hidden">
        <div className="text-xs text-gray-600 flex items-center">
          <AlertTriangle className="h-3 w-3 text-amber-500 mr-1" />
          <span>Test mode enabled</span>
        </div>
        <a href="#" className="text-primary hover:text-primary/80 text-sm font-medium transition-colors">
          Complete profile
        </a>
      </div>
    </header>
  );
};

export const SearchBar = () => {
  const [testMode, setTestMode] = useState(true);

  return (
    <div className="relative mb-4 md:mb-6 mt-2 md:mt-0">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
      <Input
        type="search"
        placeholder="Search transactions, customers..."
        className="pl-8 bg-white w-full md:w-auto"
      />
    </div>
  );
};