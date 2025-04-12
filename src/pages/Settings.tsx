
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const Settings = () => {
  const { toast } = useToast();
  const [notificationSettings, setNotificationSettings] = useState({
    orderUpdates: true,
    promotions: false,
    newsletter: true,
    productUpdates: true
  });

  const [preferences, setPreferences] = useState({
    darkMode: false,
    savePaymentInfo: true,
    autoCheckout: false
  });

  const handleNotificationChange = (key: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handlePreferenceChange = (key: keyof typeof preferences) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSaveSettings = () => {
    // In a real app, this would save to the database
    toast({
      title: "Settings Saved",
      description: "Your settings have been updated successfully."
    });
  };

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      
      <Tabs defaultValue="notifications" className="max-w-4xl">
        <TabsList>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="payment">Payment Methods</TabsTrigger>
        </TabsList>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure how you want to receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Order Updates</h3>
                  <p className="text-sm text-muted-foreground">
                    Get notified about status changes to your orders
                  </p>
                </div>
                <Switch 
                  checked={notificationSettings.orderUpdates} 
                  onCheckedChange={() => handleNotificationChange('orderUpdates')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Special Promotions</h3>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications about deals and special offers
                  </p>
                </div>
                <Switch 
                  checked={notificationSettings.promotions} 
                  onCheckedChange={() => handleNotificationChange('promotions')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Newsletter</h3>
                  <p className="text-sm text-muted-foreground">
                    Weekly digest of farming tips and seasonal updates
                  </p>
                </div>
                <Switch 
                  checked={notificationSettings.newsletter} 
                  onCheckedChange={() => handleNotificationChange('newsletter')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Product Updates</h3>
                  <p className="text-sm text-muted-foreground">
                    Notifications about new products from your favorite farms
                  </p>
                </div>
                <Switch 
                  checked={notificationSettings.productUpdates} 
                  onCheckedChange={() => handleNotificationChange('productUpdates')}
                />
              </div>
              
              <Button onClick={handleSaveSettings}>Save Notification Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>
                Customize your application experience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Dark Mode</h3>
                  <p className="text-sm text-muted-foreground">
                    Use dark theme for the application
                  </p>
                </div>
                <Switch 
                  checked={preferences.darkMode} 
                  onCheckedChange={() => handlePreferenceChange('darkMode')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Save Payment Information</h3>
                  <p className="text-sm text-muted-foreground">
                    Securely save payment details for faster checkout
                  </p>
                </div>
                <Switch 
                  checked={preferences.savePaymentInfo} 
                  onCheckedChange={() => handlePreferenceChange('savePaymentInfo')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Auto Checkout</h3>
                  <p className="text-sm text-muted-foreground">
                    Automatically proceed to checkout when adding items to cart
                  </p>
                </div>
                <Switch 
                  checked={preferences.autoCheckout} 
                  onCheckedChange={() => handlePreferenceChange('autoCheckout')}
                />
              </div>
              
              <Button onClick={handleSaveSettings}>Save Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage your account security preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-medium">Change Password</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                  <Button>Update Password</Button>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <h3 className="font-medium mb-4">Two-Factor Authentication</h3>
                <Button variant="outline">Enable Two-Factor Authentication</Button>
              </div>
              
              <div className="pt-4 border-t">
                <h3 className="font-medium mb-4">Active Sessions</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  These are the devices that are currently logged into your account.
                </p>
                <div className="space-y-2">
                  <div className="p-3 border rounded flex justify-between items-center">
                    <div>
                      <p className="font-medium">Chrome on Windows</p>
                      <p className="text-xs text-muted-foreground">Active now</p>
                    </div>
                    <Button variant="outline" size="sm">Log Out</Button>
                  </div>
                  <div className="p-3 border rounded flex justify-between items-center">
                    <div>
                      <p className="font-medium">Safari on iPhone</p>
                      <p className="text-xs text-muted-foreground">Last active: 2 days ago</p>
                    </div>
                    <Button variant="outline" size="sm">Log Out</Button>
                  </div>
                </div>
                <Button className="mt-2" variant="outline">Log Out of All Devices</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="payment">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>
                Manage your saved payment methods
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Saved Cards</h3>
                
                <div className="space-y-2">
                  <div className="p-3 border rounded flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 p-2 rounded">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect width="24" height="24" rx="4" fill="#1E40AF" fillOpacity="0.2"/>
                          <path d="M7 15H17V9H7V15Z" fill="#1E40AF"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Visa ending in 4242</p>
                        <p className="text-xs text-muted-foreground">Expires 12/25</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm">Remove</Button>
                    </div>
                  </div>
                  
                  <div className="p-3 border rounded flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="bg-red-100 p-2 rounded">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect width="24" height="24" rx="4" fill="#DC2626" fillOpacity="0.2"/>
                          <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" fill="#DC2626"/>
                          <path d="M16 16H8C8 18.2091 9.79086 20 12 20C14.2091 20 16 18.2091 16 16Z" fill="#DC2626"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Mastercard ending in 5555</p>
                        <p className="text-xs text-muted-foreground">Expires 10/24</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm">Remove</Button>
                    </div>
                  </div>
                </div>
                
                <Button variant="outline">Add New Payment Method</Button>
              </div>
              
              <div className="pt-4 border-t">
                <h3 className="font-medium mb-4">Billing Address</h3>
                <p className="mb-4">
                  123 Main Street<br />
                  Apt 4B<br />
                  New York, NY 10001<br />
                  United States
                </p>
                <Button variant="outline">Update Billing Address</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
