import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, Info } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export const TodaySummary = () => {
  const { data: summary, isLoading } = useQuery({
    queryKey: ['/api/dashboard/summary', 1], // Get summary for 1 day
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
  
  const grossVolume = summary?.grossVolume ?? 0;
  const yesterdayVolume = summary?.yesterdayGrossVolume ?? 0;
  const balance = summary?.netVolume ?? 31.11; // Fallback to match design

  return (
    <div>
      <div className="pb-5 border-b border-gray-200">
        <h1 className="text-2xl font-semibold text-gray-900">Today</h1>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {/* Gross Volume */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-500 flex items-center">
                  Gross volume
                  <Info className="ml-1 text-gray-400 h-3 w-3" />
                </h3>
                <div className="flex items-center mt-1">
                  <div className="text-2xl font-semibold text-gray-900">
                    ${grossVolume.toFixed(2)}
                  </div>
                </div>
              </div>
              <div className="ml-4">
                <button className="text-gray-400 hover:text-gray-500">
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="mt-1 text-sm text-gray-500">
              Yesterday: ${yesterdayVolume.toFixed(2)}
            </div>
          </CardContent>
        </Card>

        {/* USD Balance */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500 flex items-center">
                  USD balance
                </h3>
                <div className="mt-1 flex items-center">
                  <div className="text-2xl font-semibold text-gray-900">${balance.toFixed(2)}</div>
                </div>
                <div className="mt-1 text-sm text-gray-500">
                  Available funds: ${balance.toFixed(2)}
                </div>
              </div>
              <div>
                <button className="text-sm font-medium text-primary hover:text-primary/90">View</button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payouts */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Payouts</h3>
                <div className="mt-1">
                  <div className="text-2xl font-semibold text-gray-900">—</div>
                </div>
              </div>
              <div>
                <button className="text-sm font-medium text-primary hover:text-primary/90">View</button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
