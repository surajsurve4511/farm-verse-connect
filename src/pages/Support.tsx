
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Search, FileQuestion, MessageSquare, Phone, Mail } from "lucide-react";

const faqItems = [
  {
    question: "How do I track my order?",
    answer: "You can track your order by logging into your account and visiting the Orders section. Click on any order to view its current status and tracking information."
  },
  {
    question: "Can I change or cancel my order?",
    answer: "Orders can be modified or canceled within 1 hour of placing them. After that, please contact customer support for assistance."
  },
  {
    question: "How fresh are your products?",
    answer: "All products are harvested within 24-48 hours of delivery to ensure maximum freshness. Our farm-to-table approach means you're getting the freshest produce possible."
  },
  {
    question: "Do you offer organic products?",
    answer: "Yes! Many of our farmers offer certified organic products. Look for the 'Organic' badge on product listings to identify these items."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and Apple Pay. Some locations also offer cash on delivery."
  },
  {
    question: "How do I become a vendor/farmer on your platform?",
    answer: "Farmers interested in selling through our platform can apply through the 'Become a Farmer' link in the footer. We'll review your application and get back to you within 3-5 business days."
  },
  {
    question: "What is your return policy?",
    answer: "If you're not satisfied with your purchase, please contact us within 24 hours of receiving your order. We'll work with you to resolve any issues or arrange for a refund."
  },
  {
    question: "Do you deliver to my area?",
    answer: "We currently deliver to most major cities and surrounding areas. Enter your zip code on the checkout page to confirm if we deliver to your location."
  }
];

const Support = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const filteredFaqs = faqItems.filter(
    item => item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
           item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the form to a backend
    toast({
      title: "Message Sent",
      description: "We've received your message and will respond shortly."
    });
    // Reset the form
    setContactForm({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  const navigateToContact = () => {
    const contactTab = document.querySelector('[data-value="contact"]') as HTMLElement;
    if (contactTab) contactTab.click();
  };

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Support Center</h1>
      
      <Tabs defaultValue="faq" className="max-w-4xl">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="contact">Contact Us</TabsTrigger>
          <TabsTrigger value="help">Help Center</TabsTrigger>
        </TabsList>
        
        <TabsContent value="faq">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>
                Find answers to common questions about our service
              </CardDescription>
              <div className="relative mt-4">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search FAQs..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <h3 className="font-medium flex items-center gap-2">
                      <FileQuestion className="h-5 w-5 text-primary" />
                      {item.question}
                    </h3>
                    <p className="text-muted-foreground pl-7">{item.answer}</p>
                    {index < filteredFaqs.length - 1 && <hr className="my-4" />}
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <FileQuestion className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-medium text-lg mb-2">No results found</h3>
                  <p className="text-muted-foreground">
                    We couldn't find any FAQs matching your search. Try different keywords or contact us directly.
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <p className="text-sm text-muted-foreground">
                Can't find what you're looking for?
              </p>
              <Button variant="outline" onClick={navigateToContact}>
                Contact Support
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
              <CardDescription>
                Get in touch with our support team
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <h3 className="font-medium mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Phone Support</p>
                        <p className="text-sm text-muted-foreground">+1 (800) 123-4567</p>
                        <p className="text-xs text-muted-foreground">Mon-Fri, 9am-5pm EST</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Email Support</p>
                        <p className="text-sm text-muted-foreground">support@smartfarmdirect.com</p>
                        <p className="text-xs text-muted-foreground">We respond within 24 hours</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <MessageSquare className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Live Chat</p>
                        <p className="text-sm text-muted-foreground">Available 24/7</p>
                        <Button variant="link" className="p-0 h-auto text-xs">Start Chat</Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-4">Send a Message</h3>
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input 
                        id="name" 
                        name="name"
                        value={contactForm.name}
                        onChange={handleContactChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        name="email" 
                        type="email"
                        value={contactForm.email}
                        onChange={handleContactChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input 
                        id="subject" 
                        name="subject"
                        value={contactForm.subject}
                        onChange={handleContactChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea 
                        id="message" 
                        name="message"
                        value={contactForm.message}
                        onChange={handleContactChange}
                        rows={4}
                        required
                      />
                    </div>
                    
                    <Button type="submit">Send Message</Button>
                  </form>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="help">
          <Card>
            <CardHeader>
              <CardTitle>Help Center</CardTitle>
              <CardDescription>
                Resources and guides to help you get the most out of our platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                  <h3 className="font-medium mb-2">Getting Started Guide</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Learn the basics of using our platform with this quick start guide
                  </p>
                  <Button variant="outline" size="sm">Read Guide</Button>
                </div>
                
                <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                  <h3 className="font-medium mb-2">Ordering Process</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Step-by-step instructions for placing and managing orders
                  </p>
                  <Button variant="outline" size="sm">View Tutorial</Button>
                </div>
                
                <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                  <h3 className="font-medium mb-2">Farmer Resources</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Tools and information for farmers using our platform
                  </p>
                  <Button variant="outline" size="sm">Access Resources</Button>
                </div>
                
                <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                  <h3 className="font-medium mb-2">Account Management</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Learn how to manage your profile, payments, and preferences
                  </p>
                  <Button variant="outline" size="sm">Read Documentation</Button>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-muted rounded-lg">
                <h3 className="font-medium mb-2">Video Tutorials</h3>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="bg-black rounded-lg aspect-video flex items-center justify-center">
                    <Button variant="ghost" className="h-12 w-12 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    </Button>
                  </div>
                  <div className="bg-black rounded-lg aspect-video flex items-center justify-center">
                    <Button variant="ghost" className="h-12 w-12 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    </Button>
                  </div>
                  <div className="bg-black rounded-lg aspect-video flex items-center justify-center">
                    <Button variant="ghost" className="h-12 w-12 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Support;
