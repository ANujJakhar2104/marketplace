import { categories } from '../data/categories';
import { productById, products } from '../data/products';
import type { Category, Product } from '../types/product';

/**
 * Stand-in for a real HTTP client. Every method returns a Promise and can
 * reject, so screens exercise the same loading / error / retry paths they
 * would against a live 1Fi backend. Swap the bodies of these methods for
 * `fetch`/`axios` calls against the real Marketplace & EMI services when
 * they're available \u2014 nothing above this layer needs to change.
 */
const NETWORK_DELAY_MS = 550;

/** Small, intentional failure rate so loading and error states are both reachable in normal use, not just in theory. */
const SIMULATED_FAILURE_RATE = 0.08;

function withNetworkSimulation<T>(value: T, delayMs = NETWORK_DELAY_MS): Promise<T> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < SIMULATED_FAILURE_RATE) {
        reject(
          new Error('We couldn\u2019t reach the 1Fi Marketplace service. Please check your connection and try again.')
        );
        return;
      }
      resolve(value);
    }, delayMs);
  });
}

export const marketplaceApi = {
  getCategories(): Promise<Category[]> {
    return withNetworkSimulation(categories, 300);
  },

  getProducts(categoryId?: string): Promise<Product[]> {
    const filtered =
      !categoryId || categoryId === 'all'
        ? products
        : products.filter((product) => product.categoryId === categoryId);
    return withNetworkSimulation(filtered);
  },

  getProductById(id: string): Promise<Product | undefined> {
    return withNetworkSimulation(productById(id));
  },
};
