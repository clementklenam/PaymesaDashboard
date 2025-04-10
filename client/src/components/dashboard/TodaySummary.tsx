import { Card, CardContent } from "@/components/ui/card";
import { 
  ChevronDown, 
  Info, 
  ArrowRight, 
  TrendingUp, 
  DollarSign, 
  RefreshCcw 
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export const TodaySummary = () => {
  const { data: summary, isLoading } = useQuery({
    queryKey: ['/api/dashboard/summary', 1], // Get summary for 1 day
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
  
  const grossVolume = summary?.grossVolume ?? 0;
  const yesterdayVolume = summary?.yesterdayGrossVolume ?? 0;
  const balance = summary?.netVolume ?? 31.11; // Fallback to match design

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <h2 className="text-lg font-semibold text-gray-800">Today's Overview</h2>
          <Badge variant="outline" className="ml-3 text-xs font-medium">
            {format(new Date(), 'MMMM d, yyyy')}
          </Badge>
        </div>
        <button className="text-xs text-primary font-medium hover:text-primary/80 transition-colors flex items-center">
          View daily breakdown
          <ArrowRight className="h-3 w-3 ml-1" />
        </button>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {/* Gross Volume */}
        <Card className="shadow-sm border-gray-100">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="bg-primary/10 p-2 rounded-md mr-4">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-500 flex items-center">
                  Gross volume today
                  <Info className="ml-1 text-gray-400 h-3 w-3 cursor-help" />
                </h3>
                <div className="flex items-center mt-1">
                  <div className="text-2xl font-bold text-gray-900">
                    ${grossVolume.toFixed(2)}
                  </div>
                </div>
              </div>
              <div className="ml-4">
                <button className="text-gray-400 hover:text-gray-600 hover:bg-gray-50 p-1 rounded transition-colors">
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-500">
              Yesterday: ${yesterdayVolume.toFixed(2)}
            </div>
          </CardContent>
        </Card>

        {/* USD Balance */}
        <Card className="shadow-sm border-gray-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-blue-100 p-2 rounded-md mr-4">
                  <DollarSign className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 flex items-center">
                    USD Balance
                  </h3>
                  <div className="mt-1 flex items-center">
                    <div className="text-2xl font-bold text-gray-900">${balance.toFixed(2)}</div>
                  </div>
                  <div className="mt-1 text-xs text-gray-500">
                    Available now: ${balance.toFixed(2)}
                  </div>
                </div>
              </div>
              <div>
                <button className="text-sm font-medium text-primary hover:text-primary/80 flex items-center transition-colors">
                  View
                  <ArrowRight className="h-3 w-3 ml-1" />
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payouts */}
        <Card className="shadow-sm border-gray-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-green-100 p-2 rounded-md mr-4">
                  <RefreshCcw className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Payouts</h3>
                  <div className="mt-1">
                    <div className="text-2xl font-bold text-gray-900">—</div>
                  </div>
                  <div className="mt-1 text-xs text-gray-500">
                    Next payout: Not scheduled
                  </div>
                </div>
              </div>
              <div>
                <button className="text-sm font-medium text-primary hover:text-primary/80 flex items-center transition-colors">
                  Setup
                  <ArrowRight className="h-3 w-3 ml-1" />
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
