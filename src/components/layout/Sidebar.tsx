
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  Box,
  Home,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
  Package,
  Settings,
  ShoppingCart,
  Timer,
  User,
  Inbox,
  Users,
  MessageSquare,
  ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface SidebarProps {
  className?: string;
}

interface SidebarItemProps {
  icon: React.ElementType;
  text: string;
  href: string;
  active?: boolean;
  onClick?: () => void;
}

function SidebarItem({ icon: Icon, text, href, active, onClick }: SidebarItemProps) {
  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start gap-2 rounded-md px-3",
        active ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
      )}
      onClick={onClick}
    >
      <Icon className="h-5 w-5" />
      <span>{text}</span>
    </Button>
  );
}

export function Sidebar({ className }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    // Get user role and email from localStorage
    const role = localStorage.getItem("userRole");
    const email = localStorage.getItem("userEmail");
    
    setUserRole(role);
    setUserEmail(email);
  }, []);

  const isActive = (path: string) => location.pathname === path;
  
  const handleNavigate = (path: string) => {
    navigate(path);
    setIsMobileOpen(false);
  };

  const handleLogout = () => {
    // Clear user data
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    
    // Navigate to login
    navigate("/login");
  };
  
  // Get user name from email
  const getUserName = () => {
    if (!userEmail) return "User";
    
    const nameFromEmail = userEmail.split('@')[0];
    // Capitalize first letter of each word
    return nameFromEmail
      .split(/[._-]/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
  const sidebarContent = (
    <>
      <div className="px-3 py-4">
        <div className="mb-8">
          <h2 className="text-lg font-bold text-sidebar-primary-foreground">SmartFarm Direct</h2>
          <p className="text-xs text-sidebar-foreground/70">
            {userRole === "farmer" 
              ? "Farmer Dashboard" 
              : userRole === "admin" 
                ? "Admin Dashboard" 
                : "Customer Dashboard"
            }
          </p>
        </div>
        
        {/* Common links for all users */}
        <div className="space-y-1">
          <SidebarItem 
            icon={Home} 
            text="Home" 
            href="/" 
            active={isActive("/")} 
            onClick={() => handleNavigate("/")}
          />
          <SidebarItem 
            icon={LayoutDashboard} 
            text="Dashboard" 
            href="/dashboard" 
            active={isActive("/dashboard")} 
            onClick={() => handleNavigate("/dashboard")}
          />
        </div>
        
        <Separator className="my-4 bg-sidebar-border" />
        
        {/* Role-specific links */}
        {userRole === "farmer" && (
          <div className="space-y-1">
            <SidebarItem 
              icon={Package} 
              text="My Products" 
              href="/products" 
              active={isActive("/products")} 
              onClick={() => handleNavigate("/products")}
            />
            <SidebarItem 
              icon={ShoppingCart} 
              text="Orders" 
              href="/orders" 
              active={isActive("/orders")} 
              onClick={() => handleNavigate("/orders")}
            />
            <SidebarItem 
              icon={BarChart3} 
              text="Analytics" 
              href="/analytics" 
              active={isActive("/analytics")} 
              onClick={() => handleNavigate("/analytics")}
            />
            <SidebarItem 
              icon={Users} 
              text="Customers" 
              href="/customers" 
              active={isActive("/customers")} 
              onClick={() => handleNavigate("/customers")}
            />
            <SidebarItem 
              icon={Timer} 
              text="Deliveries" 
              href="/deliveries" 
              active={isActive("/deliveries")} 
              onClick={() => handleNavigate("/deliveries")}
            />
          </div>
        )}
        
        {userRole === "customer" && (
          <div className="space-y-1">
            <SidebarItem 
              icon={ShoppingCart} 
              text="Marketplace" 
              href="/marketplace" 
              active={isActive("/marketplace")} 
              onClick={() => handleNavigate("/marketplace")}
            />
            <SidebarItem 
              icon={Package} 
              text="My Orders" 
              href="/orders" 
              active={isActive("/orders")} 
              onClick={() => handleNavigate("/orders")}
            />
            <SidebarItem 
              icon={ShoppingCart} 
              text="Cart" 
              href="/cart" 
              active={isActive("/cart")} 
              onClick={() => handleNavigate("/cart")}
            />
          </div>
        )}
        
        {userRole === "admin" && (
          <div className="space-y-1">
            <SidebarItem 
              icon={ShieldCheck} 
              text="Admin Panel" 
              href="/admin" 
              active={isActive("/admin")} 
              onClick={() => handleNavigate("/admin")}
            />
            <SidebarItem 
              icon={Users} 
              text="Users" 
              href="/admin" 
              active={isActive("/admin") && location.hash === "#users"} 
              onClick={() => handleNavigate("/admin#users")}
            />
            <SidebarItem 
              icon={Package} 
              text="Products" 
              href="/products" 
              active={isActive("/products")} 
              onClick={() => handleNavigate("/products")}
            />
            <SidebarItem 
              icon={ShoppingCart} 
              text="Orders" 
              href="/orders" 
              active={isActive("/orders")} 
              onClick={() => handleNavigate("/orders")}
            />
            <SidebarItem 
              icon={BarChart3} 
              text="Analytics" 
              href="/analytics" 
              active={isActive("/analytics")} 
              onClick={() => handleNavigate("/analytics")}
            />
          </div>
        )}
        
        <Separator className="my-4 bg-sidebar-border" />
        
        {/* Common settings, support links */}
        <div className="space-y-1">
          <SidebarItem 
            icon={MessageSquare} 
            text="Messages" 
            href="/messages" 
            active={isActive("/messages")} 
            onClick={() => handleNavigate("/messages")}
          />
          <SidebarItem 
            icon={Settings} 
            text="Settings" 
            href="/settings" 
            active={isActive("/settings")} 
            onClick={() => handleNavigate("/settings")}
          />
          <SidebarItem 
            icon={LifeBuoy} 
            text="Support" 
            href="/support" 
            active={isActive("/support")} 
            onClick={() => handleNavigate("/support")}
          />
        </div>
      </div>
      
      <div className="mt-auto px-3 py-4">
        <Separator className="mb-4 bg-sidebar-border" />
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sidebar-accent text-sidebar-accent-foreground">
            <User className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-sidebar-foreground">{getUserName()}</span>
            <span className="text-xs text-sidebar-foreground/70">{userEmail || "user@example.com"}</span>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="ml-auto text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "fixed hidden h-full w-64 flex-col border-r border-sidebar-border bg-sidebar-background text-sidebar-foreground lg:flex",
          className
        )}
      >
        <ScrollArea className="flex-1">
          {sidebarContent}
        </ScrollArea>
      </aside>
      
      {/* Mobile Sidebar */}
      <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
        <SheetTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden fixed top-4 left-4 z-40"
          >
            <Box className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 bg-sidebar-background w-64">
          <ScrollArea className="h-full">
            {sidebarContent}
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </>
  );
}
