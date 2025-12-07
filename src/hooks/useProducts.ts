import { useQuery } from '@tanstack/react-query';
import { Product } from '@/types/product';

const API_URL = 'https://6934573e4090fe3bf01fae47.mockapi.io/api/v1/products';

const enrichProduct = (product: Product, index: number): Product => {
  // Simulate discount for some products
  const hasDiscount = index % 3 === 0;
  const discountPercent = hasDiscount ? Math.floor(Math.random() * 30) + 10 : 0;
  const oldPrice = hasDiscount ? product.price * (1 + discountPercent / 100) : undefined;
  
  // Mark some products as new
  const isNew = index % 5 === 0;

  return {
    ...product,
    oldPrice: oldPrice ? Math.round(oldPrice * 100) / 100 : undefined,
    discountPercent: hasDiscount ? discountPercent : undefined,
    isNew,
  };
};

export const useProducts = () => {
  return useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      return data.map((product: Product, index: number) => enrichProduct(product, index));
    },
  });
};

export const useProduct = (id: string) => {
  return useQuery<Product>({
    queryKey: ['product', id],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }
      const data = await response.json();
      return enrichProduct(data, parseInt(id));
    },
  });
};

export const useDiscountProducts = () => {
  const { data: products, ...rest } = useProducts();
  const discountProducts = products?.filter(p => p.discountPercent && p.discountPercent > 0) || [];
  return { data: discountProducts, ...rest };
};

export const useNewArrivals = () => {
  const { data: products, ...rest } = useProducts();
  const newProducts = products?.filter(p => p.isNew) || [];
  return { data: newProducts, ...rest };
};

export const useTopRated = () => {
  const { data: products, ...rest } = useProducts();
  const topRated = products?.sort((a, b) => b.rating - a.rating).slice(0, 100) || [];
  return { data: topRated, ...rest };
};
