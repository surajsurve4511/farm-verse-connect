
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { authService } from "@/services/serviceFactory";
import { Eye, EyeOff, LogIn, Lock, Mail } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerRole, setRegisterRole] = useState("customer");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await authService.login(loginEmail, loginPassword);
      
      if (!result.success) {
        throw new Error(result.error || "Login failed");
      }
      
      toast({
        title: "Login successful",
        description: `Welcome back to SmartFarm Direct!`,
      });
      
      // Redirect based on role
      const userRole = result.user?.role || localStorage.getItem("userRole");
      
      if (userRole === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const userData = {
        name: registerName,
        email: registerEmail,
        password: registerPassword,
        role: registerRole
      };
      
      const result = await authService.register(userData);
      
      if (!result.success) {
        throw new Error(result.error || "Registration failed");
      }
      
      toast({
        title: "Registration successful",
        description: `Your account has been created. Welcome!`,
      });
      
      // Redirect based on role
      if (registerRole === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "An error occurred during registration. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1500673922987-e212871fec22?q=80&w=1920')] bg-cover bg-center p-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gradient">SmartFarm Direct</h1>
          <p className="text-muted-foreground mt-2">
            Connect farmers and consumers directly
          </p>
        </div>
        
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                  Enter your credentials to access your account.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email" className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email
                    </Label>
                    <Input 
                      id="login-email" 
                      type="email" 
                      placeholder="name@example.com" 
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                      className="bg-background/50 border-white/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="login-password" className="flex items-center gap-2">
                        <Lock className="h-4 w-4" />
                        Password
                      </Label>
                      <a 
                        href="#" 
                        className="text-sm text-primary hover:underline"
                      >
                        Forgot password?
                      </a>
                    </div>
                    <div className="relative">
                      <Input 
                        id="login-password" 
                        type={showPassword ? "text" : "password"}
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        required
                        className="bg-background/50 border-white/20 pr-10"
                      />
                      <button 
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      "Logging in..."
                    ) : (
                      <>
                        <LogIn className="mr-2 h-4 w-4" /> Login
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <div className="text-center text-sm text-muted-foreground">
                  <span>Admin access:</span>
                  <div className="mt-1">
                    <div><strong>Email:</strong> surajsurve5411@gmail.com</div>
                    <div><strong>Password:</strong> password-suraj</div>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="register">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Create an account</CardTitle>
                <CardDescription>
                  Register to start using SmartFarm Direct.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-name">Full Name</Label>
                    <Input 
                      id="register-name" 
                      placeholder="John Smith" 
                      value={registerName}
                      onChange={(e) => setRegisterName(e.target.value)}
                      required
                      className="bg-background/50 border-white/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <Input 
                      id="register-email" 
                      type="email" 
                      placeholder="name@example.com" 
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      required
                      className="bg-background/50 border-white/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Password</Label>
                    <div className="relative">
                      <Input 
                        id="register-password" 
                        type={showPassword ? "text" : "password"} 
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                        required
                        className="bg-background/50 border-white/20 pr-10"
                      />
                      <button 
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-role">I am a...</Label>
                    <div className="flex space-x-4">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="role"
                          value="farmer"
                          checked={registerRole === "farmer"}
                          onChange={() => setRegisterRole("farmer")}
                          className="w-4 h-4 text-primary border-primary focus:ring-primary"
                        />
                        <span>Farmer/Producer</span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="role"
                          value="customer"
                          checked={registerRole === "customer"}
                          onChange={() => setRegisterRole("customer")}
                          className="w-4 h-4 text-primary border-primary focus:ring-primary"
                        />
                        <span>Customer</span>
                      </label>
                    </div>
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Creating account..." : "Create account"}
                  </Button>
                </form>
              </CardContent>
              <CardFooter>
                <p className="text-center text-sm text-muted-foreground w-full">
                  By creating an account, you agree to our{" "}
                  <a href="#" className="text-primary hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-primary hover:underline">
                    Privacy Policy
                  </a>
                  .
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
