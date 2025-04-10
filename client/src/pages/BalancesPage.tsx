import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart } from "@/components/dashboard/charts/AreaChart";
import { DollarSign, ArrowUpRight, ArrowRight, Clock, BanknoteIcon, PiggyBank } from "lucide-react";
import { format, subDays } from "date-fns";
import { Badge } from "@/components/ui/badge";

export default function BalancesPage() {
  // Mock data - in a real app this would come from an API
  const availableBalance = 250.00;
  const pendingBalance = 125.50;
  const payoutHistory = [
    { id: 1, amount: 150.00, status: 'completed', date: new Date(2025, 3, 8), destination: 'Checking account' },
    { id: 2, amount: 320.00, status: 'completed', date: new Date(2025, 3, 1), destination: 'Checking account' },
    { id: 3, amount: 75.50, status: 'completed', date: new Date(2025, 2, 25), destination: 'Checking account' },
  ];
  
  // Mock data for the balance chart
  const balanceData = Array(30).fill(0).map((_, i) => {
    // Generate a random value between 200 and 300
    return 200 + Math.random() * 100;
  });

  return (
    <DashboardLayout 
      title="Balances" 
      description="Manage your available funds and payouts"
    >
      <div className="grid grid-cols-1 gap-8">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Available Balance */}
          <Card className="shadow-sm border-gray-100 card-highlight">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="bg-primary/10 p-2 rounded-full mr-4">
                  <DollarSign className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Available Balance</h3>
                  <div className="mt-1 flex items-center">
                    <div className="text-2xl font-bold text-gray-900">${availableBalance.toFixed(2)}</div>
                  </div>
                  <div className="mt-1 text-xs text-gray-500">
                    Ready to be paid out to your bank account
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-between">
                <Button size="sm" variant="default">
                  Payout funds
                  <ArrowUpRight className="h-3.5 w-3.5 ml-1" />
                </Button>
                <Button size="sm" variant="outline">
                  View history
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Pending Balance */}
          <Card className="shadow-sm border-gray-100 card-highlight">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="bg-amber-100 p-2 rounded-full mr-4">
                  <Clock className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Pending Balance</h3>
                  <div className="mt-1 flex items-center">
                    <div className="text-2xl font-bold text-gray-900">${pendingBalance.toFixed(2)}</div>
                  </div>
                  <div className="mt-1 text-xs text-gray-500">
                    Will be available in 2-7 business days
                  </div>
                </div>
              </div>
              
              <div className="mt-6 space-y-3">
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>$85.50 available on Apr 12</span>
                  <Badge variant="outline">3 days</Badge>
                </div>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>$40.00 available on Apr 15</span>
                  <Badge variant="outline">6 days</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
        
        {/* Balance History */}
        <section>
          <Card className="shadow-sm border-gray-100">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl font-semibold">Balance History</CardTitle>
                <Tabs defaultValue="30days">
                  <TabsList>
                    <TabsTrigger value="7days">7 days</TabsTrigger>
                    <TabsTrigger value="30days">30 days</TabsTrigger>
                    <TabsTrigger value="3months">3 months</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <AreaChart 
                  data={balanceData} 
                  color="hsl(var(--primary))" 
                  showAxis={true} 
                  height={280} 
                />
              </div>
            </CardContent>
          </Card>
        </section>
        
        {/* Payout History */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Recent Payouts</h2>
            <Button variant="outline" size="sm">
              View all
              <ArrowRight className="h-3.5 w-3.5 ml-1" />
            </Button>
          </div>
          
          <Card className="shadow-sm border-gray-100">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left p-4 font-medium text-gray-500 text-sm">Date</th>
                    <th className="text-left p-4 font-medium text-gray-500 text-sm">Amount</th>
                    <th className="text-left p-4 font-medium text-gray-500 text-sm">Destination</th>
                    <th className="text-left p-4 font-medium text-gray-500 text-sm">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {payoutHistory.map(payout => (
                    <tr key={payout.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="p-4 text-sm">{format(payout.date, 'MMM d, yyyy')}</td>
                      <td className="p-4 text-sm font-medium">${payout.amount.toFixed(2)}</td>
                      <td className="p-4 text-sm text-gray-600">{payout.destination}</td>
                      <td className="p-4 text-sm">
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                          {payout.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </section>
        
        {/* Payout Settings */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Payout Settings</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="shadow-sm border-gray-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-2 rounded-full mr-4">
                      <BanknoteIcon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-base font-medium">Payout Account</h3>
                      <p className="text-sm text-gray-500 mt-1">Chase Bank •••• 4567</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm border-gray-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-green-100 p-2 rounded-full mr-4">
                      <PiggyBank className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-base font-medium">Payout Schedule</h3>
                      <p className="text-sm text-gray-500 mt-1">Automatic (Weekly on Monday)</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}