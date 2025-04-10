import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp } from "lucide-react";
import { AreaChart } from "../charts/AreaChart";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

interface NewCustomersCardProps {
  timeRange: number;
}

export const NewCustomersCard = ({ timeRange }: NewCustomersCardProps) => {
  const { data: summary } = useQuery({
    queryKey: ['/api/dashboard/summary', timeRange],
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
  
  const { data: newCustomers } = useQuery({
    queryKey: ['/api/customers/new', timeRange],
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
  
  const customerCount = summary?.newCustomersCount ?? 2;
  
  // Generate data for chart - in a real app, you'd aggregate customers by day
  const chartData = newCustomers 
    ? Array(timeRange).fill(0).map((_, i) => {
        // Count customers created on each day
        const date = new Date();
        date.setDate(date.getDate() - (timeRange - 1) + i);
        date.setHours(0, 0, 0, 0);
        
        const nextDay = new Date(date);
        nextDay.setDate(nextDay.getDate() + 1);
        
        return newCustomers.filter((c: any) => {
          const createdAt = new Date(c.createdAt);
          return createdAt >= date && createdAt < nextDay;
        }).length;
      })
    : [0, 0, 0, 0, 0, 1, 1]; // Default data

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center">
          <h3 className="text-lg font-medium text-gray-900">New customers</h3>
          <span className="ml-2 px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
            <ArrowUp className="inline h-3 w-3 mr-1" />
            <span>New</span>
          </span>
        </div>
        <div className="mt-2 text-3xl font-semibold text-gray-900">{customerCount}</div>
        <div className="text-sm text-gray-500">0 previous period</div>
        
        <div className="mt-4 chart-container">
          <AreaChart 
            data={chartData} 
            color="hsl(142, 71%, 45%)" 
          />
        </div>
        
        <div className="mt-4 text-xs text-gray-500 flex justify-between">
          <button className="text-primary font-medium">View more</button>
          <span>Updated {format(new Date(), 'h:mm a')}</span>
        </div>
      </CardContent>
    </Card>
  );
};
