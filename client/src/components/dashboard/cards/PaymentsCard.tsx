import { Card, CardContent } from "@/components/ui/card";
import { InfoIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface PaymentsCardProps {
  timeRange: number;
}

export const PaymentsCard = ({ timeRange }: PaymentsCardProps) => {
  const { data: transactions, isLoading } = useQuery({
    queryKey: ['/api/transactions', 5], // Get 5 most recent transactions
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
  
  const { data: customers } = useQuery({
    queryKey: ['/api/customers'],
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
  
  // Create a map of customer IDs to customer objects for easy lookup
  const customerMap = customers 
    ? customers.reduce((acc: Record<number, any>, customer: any) => {
        acc[customer.id] = customer;
        return acc;
      }, {})
    : {};
  
  // Default data for the initial render
  const defaultPayments = [
    { amount: 12.50, customerName: 'John D.' },
    { amount: 8.75, customerName: 'Sarah M.' },
    { amount: 11.62, customerName: 'Alex T.' },
    { amount: 5.99, customerName: 'Laura K.' },
    { amount: 22.40, customerName: 'Chris B.' },
  ];

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center">
          <h3 className="text-lg font-medium text-gray-900">Payments</h3>
          <span className="ml-2 px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
            <InfoIcon className="h-3 w-3" />
          </span>
        </div>
        
        {/* Payments List */}
        <div className="mt-4 space-y-3">
          {isLoading || !transactions 
            ? defaultPayments.map((payment, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <div className="text-gray-600">Payment from {payment.customerName}</div>
                  <div className="font-medium">${payment.amount.toFixed(2)}</div>
                </div>
              ))
            : transactions.map((transaction: any) => {
                const customer = customerMap[transaction.customerId];
                const customerName = customer 
                  ? customer.name.split(' ')[0] + ' ' + customer.name.split(' ')[1]?.charAt(0) + '.' 
                  : 'Unknown';
                
                return (
                  <div key={transaction.id} className="flex items-center justify-between text-sm">
                    <div className="text-gray-600">Payment from {customerName}</div>
                    <div className="font-medium">${Number(transaction.amount).toFixed(2)}</div>
                  </div>
                );
              })
          }
        </div>
        
        <div className="mt-4 text-xs text-gray-500 flex justify-between">
          <button className="text-primary font-medium">View more</button>
          <span>Updated {format(new Date(), 'h:mm a')}</span>
        </div>
      </CardContent>
    </Card>
  );
};
