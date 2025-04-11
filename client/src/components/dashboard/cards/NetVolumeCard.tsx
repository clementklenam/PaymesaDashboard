
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp, ArrowDown, DollarSign, ExternalLink } from "lucide-react";
import { AreaChart } from "../charts/AreaChart";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

interface NetVolumeCardProps {
  timeRange: number;
}

export const NetVolumeCard = ({ timeRange }: NetVolumeCardProps) => {
  const { data: summary, isLoading } = useQuery({
    queryKey: ['/api/dashboard/summary', timeRange],
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
  
  const { data: transactions } = useQuery({
    queryKey: ['/api/transactions/period', timeRange],
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
  
  const netVolume = summary?.netVolume ?? 31.11;
  const previousPeriod = 0;
  const percentChange = previousPeriod > 0 
    ? ((netVolume - previousPeriod) / previousPeriod) * 100 
    : 5;
    
  const chartData = transactions 
    ? transactions
        .filter((t: any) => t.status === 'succeeded')
        .map((t: any) => Number(t.amount))
    : [0, 4, 8, 7, 13, 20, 15];

  return (
    <Card className="shadow-sm border-gray-100 overflow-hidden card-highlight">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-indigo-100 p-2 rounded-md mr-4">
              <DollarSign className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-base font-medium text-gray-700">Net Volume</h3>
              <div className="flex items-center mt-1">
                <span className="text-2xl font-bold text-gray-900">${netVolume.toFixed(2)}</span>
                <Badge className={`ml-2 ${
                  percentChange >= 0 
                    ? 'bg-green-100 text-green-800 hover:bg-green-100' 
                    : 'bg-red-100 text-red-800 hover:bg-red-100'
                }`}>
                  {percentChange >= 0 
                    ? <ArrowUp className="inline h-3 w-3 mr-1" /> 
                    : <ArrowDown className="inline h-3 w-3 mr-1" />
                  }
                  <span>{Math.abs(Math.round(percentChange))}%</span>
                </Badge>
              </div>
            </div>
          </div>
        </div>
        <div className="text-sm text-gray-500 mt-1">${previousPeriod.toFixed(2)} previous period</div>
        
        <div className="mt-4 chart-container">
          <AreaChart data={chartData} color="hsl(var(--primary))" />
        </div>
        
        <div className="mt-1 grid grid-cols-2 text-xs text-gray-500">
          <div>{format(new Date(Date.now() - timeRange * 24 * 60 * 60 * 1000), 'MMM d')}</div>
          <div className="text-right">Today</div>
        </div>
        
        <div className="mt-4 text-xs text-gray-500 flex justify-between">
          <button className="text-primary font-medium hover:text-primary/80 transition-colors flex items-center">
            View details
            <ExternalLink className="h-3 w-3 ml-1" />
          </button>
          <span>Updated {format(new Date(), 'h:mm a')}</span>
        </div>
      </CardContent>
    </Card>
  );
};
