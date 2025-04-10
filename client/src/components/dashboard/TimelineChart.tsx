import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

export const TimelineChart = () => {
  const [progress, setProgress] = useState(50);
  const currentHour = new Date().getHours();
  const currentMinute = new Date().getMinutes();
  
  useEffect(() => {
    // Calculate the percentage of the day that has passed
    const minutesInDay = 24 * 60;
    const minutesPassed = currentHour * 60 + currentMinute;
    const percentage = (minutesPassed / minutesInDay) * 100;
    
    setProgress(percentage);
  }, [currentHour, currentMinute]);

  return (
    <Card className="mt-6">
      <CardContent className="p-6">
        <div className="flex justify-between items-center">
          <div className="text-xs text-gray-500">12:00 AM</div>
          <div className="text-xs text-gray-500">11:59 PM</div>
        </div>
        <Progress value={progress} className="h-2 mt-2" />
      </CardContent>
    </Card>
  );
};
