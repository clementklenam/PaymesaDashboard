import { 
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { format, subDays } from 'date-fns';

interface AreaChartProps {
  data?: number[];
  color?: string;
  height?: number;
  showAxis?: boolean;
}

export const AreaChart = ({ 
  data = [0, 8, 5, 15, 20, 12, 10],
  color = "hsl(var(--primary))",
  height = 140,
  showAxis = false
}: AreaChartProps) => {
  // Generate dates for the x-axis (last N days where N is data.length)
  const chartData = data.map((value, index) => {
    const date = subDays(new Date(), data.length - 1 - index);
    return {
      date: format(date, 'MMM d'),
      value
    };
  });

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsAreaChart
        data={chartData}
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 5,
        }}
      >
        {showAxis && <CartesianGrid strokeDasharray="3 3" />}
        {showAxis && <XAxis dataKey="date" />}
        {showAxis && <YAxis />}
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '0.375rem',
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
          }}
          formatter={(value: number) => [`$${value.toFixed(2)}`, 'Volume']}
          labelFormatter={(label) => label}
        />
        <defs>
          <linearGradient id={`colorGradient-${color.replace(/[(),.]/g, '')}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.8} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area 
          type="monotone" 
          dataKey="value" 
          stroke={color} 
          strokeWidth={2}
          fill={`url(#colorGradient-${color.replace(/[(),.]/g, '')})`} 
        />
      </RechartsAreaChart>
    </ResponsiveContainer>
  );
};
