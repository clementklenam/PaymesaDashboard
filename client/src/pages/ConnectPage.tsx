import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  Plus,
  Check,
  Star,
  ChevronRight,
  Globe,
  ShoppingCart,
  Webhook,
  FileCode,
  Puzzle,
  AlertCircle,
  ExternalLink,
  ArrowRight,
  Database,
  Mail
} from "lucide-react";

export default function ConnectPage() {
  // Mock integrations data
  const integrations = [
    {
      id: 'int_1',
      name: 'Shopify',
      description: 'Connect your Shopify store to process payments directly',
      status: 'connected',
      logo: <ShoppingCart className="h-10 w-10 text-green-600" />,
      connectedDate: 'Apr 5, 2025',
      category: 'ecommerce'
    },
    {
      id: 'int_2',
      name: 'WordPress',
      description: 'Integrate with WordPress sites for seamless payments',
      status: 'disconnected',
      logo: <Globe className="h-10 w-10 text-blue-600" />,
      category: 'cms'
    },
    {
      id: 'int_3',
      name: 'Webhooks',
      description: 'Set up webhooks to receive events in real-time',
      status: 'connected',
      logo: <Webhook className="h-10 w-10 text-purple-600" />,
      connectedDate: 'Mar 12, 2025',
      category: 'developer'
    },
    {
      id: 'int_4',
      name: 'Salesforce',
      description: 'Sync customer and payment data with Salesforce CRM',
      status: 'disconnected',
      logo: <Database className="h-10 w-10 text-sky-600" />,
      category: 'crm'
    },
    {
      id: 'int_5',
      name: 'Mailchimp',
      description: 'Connect to Mailchimp for automated email marketing',
      status: 'connected',
      logo: <Mail className="h-10 w-10 text-yellow-600" />,
      connectedDate: 'Apr 8, 2025',
      category: 'marketing'
    },
    {
      id: 'int_6',
      name: 'Custom API',
      description: 'Build custom integrations using our API',
      status: 'disconnected',
      logo: <FileCode className="h-10 w-10 text-gray-600" />,
      category: 'developer'
    }
  ];

  // Connected integrations
  const connectedIntegrations = integrations.filter(integration => integration.status === 'connected');

  return (
    <DashboardLayout 
      title="Connect" 
      description="Integrate your payment system with other platforms and services"
    >
      <div className="space-y-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-sm border-gray-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-medium text-gray-700">Connected Integrations</h3>
                  <div className="mt-4 flex items-center">
                    <div className="text-2xl font-bold text-gray-900">{connectedIntegrations.length}</div>
                    <div className="ml-2 text-sm text-gray-500">active</div>
                  </div>
                </div>
                <div className="bg-primary/10 p-3 rounded-md">
                  <Puzzle className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm border-gray-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-medium text-gray-700">Data Sync Status</h3>
                  <div className="mt-4 flex items-center">
                    <div className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-sm font-medium text-gray-900">All systems operational</span>
                    </div>
                  </div>
                </div>
                <div className="bg-green-100 p-3 rounded-md">
                  <Check className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm border-gray-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-medium text-gray-700">API Usage</h3>
                  <div className="mt-4 flex items-center">
                    <div className="text-2xl font-bold text-gray-900">1,205</div>
                    <div className="ml-2 text-sm text-gray-500">requests today</div>
                  </div>
                </div>
                <div className="bg-blue-100 p-3 rounded-md">
                  <FileCode className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Integrations List */}
        <div>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All integrations</TabsTrigger>
              <TabsTrigger value="ecommerce">E-commerce</TabsTrigger>
              <TabsTrigger value="marketing">Marketing</TabsTrigger>
              <TabsTrigger value="developer">Developer tools</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {integrations.map((integration) => (
                  <Card key={integration.id} className="border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-gray-50 rounded-md p-3 flex items-center justify-center">
                          {integration.logo}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium">{integration.name}</h3>
                            {integration.status === 'connected' ? (
                              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                                Connected
                              </Badge>
                            ) : (
                              <Badge variant="outline">
                                Not connected
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-500 mt-1 mb-4">{integration.description}</p>
                          <div className="flex justify-between items-center">
                            {integration.status === 'connected' ? (
                              <div className="text-xs text-gray-500">
                                Connected since {integration.connectedDate}
                              </div>
                            ) : (
                              <div className="text-xs text-gray-500">
                                &nbsp;
                              </div>
                            )}
                            {integration.status === 'connected' ? (
                              <Button variant="outline" size="sm">
                                Manage
                                <ChevronRight className="ml-1 h-4 w-4" />
                              </Button>
                            ) : (
                              <Button size="sm">
                                Connect
                                <Plus className="ml-1 h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="ecommerce" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {integrations.filter(integration => integration.category === 'ecommerce').map((integration) => (
                  <Card key={integration.id} className="border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-gray-50 rounded-md p-3 flex items-center justify-center">
                          {integration.logo}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium">{integration.name}</h3>
                            {integration.status === 'connected' ? (
                              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                                Connected
                              </Badge>
                            ) : (
                              <Badge variant="outline">
                                Not connected
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-500 mt-1 mb-4">{integration.description}</p>
                          <div className="flex justify-between items-center">
                            {integration.status === 'connected' ? (
                              <div className="text-xs text-gray-500">
                                Connected since {integration.connectedDate}
                              </div>
                            ) : (
                              <div className="text-xs text-gray-500">
                                &nbsp;
                              </div>
                            )}
                            {integration.status === 'connected' ? (
                              <Button variant="outline" size="sm">
                                Manage
                                <ChevronRight className="ml-1 h-4 w-4" />
                              </Button>
                            ) : (
                              <Button size="sm">
                                Connect
                                <Plus className="ml-1 h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {/* Empty state if no integrations in category */}
                {integrations.filter(integration => integration.category === 'ecommerce').length === 0 && (
                  <Card className="col-span-2 border-gray-100 shadow-sm p-8">
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <ShoppingCart className="h-12 w-12 text-gray-300 mb-4" />
                      <h3 className="text-lg font-medium text-gray-700 mb-1">No E-commerce Integrations</h3>
                      <p className="text-gray-500 max-w-md mb-4">
                        We don't have any e-commerce integrations in this category yet.
                      </p>
                      <Button>
                        Request Integration
                      </Button>
                    </div>
                  </Card>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="marketing" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {integrations.filter(integration => integration.category === 'marketing').map((integration) => (
                  <Card key={integration.id} className="border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-gray-50 rounded-md p-3 flex items-center justify-center">
                          {integration.logo}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium">{integration.name}</h3>
                            {integration.status === 'connected' ? (
                              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                                Connected
                              </Badge>
                            ) : (
                              <Badge variant="outline">
                                Not connected
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-500 mt-1 mb-4">{integration.description}</p>
                          <div className="flex justify-between items-center">
                            {integration.status === 'connected' ? (
                              <div className="text-xs text-gray-500">
                                Connected since {integration.connectedDate}
                              </div>
                            ) : (
                              <div className="text-xs text-gray-500">
                                &nbsp;
                              </div>
                            )}
                            {integration.status === 'connected' ? (
                              <Button variant="outline" size="sm">
                                Manage
                                <ChevronRight className="ml-1 h-4 w-4" />
                              </Button>
                            ) : (
                              <Button size="sm">
                                Connect
                                <Plus className="ml-1 h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="developer" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {integrations.filter(integration => integration.category === 'developer').map((integration) => (
                  <Card key={integration.id} className="border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-gray-50 rounded-md p-3 flex items-center justify-center">
                          {integration.logo}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium">{integration.name}</h3>
                            {integration.status === 'connected' ? (
                              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                                Connected
                              </Badge>
                            ) : (
                              <Badge variant="outline">
                                Not connected
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-500 mt-1 mb-4">{integration.description}</p>
                          <div className="flex justify-between items-center">
                            {integration.status === 'connected' ? (
                              <div className="text-xs text-gray-500">
                                Connected since {integration.connectedDate}
                              </div>
                            ) : (
                              <div className="text-xs text-gray-500">
                                &nbsp;
                              </div>
                            )}
                            {integration.status === 'connected' ? (
                              <Button variant="outline" size="sm">
                                Manage
                                <ChevronRight className="ml-1 h-4 w-4" />
                              </Button>
                            ) : (
                              <Button size="sm">
                                Connect
                                <Plus className="ml-1 h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* API Documentation Card */}
        <Card className="border-gray-100 shadow-sm">
          <CardHeader>
            <CardTitle>Developer Resources</CardTitle>
            <CardDescription>
              Access developer tools and documentation to build custom integrations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col h-full">
                <div className="bg-primary/5 p-4 rounded-lg mb-4">
                  <FileCode className="h-8 w-8 text-primary mb-2" />
                  <h3 className="text-base font-medium">API Documentation</h3>
                  <p className="text-sm text-gray-500 mt-1 mb-4">
                    Comprehensive guides and API reference.
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    View Docs
                    <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
              
              <div className="flex flex-col h-full">
                <div className="bg-primary/5 p-4 rounded-lg mb-4">
                  <Webhook className="h-8 w-8 text-primary mb-2" />
                  <h3 className="text-base font-medium">Webhooks</h3>
                  <p className="text-sm text-gray-500 mt-1 mb-4">
                    Set up event notifications for your app.
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Configure
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
              
              <div className="flex flex-col h-full">
                <div className="bg-primary/5 p-4 rounded-lg mb-4">
                  <AlertCircle className="h-8 w-8 text-primary mb-2" />
                  <h3 className="text-base font-medium">Support</h3>
                  <p className="text-sm text-gray-500 mt-1 mb-4">
                    Get help with integration issues.
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Contact Support
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}