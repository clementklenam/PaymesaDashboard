import { Card, CardContent } from "@/components/ui/card";
import { CreditCard, ExternalLink, CheckCircle, Clock } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

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
    <Card className="shadow-sm border-gray-100 overflow-hidden card-highlight">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-blue-100 p-2 rounded-md mr-4">
              <CreditCard className="h-5 w-5 text-blue-600" />
            </div>
            <h3 className="text-base font-medium text-gray-700">Recent Payments</h3>
          </div>
          <Badge variant="outline" className="text-xs font-medium">
            Last 24 hours
          </Badge>
        </div>
        
        {/* Payments List */}
        <div className="mt-5 space-y-4">
          {isLoading || !transactions 
            ? defaultPayments.map((payment, i) => (
                <div key={i} className="flex items-center justify-between py-1">
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-3 bg-gray-100">
                      <AvatarFallback className="text-xs text-gray-500">
                        {payment.customerName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-sm font-medium text-gray-700">{payment.customerName}</div>
                      <div className="text-xs text-gray-500 flex items-center">
                        <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                        <span>Completed</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm font-semibold">${payment.amount.toFixed(2)}</div>
                </div>
              ))
            : transactions.map((transaction: any) => {
                const customer = customerMap[transaction.customerId];
                const customerName = customer 
                  ? customer.name.split(' ')[0] + ' ' + customer.name.split(' ')[1]?.charAt(0) + '.' 
                  : 'Unknown';
                
                return (
                  <div key={transaction.id} className="flex items-center justify-between py-1">
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-3 bg-primary/10">
                        <AvatarFallback className="text-xs text-primary">
                          {customerName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm font-medium text-gray-700">{customerName}</div>
                        <div className="text-xs text-gray-500 flex items-center">
                          {transaction.status === 'succeeded' ? (
                            <>
                              <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                              <span>Completed</span>
                            </>
                          ) : (
                            <>
                              <Clock className="h-3 w-3 text-amber-500 mr-1" />
                              <span>Processing</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm font-semibold">${Number(transaction.amount).toFixed(2)}</div>
                  </div>
                );
              })
          }
        </div>
        
        <div className="mt-5 pt-3 border-t border-gray-100 text-xs text-gray-500 flex justify-between">
          <button className="text-primary font-medium hover:text-primary/80 transition-colors flex items-center">
            View all transactions
            <ExternalLink className="h-3 w-3 ml-1" />
          </button>
          <span>Updated {format(new Date(), 'h:mm a')}</span>
        </div>
      </CardContent>
    </Card>
  );
};
