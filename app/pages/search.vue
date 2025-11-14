<template>
  <div class="search-page-container">
    <div class="search-page-container__header-bar">
      <NuxtLink to="/" class="search-page-container__back-button">
        <i class="fa-solid fa-arrow-left"></i> Volver al Inicio
      </NuxtLink>
      
      <h1 class="search-page-container__section-title">
        Resultados para: "<span class="search-query">{{ currentQuery }}</span>"
      </h1>
    </div>

    <div v-if="error" class="search-page-container__error-message">
      ⚠️ Error en la búsqueda: {{ error.message }}
    </div>

    <div v-else-if="pending" class="search-page-container__status-message-wrapper">
      <LoadingSpinner />
      <p>Buscando productos...</p>
    </div>

    <ProductList 
      v-else-if="products.length > 0" 
      :products="products" 
      @add-to-cart="handleAddToCart" 
    />

    <div v-else class="search-page-container__status-message-wrapper">
      <div class="search-page-container__info-message">
        No se encontraron productos que coincidan con "{{ currentQuery }}". Intenta otra palabra clave.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useProductsApi } from '~/composables/useProductsApi';
import { useCartStore } from '~/store/cart';
import type { Product } from '~/types/Product';
import ProductList from '~/components/ProductList.vue';
import LoadingSpinner from '~/components/LoadingSpinner.vue';

const route = useRoute();
const productsApi = useProductsApi();
const cartStore = useCartStore();

const products = ref<Product[]>([]);
const pending = ref(false);
const error = ref<Error | null>(null);
const currentQuery = computed(() => route.query.title as string || '');

const searchProducts = async (title: string) => {
  if (!title) {
    products.value = [];
    return;
  }
  pending.value = true;
  error.value = null;

  try {
    products.value = await productsApi.searchProductsByTitle(title);
  } catch (e: any) {
    error.value = e;
    products.value = [];
  } finally {
    pending.value = false;
  }
};

// 3. Observar cambios en el parámetro de la URL
watch(currentQuery, (newQuery) => {
  if (newQuery) {
    searchProducts(newQuery);
  } else {
    products.value = [];
  }
}, { immediate: true });


function handleAddToCart(product: Product) {
  cartStore.addProduct(product);
}
</script>

<style scoped lang="scss">
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css');

.search-page-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem 1.5rem;

  &__header-bar {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 2rem;
    padding-bottom: 15px;
    border-bottom: 2px solid #F3F4F6;
  }
  &__back-button {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    color: #4B5563;
    font-weight: 500;
    transition: color 0.2s;
    font-size: 1rem;

    &:hover {
      color: #111827;
    }
  }
  &__section-title {
    font-size: 2rem;
    font-weight: 800;
    color: #111827;
    margin: 0;
    letter-spacing: -0.025em;
  }
  .search-query {
      color: #3B82F6; 
  }
  &__status-message-wrapper {
    min-height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 20px;
  }
  &__error-message {
    text-align: center;
    padding: 20px;
    font-size: 1.1rem;
    border-radius: 8px;
    margin-top: 30px;
    font-weight: 500;
    color: #DC2626;
    background-color: #FEF2F2;
    border: 1px solid #FCA5A5;
  }
  &__info-message {
    text-align: center;
    padding: 20px;
    font-size: 1.1rem;
    border-radius: 8px;
    margin-top: 30px;
    font-weight: 500;
    color: #1D4ED8;
    background-color: #EFF6FF;
    border: 1px solid #BFDBFE;
  }
}
</style>