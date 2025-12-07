import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useProduct, useProducts } from '@/hooks/useProducts';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, Minus, Plus, ChevronRight, ShoppingCart } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, error } = useProduct(id || '');
  const { data: relatedProducts } = useProducts();
  const { addToCart } = useCart();
  
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(2);
  const [selectedImage, setSelectedImage] = useState(0);

  const getSizePrice = () => {
    if (!product) return 0;
    const sizeIndex = product.sizes.indexOf(selectedSize);
    return product.price + (sizeIndex > 1 ? sizeIndex * 2 : 0);
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    if (!selectedSize) {
      toast({ title: 'Please select a size', variant: 'destructive' });
      return;
    }
    
    const color = selectedColor || product.colors[0] || 'default';
    addToCart({ ...product, price: getSizePrice() }, selectedSize, color, quantity);
    toast({ 
      title: 'Added to cart!',
      description: `${product.title} has been added to your cart.`
    });
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-2 gap-12">
            <Skeleton className="aspect-[3/4] rounded-lg" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Link to="/women" className="text-accent hover:underline">
            Back to products
          </Link>
        </div>
      </Layout>
    );
  }

  const placeholderImage = 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop';
  const images = product.images?.length > 0 ? product.images : [placeholderImage, placeholderImage, placeholderImage, placeholderImage];
  const colorOptions = ['#8B4513', '#228B22', '#87CEEB', '#FFD700'];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="text-sm mb-6 flex items-center gap-2">
          <Link to="/" className="text-muted-foreground hover:text-foreground">Homepage</Link>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <Link to="/women" className="text-muted-foreground hover:text-foreground">Women</Link>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <Link to="/women" className="text-muted-foreground hover:text-foreground">Clothes</Link>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <span className="text-foreground font-medium">{product.brand}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="flex gap-4">
            {/* Thumbnails */}
            <div className="flex flex-col gap-2 w-20">
              {images.slice(0, 4).map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-md overflow-hidden bg-secondary border-2 transition-colors ${
                    selectedImage === index ? 'border-accent' : 'border-transparent'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = placeholderImage;
                    }}
                  />
                </button>
              ))}
            </div>
            
            {/* Main Image */}
            <div className="flex-1 aspect-[3/4] rounded-lg overflow-hidden bg-secondary">
              <img
                src={images[selectedImage] || placeholderImage}
                alt={product.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = placeholderImage;
                }}
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-5">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-xl font-bold text-foreground uppercase mb-2">{product.title}</h1>
                <p className="text-2xl font-bold text-foreground">${product.price.toFixed(2)}</p>
              </div>
              <button className="p-2 border border-border rounded-full hover:bg-secondary transition-colors">
                <Heart className="h-5 w-5 text-foreground" />
              </button>
            </div>

            {/* Size Selector */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-foreground">Size</h3>
                <a href="#" className="text-sm text-accent hover:underline">Size guideline</a>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-10 border rounded-md transition-colors text-sm font-medium ${
                      selectedSize === size
                        ? 'bg-foreground text-background border-foreground'
                        : 'border-border text-foreground hover:border-foreground'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selector */}
            <div>
              <h3 className="font-medium text-foreground mb-3">Color</h3>
              <div className="flex flex-wrap gap-2">
                {colorOptions.map((color, index) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(product.colors[index] || color)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      selectedColor === (product.colors[index] || color)
                        ? 'border-foreground scale-110'
                        : 'border-transparent'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Shipping */}
            <div>
              <h3 className="font-medium text-foreground mb-2">Shipping</h3>
              <p className="text-sm text-muted-foreground">
                Free Shipping to Victoria territory
                <br />
                <span className="text-xs">Delivery Time: 14-17 days</span>
              </p>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-medium text-foreground mb-3">Quantity</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-border rounded-md">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-secondary transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-secondary transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <span className="text-sm text-muted-foreground">50 available / 104 sold</span>
              </div>
            </div>

            {/* Total Price */}
            <div className="bg-secondary p-4 rounded-lg">
              <p className="text-2xl font-bold text-foreground">${(getSizePrice() * quantity).toFixed(2)}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Add shipping insurance for $9 <span className="text-accent">(declared value, only if the package gets lost, stolen or damaged)</span>
              </p>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-4">
              <Button className="bg-success hover:bg-success/90 text-primary-foreground py-6">
                SHOP NOW
              </Button>
              <Button 
                variant="outline" 
                onClick={handleAddToCart}
                className="py-6 border-foreground text-foreground hover:bg-secondary"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                ADD TO BASKET
              </Button>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="border-b border-border w-full justify-start rounded-none bg-transparent p-0">
              <TabsTrigger 
                value="details" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent px-6 py-3"
              >
                PRODUCT DETAILS
              </TabsTrigger>
              <TabsTrigger 
                value="reviews" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent px-6 py-3"
              >
                REVIEWS (5)
              </TabsTrigger>
              <TabsTrigger 
                value="shipping" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent px-6 py-3"
              >
                SHIPPING & PAYMENT
              </TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="pt-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold mb-4">Product Description</h3>
                  <p className="text-muted-foreground text-sm mb-6">{product.short_description}</p>
                  
                  <h4 className="font-semibold mb-3">Product Description</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Length | Regular</li>
                    <li>• Pattern | Floral</li>
                    <li>• Size | 38</li>
                    <li>• Fit | Regular fit</li>
                    <li>• Age group | Adult</li>
                    <li>• Leg opening | Wide leg</li>
                    <li>• Sleeve length | Long sleeve</li>
                    <li>• Package contents | 2 pcs</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-4">Composition</h3>
                  <p className="text-muted-foreground text-sm mb-4">{product.long_description}</p>
                  <p className="text-sm text-muted-foreground mb-6">OUTER SHELL: 90% cotton 10% linen</p>
                  
                  <h4 className="font-semibold mb-3">Care instructions</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>🧺 Machine wash at max. 30°C/86°F with short spin cycle</li>
                    <li>🔥 Iron at a maximum of 110°C/230°F</li>
                    <li>⛔ Do not dry clean</li>
                    <li>⛔ Do not tumble dry</li>
                    <li>📦 Wash inside out</li>
                    <li>🧴 Wash separately</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="pt-6">
              <p className="text-muted-foreground">No reviews yet.</p>
            </TabsContent>
            <TabsContent value="shipping" className="pt-6">
              <p className="text-muted-foreground">Free shipping on orders over $50. Standard delivery 14-17 business days.</p>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts && relatedProducts.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-foreground">YOU MIGHT ALSO LIKE</h2>
              <div className="flex gap-2">
                <button className="p-2 border border-border rounded hover:bg-secondary">←</button>
                <button className="p-2 border border-border rounded hover:bg-secondary">→</button>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.slice(0, 4).map((item) => (
                <Link key={item.id} to={`/product/${item.id}`} className="group">
                  <div className="aspect-square bg-secondary rounded-lg overflow-hidden mb-2">
                    <img 
                      src={item.images?.[0] || placeholderImage} 
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = placeholderImage;
                      }}
                    />
                  </div>
                  <p className="font-semibold text-sm uppercase">{item.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-accent font-bold">${(item.price * 0.7).toFixed(2)}</span>
                    <span className="text-muted-foreground text-sm line-through">${item.price.toFixed(2)}</span>
                    <span className="text-xs bg-destructive text-primary-foreground px-1 rounded">-40%</span>
                  </div>
                  <button className="mt-2 border border-border px-4 py-1 text-sm hover:bg-secondary transition-colors">
                    ${Math.floor(item.price * 0.5)} Add to cart
                  </button>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetail;
