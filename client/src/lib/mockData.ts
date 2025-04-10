import { format, subDays } from 'date-fns';

// Generate the last 7 days for the chart
export const generateDailyDataPoints = (days = 7, base = 30, variance = 15) => {
  return Array.from({ length: days }).map((_, i) => {
    const value = Math.max(0, base + Math.random() * variance - variance / 2);
    const date = format(subDays(new Date(), days - i - 1), 'MMM d');
    return { date, value };
  });
};

// Generate hourly data points for today
export const generateHourlyDataPoints = (hours = 24, base = 10, variance = 8) => {
  return Array.from({ length: hours }).map((_, i) => {
    const value = Math.max(0, base + Math.random() * variance - variance / 2);
    const hour = format(new Date().setHours(i, 0, 0, 0), 'h a');
    return { hour, value };
  });
};

// Generate data for recent payments
export const recentPayments = [
  { id: 1, customer: 'John D.', amount: 12.50, date: subDays(new Date(), 1) },
  { id: 2, customer: 'Sarah M.', amount: 8.75, date: subDays(new Date(), 2) },
  { id: 3, customer: 'Alex T.', amount: 11.62, date: subDays(new Date(), 3) },
  { id: 4, customer: 'Laura K.', amount: 5.99, date: subDays(new Date(), 3) },
  { id: 5, customer: 'Chris B.', amount: 22.40, date: subDays(new Date(), 4) },
];

// Generate data for top customers
export const topCustomers = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', total: 42.00 },
  { id: 2, name: 'Sarah Miller', email: 'sarah.m@example.com', total: 31.50 },
  { id: 3, name: 'Robert Johnson', email: 'robert.j@example.com', total: 27.80 },
];

// Generate data for failed payments
export const failedPayments = [
  { 
    id: 1, 
    customer: 'James Wilson', 
    email: 'james.w@example.com', 
    amount: 15.00, 
    reason: 'Card declined', 
    status: 'Expired',
    date: subDays(new Date(), 1)
  }
];
