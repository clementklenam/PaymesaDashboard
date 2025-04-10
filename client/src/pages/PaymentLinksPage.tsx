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
  Copy,
  Edit,
  Trash2,
  Link as LinkIcon,
  CircleDollarSign,
  ArrowUpRight,
  Eye,
  CheckCircle
} from "lucide-react";
import { format } from "date-fns";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function PaymentLinksPage() {
  // Mock payment links data
  const paymentLinks = [
    { 
      id: 'plink_JK5FrJh82jdO9y', 
      name: 'Website Consultation', 
      description: 'One-hour website consultation session',
      price: 75.00,
      currency: 'USD',
      created: new Date(2025, 3, 2),
      status: 'active',
      views: 23,
      conversions: 5,
      url: 'https://pay.paymesa.com/p/website-consultation'
    },
    { 
      id: 'plink_JK5FrJ682jdO9y', 
      name: 'Pro Plan Subscription', 
      description: 'Monthly subscription to Pro Plan',
      price: 49.99,
      currency: 'USD',
      created: new Date(2025, 3, 5),
      status: 'active',
      views: 47,
      conversions: 12,
      url: 'https://pay.paymesa.com/p/pro-plan-subscription'
    },
    { 
      id: 'plink_JK5FrJh82j6O9y', 
      name: 'E-book: Growth Strategies', 
      description: 'Digital e-book on business growth strategies',
      price: 19.99,
      currency: 'USD',
      created: new Date(2025, 3, 7),
      status: 'active',
      views: 87,
      conversions: 24,
      url: 'https://pay.paymesa.com/p/growth-strategies-ebook'
    },
    { 
      id: 'plink_JK5F3Jh82jdO9y', 
      name: 'Donation', 
      description: 'Support our cause with a donation',
      price: null, // flexible amount
      currency: 'USD',
      created: new Date(2025, 3, 8),
      status: 'active',
      views: 104,
      conversions: 16,
      url: 'https://pay.paymesa.com/p/donation'
    },
    { 
      id: 'plink_JK5Freh82jdO9y', 
      name: 'Premium Webinar Access', 
      description: 'One-time payment for premium webinar',
      price: 29.99,
      currency: 'USD',
      created: new Date(2025, 3, 9),
      status: 'inactive',
      views: 12,
      conversions: 0,
      url: 'https://pay.paymesa.com/p/premium-webinar'
    }
  ];

  // Function to copy text to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        // Normally would display a toast here
        console.log('Copied to clipboard');
      })
      .catch(err => {
        console.error('Error copying text: ', err);
      });
  };

  return (
    <DashboardLayout 
      title="Payment Links" 
      description="Create and share payment links for your products and services"
    >
      <div className="space-y-6">
        {/* Quick Start Guide */}
        <Card className="shadow-sm border-gray-100 bg-gradient-to-r from-primary/5 to-primary/10">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="col-span-2">
                <h3 className="text-lg font-semibold mb-2">Create and share payment links in seconds</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Payment links let you accept payments without building a website or integrating code. 
                  Create a link, share it with your customers, and get paid instantly.
                </p>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Payment Link
                </Button>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                    <span className="text-primary font-medium">1</span>
                  </div>
                  <span className="text-sm">Create a payment link</span>
                </div>
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                    <span className="text-primary font-medium">2</span>
                  </div>
                  <span className="text-sm">Share with your customers</span>
                </div>
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                    <span className="text-primary font-medium">3</span>
                  </div>
                  <span className="text-sm">Get paid instantly</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="shadow-sm border-gray-100">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary/10 p-2 rounded-full mb-3">
                  <LinkIcon className="h-5 w-5 text-primary" />
                </div>
                <div className="text-2xl font-bold">{paymentLinks.filter(link => link.status === 'active').length}</div>
                <p className="text-sm text-gray-500">Active Links</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm border-gray-100">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-blue-100 p-2 rounded-full mb-3">
                  <Eye className="h-5 w-5 text-blue-600" />
                </div>
                <div className="text-2xl font-bold">
                  {paymentLinks.reduce((sum, link) => sum + link.views, 0)}
                </div>
                <p className="text-sm text-gray-500">Total Views</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm border-gray-100">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-green-100 p-2 rounded-full mb-3">
                  <CircleDollarSign className="h-5 w-5 text-green-600" />
                </div>
                <div className="text-2xl font-bold">
                  {paymentLinks.reduce((sum, link) => sum + link.conversions, 0)}
                </div>
                <p className="text-sm text-gray-500">Total Conversions</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Filters and Controls */}
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input 
              placeholder="Search payment links..." 
              className="pl-9 bg-white border-gray-200" 
            />
          </div>
          
          <div className="flex space-x-2">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Payment Link
            </Button>
          </div>
        </div>
        
        {/* Payment Links List */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All links</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            <Card className="border-gray-100 shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100 text-sm text-gray-500">
                      <th className="text-left p-4 font-medium">Name</th>
                      <th className="text-left p-4 font-medium">Price</th>
                      <th className="text-left p-4 font-medium">Created</th>
                      <th className="text-left p-4 font-medium">Status</th>
                      <th className="text-left p-4 font-medium">Performance</th>
                      <th className="text-right p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paymentLinks.map((link) => (
                      <tr key={link.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="p-4">
                          <div className="flex flex-col">
                            <div className="text-sm font-medium">{link.name}</div>
                            <div className="text-xs text-gray-500">{link.description}</div>
                            <div className="text-xs text-primary mt-1 flex items-center">
                              <LinkIcon className="h-3 w-3 mr-1" />
                              {link.url.substring(0, 30)}...
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-sm font-medium">
                          {link.price ? `$${link.price.toFixed(2)}` : 'Variable'}
                        </td>
                        <td className="p-4 text-sm">{format(link.created, 'MMM d, yyyy')}</td>
                        <td className="p-4">
                          <Badge 
                            className={
                              link.status === 'active' 
                                ? 'bg-green-100 text-green-800 hover:bg-green-100' 
                                : 'bg-gray-100 text-gray-800 hover:bg-gray-100'
                            }
                          >
                            {link.status}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <div className="flex flex-col">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs text-gray-500">Views</span>
                              <span className="text-xs font-medium">{link.views}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-gray-500">Conversions</span>
                              <span className="text-xs font-medium">
                                {link.conversions} ({Math.round((link.conversions / link.views) * 100) || 0}%)
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex justify-end space-x-1">
                            <Button variant="ghost" size="sm" onClick={() => copyToClipboard(link.url)}>
                              <Copy className="h-4 w-4" />
                              <span className="sr-only">Copy URL</span>
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button variant="ghost" size="sm">
                              <ArrowUpRight className="h-4 w-4" />
                              <span className="sr-only">Open</span>
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
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
                  Showing <span className="font-medium">5</span> of <span className="font-medium">5</span> payment links
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
                  <CheckCircle className="mx-auto h-12 w-12 text-green-500 mb-4" />
                  <h3 className="text-lg font-medium mb-1">Active Payment Links</h3>
                  <p className="text-gray-500 max-w-md">
                    This tab would display only active payment links that are currently accepting payments.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="inactive" className="mt-0">
            <Card className="border-gray-100 shadow-sm p-8">
              <div className="flex justify-center items-center py-8 text-center">
                <div>
                  <LinkIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-1">Inactive Payment Links</h3>
                  <p className="text-gray-500 max-w-md">
                    This tab would display payment links that are currently disabled or archived.
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