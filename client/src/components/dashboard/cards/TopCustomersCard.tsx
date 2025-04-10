import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export const TopCustomersCard = () => {
  const { data: topCustomers, isLoading } = useQuery({
    queryKey: ['/api/customers/top', 3], // Get top 3 customers
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
  
  // Generate initials from a name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };
  
  // Default customer data for the initial render
  const defaultCustomers = [
    { name: 'John Doe', email: 'john.doe@example.com', totalSpent: 42.00 },
    { name: 'Sarah Miller', email: 'sarah.m@example.com', totalSpent: 31.50 },
    { name: 'Robert Johnson', email: 'robert.j@example.com', totalSpent: 27.80 },
  ];

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Top customers by spend</h3>
          <Badge variant="outline" className="text-xs bg-gray-100 text-gray-800">
            All time
          </Badge>
        </div>
        
        {/* Top Customers List */}
        <div className="mt-4 space-y-3">
          {isLoading || !topCustomers
            ? defaultCustomers.map((customer, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Avatar className="h-8 w-8 bg-primary/10 text-primary">
                        <AvatarFallback>{getInitials(customer.name)}</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                      <div className="text-xs text-gray-500">{customer.email}</div>
                    </div>
                  </div>
                  <div className="text-sm font-medium">${customer.totalSpent.toFixed(2)}</div>
                </div>
              ))
            : topCustomers.map((item: any) => (
                <div key={item.customer.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Avatar className="h-8 w-8 bg-primary/10 text-primary">
                        <AvatarFallback>{getInitials(item.customer.name)}</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">{item.customer.name}</div>
                      <div className="text-xs text-gray-500">{item.customer.email}</div>
                    </div>
                  </div>
                  <div className="text-sm font-medium">${item.totalSpent.toFixed(2)}</div>
                </div>
              ))
          }
        </div>
        
        <div className="mt-4 text-xs text-gray-500">
          <button className="text-primary font-medium">View all customers</button>
        </div>
      </CardContent>
    </Card>
  );
};
