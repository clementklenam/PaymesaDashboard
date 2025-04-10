import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  CreditCard,
  ShieldCheck,
  DollarSign,
  Settings,
  Globe,
  Smartphone,
  Landmark
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function PaymentsPage() {
  // Mock payment methods data
  const paymentMethods = [
    {
      id: 'pm_1',
      name: 'Credit & Debit Cards',
      description: 'Accept Visa, Mastercard, American Express, and more',
      icon: <CreditCard className="h-8 w-8 text-blue-600" />,
      isEnabled: true,
      status: 'live',
      processingFee: '2.9% + $0.30'
    },
    {
      id: 'pm_2',
      name: 'Apple Pay',
      description: 'Allow customers to pay with Apple Pay',
      icon: <Smartphone className="h-8 w-8 text-gray-600" />,
      isEnabled: true,
      status: 'live',
      processingFee: '2.9% + $0.30'
    },
    {
      id: 'pm_3',
      name: 'Google Pay',
      description: 'Allow customers to pay with Google Pay',
      icon: <Smartphone className="h-8 w-8 text-green-600" />,
      isEnabled: false,
      status: 'not_configured',
      processingFee: '2.9% + $0.30'
    },
    {
      id: 'pm_4',
      name: 'ACH Direct Debit',
      description: 'Accept bank transfers (US accounts only)',
      icon: <Landmark className="h-8 w-8 text-indigo-600" />,
      isEnabled: false,
      status: 'not_configured',
      processingFee: '0.8% (capped at $5.00)'
    },
    {
      id: 'pm_5',
      name: 'International Payments',
      description: 'Accept payments in multiple currencies',
      icon: <Globe className="h-8 w-8 text-teal-600" />,
      isEnabled: true,
      status: 'live',
      processingFee: '3.9% + $0.30'
    }
  ];

  // Completion steps
  const completionSteps = [
    {
      title: 'Connect bank account',
      description: 'Link your bank account to receive payouts',
      isComplete: true
    },
    {
      title: 'Verify business information',
      description: 'Provide details about your business',
      isComplete: true
    },
    {
      title: 'Set up payment methods',
      description: 'Enable payment methods for your customers',
      isComplete: true
    },
    {
      title: 'Configure fraud protection',
      description: 'Set up rules to prevent fraudulent transactions',
      isComplete: false
    },
    {
      title: 'Add team members',
      description: 'Invite team members to access the dashboard',
      isComplete: false
    }
  ];

  // Calculate completion percentage
  const completedSteps = completionSteps.filter(step => step.isComplete).length;
  const completionPercentage = (completedSteps / completionSteps.length) * 100;

  return (
    <DashboardLayout 
      title="Payments" 
      description="Configure payment methods and settings for your business"
    >
      <div className="space-y-8">
        {/* Account Setup Progress */}
        <Card className="border-gray-100 shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Account Setup</CardTitle>
                <CardDescription>Complete the following steps to fully set up your payment processing</CardDescription>
              </div>
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                {completionPercentage}% Complete
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Progress value={completionPercentage} className="h-2 mb-6" />
            
            <div className="space-y-6">
              {completionSteps.map((step, index) => (
                <div 
                  key={index} 
                  className={`flex items-start p-4 rounded-lg ${
                    step.isComplete ? 'bg-green-50 border border-green-100' : 'bg-gray-50 border border-gray-100'
                  }`}
                >
                  <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                    step.isComplete ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {step.isComplete ? (
                      <ShieldCheck className="h-4 w-4" />
                    ) : (
                      <span className="text-sm font-medium">{index + 1}</span>
                    )}
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className={`text-base font-medium ${
                      step.isComplete ? 'text-green-800' : 'text-gray-700'
                    }`}>
                      {step.title}
                    </h3>
                    <p className={`text-sm ${
                      step.isComplete ? 'text-green-600' : 'text-gray-500'
                    }`}>
                      {step.description}
                    </p>
                  </div>
                  <div>
                    {step.isComplete ? (
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                        Completed
                      </Badge>
                    ) : (
                      <Button size="sm">
                        Complete
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Payment Methods */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Payment Methods</h2>
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Configure Settings
            </Button>
          </div>
          
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All methods</TabsTrigger>
              <TabsTrigger value="enabled">Enabled</TabsTrigger>
              <TabsTrigger value="disabled">Disabled</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <Card key={method.id} className="border-gray-100 shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-center">
                            {method.icon}
                          </div>
                          <div className="ml-4">
                            <h3 className="text-lg font-medium">{method.name}</h3>
                            <p className="text-sm text-gray-500">{method.description}</p>
                            <div className="mt-2 flex items-center text-xs text-gray-500">
                              <DollarSign className="h-3.5 w-3.5 mr-1" />
                              <span>Processing fee: {method.processingFee}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          {method.isEnabled ? (
                            <>
                              <Badge className="bg-green-100 text-green-800 hover:bg-green-100 mr-4">
                                Active
                              </Badge>
                              <Button variant="outline" size="sm">
                                Configure
                              </Button>
                            </>
                          ) : (
                            <Button size="sm">
                              Enable
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="enabled" className="mt-0">
              <div className="space-y-4">
                {paymentMethods.filter(method => method.isEnabled).map((method) => (
                  <Card key={method.id} className="border-gray-100 shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-center">
                            {method.icon}
                          </div>
                          <div className="ml-4">
                            <h3 className="text-lg font-medium">{method.name}</h3>
                            <p className="text-sm text-gray-500">{method.description}</p>
                            <div className="mt-2 flex items-center text-xs text-gray-500">
                              <DollarSign className="h-3.5 w-3.5 mr-1" />
                              <span>Processing fee: {method.processingFee}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 mr-4">
                            Active
                          </Badge>
                          <Button variant="outline" size="sm">
                            Configure
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="disabled" className="mt-0">
              <div className="space-y-4">
                {paymentMethods.filter(method => !method.isEnabled).map((method) => (
                  <Card key={method.id} className="border-gray-100 shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-center">
                            {method.icon}
                          </div>
                          <div className="ml-4">
                            <h3 className="text-lg font-medium">{method.name}</h3>
                            <p className="text-sm text-gray-500">{method.description}</p>
                            <div className="mt-2 flex items-center text-xs text-gray-500">
                              <DollarSign className="h-3.5 w-3.5 mr-1" />
                              <span>Processing fee: {method.processingFee}</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <Button size="sm">
                            Enable
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Additional Settings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-gray-100 shadow-sm">
            <CardHeader>
              <CardTitle>Payment Security</CardTitle>
              <CardDescription>
                Configure security settings for payment processing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="flex items-center">
                    <ShieldCheck className="h-5 w-5 text-green-600 mr-3" />
                    <div>
                      <h4 className="text-sm font-medium">3D Secure Authentication</h4>
                      <p className="text-xs text-gray-500">Add an extra layer of security for card payments</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                    Enabled
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="flex items-center">
                    <ShieldCheck className="h-5 w-5 text-green-600 mr-3" />
                    <div>
                      <h4 className="text-sm font-medium">Fraud Prevention</h4>
                      <p className="text-xs text-gray-500">Automatically detect and block suspicious transactions</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Configure
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-gray-100 shadow-sm">
            <CardHeader>
              <CardTitle>Customer Experience</CardTitle>
              <CardDescription>
                Customize the payment experience for your customers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="flex items-center">
                    <CreditCard className="h-5 w-5 text-blue-600 mr-3" />
                    <div>
                      <h4 className="text-sm font-medium">Payment Page Customization</h4>
                      <p className="text-xs text-gray-500">Brand your checkout experience</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Customize
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="flex items-center">
                    <Globe className="h-5 w-5 text-indigo-600 mr-3" />
                    <div>
                      <h4 className="text-sm font-medium">Multiple Currencies</h4>
                      <p className="text-xs text-gray-500">Accept payments in different currencies</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                    Enabled
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}