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
      console.error('Error consultando la lista de productos:', error);
      throw new Error('No se pudo cargar el listado de productos.');
    }
  };

  const getProductById = async (id: number): Promise<Product> => {
    try {
      const url = `${BASE_URL}/${id}`;
      // Nuxt $fetch
      const response = await $fetch<Product>(url);
      return response;
    } catch (error) {
      console.error(`Error consultando el producto:`, error);
      throw new Error('Producto no encontrado o error de red.');
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
      console.error(`Error buscando productos con el título '${title}':`, error);
      throw new Error('Error al realizar la búsqueda de productos.');
    }
  };

  return {
    getProductsList,
    getProductById,
    searchProductsByTitle
  };
};