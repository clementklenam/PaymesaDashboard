import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Search, 
  Download,
  Filter,
  ChevronDown,
  CheckCircle,
  XCircle,
  Clock,
  ExternalLink
} from "lucide-react";
import { format } from "date-fns";

export default function TransactionsPage() {
  // Mock transactions data
  const transactions = [
    { 
      id: 'txn_1KJ3dS2eZvKYlo2CjK7i9wM8', 
      date: new Date(2025, 3, 10, 14, 23), 
      amount: 42.99, 
      status: 'succeeded',
      customer: { name: 'John Smith', email: 'john@example.com' },
      payment_method: 'Visa •••• 4242',
      description: 'Pro Plan Subscription'
    },
    { 
      id: 'txn_1KJ3aS2eZvKYlo2C4K7i9wM8', 
      date: new Date(2025, 3, 10, 10, 15), 
      amount: 129.99, 
      status: 'succeeded',
      customer: { name: 'Emma Johnson', email: 'emma@example.com' },
      payment_method: 'Mastercard •••• 5555',
      description: 'Enterprise Plan'
    },
    { 
      id: 'txn_1KJD3aS2eZvKYlo28K7i9wM8', 
      date: new Date(2025, 3, 9, 16, 45), 
      amount: 25.00, 
      status: 'processing',
      customer: { name: 'Michael Brown', email: 'michael@example.com' },
      payment_method: 'Visa •••• 4444',
      description: 'Basic Plan'
    },
    { 
      id: 'txn_1KJ3aS2eZvKYlo2C4K7i9wM8', 
      date: new Date(2025, 3, 9, 9, 30), 
      amount: 199.99, 
      status: 'succeeded',
      customer: { name: 'Sarah Wilson', email: 'sarah@example.com' },
      payment_method: 'American Express •••• 3782',
      description: 'Annual Subscription'
    },
    { 
      id: 'txn_1KJ3aS2eZvKYlo2C4K7i9wM8', 
      date: new Date(2025, 3, 8, 14, 10), 
      amount: 75.50, 
      status: 'failed',
      customer: { name: 'David Lee', email: 'david@example.com' },
      payment_method: 'Mastercard •••• 9876',
      description: 'Pro Plan'
    }
  ];

  // Function to render status badge
  const renderStatus = (status: string) => {
    switch (status) {
      case 'succeeded':
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 flex items-center gap-1 font-normal">
            <CheckCircle className="h-3 w-3" />
            Succeeded
          </Badge>
        );
      case 'processing':
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 flex items-center gap-1 font-normal">
            <Clock className="h-3 w-3" />
            Processing
          </Badge>
        );
      case 'failed':
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100 flex items-center gap-1 font-normal">
            <XCircle className="h-3 w-3" />
            Failed
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <DashboardLayout 
      title="Transactions" 
      description="View and manage all your payment transactions"
    >
      <div className="space-y-6">
        {/* Filters and Controls */}
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input 
              placeholder="Search by name, email, or ID..." 
              className="pl-9 bg-white border-gray-200" 
            />
          </div>
          
          <div className="flex space-x-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px] bg-white border-gray-200">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="succeeded">Succeeded</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            
            <Button variant="outline" className="flex gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
        
        {/* Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All transactions</TabsTrigger>
            <TabsTrigger value="succeeded">Succeeded</TabsTrigger>
            <TabsTrigger value="processing">Processing</TabsTrigger>
            <TabsTrigger value="failed">Failed</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            <Card className="border-gray-100 shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100 text-sm text-gray-500">
                      <th className="text-left p-4 font-medium">Date</th>
                      <th className="text-left p-4 font-medium">Description</th>
                      <th className="text-left p-4 font-medium">Customer</th>
                      <th className="text-left p-4 font-medium">Payment method</th>
                      <th className="text-left p-4 font-medium">Amount</th>
                      <th className="text-left p-4 font-medium">Status</th>
                      <th className="text-right p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction) => (
                      <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="p-4 text-sm">
                          <div>{format(transaction.date, 'MMM d, yyyy')}</div>
                          <div className="text-gray-500 text-xs">{format(transaction.date, 'h:mm a')}</div>
                        </td>
                        <td className="p-4 text-sm font-medium">{transaction.description}</td>
                        <td className="p-4">
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-2 bg-primary/10">
                              <AvatarFallback className="text-xs text-primary">
                                {transaction.customer.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="text-sm font-medium">{transaction.customer.name}</div>
                              <div className="text-xs text-gray-500">{transaction.customer.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-sm">{transaction.payment_method}</td>
                        <td className="p-4 text-sm font-medium">${transaction.amount.toFixed(2)}</td>
                        <td className="p-4">{renderStatus(transaction.status)}</td>
                        <td className="p-4 text-right">
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="h-4 w-4" />
                            <span className="sr-only">View</span>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="flex items-center justify-between p-4 border-t border-gray-100">
                <div className="text-sm text-gray-500">
                  Showing <span className="font-medium">5</span> of <span className="font-medium">24</span> transactions
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="succeeded" className="mt-0">
            <Card className="border-gray-100 shadow-sm p-8">
              <div className="flex justify-center items-center py-8 text-center">
                <div>
                  <CheckCircle className="mx-auto h-12 w-12 text-green-500 mb-4" />
                  <h3 className="text-lg font-medium mb-1">Filter content</h3>
                  <p className="text-gray-500 max-w-md">
                    This tab would display only successful transactions from the list.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="processing" className="mt-0">
            <Card className="border-gray-100 shadow-sm p-8">
              <div className="flex justify-center items-center py-8 text-center">
                <div>
                  <Clock className="mx-auto h-12 w-12 text-blue-500 mb-4" />
                  <h3 className="text-lg font-medium mb-1">Filter content</h3>
                  <p className="text-gray-500 max-w-md">
                    This tab would display only processing transactions from the list.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="failed" className="mt-0">
            <Card className="border-gray-100 shadow-sm p-8">
              <div className="flex justify-center items-center py-8 text-center">
                <div>
                  <XCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
                  <h3 className="text-lg font-medium mb-1">Filter content</h3>
                  <p className="text-gray-500 max-w-md">
                    This tab would display only failed transactions from the list.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}