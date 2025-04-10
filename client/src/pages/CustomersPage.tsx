import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Search, 
  Download,
  Plus,
  ExternalLink,
  ArrowUpRight,
  Mail,
  Phone,
  BarChart3,
  CreditCard
} from "lucide-react";
import { format, subDays } from "date-fns";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function CustomersPage() {
  // Mock customers data
  const customers = [
    { 
      id: 'cus_JK5FrJh82jdO9y', 
      name: 'John Smith', 
      email: 'john@example.com',
      phone: '+1 (555) 123-4567',
      created: new Date(2024, 10, 15),
      transactions: 5,
      spent: 219.95,
      lastTransaction: new Date(2025, 3, 5)
    },
    { 
      id: 'cus_JK5FrJ682jdO9y', 
      name: 'Emma Johnson', 
      email: 'emma@example.com',
      phone: '+1 (555) 234-5678',
      created: new Date(2024, 11, 3),
      transactions: 2,
      spent: 129.99,
      lastTransaction: new Date(2025, 3, 10)
    },
    { 
      id: 'cus_JK5FrJh82j6O9y', 
      name: 'Michael Brown', 
      email: 'michael@example.com',
      phone: '+1 (555) 345-6789',
      created: new Date(2024, 11, 20),
      transactions: 3,
      spent: 75.00,
      lastTransaction: new Date(2025, 3, 1)
    },
    { 
      id: 'cus_JK5F3Jh82jdO9y', 
      name: 'Sarah Wilson', 
      email: 'sarah@example.com',
      phone: '+1 (555) 456-7890',
      created: new Date(2025, 0, 8),
      transactions: 4,
      spent: 249.96,
      lastTransaction: new Date(2025, 3, 9)
    },
    { 
      id: 'cus_JK5Freh82jdO9y', 
      name: 'David Lee', 
      email: 'david@example.com',
      phone: '+1 (555) 567-8901',
      created: new Date(2025, 1, 15),
      transactions: 1,
      spent: 75.50,
      lastTransaction: new Date(2025, 3, 8)
    }
  ];

  return (
    <DashboardLayout 
      title="Customers" 
      description="View and manage your customer information"
    >
      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="shadow-sm border-gray-100">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary/10 p-2 rounded-full mb-3">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div className="text-2xl font-bold">{customers.length}</div>
                <p className="text-sm text-gray-500">Total Customers</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm border-gray-100">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-green-100 p-2 rounded-full mb-3">
                  <UserPlus className="h-5 w-5 text-green-600" />
                </div>
                <div className="text-2xl font-bold">2</div>
                <p className="text-sm text-gray-500">New this month</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm border-gray-100">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-blue-100 p-2 rounded-full mb-3">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                </div>
                <div className="text-2xl font-bold">15</div>
                <p className="text-sm text-gray-500">Total Transactions</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm border-gray-100">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-indigo-100 p-2 rounded-full mb-3">
                  <DollarSign className="h-5 w-5 text-indigo-600" />
                </div>
                <div className="text-2xl font-bold">$750.40</div>
                <p className="text-sm text-gray-500">Total Revenue</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Filters and Controls */}
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input 
              placeholder="Search customers..." 
              className="pl-9 bg-white border-gray-200" 
            />
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Customer
            </Button>
          </div>
        </div>
        
        {/* Customers List */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All customers</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            <Card className="border-gray-100 shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100 text-sm text-gray-500">
                      <th className="text-left p-4 font-medium">Customer</th>
                      <th className="text-left p-4 font-medium">Contact</th>
                      <th className="text-left p-4 font-medium">Customer since</th>
                      <th className="text-left p-4 font-medium">Transactions</th>
                      <th className="text-left p-4 font-medium">Total spent</th>
                      <th className="text-left p-4 font-medium">Last transaction</th>
                      <th className="text-right p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map((customer) => (
                      <tr key={customer.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="p-4">
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-2 bg-primary/10">
                              <AvatarFallback className="text-xs text-primary">
                                {customer.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="text-sm font-medium">{customer.name}</div>
                              <div className="text-xs text-gray-500">{customer.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center text-sm text-gray-600">
                              <Mail className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
                              {customer.email}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <Phone className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
                              {customer.phone}
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-sm">{format(customer.created, 'MMM d, yyyy')}</td>
                        <td className="p-4 text-sm">{customer.transactions}</td>
                        <td className="p-4 text-sm font-medium">${customer.spent.toFixed(2)}</td>
                        <td className="p-4 text-sm">{format(customer.lastTransaction, 'MMM d, yyyy')}</td>
                        <td className="p-4 text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm">
                              <Mail className="h-4 w-4" />
                              <span className="sr-only">Email</span>
                            </Button>
                            <Button variant="ghost" size="sm">
                              <BarChart3 className="h-4 w-4" />
                              <span className="sr-only">Activity</span>
                            </Button>
                            <Button variant="ghost" size="sm">
                              <ExternalLink className="h-4 w-4" />
                              <span className="sr-only">View</span>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="flex items-center justify-between p-4 border-t border-gray-100">
                <div className="text-sm text-gray-500">
                  Showing <span className="font-medium">5</span> of <span className="font-medium">5</span> customers
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm" disabled>
                    Next
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="active" className="mt-0">
            <Card className="border-gray-100 shadow-sm p-8">
              <div className="flex justify-center items-center py-8 text-center">
                <div>
                  <UserCheck className="mx-auto h-12 w-12 text-green-500 mb-4" />
                  <h3 className="text-lg font-medium mb-1">Active Customers</h3>
                  <p className="text-gray-500 max-w-md">
                    This tab would display only active customers who have made a purchase recently.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="inactive" className="mt-0">
            <Card className="border-gray-100 shadow-sm p-8">
              <div className="flex justify-center items-center py-8 text-center">
                <div>
                  <UserX className="mx-auto h-12 w-12 text-gray-500 mb-4" />
                  <h3 className="text-lg font-medium mb-1">Inactive Customers</h3>
                  <p className="text-gray-500 max-w-md">
                    This tab would display customers who haven't made a purchase in the last 6 months.
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

// Additional components
function Users(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function UserPlus(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <line x1="19" x2="19" y1="8" y2="14" />
      <line x1="16" x2="22" y1="11" y2="11" />
    </svg>
  );
}

function DollarSign(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function UserCheck(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <polyline points="16 11 18 13 22 9" />
    </svg>
  );
}

function UserX(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <line x1="17" x2="22" y1="8" y2="13" />
      <line x1="22" x2="17" y1="8" y2="13" />
    </svg>
  );
}