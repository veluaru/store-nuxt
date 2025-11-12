import { defineStore } from 'pinia';
import type { Product } from '~/types/Product';

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

export const useCartStore = defineStore('cart', {
  state: (): CartState => ({
    items: [],
  }),
  getters: {
    totalItems: (state): number => {
      return state.items.reduce((total, item) => total + item.quantity, 0);
    },
    totalPrice: (state): number => {
      const total = state.items.reduce((total, item) => {
        return total + (item.price * item.quantity);
      }, 0);
      return parseFloat(total.toFixed(2));
    },
  },
  actions: {
    addProduct(product: Product) {
      const existingItem = this.items.find(item => item.id === product.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.items.push({ ...product, quantity: 1 });
      }
    },
    removeProduct(productId: number) {
      this.items = this.items.filter(item => item.id !== productId);
    },
  },
});