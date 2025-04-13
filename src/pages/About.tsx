
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Users, Leaf, Globe, BookOpen, ChevronRight, 
  ShieldCheck, RefreshCw, Truck, Award
} from "lucide-react";

export default function About() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/80 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">About SmartFarm Direct</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-white/90">
            Connecting local farms with consumers to create a sustainable food ecosystem.
          </p>
        </div>
      </div>
      
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 md:px-6 py-4">
        <nav className="flex text-sm">
          <Link to="/" className="text-muted-foreground hover:text-foreground">
            Home
          </Link>
          <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
          <span className="text-foreground font-medium">About Us</span>
        </nav>
      </div>
      
      {/* Our Mission */}
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-muted-foreground mb-4">
              At SmartFarm Direct, we're on a mission to transform the way food moves from farm to table. 
              We believe in a world where consumers have direct access to fresh, local produce, and where 
              farmers receive fair compensation for their hard work.
            </p>
            <p className="text-muted-foreground mb-6">
              By eliminating unnecessary middlemen, we're able to deliver fresher food at better prices 
              while ensuring that farmers earn more for their products. Our platform isn't just a marketplace—it's 
              a community that values transparency, sustainability, and the people who grow our food.
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <Leaf className="h-5 w-5 text-green-600" />
                </div>
                <span className="font-medium">Sustainable Farming</span>
              </div>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <span className="font-medium">Community Support</span>
              </div>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                  <Globe className="h-5 w-5 text-amber-600" />
                </div>
                <span className="font-medium">Local Economy</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-400/10 rounded-full blur-xl"></div>
            <img 
              src="https://images.unsplash.com/photo-1500829243541-74b677fecc30?q=80&w=1770" 
              alt="Farmer with fresh produce" 
              className="w-full h-auto rounded-lg shadow-lg relative z-10" 
            />
          </div>
        </div>
      </div>
      
      <Separator className="my-6" />
      
      {/* Our Values */}
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Values</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            These core principles guide everything we do at SmartFarm Direct, from how we build our platform 
            to how we engage with our community of farmers and consumers.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-muted/40 rounded-lg p-6 text-center hover:shadow-md transition-shadow">
            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Leaf className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Sustainability</h3>
            <p className="text-muted-foreground">
              We promote environmentally responsible farming practices and work to reduce food miles and packaging waste.
            </p>
          </div>
          
          <div className="bg-muted/40 rounded-lg p-6 text-center hover:shadow-md transition-shadow">
            <div className="h-12 w-12 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-6 w-6 text-green-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Community</h3>
            <p className="text-muted-foreground">
              We build meaningful connections between farmers and consumers, fostering a sense of shared purpose.
            </p>
          </div>
          
          <div className="bg-muted/40 rounded-lg p-6 text-center hover:shadow-md transition-shadow">
            <div className="h-12 w-12 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-6 w-6 text-blue-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Education</h3>
            <p className="text-muted-foreground">
              We believe in transparency about where food comes from and how it's grown, empowering informed choices.
            </p>
          </div>
          
          <div className="bg-muted/40 rounded-lg p-6 text-center hover:shadow-md transition-shadow">
            <div className="h-12 w-12 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="h-6 w-6 text-amber-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Innovation</h3>
            <p className="text-muted-foreground">
              We leverage technology to create better, more efficient ways to connect farms with consumers.
            </p>
          </div>
        </div>
      </div>
      
      {/* Our Story */}
      <div className="bg-muted/30 py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
            
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="md:w-32 flex-shrink-0 text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <span className="font-bold">2020</span>
                  </div>
                </div>
                <div className="border-l-2 border-primary/20 pl-6 pb-8">
                  <h3 className="text-xl font-bold mb-2">The Beginning</h3>
                  <p className="text-muted-foreground">
                    SmartFarm Direct was founded with a simple idea: what if we could make it easy for people to buy 
                    directly from local farms? Our journey began during the pandemic, when supply chain disruptions 
                    highlighted the importance of resilient local food systems.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4">
                <div className="md:w-32 flex-shrink-0 text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <span className="font-bold">2021</span>
                  </div>
                </div>
                <div className="border-l-2 border-primary/20 pl-6 pb-8">
                  <h3 className="text-xl font-bold mb-2">Growing Our Network</h3>
                  <p className="text-muted-foreground">
                    We expanded to work with dozens of farms across three states, building technology to handle 
                    complex logistics while maintaining the personal connection between farmers and customers.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4">
                <div className="md:w-32 flex-shrink-0 text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <span className="font-bold">2022</span>
                  </div>
                </div>
                <div className="border-l-2 border-primary/20 pl-6 pb-8">
                  <h3 className="text-xl font-bold mb-2">Expanding Our Vision</h3>
                  <p className="text-muted-foreground">
                    We introduced new features like carbon footprint tracking and farm-to-table subscription boxes, 
                    doubling our impact and helping more small farms thrive in a challenging market.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4">
                <div className="md:w-32 flex-shrink-0 text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <span className="font-bold">Today</span>
                  </div>
                </div>
                <div className="border-l-2 border-primary/20 pl-6">
                  <h3 className="text-xl font-bold mb-2">Making an Impact</h3>
                  <p className="text-muted-foreground">
                    Today, SmartFarm Direct connects hundreds of farms with thousands of customers, moving tons of fresh 
                    produce every month. We're just getting started on our mission to transform the food system.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* What Makes Us Different */}
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Makes Us Different</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            SmartFarm Direct isn't just another online marketplace. Here's what sets us apart.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center">
            <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <RefreshCw className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Direct Relationship</h3>
            <p className="text-muted-foreground">
              We facilitate direct connections between farmers and consumers, removing unnecessary middlemen.
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
              <Truck className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Optimized Logistics</h3>
            <p className="text-muted-foreground">
              Our smart logistics network ensures produce arrives fresh while minimizing environmental impact.
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="h-16 w-16 rounded-full bg-amber-100 flex items-center justify-center mb-4">
              <Award className="h-8 w-8 text-amber-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Quality Assurance</h3>
            <p className="text-muted-foreground">
              We carefully vet all farm partners to ensure they meet our standards for quality and sustainability.
            </p>
          </div>
        </div>
      </div>
      
      {/* Impact Metrics */}
      <div className="bg-gradient-to-r from-primary/10 to-blue-500/10 py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Together with our community, we're making a meaningful difference.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white shadow-sm rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-primary mb-2">250+</div>
              <div className="text-lg font-medium mb-1">Local Farms</div>
              <p className="text-sm text-muted-foreground">
                Independent farms supported through our platform
              </p>
            </div>
            
            <div className="bg-white shadow-sm rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-primary mb-2">40%</div>
              <div className="text-lg font-medium mb-1">Higher Income</div>
              <p className="text-sm text-muted-foreground">
                Average increase in farm revenue through direct sales
              </p>
            </div>
            
            <div className="bg-white shadow-sm rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-primary mb-2">75%</div>
              <div className="text-lg font-medium mb-1">Fewer Food Miles</div>
              <p className="text-sm text-muted-foreground">
                Reduction in transportation distance compared to traditional supply chains
              </p>
            </div>
            
            <div className="bg-white shadow-sm rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-primary mb-2">12K+</div>
              <div className="text-lg font-medium mb-1">Happy Customers</div>
              <p className="text-sm text-muted-foreground">
                Families enjoying fresher, more sustainable food
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA */}
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="bg-gradient-to-r from-primary/80 to-blue-600 text-white rounded-lg overflow-hidden">
          <div className="p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
            <p className="text-lg mb-6 max-w-3xl mx-auto">
              Whether you're a farmer looking to expand your reach or a consumer seeking fresh, 
              local food, SmartFarm Direct is here for you.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/marketplace">Shop Now</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-white/30 hover:bg-white/10" asChild>
                <Link to="/register">Become a Seller</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
