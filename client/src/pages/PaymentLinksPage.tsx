import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
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
  CheckCircle,
  ArrowRight,
  Image,
  FileText,
  Smartphone,
  Globe,
  CreditCard,
  X,
  Check,
  QrCode,
  Share2
} from "lucide-react";
import { format } from "date-fns";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

// Type definitions
interface PaymentLink {
  id: string;
  name: string;
  description: string;
  price: number | null;
  currency: string;
  created: Date;
  status: 'active' | 'inactive';
  views: number;
  conversions: number;
  url: string;
}

interface PaymentLinkFormData {
  name: string;
  description: string;
  price: string;
  currency: string;
  allowCustomAmount: boolean;
  enableTax: boolean;
  taxPercentage: string;
  buttonText: string;
  theme: string;
  successMessage: string;
  termsAndConditions: string;
  image: string;
  expiresAt: string;
}

export default function PaymentLinksPage() {
  // State for payment link builder
  const [showBuilder, setShowBuilder] = useState(false);
  const [formData, setFormData] = useState<PaymentLinkFormData>({
    name: '',
    description: '',
    price: '',
    currency: 'USD',
    allowCustomAmount: false,
    enableTax: false,
    taxPercentage: '0',
    buttonText: 'Pay Now',
    theme: 'light',
    successMessage: 'Thank you for your payment!',
    termsAndConditions: '',
    image: '',
    expiresAt: ''
  });

  // Generate a preview URL based on form data
  const previewUrl = `https://pay.paymesa.com/p/${formData.name.toLowerCase().replace(/\s+/g, '-')}`;

  // Function to handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Function to handle switch toggles
  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  // Function to calculate total with tax (if enabled)
  const calculateTotal = (): string => {
    if (!formData.price || isNaN(parseFloat(formData.price))) return '0.00';
    
    const price = parseFloat(formData.price);
    if (!formData.enableTax) return price.toFixed(2);
    
    const taxRate = parseFloat(formData.taxPercentage) / 100;
    const taxAmount = price * taxRate;
    return (price + taxAmount).toFixed(2);
  };

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

  // Function to create a new payment link
  const createPaymentLink = () => {
    // Here we'd normally submit to the server
    // For this demo, we'll just close the builder
    setShowBuilder(false);
    
    // Reset form data
    setFormData({
      name: '',
      description: '',
      price: '',
      currency: 'USD',
      allowCustomAmount: false,
      enableTax: false,
      taxPercentage: '0',
      buttonText: 'Pay Now',
      theme: 'light',
      successMessage: 'Thank you for your payment!',
      termsAndConditions: '',
      image: '',
      expiresAt: ''
    });
  };

  // PaymentLinkBuilder component
  const PaymentLinkBuilder = () => {
    return (
      <Dialog open={showBuilder} onOpenChange={setShowBuilder}>
        <DialogContent className="max-w-6xl">
          <DialogHeader>
            <DialogTitle>Create Payment Link</DialogTitle>
            <DialogDescription>
              Create a custom payment link for your customers to pay online
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
            {/* Form */}
            <div className="space-y-6">
              <div className="space-y-3">
                <h3 className="text-base font-medium">Basic Information</h3>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="name">Product or Service Name</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleInputChange} 
                      placeholder="e.g. Website Design Package"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description" 
                      name="description" 
                      value={formData.description} 
                      onChange={handleInputChange} 
                      placeholder="Describe what you're selling"
                      rows={3}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="price">Price</Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <span className="text-gray-500">$</span>
                        </div>
                        <Input 
                          id="price" 
                          name="price" 
                          value={formData.price} 
                          onChange={handleInputChange} 
                          placeholder="0.00"
                          className="pl-8"
                          type="number"
                          step="0.01"
                          min="0"
                          disabled={formData.allowCustomAmount}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="currency">Currency</Label>
                      <Select 
                        name="currency" 
                        value={formData.currency} 
                        onValueChange={(value) => setFormData(prev => ({ ...prev, currency: value }))}
                      >
                        <SelectTrigger id="currency">
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">USD - US Dollar</SelectItem>
                          <SelectItem value="EUR">EUR - Euro</SelectItem>
                          <SelectItem value="GBP">GBP - British Pound</SelectItem>
                          <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                          <SelectItem value="AUD">AUD - Australian Dollar</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2">
                    <div className="space-y-1">
                      <Label htmlFor="allowCustomAmount">Allow customer to set amount</Label>
                      <div className="text-xs text-gray-500">Customer can enter their own payment amount</div>
                    </div>
                    <Switch 
                      id="allowCustomAmount" 
                      checked={formData.allowCustomAmount}
                      onCheckedChange={(checked) => handleSwitchChange('allowCustomAmount', checked)}
                    />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <h3 className="text-base font-medium">Tax & Pricing</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="enableTax">Enable tax</Label>
                    <div className="text-xs text-gray-500">Add tax to the payment amount</div>
                  </div>
                  <Switch 
                    id="enableTax" 
                    checked={formData.enableTax}
                    onCheckedChange={(checked) => handleSwitchChange('enableTax', checked)}
                  />
                </div>
                
                {formData.enableTax && (
                  <div className="space-y-2 pt-2">
                    <Label htmlFor="taxPercentage">Tax percentage (%)</Label>
                    <Input 
                      id="taxPercentage" 
                      name="taxPercentage" 
                      value={formData.taxPercentage} 
                      onChange={handleInputChange} 
                      type="number"
                      step="0.01"
                      min="0"
                      max="100"
                    />
                  </div>
                )}
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <h3 className="text-base font-medium">Appearance</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="buttonText">Payment Button Text</Label>
                  <Input 
                    id="buttonText" 
                    name="buttonText" 
                    value={formData.buttonText} 
                    onChange={handleInputChange} 
                    placeholder="Pay Now"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="theme">Color Theme</Label>
                  <Select 
                    name="theme" 
                    value={formData.theme} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, theme: value }))}
                  >
                    <SelectTrigger id="theme">
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="blue">Blue</SelectItem>
                      <SelectItem value="green">Green</SelectItem>
                      <SelectItem value="purple">Purple</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="image">Product Image URL</Label>
                  <Input 
                    id="image" 
                    name="image" 
                    value={formData.image} 
                    onChange={handleInputChange} 
                    placeholder="https://example.com/image.jpg"
                  />
                  <div className="text-xs text-gray-500">Optional: Add an image to your payment page</div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <h3 className="text-base font-medium">Additional Settings</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="successMessage">Success Message</Label>
                  <Textarea 
                    id="successMessage" 
                    name="successMessage" 
                    value={formData.successMessage} 
                    onChange={handleInputChange} 
                    placeholder="Thank you for your payment!"
                    rows={2}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="termsAndConditions">Terms and Conditions</Label>
                  <Textarea 
                    id="termsAndConditions" 
                    name="termsAndConditions" 
                    value={formData.termsAndConditions} 
                    onChange={handleInputChange} 
                    placeholder="Optional: Add your terms and conditions"
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="expiresAt">Expiration Date (Optional)</Label>
                  <Input 
                    id="expiresAt" 
                    name="expiresAt" 
                    value={formData.expiresAt} 
                    onChange={handleInputChange} 
                    type="date"
                  />
                </div>
              </div>
            </div>
            
            {/* Preview */}
            <div className="space-y-4">
              <h3 className="text-base font-medium">Preview</h3>
              
              <div className={`border rounded-lg overflow-hidden ${
                formData.theme === 'dark' ? 'bg-gray-900 text-white' :
                formData.theme === 'blue' ? 'bg-blue-50' :
                formData.theme === 'green' ? 'bg-green-50' :
                formData.theme === 'purple' ? 'bg-purple-50' :
                'bg-white'
              }`}>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div className={`${
                      formData.theme === 'dark' ? 'text-white' :
                      formData.theme === 'blue' ? 'text-blue-600' :
                      formData.theme === 'green' ? 'text-green-600' :
                      formData.theme === 'purple' ? 'text-purple-600' :
                      'text-primary'
                    } text-xl font-bold`}>Paymesa</div>
                    
                    <div className={`${
                      formData.theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                    } text-sm flex items-center`}>
                      <Globe className="h-4 w-4 mr-1" />
                      Secure payment
                    </div>
                  </div>
                  
                  {formData.image && (
                    <div className="mb-4 rounded-lg overflow-hidden h-40 bg-gray-100 flex items-center justify-center">
                      <Image className="h-10 w-10 text-gray-400" />
                    </div>
                  )}
                  
                  <div className="mb-6">
                    <h2 className={`text-lg font-semibold ${
                      formData.theme === 'dark' ? 'text-white' : 'text-gray-800'
                    }`}>
                      {formData.name || 'Product or Service Name'}
                    </h2>
                    <p className={`${
                      formData.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {formData.description || 'Product or service description goes here'}
                    </p>
                  </div>
                  
                  <div className={`${
                    formData.theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
                  } p-4 rounded-lg mb-6`}>
                    <div className="flex justify-between mb-3">
                      <span className={`${
                        formData.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                      }`}>Price</span>
                      <span className="font-semibold">
                        {formData.allowCustomAmount ? 'Custom amount' : 
                          formData.price ? 
                            `${formData.currency === 'USD' ? '$' : 
                              formData.currency === 'EUR' ? '€' : 
                              formData.currency === 'GBP' ? '£' : 
                              formData.currency}${formData.price}` 
                            : '$0.00'}
                      </span>
                    </div>
                    
                    {formData.enableTax && !formData.allowCustomAmount && (
                      <>
                        <div className="flex justify-between mb-3">
                          <span className={`${
                            formData.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                          }`}>Tax ({formData.taxPercentage}%)</span>
                          <span className="font-semibold">
                            {formData.price ? 
                              `${formData.currency === 'USD' ? '$' : 
                                formData.currency === 'EUR' ? '€' : 
                                formData.currency === 'GBP' ? '£' : 
                                formData.currency}${(parseFloat(formData.price) * parseFloat(formData.taxPercentage) / 100).toFixed(2)}` 
                              : '$0.00'}
                          </span>
                        </div>
                        
                        <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                        
                        <div className="flex justify-between font-bold">
                          <span>Total</span>
                          <span>
                            {formData.currency === 'USD' ? '$' : 
                              formData.currency === 'EUR' ? '€' : 
                              formData.currency === 'GBP' ? '£' : 
                              formData.currency}
                            {calculateTotal()}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                  
                  {formData.allowCustomAmount && (
                    <div className="mb-6">
                      <Label htmlFor="customAmount" className={`${
                        formData.theme === 'dark' ? 'text-white' : 'text-gray-700'
                      }`}>
                        Enter amount
                      </Label>
                      <div className="relative mt-1">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <span className={`${
                            formData.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                          }`}>$</span>
                        </div>
                        <Input 
                          id="customAmount" 
                          placeholder="0.00"
                          className={`pl-8 ${
                            formData.theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : ''
                          }`}
                        />
                      </div>
                    </div>
                  )}
                  
                  <div className="mb-6">
                    <Label htmlFor="paymentMethod" className={`${
                      formData.theme === 'dark' ? 'text-white' : 'text-gray-700'
                    }`}>
                      Payment method
                    </Label>
                    <div className={`mt-2 flex flex-wrap gap-2 ${
                      formData.theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
                    } p-3 rounded-lg`}>
                      <div className={`flex items-center rounded-md px-3 py-2 ${
                        formData.theme === 'dark' ? 'bg-gray-700' : 'bg-white border border-gray-200'
                      }`}>
                        <CreditCard className="h-4 w-4 mr-2" />
                        <span className="text-sm">Card</span>
                      </div>
                      
                      <div className={`flex items-center rounded-md px-3 py-2 ${
                        formData.theme === 'dark' ? 'bg-gray-900 text-gray-400' : 'bg-gray-100 text-gray-500'
                      }`}>
                        <Smartphone className="h-4 w-4 mr-2" />
                        <span className="text-sm">Mobile Pay</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    className={`w-full ${
                      formData.theme === 'blue' ? 'bg-blue-600 hover:bg-blue-700' :
                      formData.theme === 'green' ? 'bg-green-600 hover:bg-green-700' :
                      formData.theme === 'purple' ? 'bg-purple-600 hover:bg-purple-700' :
                      ''
                    }`}
                  >
                    {formData.buttonText || 'Pay Now'}
                  </Button>
                  
                  {formData.termsAndConditions && (
                    <div className={`mt-4 text-xs ${
                      formData.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      By proceeding with the payment, you agree to the <span className="underline">terms and conditions</span>.
                    </div>
                  )}
                </div>
                
                <div className={`p-4 border-t ${
                  formData.theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'
                } text-xs text-center flex justify-center items-center gap-2`}>
                  <span className={formData.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                    Powered by
                  </span>
                  <span className="font-semibold">Paymesa</span>
                </div>
              </div>
              
              <div className="flex flex-col space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center text-sm">
                    <LinkIcon className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="text-primary font-medium">{previewUrl}</span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => copyToClipboard(previewUrl)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex justify-between">
                  <Button variant="outline" className="mr-2">Preview in new tab</Button>
                  <Button variant="outline">
                    <QrCode className="h-4 w-4 mr-2" />
                    Show QR Code
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button 
              onClick={createPaymentLink}
              disabled={!formData.name}
            >
              Create Payment Link
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <DashboardLayout 
      title="Payment Links" 
      description="Create and share payment links for your products and services"
    >
      <div className="space-y-6">
        {/* Payment Link Builder */}
        <PaymentLinkBuilder />

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
                <Button onClick={() => setShowBuilder(true)}>
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
            <Button onClick={() => setShowBuilder(true)}>
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