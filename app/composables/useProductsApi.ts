import type { Product } from '~/types/Product';

const BASE_URL = 'https://api.escuelajs.co/api/v1/products';

export const useProductsApi = () => {
  const getProductsList = async (offset: number, limit: number): Promise<Product[]> => {
    try {
      const url = `${BASE_URL}?offset=${offset}&limit=${limit}`;
      // Nuxt $fetch
      const response = await $fetch<Product[]>(url);
      return response;
    } catch (error) {
      console.error('Error fetching product list:', error);
      throw new Error('Could not load the product list.');
    }
  };

  const getProductById = async (id: number): Promise<Product> => {
    try {
      const url = `${BASE_URL}/${id}`;
      // Nuxt $fetch
      const response = await $fetch<Product>(url);
      return response;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw new Error('Product not found or network error.');
    }
  };

  const searchProductsByTitle = async (title: string): Promise<Product[]> => {
    try {
      if (!title) {
        return [];
      }
      const url = `${BASE_URL}?title=${encodeURIComponent(title)}`;
      // Nuxt $fetch
      const response = await $fetch<Product[]>(url);
      return response;
    } catch (error) {
      console.error(`Error searching products with title '${title}':`, error);
      throw new Error('Failed to search products.');
    }
  };

  return {
    getProductsList,
    getProductById,
    searchProductsByTitle
  };
};