import { 
  Select, 
  SelectTrigger, 
  SelectValue, 
  SelectContent, 
  SelectItem 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ChevronDown, Plus, Pencil } from "lucide-react";
import { GrossVolumeCard } from "./cards/GrossVolumeCard";
import { PaymentsCard } from "./cards/PaymentsCard";
import { NetVolumeCard } from "./cards/NetVolumeCard";
import { NewCustomersCard } from "./cards/NewCustomersCard";
import { FailedPaymentsCard } from "./cards/FailedPaymentsCard";
import { TopCustomersCard } from "./cards/TopCustomersCard";

interface OverviewProps {
  timeRange: number;
  setTimeRange: (days: number) => void;
}

export const Overview = ({ timeRange, setTimeRange }: OverviewProps) => {
  return (
    <div className="mt-8">
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl sm:truncate">
            Your overview
          </h2>
        </div>
        
        <div className="mt-4 flex flex-wrap md:mt-0 md:ml-4 gap-3">
          {/* Date Range Selector */}
          <Select 
            defaultValue={timeRange.toString()}
            onValueChange={(value) => setTimeRange(parseInt(value))}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Time period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Today</SelectItem>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="365">Last year</SelectItem>
            </SelectContent>
          </Select>
          
          {/* Compare Toggle */}
          <Select defaultValue="previous">
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Comparison" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="previous">Previous period</SelectItem>
              <SelectItem value="year_ago">Year ago</SelectItem>
              <SelectItem value="none">No comparison</SelectItem>
            </SelectContent>
          </Select>
          
          {/* Previous Period */}
          <Select defaultValue="daily">
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Comparison" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
          
          {/* Actions */}
          <div className="inline-flex shadow-sm rounded-md">
            <Button variant="outline" size="icon" className="h-10 w-10 rounded-r-none">
              <Plus className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="h-10 w-10 rounded-l-none">
              <Pencil className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* First Row of Cards */}
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <GrossVolumeCard timeRange={timeRange} />
        <PaymentsCard timeRange={timeRange} />
        <NetVolumeCard timeRange={timeRange} />
      </div>

      {/* Second Row of Cards */}
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <NewCustomersCard timeRange={timeRange} />
        <FailedPaymentsCard />
        <TopCustomersCard />
      </div>
    </div>
  );
};
