
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Search, ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  className?: string;
}

// Type for cart items
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  farm: string;
}

export function Header({ className }: HeaderProps) {
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItemCount, setCartItemCount] = useState(0);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userName, setUserName] = useState("User");

  // Load cart data
  useEffect(() => {
    const updateCartCount = () => {
      try {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          const cart = JSON.parse(savedCart) as CartItem[];
          setCartItemCount(cart.length);
        } else {
          setCartItemCount(0);
        }
      } catch (error) {
        console.error("Error loading cart data:", error);
        setCartItemCount(0);
      }
    };

    // Update cart count on mount
    updateCartCount();

    // Set up storage event listener to update cart count when changed in another component
    window.addEventListener('storage', updateCartCount);

    // Check user role
    const role = localStorage.getItem("userRole");
    setUserRole(role);
    
    // Set user name based on email
    const email = localStorage.getItem("userEmail");
    if (email) {
      const nameFromEmail = email.split('@')[0];
      // Capitalize first letter of each word
      const formattedName = nameFromEmail
        .split(/[._-]/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      setUserName(formattedName);
    }

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('storage', updateCartCount);
    };
  }, []);

  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/marketplace?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
    }
  };

  const handleLogout = () => {
    // Clear user data
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    
    // Navigate to login
    navigate("/login");
  };

  return (
    <header className={`border-b border-border ${className}`}>
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="lg:w-64"></div>
        
        <div className="hidden md:block flex-1 px-4">
          <form className="relative max-w-md" onSubmit={handleSearch}>
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products, farms, etc."
              className="pl-8 w-full sm:w-60 lg:w-80"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>
        
        <div className="flex items-center gap-2 md:gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={() => navigate("/cart")}
          >
            <ShoppingCart className="h-5 w-5" />
            {cartItemCount > 0 && (
              <Badge
                className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center"
                variant="destructive"
              >
                {cartItemCount}
              </Badge>
            )}
            <span className="sr-only">Cart</span>
          </Button>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative"
              >
                <Bell className="h-5 w-5" />
                <Badge
                  className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center"
                  variant="destructive"
                >
                  {userRole === "farmer" ? 3 : (userRole === "admin" ? 5 : 2)}
                </Badge>
                <span className="sr-only">Notifications</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <div className="p-4 border-b">
                <div className="font-medium">Notifications</div>
                <div className="text-xs text-muted-foreground">
                  You have {userRole === "farmer" ? 3 : (userRole === "admin" ? 5 : 2)} unread messages
                </div>
              </div>
              <div className="max-h-80 overflow-auto">
                {(userRole === "farmer" ? (
                  // Farmer notifications
                  [
                    { title: "New order received", desc: "Order #1042 has been placed", time: "2 hours ago" },
                    { title: "Low inventory alert", desc: "Organic Tomatoes are running low", time: "Yesterday" },
                    { title: "Payment processed", desc: "Payment of $125.40 has been received", time: "2 days ago" },
                  ]
                ) : userRole === "admin" ? (
                  // Admin notifications
                  [
                    { title: "New farmer request", desc: "Organic Fields Farm needs approval", time: "10 minutes ago" },
                    { title: "Order dispute", desc: "Customer reported issue with order #1042", time: "1 hour ago" },
                    { title: "Payment processed", desc: "Monthly commissions processed", time: "3 hours ago" },
                    { title: "System update scheduled", desc: "Maintenance planned for April 10", time: "Yesterday" },
                    { title: "New support ticket", desc: "Ticket #458 requires attention", time: "2 days ago" },
                  ]
                ) : (
                  // Customer notifications
                  [
                    { title: "Order status update", desc: "Your order #1036 has been shipped", time: "1 hour ago" },
                    { title: "Special promotion", desc: "Use code FRESH10 for 10% off", time: "Yesterday" },
                  ]
                )).map((notification, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 hover:bg-muted cursor-pointer">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>
                        {notification.title.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">{notification.title}</p>
                      <p className="text-xs text-muted-foreground">{notification.desc}</p>
                      <p className="text-xs text-muted-foreground">{notification.time}</p>
                    </div>
                    <div className="h-2 w-2 rounded-full bg-primary mt-1.5"></div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t text-center">
                <Button variant="ghost" size="sm" className="w-full">
                  View all notifications
                </Button>
              </div>
            </PopoverContent>
          </Popover>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" alt="User Avatar" />
                  <AvatarFallback>{userName.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{userName}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {localStorage.getItem("userEmail") || "user@example.com"}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground capitalize">
                    Role: {userRole || "User"}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/profile")}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                Dashboard
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/settings")}>
                Settings
              </DropdownMenuItem>
              {userRole === "admin" && (
                <DropdownMenuItem onClick={() => navigate("/admin")}>
                  Admin Panel
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {isSearchOpen && (
        <div className="md:hidden px-4 pb-4">
          <form className="relative" onSubmit={handleSearch}>
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products, farms, etc."
              className="pl-8 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>
      )}
    </header>
  );
}
