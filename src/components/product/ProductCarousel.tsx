import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '@/types/product';
import ProductCard from './ProductCard';
import { Button } from '@/components/ui/button';

interface ProductCarouselProps {
  title: string;
  products: Product[];
  showCountdown?: boolean;
  variant?: 'default' | 'compact' | 'featured' | 'top100';
  viewAllLink?: string;
}

const ProductCarousel = ({ 
  title, 
  products, 
  showCountdown = false, 
  variant = 'default',
  viewAllLink 
}: ProductCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        <div className="flex items-center gap-4">
          {viewAllLink && (
            <a href={viewAllLink} className="text-sm text-foreground hover:text-accent transition-colors flex items-center gap-1">
              View all
              <ChevronRight className="h-4 w-4" />
            </a>
          )}
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-md border-border"
              onClick={() => scroll('left')}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-md border-border"
              onClick={() => scroll('right')}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="carousel-scroll"
      >
        {products.map((product) => (
          <div key={product.id} className="carousel-item">
            <ProductCard 
              product={product} 
              showCountdown={showCountdown}
              variant={variant}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductCarousel;
