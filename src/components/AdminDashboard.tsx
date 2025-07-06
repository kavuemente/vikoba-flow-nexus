
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  FileText, 
  LogOut, 
  CheckCircle, 
  XCircle,
  Clock,
  Calendar
} from "lucide-react";

interface AdminDashboardProps {
  userName: string;
  userRole: "admin" | "treasurer";
  onLogout: () => void;
}

// Mock data - in real app, this would come from your backend
const mockLoans = [
  {
    id: 1,
    memberName: "John Doe",
    amount: 500000,
    reason: "Small business expansion",
    status: "pending",
    dateRequested: "2024-01-15",
    dateDue: "2024-07-15"
  },
  {
    id: 2,
    memberName: "Jane Smith",
    amount: 300000,
    reason: "School fees",
    status: "approved",
    dateRequested: "2024-01-10",
    dateDue: "2024-06-10"
  },
  {
    id: 3,
    memberName: "Peter Johnson",
    amount: 750000,
    reason: "Medical emergency",
    status: "pending",
    dateRequested: "2024-01-20",
    dateDue: "2024-08-20"
  }
];

const mockMembers = [
  { id: 1, name: "John Doe", email: "john@example.com", phone: "+255123456789", status: "active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "+255123456790", status: "active" },
  { id: 3, name: "Peter Johnson", email: "peter@example.com", phone: "+255123456791", status: "pending" },
];

const mockTransactions = [
  { id: 1, member: "John Doe", type: "contribution", amount: 50000, date: "2024-01-25" },
  { id: 2, member: "Jane Smith", type: "repayment", amount: 25000, date: "2024-01-24" },
  { id: 3, member: "Peter Johnson", type: "contribution", amount: 50000, date: "2024-01-23" },
];

const mockPayoutGroups = [
  {
    id: 1,
    name: "Main Group A",
    members: [
      { id: 1, name: "John Doe", joinDate: "2024-01-01", contributionStatus: "paid", position: 1 },
      { id: 2, name: "Jane Smith", joinDate: "2024-01-05", contributionStatus: "paid", position: 2 },
      { id: 3, name: "Peter Johnson", joinDate: "2024-01-10", contributionStatus: "pending", position: 3 },
      { id: 4, name: "Mary Wilson", joinDate: "2024-01-15", contributionStatus: "paid", position: 4 },
      { id: 5, name: "David Brown", joinDate: "2024-01-20", contributionStatus: "paid", position: 5 },
    ],
    currentCycle: 1,
    totalCycles: 5,
    nextPayoutDue: "2024-02-01",
    monthlyContribution: 50000,
    currentRecipient: "John Doe",
    payoutAmount: 250000,
    status: "ready" // ready, waiting, processing, completed
  },
  {
    id: 2,
    name: "Small Group B",
    members: [
      { id: 6, name: "Sarah Davis", joinDate: "2024-01-01", contributionStatus: "paid", position: 1 },
      { id: 7, name: "Mike Johnson", joinDate: "2024-01-03", contributionStatus: "paid", position: 2 },
      { id: 8, name: "Lisa Anderson", joinDate: "2024-01-08", contributionStatus: "paid", position: 3 },
    ],
    currentCycle: 2,
    totalCycles: 3,
    nextPayoutDue: "2024-02-05",
    monthlyContribution: 75000,
    currentRecipient: "Mike Johnson",
    payoutAmount: 225000,
    status: "waiting" // waiting for Peter Johnson's payment
  }
];

const mockPayoutHistory = [
  { id: 1, groupName: "Main Group A", recipient: "Jane Smith", amount: 250000, date: "2024-01-01", cycle: 1 },
  { id: 2, groupName: "Small Group B", recipient: "Sarah Davis", amount: 225000, date: "2024-01-05", cycle: 1 }
];

const AdminDashboard = ({ userName, userRole, onLogout }: AdminDashboardProps) => {
  const [loans, setLoans] = useState(mockLoans);
  const [payoutGroups, setPayoutGroups] = useState(mockPayoutGroups);

  const handlePayoutAction = (groupId: number, action: "payout" | "skip") => {
    setPayoutGroups(prev => prev.map(group => 
      group.id === groupId 
        ? { 
            ...group, 
            status: action === "payout" ? "processing" : "completed",
            currentCycle: action === "payout" ? group.currentCycle + 1 : group.currentCycle
          }
        : group
    ));
    toast.success(`Payout ${action === "payout" ? "processed" : "skipped"} successfully`);
  };

  const handleLoanAction = (loanId: number, action: "approve" | "reject") => {
    setLoans(prev => prev.map(loan => 
      loan.id === loanId 
        ? { ...loan, status: action === "approve" ? "approved" : "rejected" }
        : loan
    ));
    toast.success(`Loan ${action}d successfully`);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-TZ', {
      style: 'currency',
      currency: 'TZS',
      minimumFractionDigits: 0,
    }).format(amount);
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
                <p className="text-sm text-gray-600">{userRole.charAt(0).toUpperCase() + userRole.slice(1)} Dashboard</p>
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
              <CardTitle className="text-sm font-medium">Total Members</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">+2 from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Loans</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(2500000)}</div>
              <p className="text-xs text-muted-foreground">Active loans</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Collections</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(1200000)}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Require attention</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="loans" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="loans">Loan Management</TabsTrigger>
            <TabsTrigger value="payouts">Payout Groups</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="loans" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Loan Applications</CardTitle>
                <CardDescription>Review and manage loan requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {loans.map((loan) => (
                    <div key={loan.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-semibold">{loan.memberName}</h4>
                          <Badge variant={
                            loan.status === "approved" ? "default" :
                            loan.status === "rejected" ? "destructive" : "secondary"
                          }>
                            {loan.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">
                          Amount: <span className="font-medium">{formatCurrency(loan.amount)}</span>
                        </p>
                        <p className="text-sm text-gray-600 mb-1">Reason: {loan.reason}</p>
                        <p className="text-sm text-gray-500">
                          Requested: {loan.dateRequested} | Due: {loan.dateDue}
                        </p>
                      </div>
                      
                      {loan.status === "pending" && (
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            onClick={() => handleLoanAction(loan.id, "approve")}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleLoanAction(loan.id, "reject")}
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payouts" className="mt-6">
            <div className="space-y-6">
              {/* Payout Alerts */}
              {payoutGroups.some(group => group.status === "waiting") && (
                <Card className="border-yellow-200 bg-yellow-50">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-yellow-600" />
                      <div>
                        <h4 className="font-semibold text-yellow-800">Waiting for Payments</h4>
                        <p className="text-sm text-yellow-700">Some members haven't made their contributions yet.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Payout Groups */}
              <div className="grid gap-6">
                {payoutGroups.map((group) => (
                  <Card key={group.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="flex items-center space-x-2">
                            <span>{group.name}</span>
                            <Badge variant={
                              group.status === "ready" ? "default" :
                              group.status === "waiting" ? "secondary" :
                              group.status === "processing" ? "outline" : "destructive"
                            }>
                              {group.status}
                            </Badge>
                          </CardTitle>
                          <CardDescription>
                            Cycle {group.currentCycle} of {group.totalCycles} • Next payout: {group.nextPayoutDue}
                          </CardDescription>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Payout Amount</p>
                          <p className="text-2xl font-bold text-green-600">{formatCurrency(group.payoutAmount)}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {/* Current Recipient */}
                      <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold text-blue-800">Current Recipient</h4>
                            <p className="text-blue-700">{group.currentRecipient}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-blue-600">Monthly Contribution</p>
                            <p className="font-semibold text-blue-800">{formatCurrency(group.monthlyContribution)}</p>
                          </div>
                        </div>
                      </div>

                      {/* Members List */}
                      <div className="space-y-3 mb-6">
                        <h4 className="font-semibold">Members & Contribution Status</h4>
                        {group.members.map((member) => (
                          <div key={member.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-semibold">
                                {member.position}
                              </div>
                              <div>
                                <p className="font-medium">{member.name}</p>
                                <p className="text-xs text-gray-500">Joined: {member.joinDate}</p>
                              </div>
                            </div>
                            <Badge variant={member.contributionStatus === "paid" ? "default" : "destructive"}>
                              {member.contributionStatus}
                            </Badge>
                          </div>
                        ))}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-3">
                        {group.status === "ready" && (
                          <Button
                            onClick={() => handlePayoutAction(group.id, "payout")}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Process Payout
                          </Button>
                        )}
                        
                        {group.status === "waiting" && (
                          <>
                            <Button
                              onClick={() => handlePayoutAction(group.id, "payout")}
                              className="bg-orange-600 hover:bg-orange-700"
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Force Payout
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => handlePayoutAction(group.id, "skip")}
                            >
                              <XCircle className="h-4 w-4 mr-2" />
                              Skip This Month
                            </Button>
                          </>
                        )}
                        
                        <Button variant="outline">
                          <Users className="h-4 w-4 mr-2" />
                          Manage Group
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Create New Group */}
              <Card>
                <CardHeader>
                  <CardTitle>Create New Payout Group</CardTitle>
                  <CardDescription>Set up a new ROSCA-style rotating payout group</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    <Users className="h-4 w-4 mr-2" />
                    Create New Payout Group
                  </Button>
                </CardContent>
              </Card>

              {/* Payout History */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Payout History</CardTitle>
                  <CardDescription>Track completed payouts and cycles</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockPayoutHistory.map((payout) => (
                      <div key={payout.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{payout.recipient}</p>
                          <p className="text-sm text-gray-600">{payout.groupName} • Cycle {payout.cycle}</p>
                          <p className="text-xs text-gray-500">{payout.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">{formatCurrency(payout.amount)}</p>
                          <Badge variant="outline" className="text-xs">Completed</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="members" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Member Management</CardTitle>
                <CardDescription>View and manage group members</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockMembers.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-semibold">{member.name}</h4>
                        <p className="text-sm text-gray-600">{member.email}</p>
                        <p className="text-sm text-gray-600">{member.phone}</p>
                      </div>
                      <Badge variant={member.status === "active" ? "default" : "secondary"}>
                        {member.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>View all financial transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-semibold">{transaction.member}</h4>
                        <p className="text-sm text-gray-600 capitalize">{transaction.type}</p>
                        <p className="text-sm text-gray-500">{transaction.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">
                          {formatCurrency(transaction.amount)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Financial Reports</CardTitle>
                <CardDescription>Generate and view financial summaries</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Monthly Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Total Contributions:</span>
                        <span className="font-medium">{formatCurrency(1200000)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Loans Disbursed:</span>
                        <span className="font-medium">{formatCurrency(800000)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Repayments:</span>
                        <span className="font-medium">{formatCurrency(300000)}</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span className="font-semibold">Net Position:</span>
                        <span className="font-semibold text-green-600">{formatCurrency(700000)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Quick Actions</h4>
                    <div className="space-y-2">
                      <Button className="w-full" variant="outline">
                        <Calendar className="h-4 w-4 mr-2" />
                        Schedule Meeting
                      </Button>
                      <Button className="w-full" variant="outline">
                        <FileText className="h-4 w-4 mr-2" />
                        Export Report
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
