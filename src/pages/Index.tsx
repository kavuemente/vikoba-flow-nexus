import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Users, DollarSign, TrendingUp, Shield, Coins, PiggyBank, CreditCard } from "lucide-react";
import AdminDashboard from "@/components/AdminDashboard";
import MemberDashboard from "@/components/MemberDashboard";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<"admin" | "treasurer" | "member" | null>(null);
  const [userName, setUserName] = useState("");

  const handleLogin = (email: string, password: string, role: "admin" | "treasurer" | "member") => {
    // Simulate login - in real app, this would connect to your backend
    console.log("Login attempt:", { email, password, role });
    setIsLoggedIn(true);
    setUserRole(role);
    setUserName(email.split("@")[0]);
    toast.success(`Welcome back! Logged in as ${role}`);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    setUserName("");
    toast.success("Logged out successfully");
  };

  if (isLoggedIn && userRole) {
    if (userRole === "admin" || userRole === "treasurer") {
      return <AdminDashboard userName={userName} userRole={userRole} onLogout={handleLogout} />;
    } else {
      return <MemberDashboard userName={userName} onLogout={handleLogout} />;
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-emerald-500 to-blue-600 p-4 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300">
              <DollarSign className="h-12 w-12 text-white" />
            </div>
            <div className="ml-4">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                Digital Vikoba
              </h1>
              <div className="flex items-center justify-center mt-2">
                <Coins className="h-5 w-5 text-amber-500 mr-2" />
                <span className="text-lg font-semibold text-gray-700">Powered by Community</span>
                <Coins className="h-5 w-5 text-amber-500 ml-2" />
              </div>
            </div>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Transform your group savings with our modern, secure, and user-friendly Vikoba management system
          </p>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-100">
            <CardHeader className="pb-4">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-3 rounded-full w-16 h-16 mx-auto mb-4 shadow-lg">
                <Users className="h-10 w-10 text-white mx-auto" />
              </div>
              <CardTitle className="text-xl font-bold text-gray-800">Member Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed">
                Secure user registration with role-based access control and comprehensive member profiles
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg bg-gradient-to-br from-emerald-50 to-green-100">
            <CardHeader className="pb-4">
              <div className="bg-gradient-to-r from-emerald-500 to-green-600 p-3 rounded-full w-16 h-16 mx-auto mb-4 shadow-lg">
                <TrendingUp className="h-10 w-10 text-white mx-auto" />
              </div>
              <CardTitle className="text-xl font-bold text-gray-800">Smart Loan Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed">
                Automated loan processing, approval workflows, and intelligent repayment tracking
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-100">
            <CardHeader className="pb-4">
              <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-3 rounded-full w-16 h-16 mx-auto mb-4 shadow-lg">
                <Shield className="h-10 w-10 text-white mx-auto" />
              </div>
              <CardTitle className="text-xl font-bold text-gray-800">Financial Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed">
                Real-time financial insights with comprehensive reporting and data visualization
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Additional Features */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 mb-12 shadow-xl border border-white/20">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">Why Choose Digital Vikoba?</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-green-400 to-emerald-500 p-2 rounded-lg">
                <PiggyBank className="h-6 w-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Secure Savings</h4>
                <p className="text-sm text-gray-600">Bank-level security for your group funds</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-400 to-indigo-500 p-2 rounded-lg">
                <CreditCard className="h-6 w-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Easy Payments</h4>
                <p className="text-sm text-gray-600">Multiple payment methods supported</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-purple-400 to-pink-500 p-2 rounded-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Growth Tracking</h4>
                <p className="text-sm text-gray-600">Monitor your group's financial progress</p>
              </div>
            </div>
          </div>
        </div>

        {/* Login/Register Section */}
        <Card className="max-w-md mx-auto shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold text-gray-800">Access Your Account</CardTitle>
            <CardDescription className="text-gray-600">
              Login to manage your Vikoba group and track your financial journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-gray-100">
                <TabsTrigger value="login" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  Login
                </TabsTrigger>
                <TabsTrigger value="register" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  Register
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <LoginForm onLogin={handleLogin} />
              </TabsContent>
              
              <TabsContent value="register">
                <RegisterForm />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

interface LoginFormProps {
  onLogin: (email: string, password: string, role: "admin" | "treasurer" | "member") => void;
}

const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"admin" | "treasurer" | "member">("member");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    onLogin(email, password, role);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="role">Role</Label>
        <select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value as "admin" | "treasurer" | "member")}
          className="w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        >
          <option value="member">Member</option>
          <option value="treasurer">Treasurer</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      
      <Button type="submit" className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white shadow-lg">
        Login to Dashboard
      </Button>
      
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100">
        <p className="text-sm font-semibold text-blue-800 mb-2">🎯 Demo Accounts:</p>
        <div className="space-y-1 text-xs text-blue-700">
          <p><strong>Admin:</strong> admin@vikoba.tz | Password: admin123</p>
          <p><strong>Member:</strong> member@vikoba.tz | Password: member123</p>
        </div>
      </div>
    </form>
  );
};

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    console.log("Registration data:", formData);
    toast.success("Registration request submitted! Please wait for admin approval.");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          name="name"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={handleChange}
          required
          className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="reg-email">Email</Label>
        <Input
          id="reg-email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
          className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          name="phone"
          placeholder="Enter your phone number"
          value={formData.phone}
          onChange={handleChange}
          required
          className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="reg-password">Password</Label>
        <Input
          id="reg-password"
          name="password"
          type="password"
          placeholder="Create a password"
          value={formData.password}
          onChange={handleChange}
          required
          className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="confirm-password">Confirm Password</Label>
        <Input
          id="confirm-password"
          name="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      
      <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg">
        Create Account
      </Button>
    </form>
  );
};

export default Index;
