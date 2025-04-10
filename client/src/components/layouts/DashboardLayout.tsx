import { Header } from "@/components/dashboard/Header";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { SearchBar } from "@/components/dashboard/Header";
import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
}

export const DashboardLayout = ({ children, title, description }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="flex pt-16">
        <Sidebar />
        
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <SearchBar />
            
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-800 mb-1">{title}</h1>
              {description && <p className="text-gray-500">{description}</p>}
            </div>
            
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};