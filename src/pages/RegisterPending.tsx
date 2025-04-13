
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, HelpCircle, Clock, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function RegisterPending() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto bg-amber-100 h-16 w-16 rounded-full flex items-center justify-center mb-4">
            <Clock className="h-8 w-8 text-amber-600" />
          </div>
          <CardTitle className="text-2xl font-bold">Registration Pending</CardTitle>
          <CardDescription>
            Your farmer account is awaiting approval
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted p-4 rounded-lg">
            <h3 className="font-medium text-lg mb-2">What happens next?</h3>
            <div className="space-y-3">
              <div className="flex gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div className="text-sm">
                  <p className="font-medium">Application Received</p>
                  <p className="text-muted-foreground">We've received your registration and it's being reviewed.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Clock className="h-5 w-5 text-amber-600" />
                <div className="text-sm">
                  <p className="font-medium">Review Process</p>
                  <p className="text-muted-foreground">Our team is reviewing your information. This typically takes 1-2 business days.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle className="h-5 w-5 text-muted-foreground" />
                <div className="text-sm">
                  <p className="font-medium">Approval</p>
                  <p className="text-muted-foreground">Once approved, you'll receive an email confirmation and can start selling products.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border rounded-lg p-4">
            <div className="flex gap-3">
              <HelpCircle className="h-5 w-5 text-primary" />
              <div>
                <h3 className="font-medium">Need Help?</h3>
                <p className="text-sm text-muted-foreground">
                  If you have any questions about your application or need assistance, 
                  please contact our support team at support@smartfarmdirect.com
                </p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => navigate("/")}
          >
            <Home className="mr-2 h-4 w-4" />
            Return to Home
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
