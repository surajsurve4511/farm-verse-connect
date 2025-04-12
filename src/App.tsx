
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Marketplace from "./pages/Marketplace";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Support from "./pages/Support";
import Messages from "./pages/Messages";
import { ChatBot } from "./components/ai/ChatBot";
import { connectToMongoDB, initializeDatabase } from "./lib/mongodb";
import { toast } from "sonner";

const queryClient = new QueryClient();

// Route Guard component for protected routes
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  
  useEffect(() => {
    // Check if user is logged in
    const userEmail = localStorage.getItem("userEmail");
    setIsAuth(!!userEmail);
  }, []);

  // While checking authentication
  if (isAuth === null) {
    return <div>Loading...</div>;
  }

  return isAuth ? <>{children}</> : <Navigate to="/login" />;
};

// Admin Route Guard
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  
  useEffect(() => {
    // Check if user is admin
    const userRole = localStorage.getItem("userRole");
    setIsAdmin(userRole === "admin");
  }, []);

  // While checking role
  if (isAdmin === null) {
    return <div>Loading...</div>;
  }

  return isAdmin ? <>{children}</> : <Navigate to="/dashboard" />;
};

// Farmer Route Guard
const FarmerRoute = ({ children }: { children: React.ReactNode }) => {
  const [isFarmer, setIsFarmer] = useState<boolean | null>(null);
  
  useEffect(() => {
    // Check if user is farmer
    const userRole = localStorage.getItem("userRole");
    setIsFarmer(userRole === "farmer" || userRole === "admin");
  }, []);

  // While checking role
  if (isFarmer === null) {
    return <div>Loading...</div>;
  }

  return isFarmer ? <>{children}</> : <Navigate to="/dashboard" />;
};

const App = () => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Initialize MongoDB connection
    const initApp = async () => {
      try {
        await connectToMongoDB();
        console.log("MongoDB connected successfully");
        
        // Initialize database with sample data
        await initializeDatabase();
        
        setIsInitialized(true);
      } catch (error) {
        console.error("MongoDB connection error:", error);
        toast.error("Could not connect to database. Using local data only.");
        setIsInitialized(true);
      }
    };
    
    initApp();
  }, []);

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Initializing FarmVerse</h2>
          <p className="text-gray-500 mb-4">Connecting to database...</p>
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            
            {/* Admin route */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <AdminRoute>
                    <Admin />
                  </AdminRoute>
                </ProtectedRoute>
              } 
            />
            
            {/* Protected routes inside AppLayout */}
            <Route 
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/dashboard" element={<Dashboard />} />
              
              {/* Farmer-only routes */}
              <Route path="/products" element={
                <FarmerRoute>
                  <Products />
                </FarmerRoute>
              } />
              
              <Route path="/orders" element={<Orders />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/support" element={<Support />} />
              <Route path="/messages" element={<Messages />} />
            </Route>
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ChatBot />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
