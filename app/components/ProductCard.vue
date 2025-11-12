<template>
  <div class="product-card">
    <NuxtLink :to="`/products/${product.id}`" class="product-link">
        <div class="image-wrapper">
          <img 
            :src="product.images[0]" 
            :alt="product.title" 
            class="product-image" 
          />
        </div>
      <div class="product-info">
        <h3 class="product-name">{{ product.title }}</h3>
        <p class="product-description">{{ product.description.substring(0, 50) + '...' }}</p>
        <div class="price-container">
            <span class="product-price">${{ product.price.toFixed(2) }}</span>
            <span class="product-category-tag">{{ product.category.name }}</span>
        </div>
      </div>
    </NuxtLink>
    <button @click="handleAddToCart" class="add-to-cart-button">
      Añadir
    </button>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/types/Product';

const { product } = defineProps<{
  product: Product;
}>();

const emit = defineEmits<{
  (e: 'addToCart', product: Product): void;
}>();

function handleAddToCart() {
  emit('addToCart', product);
}
</script>

<style scoped>
.product-card {
  background-color: white;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  overflow: hidden;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.2s ease, transform 0.2s ease;
  position: relative;
}

.product-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.product-link {
    text-decoration: none;
    color: inherit;
    display: block;
}

.image-wrapper {
    aspect-ratio: 1 / 1; 
    width: 100%;
    margin-bottom: 12px;
    overflow: hidden;
    border-radius: 8px;
    background-color: #F3F4F6;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.product-link:hover .product-image {
    transform: scale(1.05);
}

.product-info {
    text-align: left;
    margin-bottom: 10px;
}

.product-name {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: #111827;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.product-description {
    font-size: 0.85rem;
    color: #6B7280;
    margin: 0 0 8px 0;
    min-height: 20px;
}

.price-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.product-price {
  font-size: 1.1rem;
  font-weight: 700;
  color: #111827;
}

.product-category-tag {
    font-size: 0.75rem;
    color: #4B5563;
    background-color: #E5E7EB;
    padding: 3px 8px;
    border-radius: 4px;
    font-weight: 500;
}

.add-to-cart-button {
  background-color: #111827; 
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.9rem;
  transition: background-color 0.2s;
  width: 100%;
  margin-top: 10px;
}

.add-to-cart-button:hover {
  background-color: #374151;
}
</style>