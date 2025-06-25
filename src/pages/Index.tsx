
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Users, DollarSign, TrendingUp, Shield } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <DollarSign className="h-12 w-12 text-green-600 mr-2" />
            <h1 className="text-4xl font-bold text-gray-900">Digital Vikoba</h1>
          </div>
          <p className="text-lg text-gray-600">Modern Group Savings & Loan Management System</p>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="text-center">
            <CardHeader>
              <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Member Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Secure user registration and role-based access</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardHeader>
              <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Loan Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Request, approve, and track loan repayments</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardHeader>
              <Shield className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Financial Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Comprehensive financial analytics and reporting</p>
            </CardContent>
          </Card>
        </div>

        {/* Login/Register Section */}
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Access Your Account</CardTitle>
            <CardDescription>Login to manage your Vikoba group</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
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
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="role">Role</Label>
        <select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value as "admin" | "treasurer" | "member")}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="member">Member</option>
          <option value="treasurer">Treasurer</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      
      <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
        Login
      </Button>
      
      <div className="text-sm text-gray-500 space-y-1">
        <p><strong>Demo Accounts:</strong></p>
        <p>Admin: admin@vikoba.tz / Password: admin123</p>
        <p>Member: member@vikoba.tz / Password: member123</p>
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
        />
      </div>
      
      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
        Register
      </Button>
    </form>
  );
};

export default Index;
