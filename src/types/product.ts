export interface Product {
  id: string;
  category: string;
  brand: string;
  title: string;
  short_description: string;
  long_description: string;
  price: number;
  rating: number;
  sizes: string[];
  colors: string[];
  images: string[];
  // Simulated fields for discount display
  oldPrice?: number;
  discountPercent?: number;
  isNew?: boolean;
}

export interface User {
  name: string;
  email: string;
  comment: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface FilterState {
  brands: string[];
  colors: string[];
  priceRange: { min: number; max: number };
  sizes: string[];
  sortBy: 'default' | 'price-low' | 'price-high' | 'rating';
}
