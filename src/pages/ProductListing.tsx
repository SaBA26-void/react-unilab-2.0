import { useState, useMemo } from "react";
import Layout from "@/components/layout/Layout";
import { useProducts } from "@/hooks/useProducts";
import ProductCard from "@/components/product/ProductCard";
import { FilterState } from "@/types/product";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import { Grid2X2, Search, ChevronDown, ChevronUp, Check } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Color mapping for display
const colorMap: Record<string, string> = {
  red: "#E53935",
  orange: "#FB8C00",
  yellow: "#FFD54F",
  green: "#43A047",
  blue: "#1E88E5",
  purple: "#8E24AA",
  pink: "#E91E63",
  black: "#212121",
  white: "#FAFAFA",
  grey: "#9E9E9E",
  brown: "#795548",
  multicolour:
    "linear-gradient(135deg, #E53935 25%, #1E88E5 25%, #1E88E5 50%, #43A047 50%, #43A047 75%, #FFD54F 75%)",
};

const ProductListing = () => {
  const { data: products, isLoading } = useProducts();
  const [brandSearch, setBrandSearch] = useState("");
  const [expandedSections, setExpandedSections] = useState({
    brand: true,
    model: true,
    style: true,
    color: true,
    size: true,
    price: true,
  });
  const [filters, setFilters] = useState<FilterState>({
    brands: [],
    colors: [],
    priceRange: { min: 0, max: 9999 },
    sizes: [],
    sortBy: "default",
  });

  // Extract unique values for filters
  const filterOptions = useMemo(() => {
    if (!products) return { brands: [], colors: [], sizes: [], categories: [] };

    const brands = [...new Set(products.map((p) => p.brand))];
    const colors = [...new Set(products.flatMap((p) => p.colors))];
    const sizes = ["2XS", "XS", "S", "M", "L", "XL", "2XL", "3XL"];
    const categories = [...new Set(products.map((p) => p.category))];

    return { brands, colors, sizes, categories };
  }, [products]);

  // Mock model/category counts
  const modelCounts = {
    Short: 60,
    "Mid-length": 10,
    Sweather: 56,
    "Party Dresses": 80,
    "Regular Fit": 100,
  };

  // Apply filters and sorting
  const filteredProducts = useMemo(() => {
    if (!products) return [];

    const result = products.filter((product) => {
      if (
        filters.brands.length > 0 &&
        !filters.brands.includes(product.brand)
      ) {
        return false;
      }
      if (
        filters.colors.length > 0 &&
        !product.colors.some((c) => filters.colors.includes(c))
      ) {
        return false;
      }
      if (
        filters.sizes.length > 0 &&
        !product.sizes.some((s) => filters.sizes.includes(s))
      ) {
        return false;
      }
      if (
        product.price < filters.priceRange.min ||
        product.price > filters.priceRange.max
      ) {
        return false;
      }
      return true;
    });

    switch (filters.sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
    }

    return result;
  }, [products, filters]);

  const toggleFilter = (type: "brands" | "colors" | "sizes", value: string) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter((v) => v !== value)
        : [...prev[type], value],
    }));
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const filteredBrands = filterOptions.brands.filter((brand) =>
    brand.toLowerCase().includes(brandSearch.toLowerCase())
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="text-sm mb-4">
          <span className="text-muted-foreground hover:text-foreground cursor-pointer">
            Homepage
          </span>
          <span className="mx-2 text-muted-foreground">&gt;</span>
          <span className="text-muted-foreground hover:text-foreground cursor-pointer">
            Women
          </span>
          <span className="mx-2 text-muted-foreground">&gt;</span>
          <span className="text-foreground font-medium">Clothes</span>
        </nav>

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-foreground">Women</h1>
            <span className="text-muted-foreground">
              {filteredProducts.length} items
            </span>
          </div>
          <Select
            value={filters.sortBy}
            onValueChange={(value) =>
              setFilters((prev) => ({
                ...prev,
                sortBy: value as FilterState["sortBy"],
              }))
            }
          >
            <SelectTrigger
              style={{ maxWidth: "150px" }}
              className="w-40 bg-foreground text-primary-foreground border-0"
            >
              <SelectValue placeholder="Sort by order" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Sort by order</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Best Rating</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className="w-56 flex-shrink-0 hidden lg:block">
            <div className="sticky top-32 space-y-6">
              {/* All Categories */}
              <div className="flex items-center gap-2 mb-4">
                <Grid2X2 className="h-5 w-5" />
                <span className="font-semibold">All Categories</span>
              </div>

              {/* Brand Filter */}
              <div className="border-b border-border pb-4">
                <button
                  className="flex items-center justify-between w-full mb-3"
                  onClick={() => toggleSection("brand")}
                >
                  <h3 className="font-semibold text-sm uppercase tracking-wide">
                    Brand
                  </h3>
                  {expandedSections.brand ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>
                {expandedSections.brand && (
                  <>
                    <div className="relative mb-3">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search"
                        value={brandSearch}
                        onChange={(e) => setBrandSearch(e.target.value)}
                        className="pl-9 h-9 text-sm"
                      />
                    </div>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {filteredBrands.slice(0, 8).map((brand) => (
                        <label
                          key={brand}
                          className="flex items-center gap-2 cursor-pointer text-sm"
                        >
                          <Checkbox
                            checked={filters.brands.includes(brand)}
                            onCheckedChange={() =>
                              toggleFilter("brands", brand)
                            }
                            className="h-4 w-4"
                          />
                          <span className="text-muted-foreground">{brand}</span>
                        </label>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Model Filter */}
              <div className="border-b border-border pb-4">
                <button
                  className="flex items-center justify-between w-full mb-3"
                  onClick={() => toggleSection("model")}
                >
                  <h3 className="font-semibold text-sm uppercase tracking-wide">
                    Model
                  </h3>
                  {expandedSections.model ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>
                {expandedSections.model && (
                  <div className="space-y-2">
                    {Object.entries(modelCounts).map(([model, count]) => (
                      <div
                        key={model}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-muted-foreground">{model}</span>
                        <span className="text-muted-foreground">{count}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Style Filter */}
              <div className="border-b border-border pb-4">
                <button
                  className="flex items-center justify-between w-full mb-3"
                  onClick={() => toggleSection("style")}
                >
                  <h3 className="font-semibold text-sm uppercase tracking-wide">
                    Style
                  </h3>
                  {expandedSections.style ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>
                {expandedSections.style && (
                  <div className="space-y-2">
                    {[
                      "Casual",
                      "Business casual",
                      "Bohemian",
                      "Minimalist",
                    ].map((style) => (
                      <label
                        key={style}
                        className="flex items-center gap-2 cursor-pointer text-sm"
                      >
                        <Checkbox className="h-4 w-4" />
                        <span className="text-muted-foreground">{style}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Color Filter */}
              <div className="border-b border-border pb-4">
                <button
                  className="flex items-center justify-between w-full mb-3"
                  onClick={() => toggleSection("color")}
                >
                  <h3 className="font-semibold text-sm uppercase tracking-wide">
                    Color
                  </h3>
                  {expandedSections.color ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>
                {expandedSections.color && (
                  <div className="flex flex-wrap gap-2">
                    {filterOptions.colors.map((color) => {
                      const colorStyle =
                        colorMap[color.toLowerCase()] || "#ccc";
                      const isGradient = colorStyle.includes("gradient");
                      const isSelected = filters.colors.includes(color);

                      return (
                        <Tooltip key={color}>
                          <TooltipTrigger asChild>
                            <button
                              onClick={() => toggleFilter("colors", color)}
                              className={`w-7 h-7 rounded-full border-2 transition-all flex items-center justify-center ${
                                isSelected
                                  ? "border-foreground scale-110"
                                  : "border-transparent hover:scale-105"
                              }`}
                              style={{
                                background: isGradient
                                  ? colorStyle
                                  : colorStyle,
                              }}
                            >
                              {isSelected && (
                                <Check
                                  className={`h-3.5 w-3.5 ${
                                    color.toLowerCase() === "white" ||
                                    color.toLowerCase() === "yellow"
                                      ? "text-foreground"
                                      : "text-white"
                                  }`}
                                />
                              )}
                            </button>
                          </TooltipTrigger>
                          <TooltipContent className="bg-foreground text-primary-foreground text-xs">
                            {color.charAt(0).toUpperCase() + color.slice(1)}
                          </TooltipContent>
                        </Tooltip>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Size Filter */}
              <div className="border-b border-border pb-4">
                <button
                  className="flex items-center justify-between w-full mb-3"
                  onClick={() => toggleSection("size")}
                >
                  <h3 className="font-semibold text-sm uppercase tracking-wide">
                    Size
                  </h3>
                  {expandedSections.size ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>
                {expandedSections.size && (
                  <div className="flex flex-wrap gap-2">
                    {filterOptions.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => toggleFilter("sizes", size)}
                        className={`w-10 h-10 text-xs font-medium rounded-full border transition-colors ${
                          filters.sizes.includes(size)
                            ? "bg-foreground text-primary-foreground border-foreground"
                            : "border-border hover:border-foreground text-muted-foreground"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Price Range */}
              <div>
                <button
                  className="flex items-center justify-between w-full mb-3"
                  onClick={() => toggleSection("price")}
                >
                  <h3 className="font-semibold text-sm uppercase tracking-wide">
                    Price
                  </h3>
                  {expandedSections.price ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>
                {expandedSections.price && (
                  <>
                    <div className="flex gap-2 items-center mb-4">
                      <div className="flex-1 relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                          $
                        </span>
                        <Input
                          type="number"
                          value={filters.priceRange.min}
                          onChange={(e) =>
                            setFilters((prev) => ({
                              ...prev,
                              priceRange: {
                                ...prev.priceRange,
                                min: Number(e.target.value) || 0,
                              },
                            }))
                          }
                          className="pl-7 h-9 text-sm"
                        />
                      </div>
                      <span className="text-muted-foreground">—</span>
                      <div className="flex-1 relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                          $
                        </span>
                        <Input
                          type="number"
                          value={filters.priceRange.max}
                          onChange={(e) =>
                            setFilters((prev) => ({
                              ...prev,
                              priceRange: {
                                ...prev.priceRange,
                                max: Number(e.target.value) || 500,
                              },
                            }))
                          }
                          className="pl-7 h-9 text-sm"
                        />
                      </div>
                    </div>
                    <Slider
                      value={[filters.priceRange.min, filters.priceRange.max]}
                      min={0}
                      max={500}
                      step={10}
                      onValueChange={([min, max]) =>
                        setFilters((prev) => ({
                          ...prev,
                          priceRange: { min, max },
                        }))
                      }
                      className="mb-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Minimum $200</span>
                      <span>Maximum $500</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-4">
                      {filteredProducts.length} products found
                    </p>
                  </>
                )}
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[...Array(9)].map((_, i) => (
                  <div key={i}>
                    <Skeleton className="aspect-[3/4] rounded-xl mb-3" />
                    <Skeleton className="h-4 w-20 mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    variant="top100"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductListing;
