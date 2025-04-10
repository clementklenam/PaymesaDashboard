import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, XCircle, ExternalLink, ShieldAlert } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

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
    
  const customer = failedTransaction && customerMap[failedTransaction.customerId]
    ? customerMap[failedTransaction.customerId]
    : { email: 'customer123@gmail.com', name: 'John Doe' };
    
  const customerEmail = customer.email;
  const customerName = customer.name;
  const initials = customerName.split(' ').map(n => n[0]).join('');

  return (
    <Card className="shadow-sm border-gray-100 overflow-hidden card-highlight">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-red-100 p-2 rounded-md mr-4">
              <ShieldAlert className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <h3 className="text-base font-medium text-gray-700">Failed Payments</h3>
              <div className="flex items-center mt-1">
                <span className="text-2xl font-bold text-gray-900">${totalFailedAmount.toFixed(2)}</span>
                <Badge className="ml-2 bg-red-100 text-red-800 hover:bg-red-100">
                  <AlertTriangle className="inline h-3 w-3 mr-1" />
                  <span>Action needed</span>
                </Badge>
              </div>
            </div>
          </div>
        </div>
        
        {/* Failed Payment Details */}
        <div className="mt-5 p-4 bg-red-50 rounded-lg border border-red-100">
          <div className="flex items-center">
            <Avatar className="h-10 w-10 mr-3 bg-red-100">
              <AvatarFallback className="text-sm text-red-500">{initials}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="text-sm font-medium text-red-800 flex items-center">
                <XCircle className="h-3.5 w-3.5 mr-1.5 text-red-500" />
                {failedTransaction ? failureReasonDisplay(failedTransaction.failureReason) : 'Card declined'}
              </div>
              <div className="text-xs text-red-700 mt-0.5">
                <span className="font-medium">{customerName}</span> • {customerEmail}
              </div>
              <div className="mt-1.5 flex items-center">
                <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200 mr-2">
                  Expired
                </Badge>
                <Badge variant="outline" className="bg-white text-gray-700 border-gray-200">
                  Requires action
                </Badge>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 text-sm text-gray-600 flex justify-between items-center">
          <div>
            <span className="font-medium">1</span> of <span className="font-medium">1</span> result
          </div>
          <Badge variant="outline" className="text-xs font-medium">Last 30 days</Badge>
        </div>
        
        <div className="mt-4 text-xs text-gray-500 flex justify-between pt-3 border-t border-gray-100">
          <button className="text-primary font-medium hover:text-primary/80 transition-colors flex items-center">
            View all failed payments
            <ExternalLink className="h-3 w-3 ml-1" />
          </button>
          <span>Updated {format(new Date(), 'h:mm a')}</span>
        </div>
      </CardContent>
    </Card>
  );
};
