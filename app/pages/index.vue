<template>
  <div class="page-container">
    <AppHeroBanner />
    <div class="header-bar">
      <h2 class="section-title">Nuestros Productos</h2>
    </div>
    <div v-if="error" class="error-message">
      ⚠️ Error al cargar: {{ error.message }}
    </div>

    <ProductList v-else-if="products.length > 0" :products="products" @add-to-cart="handleAddToCart" />

    <div v-else class="status-message-wrapper">
      <div v-if="pending" class="loading-message">
        Cargando productos...
      </div>
      <div v-else class="info-message">
        No hay productos disponibles.
      </div>
    </div>

    <div v-if="!error && products.length > 0" class="pagination-footer">
      <button @click="loadMoreProducts" :disabled="pending" class="load-more-button">
        {{ pending ? 'Cargando...' : 'Cargar más productos' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useProductStore } from '~/store/products';
import { useCartStore } from '~/store/cart';
import { storeToRefs } from 'pinia';
import type { Product } from '~/types/Product';
import ProductList from '~/components/ProductList.vue';
import AppHeroBanner from '~/components/AppHeroBanner.vue';

const productStore = useProductStore();
const cartStore = useCartStore();

const { list: products } = storeToRefs(productStore);


const fetchProducts = () => {
  return productStore.getProducts(true);
};

const { pending, error } = await useAsyncData(
  'products-list',
  fetchProducts,
  { lazy: true }
);

function handleAddToCart(product: Product) {
  cartStore.addProduct(product);
}

function loadMoreProducts() {
  if (!pending.value) {
    productStore.getProducts(false);
  }
}
</script>

<style scoped>
.page-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.header-bar {
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #E5E7EB;
}

.section-title {
  font-size: 2rem;
  font-weight: 800;
  color: #111827;
  margin-bottom: 0;
  letter-spacing: -0.025em;
}

.loading-message,
.error-message,
.info-message {
  text-align: center;
  padding: 20px;
  font-size: 1.1rem;
  border-radius: 8px;
  margin-top: 30px;
  font-weight: 500;
}

.status-message-wrapper {
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.loading-message {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  column-gap: 10px;
  color: #4B5563;
}

.error-message {
  color: #DC2626;
  background-color: #FEF2F2;
  border: 1px solid #FCA5A5;
}

.info-message {
  color: #1D4ED8;
  background-color: #EFF6FF;
  border: 1px solid #BFDBFE;
}

.pagination-footer {
  display: flex;
  justify-content: center;
  padding: 3rem 0;
}

.load-more-button {
  background-color: #111827;
  color: white;
  border: none;
  padding: 14px 30px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  transition: background-color 0.2s;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.load-more-button:hover:not(:disabled) {
  background-color: #374151;
}

.load-more-button:disabled {
  background-color: #D1D5DB;
  color: #6B7280;
  cursor: not-allowed;
  box-shadow: none;
}

@media (min-width: 768px) {
  .section-title {
    font-size: 2.5rem;
  }
}
</style>