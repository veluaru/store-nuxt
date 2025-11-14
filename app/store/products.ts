import { defineStore } from 'pinia';
import type { Product } from '~/types/Product';
import { useProductsApi } from '~/composables/useProductsApi';

interface ProductState {
  list: Product[];
  currentProduct: Product | null;
  isLoading: boolean;
  error: string | null;
  offset: number;
  limit: number;
  searchResults: Product[];
  isSearching: boolean;
  searchError: string | null;
}

export const useProductStore = defineStore('product', {
  state: (): ProductState => ({
    list: [],
    currentProduct: null,
    isLoading: false,
    error: null,
    offset: 0,
    limit: 10,
    searchResults: [],
    isSearching: false,
    searchError: null,
  }),

  actions: {
    async getProducts(reset: boolean = false): Promise<Product[]> {
      if (this.isLoading) {
        return this.list;
      }
      this.isLoading = true;
      this.error = null;
      let newProducts: Product[] = [];

      try {
        if (reset) {
          this.offset = 0;
          this.list = [];
        }
        const api = useProductsApi();
        newProducts = await api.getProductsList(this.offset, this.limit);
        if (newProducts.length === 0) {
          return this.list;
        }
        this.list.push(...newProducts);
        this.offset += this.limit;
        return this.list;

      } catch (e: any) {
        this.error = e.message || 'Error al cargar productos.';
        throw e;
      } finally {
        this.isLoading = false;
      }
    },

    async getProductById(id: number) {
      this.isLoading = true;
      this.error = null;
      this.currentProduct = null;
      try {
        const api = useProductsApi();
        const product = await api.getProductById(id);
        this.currentProduct = product;
      } catch (e: any) {
        this.error = e.message || 'Error al cargar producto.';
        this.currentProduct = null;
      } finally {
        this.isLoading = false;
      }
    },

    async searchProducts(query: string) {
      this.isSearching = true;
      this.searchError = null;
      this.searchResults = [];

      if (!query || query.trim() === '') {
        this.isSearching = false;
        return;
      }

      try {
        const api = useProductsApi();
        this.searchResults = await api.searchProductsByTitle(query.trim());
      } catch (e: any) {
        this.searchError = e.message || `Error al realizar la búsqueda para: "${query}"`;
      } finally {
        this.isSearching = false;
      }
    },
  },
});