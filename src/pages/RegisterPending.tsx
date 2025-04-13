
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { HourglassIcon, CheckCircle } from "lucide-react";

export default function RegisterPending() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-primary/10 mb-4">
            <HourglassIcon className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Registration Pending</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p>
            Thank you for registering as a farmer on SmartFarm Direct! Your application is currently being reviewed by our team.
          </p>
          
          <div className="rounded-lg bg-muted p-4 mt-6">
            <h3 className="font-medium mb-2">What happens next?</h3>
            <ul className="space-y-3 text-left">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Our team reviews your application (typically within 1-2 business days)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>You'll receive an email notification once your account is approved</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>After approval, you can log in and start setting up your farm profile and adding products</span>
              </li>
            </ul>
          </div>
          
          <p className="text-sm text-muted-foreground mt-4">
            If you have any questions about your application status, please contact our support team at{" "}
            <a href="mailto:support@smartfarm.com" className="text-primary underline">
              support@smartfarm.com
            </a>
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild>
            <Link to="/">Return to Home</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
