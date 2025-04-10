import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  Search, 
  Download,
  Plus,
  ExternalLink,
  Edit,
  Trash2,
  Tag,
  CreditCard,
  Package
} from "lucide-react";
import { format } from "date-fns";

export default function ProductsPage() {
  // Mock products data
  const products = [
    { 
      id: 'prod_JK5FrJh82jdO9y', 
      name: 'Basic Plan', 
      description: 'Essential features for small businesses',
      price: 25.00,
      type: 'subscription',
      interval: 'month',
      created: new Date(2024, 10, 15),
      status: 'active',
      sales: 12
    },
    { 
      id: 'prod_JK5FrJ682jdO9y', 
      name: 'Pro Plan', 
      description: 'Advanced features with priority support',
      price: 49.99,
      type: 'subscription',
      interval: 'month',
      created: new Date(2024, 11, 3),
      status: 'active',
      sales: 24
    },
    { 
      id: 'prod_JK5FrJh82j6O9y', 
      name: 'Enterprise Plan', 
      description: 'Complete solution for large businesses',
      price: 129.99,
      type: 'subscription',
      interval: 'month',
      created: new Date(2024, 11, 20),
      status: 'active',
      sales: 8
    },
    { 
      id: 'prod_JK5F3Jh82jdO9y', 
      name: 'E-book: Payment Processing Guide', 
      description: 'Comprehensive guide to online payments',
      price: 19.99,
      type: 'one-time',
      created: new Date(2025, 0, 8),
      status: 'active',
      sales: 45
    },
    { 
      id: 'prod_JK5Freh82jdO9y', 
      name: 'Consultation Session', 
      description: 'One-hour payment strategy consultation',
      price: 150.00,
      type: 'one-time',
      created: new Date(2025, 1, 15),
      status: 'active',
      sales: 5
    }
  ];

  return (
    <DashboardLayout 
      title="Products" 
      description="Create and manage products that your customers can purchase"
    >
      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="shadow-sm border-gray-100">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary/10 p-2 rounded-full mb-3">
                  <Package className="h-5 w-5 text-primary" />
                </div>
                <div className="text-2xl font-bold">{products.length}</div>
                <p className="text-sm text-gray-500">Total Products</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm border-gray-100">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-blue-100 p-2 rounded-full mb-3">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                </div>
                <div className="text-2xl font-bold">94</div>
                <p className="text-sm text-gray-500">Total Sales</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm border-gray-100">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-green-100 p-2 rounded-full mb-3">
                  <Tag className="h-5 w-5 text-green-600" />
                </div>
                <div className="text-2xl font-bold">$4,325.85</div>
                <p className="text-sm text-gray-500">Revenue</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Filters and Controls */}
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input 
              placeholder="Search products..." 
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
              Create Product
            </Button>
          </div>
        </div>
        
        {/* Products List */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All products</TabsTrigger>
            <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
            <TabsTrigger value="one-time">One-time</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            <Card className="border-gray-100 shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100 text-sm text-gray-500">
                      <th className="text-left p-4 font-medium">Product</th>
                      <th className="text-left p-4 font-medium">Price</th>
                      <th className="text-left p-4 font-medium">Type</th>
                      <th className="text-left p-4 font-medium">Created</th>
                      <th className="text-left p-4 font-medium">Status</th>
                      <th className="text-left p-4 font-medium">Sales</th>
                      <th className="text-right p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="p-4">
                          <div className="flex flex-col">
                            <div className="text-sm font-medium">{product.name}</div>
                            <div className="text-xs text-gray-500">{product.description}</div>
                          </div>
                        </td>
                        <td className="p-4 text-sm font-medium">
                          ${product.price.toFixed(2)}
                          {product.type === 'subscription' && (
                            <span className="text-gray-500 text-xs">/{product.interval}</span>
                          )}
                        </td>
                        <td className="p-4">
                          <Badge 
                            className={
                              product.type === 'subscription' 
                                ? 'bg-blue-100 text-blue-800 hover:bg-blue-100' 
                                : 'bg-purple-100 text-purple-800 hover:bg-purple-100'
                            }
                          >
                            {product.type === 'subscription' ? 'Subscription' : 'One-time'}
                          </Badge>
                        </td>
                        <td className="p-4 text-sm">{format(product.created, 'MMM d, yyyy')}</td>
                        <td className="p-4">
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                            {product.status}
                          </Badge>
                        </td>
                        <td className="p-4 text-sm">{product.sales}</td>
                        <td className="p-4 text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button variant="ghost" size="sm">
                              <ExternalLink className="h-4 w-4" />
                              <span className="sr-only">View</span>
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
                  Showing <span className="font-medium">5</span> of <span className="font-medium">5</span> products
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
          
          <TabsContent value="subscriptions" className="mt-0">
            <Card className="border-gray-100 shadow-sm p-8">
              <div className="flex justify-center items-center py-8 text-center">
                <div>
                  <CreditCard className="mx-auto h-12 w-12 text-blue-500 mb-4" />
                  <h3 className="text-lg font-medium mb-1">Subscription Products</h3>
                  <p className="text-gray-500 max-w-md">
                    This tab would display only subscription products with recurring billing options.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="one-time" className="mt-0">
            <Card className="border-gray-100 shadow-sm p-8">
              <div className="flex justify-center items-center py-8 text-center">
                <div>
                  <Tag className="mx-auto h-12 w-12 text-purple-500 mb-4" />
                  <h3 className="text-lg font-medium mb-1">One-time Products</h3>
                  <p className="text-gray-500 max-w-md">
                    This tab would display only one-time purchase products without recurring billing.
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