import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  Search, 
  Download,
  BarChart4,
  Clock,
  FileText,
  Calendar,
  PieChart,
  TrendingUp,
  Users,
  ArrowRight,
  LineChart,
  Presentation,
  Share2
} from "lucide-react";
import { format, subDays } from "date-fns";
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

export default function ReportsPage() {
  // Mock reports data
  const recentReports = [
    {
      id: 'rep_1',
      name: 'Monthly Revenue Summary',
      description: 'Overview of revenue for the current month',
      createdAt: new Date(2025, 3, 10),
      type: 'revenue',
      format: 'pdf'
    },
    {
      id: 'rep_2',
      name: 'Customer Acquisition',
      description: 'Analysis of new customers and conversion rates',
      createdAt: new Date(2025, 3, 8),
      type: 'customers',
      format: 'csv'
    },
    {
      id: 'rep_3',
      name: 'Payment Method Usage',
      description: 'Breakdown of payment methods used by customers',
      createdAt: new Date(2025, 3, 5),
      type: 'payments',
      format: 'pdf'
    },
    {
      id: 'rep_4',
      name: 'Weekly Transactions Report',
      description: 'Detailed report of all transactions this week',
      createdAt: new Date(2025, 3, 3),
      type: 'transactions',
      format: 'csv'
    }
  ];
  
  // Mock report templates
  const reportTemplates = [
    {
      id: 'tpl_1',
      name: 'Sales Summary',
      description: 'Overview of sales for a selected period',
      type: 'revenue',
      icon: <BarChart4 className="h-10 w-10 text-blue-600" />
    },
    {
      id: 'tpl_2',
      name: 'Customer Analysis',
      description: 'Insights into customer behavior and demographics',
      type: 'customers',
      icon: <Users className="h-10 w-10 text-green-600" />
    },
    {
      id: 'tpl_3',
      name: 'Payment Methods',
      description: 'Breakdown of payment methods used',
      type: 'payments',
      icon: <PieChart className="h-10 w-10 text-purple-600" />
    },
    {
      id: 'tpl_4',
      name: 'Transaction Details',
      description: 'Detailed list of all transactions',
      type: 'transactions',
      icon: <FileText className="h-10 w-10 text-indigo-600" />
    },
    {
      id: 'tpl_5',
      name: 'Revenue Forecast',
      description: 'Projected revenue based on historical data',
      type: 'forecast',
      icon: <TrendingUp className="h-10 w-10 text-red-600" />
    },
    {
      id: 'tpl_6',
      name: 'Custom Report',
      description: 'Build a custom report with selected metrics',
      type: 'custom',
      icon: <Presentation className="h-10 w-10 text-amber-600" />
    }
  ];

  return (
    <DashboardLayout 
      title="Reports" 
      description="Generate, view and download reports for your business"
    >
      <div className="space-y-8">
        {/* Report Generator */}
        <Card className="border-gray-100 shadow-sm bg-gradient-to-r from-primary/5 to-primary/10">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <h3 className="text-lg font-semibold mb-2">Generate a new report</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Create customized reports to analyze your business performance.
                  Select a report type and date range to get started.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Report Type</label>
                    <Select defaultValue="revenue">
                      <SelectTrigger className="bg-white border-gray-200">
                        <SelectValue placeholder="Select report type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="revenue">Revenue</SelectItem>
                          <SelectItem value="transactions">Transactions</SelectItem>
                          <SelectItem value="customers">Customers</SelectItem>
                          <SelectItem value="payments">Payment Methods</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Date Range</label>
                    <Select defaultValue="last30days">
                      <SelectTrigger className="bg-white border-gray-200">
                        <SelectValue placeholder="Select date range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="last7days">Last 7 days</SelectItem>
                          <SelectItem value="last30days">Last 30 days</SelectItem>
                          <SelectItem value="last90days">Last 90 days</SelectItem>
                          <SelectItem value="yeartodate">Year to date</SelectItem>
                          <SelectItem value="custom">Custom range</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Format</label>
                    <Select defaultValue="pdf">
                      <SelectTrigger className="bg-white border-gray-200">
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="pdf">PDF</SelectItem>
                          <SelectItem value="csv">CSV</SelectItem>
                          <SelectItem value="excel">Excel</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Button className="mt-6">
                  Generate Report
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              
              <div className="hidden md:flex flex-col justify-center items-center bg-white p-6 rounded-lg shadow-sm">
                <LineChart className="h-20 w-20 text-primary mb-4" />
                <div className="text-center">
                  <h4 className="font-medium mb-1">Need assistance?</h4>
                  <p className="text-sm text-gray-500 mb-4">
                    Our team can help you set up custom reports.
                  </p>
                  <Button variant="outline" size="sm">
                    Contact Support
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Recent Reports */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Recent Reports</h2>
            <div className="flex space-x-2">
              <div className="relative w-[250px]">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input 
                  placeholder="Search reports..." 
                  className="pl-9 bg-white border-gray-200" 
                />
              </div>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export All
              </Button>
            </div>
          </div>
          
          <Card className="border-gray-100 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 text-sm text-gray-500">
                    <th className="text-left p-4 font-medium">Report Name</th>
                    <th className="text-left p-4 font-medium">Type</th>
                    <th className="text-left p-4 font-medium">Format</th>
                    <th className="text-left p-4 font-medium">Created</th>
                    <th className="text-right p-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentReports.map((report) => (
                    <tr key={report.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="p-4">
                        <div className="flex flex-col">
                          <div className="text-sm font-medium">{report.name}</div>
                          <div className="text-xs text-gray-500">{report.description}</div>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100 capitalize">
                          {report.type}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <Badge variant="outline" className="uppercase">
                          {report.format}
                        </Badge>
                      </td>
                      <td className="p-4 text-sm">
                        {format(report.createdAt, 'MMM d, yyyy')}
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end space-x-1">
                          <Button variant="ghost" size="sm">
                            <Share2 className="h-4 w-4" />
                            <span className="sr-only">Share</span>
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                            <span className="sr-only">Download</span>
                          </Button>
                          <Button variant="ghost" size="sm">
                            <ArrowRight className="h-4 w-4" />
                            <span className="sr-only">View</span>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
        
        {/* Report Templates */}
        <div>
          <h2 className="text-xl font-semibold mb-6">Report Templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reportTemplates.map((template) => (
              <Card key={template.id} className="border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-gray-50 p-4 rounded-full mb-4">
                      {template.icon}
                    </div>
                    <h3 className="text-lg font-medium mb-1">{template.name}</h3>
                    <p className="text-sm text-gray-500 mb-4">{template.description}</p>
                    <Button className="w-full">
                      Create Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Scheduled Reports */}
        <Card className="border-gray-100 shadow-sm">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Scheduled Reports</CardTitle>
                <CardDescription>
                  Set up automatic report generation and delivery
                </CardDescription>
              </div>
              <Button>
                <Clock className="h-4 w-4 mr-2" />
                Schedule New Report
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Calendar className="h-12 w-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-700 mb-1">No Scheduled Reports</h3>
              <p className="text-gray-500 max-w-md mb-4">
                You haven't set up any scheduled reports yet. Schedule reports to receive them automatically via email.
              </p>
              <Button>
                Schedule Your First Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}