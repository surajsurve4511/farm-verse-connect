
import { useNavigate, useLocation } from "react-router-dom";
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
  MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

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

  const isActive = (path: string) => location.pathname === path;
  
  const handleNavigate = (path: string) => {
    navigate(path);
    setIsMobileOpen(false);
  };
  
  const sidebarContent = (
    <>
      <div className="px-3 py-4">
        <div className="mb-8">
          <h2 className="text-lg font-bold text-sidebar-primary-foreground">SmartFarm Direct</h2>
          <p className="text-xs text-sidebar-foreground/70">Farm-to-Consumer Platform</p>
        </div>
        
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
        </div>
        
        <Separator className="my-4 bg-sidebar-border" />
        
        <div className="space-y-1">
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
            icon={Inbox} 
            text="Messages" 
            href="/messages" 
            active={isActive("/messages")} 
            onClick={() => handleNavigate("/messages")}
          />
          <SidebarItem 
            icon={Timer} 
            text="Deliveries" 
            href="/deliveries" 
            active={isActive("/deliveries")} 
            onClick={() => handleNavigate("/deliveries")}
          />
        </div>
        
        <Separator className="my-4 bg-sidebar-border" />
        
        <div className="space-y-1">
          <SidebarItem 
            icon={MessageSquare} 
            text="Farm Story" 
            href="/farm-story" 
            active={isActive("/farm-story")} 
            onClick={() => handleNavigate("/farm-story")}
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
            <span className="text-sm font-medium text-sidebar-foreground">John Farmer</span>
            <span className="text-xs text-sidebar-foreground/70">john@farm.com</span>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="ml-auto text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
            onClick={() => navigate("/login")}
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
