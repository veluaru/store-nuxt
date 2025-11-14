<template>
  <div class="product-card">
    <NuxtLink :to="`/products/${product.id}`" class="product-card__product-link">
      <div class="product-card__image-wrapper">
        <img :src="product.images[0]" :alt="product.title" class="product-card__image" />
      </div>
      <div class="product-card__product-info">
        <h3 class="product-card__product-name">{{ product.title }}</h3>
        <p class="product-card__product-description">{{ product.description.substring(0, 50) + '...' }}</p>
        <div class="product-card__price-container">
          <span class="product-card__price-container__product-price">${{ product.price.toFixed(2) }}</span>
          <span class="product-card__price-container__product-category-tag">{{ product.category.name }}</span>
        </div>
      </div>
    </NuxtLink>
    <button @click="handleAddToCart" class="product-card__add-to-cart-button">
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

<style scoped lang="scss">
.product-card {
  background-color: white;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  overflow: hidden;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.2s ease, transform 0.2s ease;
  position: relative;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }

  &__product-link {
    text-decoration: none;
    color: inherit;
    display: block;

    &:hover .product-card__image {
      transform: scale(1.05);
    }
  }

  &__image-wrapper {
    aspect-ratio: 1 / 1;
    width: 100%;
    margin-bottom: 12px;
    overflow: hidden;
    border-radius: 8px;
    background-color: #F3F4F6;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &__product-info {
    text-align: left;
    margin-bottom: 10px;
  }

  &__product-name {
    font-size: 1rem;
    font-weight: 600;
    margin: 0 0 4px 0;
    color: #111827;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__product-description {
    font-size: 0.85rem;
    color: #6B7280;
    margin: 0 0 8px 0;
    min-height: 20px;
  }

  &__price-container {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &__product-price {
      font-size: 1.1rem;
      font-weight: 700;
      color: #111827;
    }

    &__product-category-tag {
      font-size: 0.75rem;
      color: #4B5563;
      background-color: #E5E7EB;
      padding: 3px 8px;
      border-radius: 4px;
      font-weight: 500;
    }
  }

  &__add-to-cart-button {
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

    &:hover {
      background-color: #374151;
    }
  }
}
</style>