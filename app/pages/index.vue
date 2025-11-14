<template>
  <div class="home">
    <AppHeroBanner />
    <div class="home__title-section">
      <h2 class="home__title-section__title">Nuestros Productos</h2>
    </div>
    <div v-if="error" class="home__error-message-section">
      ⚠️ Error al cargar: {{ error }}
    </div>

    <ProductList v-else-if="products.length > 0" :products="products" @add-to-cart="handleAddToCart" />

    <div v-else class="home__status-message-section">
      <div v-if="pending" class="home__status-message-section__loading-message">
        Cargando productos...
      </div>
      <div v-else class="home__status-message-section__info-message">
        No hay productos disponibles.
      </div>
    </div>

    <div v-if="!error && products.length > 0" class="home__pagination-section">
      <button @click="loadMoreProducts" :disabled="pending" class="home__pagination-section__load-more-button">
        {{ pending ? 'Cargando...' : 'Cargar más productos' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProductStore } from '~/store/products';
import { useCartStore } from '~/store/cart';
import { storeToRefs } from 'pinia';
import type { Product } from '~/types/Product';
import ProductList from '~/components/ProductList.vue';
import AppHeroBanner from '~/components/AppHeroBanner.vue';

const productStore = useProductStore();
const cartStore = useCartStore();

const { list: products, isLoading: pending, error } = storeToRefs(productStore);

await productStore.getProducts(true);

function handleAddToCart(product: Product) {
  cartStore.addProduct(product);
}

function loadMoreProducts() {
  if (!pending.value) {
    productStore.getProducts(false);
  }
}
</script>

<style scoped lang="scss">
.home {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem 1rem;

  &__title-section {
    margin-bottom: 2.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid #E5E7EB;

    &__title {
      font-size: 2rem;
      font-weight: 800;
      color: #111827;
      margin-bottom: 0;
      letter-spacing: -0.025em;
    }
  }

  &__status-message-section {
    min-height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    &__loading-message {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      column-gap: 10px;
      color: #4B5563;
    }

    &__info-message {
      color: #1D4ED8;
      background-color: #EFF6FF;
      border: 1px solid #BFDBFE;
    }
  }

  &__error-message-section {
    color: #DC2626;
    background-color: #FEF2F2;
    border: 1px solid #FCA5A5;
  }

  &__pagination-section {
    display: flex;
    justify-content: center;
    padding: 3rem 0;

    &__load-more-button {
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

      &:hover:not(:disabled) {
        background-color: #374151;
      }

      &:disabled {
        background-color: #D1D5DB;
        color: #6B7280;
        cursor: not-allowed;
        box-shadow: none;
      }
    }
  }
}

.home__error-message-sectio,
.home__status-message-section__loading-message,
.home__status-message-section__info-message {
  text-align: center;
  padding: 20px;
  font-size: 1.1rem;
  border-radius: 8px;
  margin-top: 30px;
  font-weight: 500;
}

@media (min-width: 768px) {
  .home {
    &__title-section {
      &__title {
        font-size: 2.5rem;
      }
    }
  }
}
</style>