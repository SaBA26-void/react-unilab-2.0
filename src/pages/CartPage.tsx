import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useCart } from '@/context/CartContext';
import { useProducts } from '@/hooks/useProducts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Minus, Plus, Trash2, ShoppingBag, Lock } from 'lucide-react';

const CartPage = () => {
  const { state, updateQuantity, removeFromCart } = useCart();
  const { data: relatedProducts } = useProducts();
  const placeholderImage = 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=200&h=250&fit=crop';

  if (state.items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="h-12 w-12 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link to="/women">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const subtotal = state.total;
  const shipping = 0;
  const tax = 0;
  const giftBox = 10.90;
  const total = subtotal + shipping + tax + giftBox;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">
          Card <span className="text-muted-foreground font-normal text-lg">{state.items.length}</span>
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {state.items.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                  className="flex items-center gap-4 py-4 border-b border-border"
                >
                  {/* Product Image */}
                  <div className="w-20 h-24 rounded-md overflow-hidden bg-secondary flex-shrink-0">
                    <img
                      src={item.product.images?.[0] || placeholderImage}
                      alt={item.product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/product/${item.product.id}`}
                      className="font-medium hover:text-accent transition-colors"
                    >
                      {item.product.title}- Regular fit
                    </Link>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                      Color: 
                      <span 
                        className="w-3 h-3 rounded-full inline-block"
                        style={{ backgroundColor: item.selectedColor === 'multicolour' ? '#FFD700' : item.selectedColor }}
                      />
                    </p>
                  </div>

                  {/* Price */}
                  <div className="text-right w-20">
                    <p className="font-medium">${item.product.price.toFixed(2)}</p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center border border-border rounded-md">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity - 1)}
                      className="p-2 hover:bg-secondary transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-10 text-center font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity + 1)}
                      className="p-2 hover:bg-secondary transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Line Total */}
                  <div className="text-right w-20">
                    <p className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</p>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.product.id, item.selectedSize, item.selectedColor)}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-lg p-6 border border-border">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Price</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>${shipping.toFixed(0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${tax.toFixed(0)}</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-muted-foreground">Discount Price</span>
                  <div className="text-right">
                    <p className="text-destructive text-xs">⚠ You must log in to use the discount code</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="giftbox" />
                  <label htmlFor="giftbox" className="text-sm">Pack in a Gift Box</label>
                  <span className="ml-auto">${giftBox.toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t border-border my-4" />

              <div className="flex justify-between font-semibold text-lg mb-6">
                <span>Total Price</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 mb-4">
                <Lock className="h-4 w-4 mr-2" />
                CHECKOUT
              </Button>

              {/* Coupon Code */}
              <div className="flex gap-2">
                <Input 
                  placeholder="Enter coupon code" 
                  className="flex-1"
                />
                <Button variant="outline" className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs px-4">
                  Login and Apply code
                </Button>
              </div>
            </div>
          </div>
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

export default CartPage;
