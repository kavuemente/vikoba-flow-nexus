
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { 
  DollarSign, 
  LogOut, 
  Plus, 
  TrendingUp,
  Calendar,
  CreditCard,
  History,
  Users
} from "lucide-react";

interface MemberDashboardProps {
  userName: string;
  onLogout: () => void;
}

// Mock data for member
const memberData = {
  totalContributions: 150000,
  activeLoans: 300000,
  loanBalance: 275000,
  nextPayment: "2024-02-15",
  nextPaymentAmount: 25000
};

const memberLoans = [
  {
    id: 1,
    amount: 300000,
    purpose: "Small business",
    status: "active",
    dateApproved: "2024-01-10",
    dueDate: "2024-07-10",
    remainingBalance: 275000,
    monthlyPayment: 25000
  }
];

const memberTransactions = [
  { id: 1, type: "contribution", amount: 50000, date: "2024-01-25", description: "Monthly contribution" },
  { id: 2, type: "loan_payment", amount: 25000, date: "2024-01-15", description: "Loan repayment" },
  { id: 3, type: "contribution", amount: 50000, date: "2023-12-25", description: "Monthly contribution" },
];

const MemberDashboard = ({ userName, onLogout }: MemberDashboardProps) => {
  const [loanRequest, setLoanRequest] = useState({
    amount: "",
    purpose: "",
    reason: ""
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-TZ', {
      style: 'currency',
      currency: 'TZS',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleLoanRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loanRequest.amount || !loanRequest.purpose || !loanRequest.reason) {
      toast.error("Please fill in all fields");
      return;
    }
    
    console.log("Loan request submitted:", loanRequest);
    toast.success("Loan request submitted successfully! You will be notified once reviewed.");
    
    // Reset form
    setLoanRequest({ amount: "", purpose: "", reason: "" });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setLoanRequest(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-green-600 mr-2" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Digital Vikoba</h1>
                <p className="text-sm text-gray-600">Member Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {userName}</span>
              <Button variant="outline" onClick={onLogout} className="flex items-center">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Contributions</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(memberData.totalContributions)}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Loans</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(memberData.activeLoans)}</div>
              <p className="text-xs text-muted-foreground">Principal amount</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Loan Balance</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(memberData.loanBalance)}</div>
              <p className="text-xs text-muted-foreground">Remaining</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Next Payment</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(memberData.nextPaymentAmount)}</div>
              <p className="text-xs text-muted-foreground">Due: {memberData.nextPayment}</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="request-loan">Request Loan</TabsTrigger>
            <TabsTrigger value="my-loans">My Loans</TabsTrigger>
            <TabsTrigger value="payouts">Payout Groups</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account Summary</CardTitle>
                  <CardDescription>Your current financial status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Member Since:</span>
                      <span className="text-sm">January 2024</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Total Contributions:</span>
                      <span className="text-sm font-bold text-green-600">
                        {formatCurrency(memberData.totalContributions)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Current Loans:</span>
                      <span className="text-sm">1 Active</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Credit Score:</span>
                      <Badge variant="default">Excellent</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common tasks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button className="w-full" variant="outline">
                      <Plus className="h-4 w-4 mr-2" />
                      Make Contribution
                    </Button>
                    <Button className="w-full" variant="outline">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Make Loan Payment
                    </Button>
                    <Button className="w-full" variant="outline">
                      <Calendar className="h-4 w-4 mr-2" />
                      View Meeting Schedule
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Payout Group Status */}
            <Card>
              <CardHeader>
                <CardTitle>My Payout Group Status</CardTitle>
                <CardDescription>Your position in the rotating payout system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Current Group Info */}
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-blue-800">Main Group A</h4>
                        <p className="text-sm text-blue-600">5 members • Monthly contribution: {formatCurrency(50000)}</p>
                      </div>
                      <Badge variant="default">Active</Badge>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Your Position</p>
                        <p className="font-semibold text-lg">2nd in queue</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Next Payout</p>
                        <p className="font-semibold text-lg">March 1, 2024</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Payout Amount</p>
                        <p className="font-semibold text-lg text-green-600">{formatCurrency(250000)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Payout History */}
                  <div>
                    <h4 className="font-semibold mb-3">Recent Payout Activity</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <span className="text-green-600 text-sm font-semibold">1</span>
                          </div>
                          <div>
                            <p className="font-medium">John Doe received payout</p>
                            <p className="text-xs text-gray-500">January 2024</p>
                          </div>
                        </div>
                        <span className="font-semibold text-green-600">{formatCurrency(250000)}</span>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border rounded-lg bg-yellow-50">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                            <span className="text-yellow-600 text-sm font-semibold">2</span>
                          </div>
                          <div>
                            <p className="font-medium">Your turn next month</p>
                            <p className="text-xs text-gray-500">February 2024</p>
                          </div>
                        </div>
                        <span className="font-semibold text-yellow-600">Pending</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="request-loan" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Request a Loan</CardTitle>
                <CardDescription>Fill out the form below to request a loan from the group</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLoanRequest} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="amount">Loan Amount (TZS)</Label>
                      <Input
                        id="amount"
                        name="amount"
                        type="number"
                        placeholder="Enter amount in TZS"
                        value={loanRequest.amount}
                        onChange={handleInputChange}
                        min="10000"
                        step="1000"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="purpose">Purpose</Label>
                      <Input
                        id="purpose"
                        name="purpose"
                        placeholder="e.g., Business expansion, Education"
                        value={loanRequest.purpose}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="reason">Detailed Reason</Label>
                    <Textarea
                      id="reason"
                      name="reason"
                      placeholder="Provide detailed explanation for the loan request..."
                      value={loanRequest.reason}
                      onChange={handleInputChange}
                      rows={4}
                      required
                    />
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Loan Terms</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Maximum loan amount: 3x your total contributions</li>
                      <li>• Interest rate: 5% per month</li>
                      <li>• Maximum repayment period: 6 months</li>
                      <li>• Loan approval requires group consensus</li>
                    </ul>
                  </div>
                  
                  <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                    Submit Loan Request
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="my-loans" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>My Loans</CardTitle>
                <CardDescription>View your current and past loans</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {memberLoans.map((loan) => (
                    <div key={loan.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold">Loan #{loan.id}</h4>
                          <p className="text-sm text-gray-600">{loan.purpose}</p>
                        </div>
                        <Badge variant="default">{loan.status}</Badge>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Principal Amount:</span>
                            <span className="font-medium">{formatCurrency(loan.amount)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Remaining Balance:</span>
                            <span className="font-medium">{formatCurrency(loan.remainingBalance)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Monthly Payment:</span>
                            <span className="font-medium">{formatCurrency(loan.monthlyPayment)}</span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Date Approved:</span>
                            <span>{loan.dateApproved}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Due Date:</span>
                            <span>{loan.dueDate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Progress:</span>
                            <span>{Math.round(((loan.amount - loan.remainingBalance) / loan.amount) * 100)}%</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full" 
                            style={{ 
                              width: `${((loan.amount - loan.remainingBalance) / loan.amount) * 100}%` 
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payouts" className="mt-6">
            <div className="space-y-6">
              {/* My Payout Groups Card */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">My Payout Groups</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2</div>
                  <p className="text-xs text-muted-foreground">Active group memberships</p>
                </CardContent>
              </Card>

              {/* My Groups */}
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center space-x-2">
                          <span>Main Group A</span>
                          <Badge variant="default">Active</Badge>
                        </CardTitle>
                        <CardDescription>
                          Cycle 1 of 5 • Next payout: 2024-02-01
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">My Position</p>
                        <p className="text-2xl font-bold text-blue-600">#1</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold text-green-800">I'm receiving this month!</h4>
                            <p className="text-green-700">Expected payout: {formatCurrency(250000)}</p>
                          </div>
                          <Badge variant="default" className="bg-green-600">
                            Current Recipient
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 border rounded-lg">
                          <p className="text-sm text-gray-600">Monthly Contribution</p>
                          <p className="font-semibold">{formatCurrency(50000)}</p>
                        </div>
                        <div className="p-3 border rounded-lg">
                          <p className="text-sm text-gray-600">Status</p>
                          <Badge variant="default">Paid</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center space-x-2">
                          <span>Small Group B</span>
                          <Badge variant="secondary">Waiting</Badge>
                        </CardTitle>
                        <CardDescription>
                          Cycle 2 of 3 • Next payout: 2024-02-05
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">My Position</p>
                        <p className="text-2xl font-bold text-blue-600">#3</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold text-blue-800">Mike Johnson is receiving</h4>
                            <p className="text-blue-700">Payout amount: {formatCurrency(225000)}</p>
                          </div>
                          <Badge variant="outline">
                            Current Cycle
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 border rounded-lg">
                          <p className="text-sm text-gray-600">Monthly Contribution</p>
                          <p className="font-semibold">{formatCurrency(75000)}</p>
                        </div>
                        <div className="p-3 border rounded-lg">
                          <p className="text-sm text-gray-600">Status</p>
                          <Badge variant="default">Paid</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* My Payout History */}
              <Card>
                <CardHeader>
                  <CardTitle>My Payout History</CardTitle>
                  <CardDescription>Track my received payouts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Small Group B</p>
                        <p className="text-sm text-gray-600">Cycle 1 • January 2024</p>
                        <p className="text-xs text-gray-500">2024-01-05</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">{formatCurrency(225000)}</p>
                        <Badge variant="outline" className="text-xs">Received</Badge>
                      </div>
                    </div>
                    <div className="text-center p-4 text-sm text-gray-500">
                      No more payout history
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="transactions" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
                <CardDescription>View all your financial transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {memberTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-full ${
                          transaction.type === 'contribution' ? 'bg-green-100' : 'bg-blue-100'
                        }`}>
                          {transaction.type === 'contribution' ? 
                            <TrendingUp className="h-4 w-4 text-green-600" /> : 
                            <CreditCard className="h-4 w-4 text-blue-600" />
                          }
                        </div>
                        <div>
                          <h4 className="font-semibold capitalize">
                            {transaction.type.replace('_', ' ')}
                          </h4>
                          <p className="text-sm text-gray-600">{transaction.description}</p>
                          <p className="text-sm text-gray-500">{transaction.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${
                          transaction.type === 'contribution' ? 'text-green-600' : 'text-blue-600'
                        }`}>
                          {formatCurrency(transaction.amount)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MemberDashboard;
