import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

export const FailedPaymentsCard = () => {
  const { data: failedTransactions, isLoading } = useQuery({
    queryKey: ['/api/transactions/failed'],
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
  
  const totalFailedAmount = failedTransactions 
    ? failedTransactions.reduce((sum: number, t: any) => sum + Number(t.amount), 0) 
    : 15.00;
    
  const failureReasonDisplay = (reason: string) => {
    switch(reason) {
      case 'card_declined': return 'Card declined';
      case 'insufficient_funds': return 'Insufficient funds';
      case 'expired_card': return 'Expired card';
      default: return 'Failed';
    }
  };
  
  const failedTransaction = failedTransactions && failedTransactions.length > 0 
    ? failedTransactions[0] 
    : null;
    
  const customerEmail = failedTransaction && customerMap[failedTransaction.customerId]
    ? customerMap[failedTransaction.customerId].email
    : 'customer123@gmail.com';

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center">
          <h3 className="text-lg font-medium text-gray-900">Failed payments</h3>
        </div>
        <div className="mt-2 text-3xl font-semibold text-gray-900">${totalFailedAmount.toFixed(2)}</div>
        
        {/* Failed Payment Details */}
        <div className="mt-4 p-3 bg-red-50 rounded-md border border-red-100">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-red-100 text-red-500">
                <AlertTriangle className="h-4 w-4" />
              </span>
            </div>
            <div className="ml-3 flex-1">
              <div className="text-sm font-medium text-red-800">
                {failedTransaction ? failureReasonDisplay(failedTransaction.failureReason) : 'Card declined'}
              </div>
              <div className="text-xs text-red-700">{customerEmail}</div>
            </div>
            <div>
              <Badge variant="destructive" className="bg-red-100 text-red-800 hover:bg-red-100">
                Expired
              </Badge>
            </div>
          </div>
        </div>
        
        <div className="mt-4 text-sm text-gray-600">
          <span className="font-medium">1</span> of <span className="font-medium">1</span> result
        </div>
        
        <div className="mt-4 text-xs text-gray-500 flex justify-between">
          <button className="text-primary font-medium">View details</button>
          <span>Updated {format(new Date(), 'h:mm a')}</span>
        </div>
      </CardContent>
    </Card>
  );
};
