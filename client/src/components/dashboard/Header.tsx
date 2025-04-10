import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { BellIcon, Settings, HelpCircle, Search } from "lucide-react";

export const Header = () => {
  const [testMode, setTestMode] = useState(true);

  return (
    <header className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50 h-16">
      <div className="flex justify-between items-center h-full px-4 md:px-6">
        <div className="flex items-center">
          <div className="mr-6 text-primary font-bold text-xl">Paymesa</div>
          <div className="hidden md:block">
            <div className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-full">Test mode</div>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-4">
          <div className="text-xs text-gray-600">You're using test data. To accept payments, complete your business profile.</div>
          <a href="#" className="text-primary hover:text-primary-dark text-sm font-medium">Complete profile</a>
          <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
            <span className="text-sm font-medium">P</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center px-4 py-3 border-t border-gray-200 md:hidden">
        <div className="text-xs text-gray-600">You're using test data.</div>
        <a href="#" className="text-primary hover:text-primary-dark text-sm font-medium">Complete profile</a>
      </div>
    </header>
  );
};

export const SearchBar = () => {
  const [testMode, setTestMode] = useState(true);
  
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="relative max-w-md w-full">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="text-gray-400 h-4 w-4" />
        </div>
        <Input 
          type="text" 
          className="pl-10 pr-3 py-2" 
          placeholder="Search"
        />
      </div>
      
      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium text-gray-600">Test mode</span>
        <Switch 
          checked={testMode}
          onCheckedChange={setTestMode}
        />
        <div className="flex space-x-2">
          <button className="p-2 rounded-md text-gray-400 hover:text-gray-500">
            <BellIcon className="h-5 w-5" />
          </button>
          <button className="p-2 rounded-md text-gray-400 hover:text-gray-500">
            <Settings className="h-5 w-5" />
          </button>
          <button className="p-2 rounded-md text-gray-400 hover:text-gray-500">
            <HelpCircle className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
