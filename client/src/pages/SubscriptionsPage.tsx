import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  Search, 
  Plus,
  ExternalLink,
  Edit,
  PauseCircle,
  PlayCircle,
  Repeat,
  Calendar,
  DollarSign,
  CreditCard,
  User,
  BarChart
} from "lucide-react";
import { format, addMonths } from "date-fns";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function SubscriptionsPage() {
  // Mock subscriptions data
  const subscriptions = [
    { 
      id: 'sub_JK5FrJh82jdO9y', 
      status: 'active',
      created: new Date(2025, 1, 15),
      currentPeriodStart: new Date(2025, 3, 1),
      currentPeriodEnd: new Date(2025, 4, 1),
      customer: { 
        name: 'John Smith', 
        email: 'john@example.com',
        id: 'cus_JK5FrJh82jdO9y' 
      },
      product: {
        name: 'Pro Plan',
        price: 49.99,
        interval: 'month'
      },
      paymentMethod: 'Visa •••• 4242'
    },
    { 
      id: 'sub_LM6GsKi93keP0z', 
      status: 'active',
      created: new Date(2025, 2, 3),
      currentPeriodStart: new Date(2025, 3, 3),
      currentPeriodEnd: new Date(2025, 4, 3),
      customer: { 
        name: 'Emma Johnson', 
        email: 'emma@example.com',
        id: 'cus_LM6GsKi93keP0z' 
      },
      product: {
        name: 'Enterprise Plan',
        price: 129.99,
        interval: 'month'
      },
      paymentMethod: 'Mastercard •••• 5555'
    },
    { 
      id: 'sub_NO7HtLj04lfQ1a', 
      status: 'past_due',
      created: new Date(2025, 1, 20),
      currentPeriodStart: new Date(2025, 3, 20),
      currentPeriodEnd: new Date(2025, 4, 20),
      customer: { 
        name: 'Michael Brown', 
        email: 'michael@example.com',
        id: 'cus_NO7HtLj04lfQ1a' 
      },
      product: {
        name: 'Basic Plan',
        price: 25.00,
        interval: 'month'
      },
      paymentMethod: 'Visa •••• 4444'
    },
    { 
      id: 'sub_PQ8IuMk15mgR2b', 
      status: 'canceled',
      created: new Date(2024, 11, 12),
      currentPeriodStart: new Date(2025, 3, 12),
      currentPeriodEnd: new Date(2025, 4, 12),
      canceledAt: new Date(2025, 3, 5),
      customer: { 
        name: 'Sarah Wilson', 
        email: 'sarah@example.com',
        id: 'cus_PQ8IuMk15mgR2b' 
      },
      product: {
        name: 'Pro Plan',
        price: 49.99,
        interval: 'month'
      },
      paymentMethod: 'American Express •••• 3782'
    },
    { 
      id: 'sub_RS9JvNl26nhS3c', 
      status: 'active',
      created: new Date(2025, 0, 28),
      currentPeriodStart: new Date(2025, 2, 28),
      currentPeriodEnd: new Date(2025, 3, 28),
      customer: { 
        name: 'David Lee', 
        email: 'david@example.com',
        id: 'cus_RS9JvNl26nhS3c' 
      },
      product: {
        name: 'Pro Plan',
        price: 49.99,
        interval: 'month'
      },
      paymentMethod: 'Mastercard •••• 9876'
    }
  ];

  // Function to render status badge
  const renderStatus = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Active
          </Badge>
        );
      case 'past_due':
        return (
          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
            Past due
          </Badge>
        );
      case 'canceled':
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
            Canceled
          </Badge>
        );
      case 'trialing':
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            Trial
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <DashboardLayout 
      title="Subscriptions" 
      description="Manage recurring payments and subscription plans"
    >
      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="shadow-sm border-gray-100">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary/10 p-2 rounded-full mb-3">
                  <Repeat className="h-5 w-5 text-primary" />
                </div>
                <div className="text-2xl font-bold">
                  {subscriptions.filter(sub => sub.status === 'active').length}
                </div>
                <p className="text-sm text-gray-500">Active Subscriptions</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm border-gray-100">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-green-100 p-2 rounded-full mb-3">
                  <DollarSign className="h-5 w-5 text-green-600" />
                </div>
                <div className="text-2xl font-bold">
                  ${subscriptions
                    .filter(sub => sub.status === 'active')
                    .reduce((sum, sub) => sum + sub.product.price, 0)
                    .toFixed(2)}
                </div>
                <p className="text-sm text-gray-500">Monthly Recurring Revenue</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm border-gray-100">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-amber-100 p-2 rounded-full mb-3">
                  <PauseCircle className="h-5 w-5 text-amber-600" />
                </div>
                <div className="text-2xl font-bold">
                  {subscriptions.filter(sub => sub.status === 'past_due').length}
                </div>
                <p className="text-sm text-gray-500">Past Due</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm border-gray-100">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-blue-100 p-2 rounded-full mb-3">
                  <Calendar className="h-5 w-5 text-blue-600" />
                </div>
                <div className="text-2xl font-bold">
                  {subscriptions.filter(sub => 
                    sub.status === 'active' && 
                    new Date(sub.currentPeriodEnd).getTime() < addMonths(new Date(), 1).getTime()
                  ).length}
                </div>
                <p className="text-sm text-gray-500">Renewing Soon</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Filters and Controls */}
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input 
              placeholder="Search subscriptions..." 
              className="pl-9 bg-white border-gray-200" 
            />
          </div>
          
          <div className="flex space-x-2">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Subscription
            </Button>
          </div>
        </div>
        
        {/* Subscriptions List */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All subscriptions</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="past_due">Past due</TabsTrigger>
            <TabsTrigger value="canceled">Canceled</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            <Card className="border-gray-100 shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100 text-sm text-gray-500">
                      <th className="text-left p-4 font-medium">Customer</th>
                      <th className="text-left p-4 font-medium">Plan</th>
                      <th className="text-left p-4 font-medium">Status</th>
                      <th className="text-left p-4 font-medium">Started</th>
                      <th className="text-left p-4 font-medium">Current period</th>
                      <th className="text-left p-4 font-medium">Payment method</th>
                      <th className="text-right p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscriptions.map((subscription) => (
                      <tr key={subscription.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="p-4">
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-2 bg-primary/10">
                              <AvatarFallback className="text-xs text-primary">
                                {subscription.customer.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="text-sm font-medium">{subscription.customer.name}</div>
                              <div className="text-xs text-gray-500">{subscription.customer.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="text-sm font-medium">{subscription.product.name}</div>
                          <div className="text-xs text-gray-500">
                            ${subscription.product.price}/{subscription.product.interval}
                          </div>
                        </td>
                        <td className="p-4">
                          {renderStatus(subscription.status)}
                        </td>
                        <td className="p-4 text-sm">{format(subscription.created, 'MMM d, yyyy')}</td>
                        <td className="p-4 text-sm">
                          <div>{format(subscription.currentPeriodStart, 'MMM d, yyyy')}</div>
                          <div className="text-xs text-gray-500">
                            to {format(subscription.currentPeriodEnd, 'MMM d, yyyy')}
                          </div>
                        </td>
                        <td className="p-4 text-sm">
                          <div className="flex items-center">
                            <CreditCard className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
                            {subscription.paymentMethod}
                          </div>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex justify-end space-x-1">
                            {subscription.status === 'active' ? (
                              <Button variant="outline" size="sm">
                                <PauseCircle className="h-4 w-4 mr-1.5" />
                                Pause
                              </Button>
                            ) : subscription.status === 'past_due' ? (
                              <Button variant="outline" size="sm">
                                <CreditCard className="h-4 w-4 mr-1.5" />
                                Update payment
                              </Button>
                            ) : (
                              <Button variant="outline" size="sm">
                                <PlayCircle className="h-4 w-4 mr-1.5" />
                                Reactivate
                              </Button>
                            )}
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
                  Showing <span className="font-medium">5</span> of <span className="font-medium">5</span> subscriptions
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
                  <PlayCircle className="mx-auto h-12 w-12 text-green-500 mb-4" />
                  <h3 className="text-lg font-medium mb-1">Active Subscriptions</h3>
                  <p className="text-gray-500 max-w-md">
                    This tab would display only active subscriptions that are currently being billed.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="past_due" className="mt-0">
            <Card className="border-gray-100 shadow-sm p-8">
              <div className="flex justify-center items-center py-8 text-center">
                <div>
                  <PauseCircle className="mx-auto h-12 w-12 text-amber-500 mb-4" />
                  <h3 className="text-lg font-medium mb-1">Past Due Subscriptions</h3>
                  <p className="text-gray-500 max-w-md">
                    This tab would display subscriptions with failed payment attempts that need attention.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="canceled" className="mt-0">
            <Card className="border-gray-100 shadow-sm p-8">
              <div className="flex justify-center items-center py-8 text-center">
                <div>
                  <User className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-1">Canceled Subscriptions</h3>
                  <p className="text-gray-500 max-w-md">
                    This tab would display subscriptions that have been canceled by customers or admins.
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