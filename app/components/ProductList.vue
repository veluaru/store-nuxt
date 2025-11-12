<template>
  <div class="product-list">
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"
      @add-to-cart="onAddToCart"
    />
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/types/Product';

defineProps<{
  products: Product[];
}>();

const emit = defineEmits<{
  (e: 'addToCart', product: Product): void;
}>();

function onAddToCart(product: Product) {
  emit('addToCart', product);
}
</script>

<style scoped>
.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px; 
  padding: 16px 0; 
}

@media (min-width: 640px) {
  .product-list {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 30px;
    padding: 24px 0;
  }
}

@media (min-width: 1024px) {
  .product-list {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }
}
</style>