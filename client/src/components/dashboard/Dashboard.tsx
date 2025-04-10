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
        
        <main className="flex-1 overflow-y-auto p-6">
          <SearchBar />
          
          <TodaySummary />
          
          <TimelineChart />
          
          <Overview timeRange={timeRange} setTimeRange={setTimeRange} />
        </main>
      </div>
    </div>
  );
};
