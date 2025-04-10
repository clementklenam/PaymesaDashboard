import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  Search, 
  Plus,
  ExternalLink,
  Download,
  FileText,
  Send,
  Clock,
  CheckCircle,
  AlertTriangle,
  DollarSign,
  Mail
} from "lucide-react";
import { format, subDays } from "date-fns";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function InvoicesPage() {
  // Mock invoices data
  const invoices = [
    { 
      id: 'inv_JK5FrJh82jdO9y', 
      number: 'INV-001',
      status: 'paid',
      amount: 149.99,
      currency: 'USD',
      date: new Date(2025, 3, 1),
      dueDate: new Date(2025, 3, 15),
      paidDate: new Date(2025, 3, 10),
      customer: { 
        name: 'John Smith', 
        email: 'john@example.com',
        id: 'cus_JK5FrJh82jdO9y' 
      },
      description: 'Website development services'
    },
    { 
      id: 'inv_LM6GsKi93keP0z', 
      number: 'INV-002',
      status: 'pending',
      amount: 75.00,
      currency: 'USD',
      date: new Date(2025, 3, 5),
      dueDate: new Date(2025, 3, 19),
      customer: { 
        name: 'Emma Johnson', 
        email: 'emma@example.com',
        id: 'cus_LM6GsKi93keP0z' 
      },
      description: 'Monthly consulting fee'
    },
    { 
      id: 'inv_NO7HtLj04lfQ1a', 
      number: 'INV-003',
      status: 'draft',
      amount: 300.00,
      currency: 'USD',
      date: new Date(2025, 3, 8),
      dueDate: new Date(2025, 3, 22),
      customer: { 
        name: 'Michael Brown', 
        email: 'michael@example.com',
        id: 'cus_NO7HtLj04lfQ1a' 
      },
      description: 'E-commerce website design'
    },
    { 
      id: 'inv_PQ8IuMk15mgR2b', 
      number: 'INV-004',
      status: 'past_due',
      amount: 80.50,
      currency: 'USD',
      date: new Date(2025, 2, 15),
      dueDate: new Date(2025, 2, 29),
      customer: { 
        name: 'Sarah Wilson', 
        email: 'sarah@example.com',
        id: 'cus_PQ8IuMk15mgR2b' 
      },
      description: 'Logo design services'
    },
    { 
      id: 'inv_RS9JvNl26nhS3c', 
      number: 'INV-005',
      status: 'paid',
      amount: 225.75,
      currency: 'USD',
      date: new Date(2025, 2, 20),
      dueDate: new Date(2025, 3, 5),
      paidDate: new Date(2025, 3, 2),
      customer: { 
        name: 'David Lee', 
        email: 'david@example.com',
        id: 'cus_RS9JvNl26nhS3c' 
      },
      description: 'Social media marketing'
    }
  ];

  // Function to render status badge
  const renderStatus = (status: string) => {
    switch (status) {
      case 'paid':
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Paid
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            Pending
          </Badge>
        );
      case 'draft':
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
            Draft
          </Badge>
        );
      case 'past_due':
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            Past Due
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <DashboardLayout 
      title="Invoices" 
      description="Create and send professional invoices to your customers"
    >
      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="shadow-sm border-gray-100">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary/10 p-2 rounded-full mb-3">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div className="text-2xl font-bold">{invoices.length}</div>
                <p className="text-sm text-gray-500">Total Invoices</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm border-gray-100">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-green-100 p-2 rounded-full mb-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div className="text-2xl font-bold">
                  ${invoices
                    .filter(inv => inv.status === 'paid')
                    .reduce((sum, inv) => sum + inv.amount, 0)
                    .toFixed(2)}
                </div>
                <p className="text-sm text-gray-500">Paid</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm border-gray-100">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-blue-100 p-2 rounded-full mb-3">
                  <Clock className="h-5 w-5 text-blue-600" />
                </div>
                <div className="text-2xl font-bold">
                  ${invoices
                    .filter(inv => inv.status === 'pending')
                    .reduce((sum, inv) => sum + inv.amount, 0)
                    .toFixed(2)}
                </div>
                <p className="text-sm text-gray-500">Pending</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm border-gray-100">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-red-100 p-2 rounded-full mb-3">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                </div>
                <div className="text-2xl font-bold">
                  ${invoices
                    .filter(inv => inv.status === 'past_due')
                    .reduce((sum, inv) => sum + inv.amount, 0)
                    .toFixed(2)}
                </div>
                <p className="text-sm text-gray-500">Past Due</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Filters and Controls */}
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input 
              placeholder="Search invoices..." 
              className="pl-9 bg-white border-gray-200" 
            />
          </div>
          
          <div className="flex space-x-2">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Invoice
            </Button>
          </div>
        </div>
        
        {/* Invoices List */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All invoices</TabsTrigger>
            <TabsTrigger value="draft">Draft</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="paid">Paid</TabsTrigger>
            <TabsTrigger value="past_due">Past due</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            <Card className="border-gray-100 shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100 text-sm text-gray-500">
                      <th className="text-left p-4 font-medium">Invoice</th>
                      <th className="text-left p-4 font-medium">Customer</th>
                      <th className="text-left p-4 font-medium">Amount</th>
                      <th className="text-left p-4 font-medium">Status</th>
                      <th className="text-left p-4 font-medium">Date</th>
                      <th className="text-left p-4 font-medium">Due date</th>
                      <th className="text-right p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map((invoice) => (
                      <tr key={invoice.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="p-4">
                          <div className="flex flex-col">
                            <div className="text-sm font-medium">{invoice.number}</div>
                            <div className="text-xs text-gray-500">{invoice.description}</div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-2 bg-primary/10">
                              <AvatarFallback className="text-xs text-primary">
                                {invoice.customer.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="text-sm font-medium">{invoice.customer.name}</div>
                              <div className="text-xs text-gray-500">{invoice.customer.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-sm font-medium">
                          ${invoice.amount.toFixed(2)}
                        </td>
                        <td className="p-4">
                          {renderStatus(invoice.status)}
                        </td>
                        <td className="p-4 text-sm">{format(invoice.date, 'MMM d, yyyy')}</td>
                        <td className="p-4 text-sm">
                          {format(invoice.dueDate, 'MMM d, yyyy')}
                          {invoice.status === 'past_due' && (
                            <span className="text-red-500 text-xs ml-1">
                              (Overdue)
                            </span>
                          )}
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex justify-end space-x-1">
                            {invoice.status === 'draft' ? (
                              <Button variant="outline" size="sm">
                                <Send className="h-4 w-4 mr-1.5" />
                                Send
                              </Button>
                            ) : invoice.status === 'pending' || invoice.status === 'past_due' ? (
                              <Button variant="outline" size="sm">
                                <Mail className="h-4 w-4 mr-1.5" />
                                Remind
                              </Button>
                            ) : (
                              <Button variant="outline" size="sm">
                                <DollarSign className="h-4 w-4 mr-1.5" />
                                Record payment
                              </Button>
                            )}
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                              <span className="sr-only">Download</span>
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
                  Showing <span className="font-medium">5</span> of <span className="font-medium">5</span> invoices
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
          
          <TabsContent value="draft" className="mt-0">
            <Card className="border-gray-100 shadow-sm p-8">
              <div className="flex justify-center items-center py-8 text-center">
                <div>
                  <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-1">Draft Invoices</h3>
                  <p className="text-gray-500 max-w-md">
                    This tab would display draft invoices that haven't been sent to customers yet.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="pending" className="mt-0">
            <Card className="border-gray-100 shadow-sm p-8">
              <div className="flex justify-center items-center py-8 text-center">
                <div>
                  <Clock className="mx-auto h-12 w-12 text-blue-500 mb-4" />
                  <h3 className="text-lg font-medium mb-1">Pending Invoices</h3>
                  <p className="text-gray-500 max-w-md">
                    This tab would display pending invoices that have been sent but not yet paid.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="paid" className="mt-0">
            <Card className="border-gray-100 shadow-sm p-8">
              <div className="flex justify-center items-center py-8 text-center">
                <div>
                  <CheckCircle className="mx-auto h-12 w-12 text-green-500 mb-4" />
                  <h3 className="text-lg font-medium mb-1">Paid Invoices</h3>
                  <p className="text-gray-500 max-w-md">
                    This tab would display paid invoices that have been successfully completed.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="past_due" className="mt-0">
            <Card className="border-gray-100 shadow-sm p-8">
              <div className="flex justify-center items-center py-8 text-center">
                <div>
                  <AlertTriangle className="mx-auto h-12 w-12 text-red-500 mb-4" />
                  <h3 className="text-lg font-medium mb-1">Past Due Invoices</h3>
                  <p className="text-gray-500 max-w-md">
                    This tab would display invoices that are past their due date and require immediate attention.
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