import { useQuery } from '@tanstack/react-query';

import { marketplaceApi } from '../services/marketplaceApi';

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: marketplaceApi.getCategories,
    staleTime: Infinity, // reference data, doesn't change during a session
  });
}

export function useProducts(categoryId: string) {
  return useQuery({
    queryKey: ['products', categoryId],
    queryFn: () => marketplaceApi.getProducts(categoryId),
  });
}

export function useProductDetail(productId: string) {
  return useQuery({
    queryKey: ['product', productId],
    queryFn: () => marketplaceApi.getProductById(productId),
    enabled: Boolean(productId),
  });
}
