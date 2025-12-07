import Layout from '@/components/layout/Layout';
import HeroBanner from '@/components/home/HeroBanner';
import ProductCarousel from '@/components/product/ProductCarousel';
import PromoBanners from '@/components/home/PromoBanners';
import { useDiscountProducts, useNewArrivals, useTopRated } from '@/hooks/useProducts';
import { Skeleton } from '@/components/ui/skeleton';

const Index = () => {
  const { data: discountProducts, isLoading: discountLoading } = useDiscountProducts();
  const { data: newArrivals, isLoading: newLoading } = useNewArrivals();
  const { data: topRated, isLoading: topLoading } = useTopRated();

  const isLoading = discountLoading || newLoading || topLoading;

  return (
    <Layout>
      <HeroBanner />
      
      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="py-8">
            <Skeleton className="h-8 w-48 mb-6" />
            <div className="flex gap-6 overflow-hidden">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex-shrink-0 w-[260px]">
                  <Skeleton className="aspect-square rounded-lg mb-3" />
                  <Skeleton className="h-4 w-20 mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-24" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            <ProductCarousel
              title="Flash Sales"
              products={discountProducts || []}
              showCountdown
              viewAllLink="/women"
            />

            <ProductCarousel
              title="Trending must-haves"
              products={newArrivals || []}
              variant="featured"
              viewAllLink="/women"
            />

            <ProductCarousel
              title="Top100"
              products={topRated?.slice(0, 20) || []}
              variant="top100"
              viewAllLink="/women"
            />

            <PromoBanners />
          </>
        )}
      </div>
    </Layout>
  );
};

export default Index;
