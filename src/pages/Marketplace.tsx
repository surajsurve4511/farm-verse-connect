
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Leaf } from "lucide-react";
import { ProductCard } from "@/components/marketplace/ProductCard";
import { ProductFilters } from "@/components/marketplace/ProductFilters";

export default function Marketplace() {
  const [searchTerm, setSearchTerm] = useState("");
  
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with the new image */}
      <section className="relative h-[500px] overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <img
          src="/lovable-uploads/e08c4bdd-30e7-4a95-81f9-9f80a0f9fcf2.png"
          alt="Fresh produce display"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 container mx-auto px-4 flex flex-col justify-center items-center text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Farm Fresh Marketplace
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl">
            Browse our selection of fresh, locally sourced produce delivered directly from farms to your table
          </p>
          <div className="w-full max-w-2xl relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for fresh fruits, vegetables, dairy..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-6 text-lg bg-white/95 text-black"
            />
            <Button className="absolute right-1 top-1/2 -translate-y-1/2">
              Search
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Sidebar */}
          <aside className="w-full md:w-64 shrink-0">
            <ProductFilters />
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Available Products</h2>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Sort by
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <ProductCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
