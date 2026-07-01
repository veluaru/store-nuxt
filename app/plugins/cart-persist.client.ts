import { useCartStore } from '~/store/cart';

const CART_STORAGE_KEY = 'tushop-cart';

export default defineNuxtPlugin((nuxtApp) => {
  const cartStore = useCartStore();

  // Restore after hydration so SSR and client initial render match
  nuxtApp.hook('app:mounted', () => {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    if (saved) {
      try {
        cartStore.items = JSON.parse(saved);
      } catch {
        localStorage.removeItem(CART_STORAGE_KEY);
      }
    }
  });

  cartStore.$subscribe(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartStore.items));
  });
});
