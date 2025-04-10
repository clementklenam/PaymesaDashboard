import { Header, SearchBar } from "./Header";
import { Sidebar } from "./Sidebar";
import { TodaySummary } from "./TodaySummary";
import { TimelineChart } from "./TimelineChart";
import { Overview } from "./Overview";
import { useState } from "react";

export const Dashboard = () => {
  const [timeRange, setTimeRange] = useState(7); // Default 7 days
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="flex pt-16">
        <Sidebar />
        
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <SearchBar />
            
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-800 mb-1">Dashboard Overview</h1>
              <p className="text-gray-500">View your payments, transactions, and customer activity in real-time</p>
            </div>
            
            <TodaySummary />
            
            <div className="mt-8 bg-white shadow-sm rounded-lg border border-gray-100 p-6 mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Payment Activity</h2>
              <TimelineChart />
            </div>
            
            <Overview timeRange={timeRange} setTimeRange={setTimeRange} />
          </div>
        </main>
      </div>
    </div>
  );
};
