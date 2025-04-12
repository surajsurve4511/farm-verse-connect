
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingCart, User, MessageSquare, LifeBuoy } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  // Check if the path contains specific keywords to give relevant guidance
  const isCartRelated = location.pathname.includes("cart") || location.pathname.includes("checkout");
  const isProfileRelated = location.pathname.includes("profile") || location.pathname.includes("account");
  const isMessageRelated = location.pathname.includes("message") || location.pathname.includes("chat");
  const isSupportRelated = location.pathname.includes("support") || location.pathname.includes("help");

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <div className="max-w-md text-center">
        <h1 className="text-6xl font-bold mb-6">404</h1>
        <p className="text-xl text-muted-foreground mb-6">
          Oops! The page you're looking for doesn't exist.
        </p>
        
        {isCartRelated && (
          <div className="mb-8 p-4 border rounded-lg bg-background">
            <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="mb-4">
              Looking for your shopping cart? Our cart functionality is now available!
            </p>
            <Link to="/cart">
              <Button variant="outline" className="mr-2">
                Go to Cart
              </Button>
            </Link>
          </div>
        )}
        
        {isProfileRelated && (
          <div className="mb-8 p-4 border rounded-lg bg-background">
            <User className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="mb-4">
              Looking for your profile page? You can access your account here.
            </p>
            <Link to="/profile">
              <Button variant="outline" className="mr-2">
                Go to Profile
              </Button>
            </Link>
          </div>
        )}
        
        {isMessageRelated && (
          <div className="mb-8 p-4 border rounded-lg bg-background">
            <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="mb-4">
              Looking for your messages? You can access your conversations here.
            </p>
            <Link to="/messages">
              <Button variant="outline" className="mr-2">
                Go to Messages
              </Button>
            </Link>
          </div>
        )}
        
        {isSupportRelated && (
          <div className="mb-8 p-4 border rounded-lg bg-background">
            <LifeBuoy className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="mb-4">
              Need help or support? Our support center is available.
            </p>
            <Link to="/support">
              <Button variant="outline" className="mr-2">
                Go to Support
              </Button>
            </Link>
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <Link to="/marketplace">
            <Button variant="outline">Browse Marketplace</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
