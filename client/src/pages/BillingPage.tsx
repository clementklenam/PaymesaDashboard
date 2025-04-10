import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  CreditCard,
  Download,
  Check,
  FileText,
  BanknoteIcon,
  Building2,
  ArrowRight
} from "lucide-react";
import { format } from "date-fns";

export default function BillingPage() {
  // Mock billing plan data
  const currentPlan = {
    name: 'Professional',
    price: 49.99,
    interval: 'month',
    nextBillingDate: new Date(2025, 4, 15),
    features: [
      'Unlimited transactions',
      'Advanced analytics',
      'Multiple payment methods',
      'Custom reports',
      'API access',
      'Email support'
    ]
  };
  
  // Mock available plans
  const availablePlans = [
    {
      name: 'Basic',
      price: 19.99,
      interval: 'month',
      features: [
        'Up to 100 transactions/month',
        'Basic analytics',
        'Standard payment methods',
        'Standard reports',
        'Limited API access',
        'Email support'
      ],
      isRecommended: false,
      isActive: false
    },
    {
      name: 'Professional',
      price: 49.99,
      interval: 'month',
      features: [
        'Unlimited transactions',
        'Advanced analytics',
        'Multiple payment methods',
        'Custom reports',
        'API access',
        'Email support'
      ],
      isRecommended: true,
      isActive: true
    },
    {
      name: 'Enterprise',
      price: 199.99,
      interval: 'month',
      features: [
        'Unlimited transactions',
        'Advanced analytics',
        'All payment methods',
        'Custom reports & dashboards',
        'Full API access',
        'Priority support',
        'Dedicated account manager',
        'Custom integrations'
      ],
      isRecommended: false,
      isActive: false
    }
  ];
  
  // Mock payment methods
  const paymentMethods = [
    {
      id: 'pm_1',
      type: 'card',
      brand: 'visa',
      last4: '4242',
      expMonth: 12,
      expYear: 2026,
      isDefault: true
    }
  ];
  
  // Mock invoices
  const invoices = [
    {
      id: 'inv_1',
      date: new Date(2025, 3, 15),
      amount: 49.99,
      status: 'paid',
      number: 'INV-2025-001'
    },
    {
      id: 'inv_2',
      date: new Date(2025, 2, 15),
      amount: 49.99,
      status: 'paid',
      number: 'INV-2025-000'
    },
    {
      id: 'inv_3',
      date: new Date(2025, 1, 15),
      amount: 49.99,
      status: 'paid',
      number: 'INV-2024-105'
    }
  ];

  return (
    <DashboardLayout 
      title="Billing & Plans" 
      description="Manage your subscription plan and billing information"
    >
      <div className="space-y-8">
        {/* Current Plan */}
        <Card className="border-gray-100 shadow-sm">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>Current Plan</CardTitle>
                <CardDescription>
                  You are currently on the {currentPlan.name} plan
                </CardDescription>
              </div>
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                Active
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <span className="text-3xl font-bold">${currentPlan.price}</span>
                <span className="text-gray-500">/{currentPlan.interval}</span>
                <div className="text-sm text-gray-500 mt-1">
                  Next billing date: {format(currentPlan.nextBillingDate, 'MMMM d, yyyy')}
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline">Cancel Plan</Button>
                <Button>Change Plan</Button>
              </div>
            </div>
            
            <div className="mt-6 border-t border-gray-100 pt-6">
              <h3 className="text-base font-medium mb-3">Plan Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {currentPlan.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Available Plans */}
        <div>
          <h2 className="text-xl font-semibold mb-6">Available Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {availablePlans.map((plan, index) => (
              <Card 
                key={index} 
                className={`border-gray-100 shadow-sm ${
                  plan.isRecommended ? 'border-primary/50 shadow-md relative overflow-hidden' : ''
                }`}
              >
                {plan.isRecommended && (
                  <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 text-xs font-medium">
                    Recommended
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <div className="mt-2">
                    <span className="text-2xl font-bold">${plan.price}</span>
                    <span className="text-gray-500">/{plan.interval}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  {plan.isActive ? (
                    <Button variant="outline" className="w-full" disabled>
                      Current Plan
                    </Button>
                  ) : (
                    <Button className="w-full">
                      Select Plan
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Payment Methods & Invoices */}
        <Tabs defaultValue="payment-methods" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
            <TabsTrigger value="invoices">Billing History</TabsTrigger>
            <TabsTrigger value="billing-info">Billing Information</TabsTrigger>
          </TabsList>
          
          {/* Payment Methods Tab */}
          <TabsContent value="payment-methods" className="mt-0">
            <Card className="border-gray-100 shadow-sm">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Payment Methods</CardTitle>
                  <Button>
                    <CreditCard className="h-4 w-4 mr-2" />
                    Add Payment Method
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {paymentMethods.length > 0 ? (
                  <div className="space-y-4">
                    {paymentMethods.map((method) => (
                      <div 
                        key={method.id} 
                        className="flex justify-between items-center p-4 rounded-lg border border-gray-100 bg-gray-50"
                      >
                        <div className="flex items-center">
                          <div className="p-2 bg-white rounded-md border border-gray-200 mr-4">
                            <CreditCard className="h-6 w-6" />
                          </div>
                          <div>
                            <div className="text-sm font-medium">
                              {method.brand.charAt(0).toUpperCase() + method.brand.slice(1)} •••• {method.last4}
                            </div>
                            <div className="text-xs text-gray-500">
                              Expires {method.expMonth}/{method.expYear}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {method.isDefault && (
                            <Badge variant="outline">Default</Badge>
                          )}
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <CreditCard className="h-12 w-12 text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-700 mb-1">No Payment Methods</h3>
                    <p className="text-gray-500 max-w-md mb-4">
                      You haven't added any payment methods yet. Add a payment method to continue using our services.
                    </p>
                    <Button>Add Payment Method</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Invoices Tab */}
          <TabsContent value="invoices" className="mt-0">
            <Card className="border-gray-100 shadow-sm">
              <CardHeader>
                <CardTitle>Billing History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">Invoice</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">Date</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">Amount</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">Status</th>
                        <th className="text-right py-3 px-4 font-medium text-gray-500 text-sm">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoices.map((invoice) => (
                        <tr key={invoice.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 text-sm">{invoice.number}</td>
                          <td className="py-3 px-4 text-sm">{format(invoice.date, 'MMM d, yyyy')}</td>
                          <td className="py-3 px-4 text-sm font-medium">${invoice.amount.toFixed(2)}</td>
                          <td className="py-3 px-4">
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                              {invoice.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                              <span className="sr-only">Download</span>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Billing Information Tab */}
          <TabsContent value="billing-info" className="mt-0">
            <Card className="border-gray-100 shadow-sm">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Billing Information</CardTitle>
                  <Button variant="outline">
                    Edit Information
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-base font-medium flex items-center mb-3">
                      <BanknoteIcon className="h-5 w-5 mr-2 text-gray-500" />
                      Billing Address
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                      <div className="text-sm">
                        <div className="font-medium">Ohio Group Inc.</div>
                        <div className="text-gray-500 mt-1">
                          123 Main Street<br />
                          Suite 456<br />
                          Columbus, OH 43215<br />
                          United States
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-base font-medium flex items-center mb-3">
                      <Building2 className="h-5 w-5 mr-2 text-gray-500" />
                      Business Information
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                      <div className="text-sm">
                        <div>
                          <span className="text-gray-500">Company name:</span>
                          <span className="font-medium ml-2">Ohio Group Inc.</span>
                        </div>
                        <div className="mt-2">
                          <span className="text-gray-500">Tax ID:</span>
                          <span className="font-medium ml-2">XX-XXXXXXX</span>
                        </div>
                        <div className="mt-2">
                          <span className="text-gray-500">Email:</span>
                          <span className="font-medium ml-2">billing@ohiogroup.com</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}