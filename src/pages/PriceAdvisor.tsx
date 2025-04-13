
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { LineChart, BarChart3, History, TrendingUp, TrendingDown, DollarSign, Scale, ArrowRight } from "lucide-react";

export default function PriceAdvisor() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [currentPrice, setCurrentPrice] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  
  const handleAnalyze = () => {
    setIsAnalyzing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 1500);
  };
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Price Advisor</h1>
          <p className="text-muted-foreground">
            Get data-driven price recommendations for your products
          </p>
        </div>
        
        <Button variant="outline">View Price History</Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Product Selection</CardTitle>
              <CardDescription>
                Select a product to analyze pricing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="category">Product Category</Label>
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vegetables">Vegetables</SelectItem>
                    <SelectItem value="fruits">Fruits</SelectItem>
                    <SelectItem value="meat">Meat</SelectItem>
                    <SelectItem value="dairy">Dairy</SelectItem>
                    <SelectItem value="eggs">Eggs</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="product">Product</Label>
                <Select
                  value={selectedProduct}
                  onValueChange={setSelectedProduct}
                  disabled={!selectedCategory}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={selectedCategory ? "Select product" : "Select category first"} />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedCategory === "vegetables" && (
                      <>
                        <SelectItem value="tomatoes">Tomatoes</SelectItem>
                        <SelectItem value="carrots">Carrots</SelectItem>
                        <SelectItem value="lettuce">Lettuce</SelectItem>
                        <SelectItem value="peppers">Peppers</SelectItem>
                      </>
                    )}
                    {selectedCategory === "fruits" && (
                      <>
                        <SelectItem value="apples">Apples</SelectItem>
                        <SelectItem value="strawberries">Strawberries</SelectItem>
                        <SelectItem value="blueberries">Blueberries</SelectItem>
                      </>
                    )}
                    {selectedCategory === "meat" && (
                      <>
                        <SelectItem value="beef">Beef</SelectItem>
                        <SelectItem value="chicken">Chicken</SelectItem>
                        <SelectItem value="pork">Pork</SelectItem>
                      </>
                    )}
                    {selectedCategory === "dairy" && (
                      <>
                        <SelectItem value="milk">Milk</SelectItem>
                        <SelectItem value="cheese">Cheese</SelectItem>
                        <SelectItem value="yogurt">Yogurt</SelectItem>
                      </>
                    )}
                    {selectedCategory === "eggs" && (
                      <>
                        <SelectItem value="chicken-eggs">Chicken Eggs</SelectItem>
                        <SelectItem value="duck-eggs">Duck Eggs</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="current-price">Current Price (per unit)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                  <Input
                    id="current-price"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    className="pl-7"
                    value={currentPrice}
                    onChange={(e) => setCurrentPrice(e.target.value)}
                    disabled={!selectedProduct}
                  />
                </div>
              </div>
              
              <Button 
                className="w-full" 
                onClick={handleAnalyze}
                disabled={!selectedProduct || !currentPrice || isAnalyzing}
              >
                {isAnalyzing ? "Analyzing..." : "Analyze Price"}
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Price Factors</CardTitle>
              <CardDescription>
                Factors that influence pricing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Seasonality</span>
                  <span className="text-sm">High impact</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-4/5 rounded-full"></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Local Competition</span>
                  <span className="text-sm">Medium impact</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-3/5 rounded-full"></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Production Costs</span>
                  <span className="text-sm">Medium impact</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-3/5 rounded-full"></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Consumer Demand</span>
                  <span className="text-sm">High impact</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-4/5 rounded-full"></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Market Trends</span>
                  <span className="text-sm">Low impact</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-2/5 rounded-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-2 space-y-6">
          {!showResults ? (
            <Card className="h-full flex items-center justify-center p-6">
              <div className="text-center space-y-4">
                <div className="h-20 w-20 bg-muted rounded-full flex items-center justify-center mx-auto">
                  <BarChart3 className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold">Price Analysis</h3>
                <p className="text-muted-foreground">
                  Select a product and click "Analyze Price" to get pricing recommendations based on market data.
                </p>
              </div>
            </Card>
          ) : (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Price Analysis for {selectedProduct}</CardTitle>
                  <CardDescription>
                    Based on market data and seasonal trends
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-muted/30 rounded-lg p-4 text-center">
                      <div className="text-sm text-muted-foreground mb-1">Current Price</div>
                      <div className="text-2xl font-bold">${currentPrice}</div>
                    </div>
                    
                    <div className="bg-green-50 text-green-900 dark:bg-green-900/20 dark:text-green-400 rounded-lg p-4 text-center">
                      <div className="text-sm mb-1">Recommended Price</div>
                      <div className="text-2xl font-bold">${(parseFloat(currentPrice) * 1.12).toFixed(2)}</div>
                    </div>
                    
                    <div className="bg-blue-50 text-blue-900 dark:bg-blue-900/20 dark:text-blue-400 rounded-lg p-4 text-center">
                      <div className="text-sm mb-1">Market Average</div>
                      <div className="text-2xl font-bold">${(parseFloat(currentPrice) * 1.05).toFixed(2)}</div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-bold mb-2 flex items-center">
                        <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                        Price Opportunity
                      </h3>
                      <p className="text-muted-foreground mb-2">
                        Our analysis indicates that you could increase your price by approximately 12% without 
                        negatively impacting sales volume. This is primarily due to:
                      </p>
                      <ul className="space-y-1 list-disc pl-5 text-muted-foreground">
                        <li>Seasonal scarcity driving up market prices</li>
                        <li>Limited local competition in your area</li>
                        <li>Strong customer demand for organic products</li>
                      </ul>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="font-bold mb-2 flex items-center">
                        <History className="h-5 w-5 mr-2 text-blue-600" />
                        Market Trends
                      </h3>
                      <div className="h-60 flex items-center justify-center bg-muted rounded-md">
                        <LineChart className="h-8 w-8 text-muted-foreground" />
                        <span className="ml-2 text-muted-foreground">Price Trend Chart Placeholder</span>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-bold mb-2 flex items-center">
                          <DollarSign className="h-5 w-5 mr-2 text-amber-600" />
                          Revenue Impact
                        </h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">At current price:</span>
                            <span className="font-medium">${(parseFloat(currentPrice) * 100).toFixed(2)}/month</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">At recommended price:</span>
                            <span className="font-medium">${(parseFloat(currentPrice) * 1.12 * 100).toFixed(2)}/month</span>
                          </div>
                          <div className="flex justify-between text-green-600">
                            <span>Potential increase:</span>
                            <span className="font-medium">${(parseFloat(currentPrice) * 0.12 * 100).toFixed(2)}/month</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-bold mb-2 flex items-center">
                          <Scale className="h-5 w-5 mr-2 text-indigo-600" />
                          Price Elasticity
                        </h3>
                        <p className="text-muted-foreground">
                          Your product has relatively low price elasticity, meaning customers are less sensitive 
                          to price changes. A price increase is unlikely to significantly reduce sales volume.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Competitor Pricing</CardTitle>
                  <CardDescription>
                    How your prices compare to competitors
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-5 gap-2 text-sm font-medium text-muted-foreground border-b pb-2">
                      <div className="col-span-2">Competitor</div>
                      <div className="text-center">Price</div>
                      <div className="text-center">Difference</div>
                      <div className="text-right">Quality</div>
                    </div>
                    
                    <div className="grid grid-cols-5 gap-2 items-center">
                      <div className="col-span-2">
                        <div className="font-medium">Green Valley Farm</div>
                        <div className="text-sm text-muted-foreground">8 miles away</div>
                      </div>
                      <div className="text-center">
                        ${(parseFloat(currentPrice) * 1.15).toFixed(2)}
                      </div>
                      <div className="text-center text-red-600">
                        +15%
                      </div>
                      <div className="text-right">
                        <div className="flex items-center justify-end">
                          <div className="flex">
                            {[1, 2, 3, 4].map(star => (
                              <svg
                                key={star}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="h-4 w-4 text-amber-500"
                              >
                                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" />
                              </svg>
                            ))}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="h-4 w-4 text-muted"
                            >
                              <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-5 gap-2 items-center">
                      <div className="col-span-2">
                        <div className="font-medium">Sunshine Organics</div>
                        <div className="text-sm text-muted-foreground">15 miles away</div>
                      </div>
                      <div className="text-center">
                        ${(parseFloat(currentPrice) * 0.95).toFixed(2)}
                      </div>
                      <div className="text-center text-green-600">
                        -5%
                      </div>
                      <div className="text-right">
                        <div className="flex items-center justify-end">
                          <div className="flex">
                            {[1, 2, 3].map(star => (
                              <svg
                                key={star}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="h-4 w-4 text-amber-500"
                              >
                                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" />
                              </svg>
                            ))}
                            {[1, 2].map(star => (
                              <svg
                                key={star}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="h-4 w-4 text-muted"
                              >
                                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-5 gap-2 items-center">
                      <div className="col-span-2">
                        <div className="font-medium">Riverside Farm</div>
                        <div className="text-sm text-muted-foreground">20 miles away</div>
                      </div>
                      <div className="text-center">
                        ${(parseFloat(currentPrice) * 1.08).toFixed(2)}
                      </div>
                      <div className="text-center text-red-600">
                        +8%
                      </div>
                      <div className="text-right">
                        <div className="flex items-center justify-end">
                          <div className="flex">
                            {[1, 2, 3, 4].map(star => (
                              <svg
                                key={star}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="h-4 w-4 text-amber-500"
                              >
                                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" />
                              </svg>
                            ))}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="h-4 w-4 text-muted"
                            >
                              <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
