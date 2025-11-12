<template>
  <div class="detail-container">

    <div v-if="pending" class="info-message"> <LoadingSpinner/> Cargando...</div>
    <div v-else-if="error" class="not-found-message">
      <h1 class="text-error">Error: {{ error.message }}</h1>
      <NuxtLink to="/" class="back-link">Volver a la lista</NuxtLink>
    </div>
    <div v-else-if="product" class="product-layout">
      <div class="product-gallery-col">
        <img 
          :src="selectedImage || product.images[0]" 
          :alt="product.title" 
          class="product-image-main" 
        />
        <div class="thumbnail-gallery">
          <img 
            v-for="image in product.images" 
            :key="image" 
            :src="image"
            :alt="`${product.title} thumbnail`"
            :class="{ 'active': image === selectedImage }"
            @click="selectedImage = image"
            class="thumbnail-image"
          />
        </div>
      </div>
      <div class="product-details-col">
        <h1 class="product-name">{{ product.title }}</h1>
        <p class="product-price">${{ product.price.toFixed(2) }}</p>
        <p class="product-category-tag">Categoría: {{ product.category.name }}</p>
        <div class="quantity-selector">
          <button @click="decrementQuantity" :disabled="quantity <= 1" class="quantity-button">-</button>
          <span class="quantity-value">{{ quantity }}</span>
          <button @click="incrementQuantity" class="quantity-button">+</button>
        </div>
        <div class="button-group">
          <button @click="handleBuyNow" class="buy-now-button">
            Comprar Ahora
          </button>
          <button @click="handleAddToCart" class="add-to-cart-button">
            Agregar al Carrito
          </button>
        </div>

        <div class="product-description">
          <h2>Descripción</h2>
          <p>{{ product.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCartStore } from '~/store/cart';
import { useProductStore } from '~/store/products';
import { storeToRefs } from 'pinia';
import LoadingSpinner from '~/components/LoadingSpinner.vue';

const cartStore = useCartStore();
const productStore = useProductStore();
const route = useRoute();
const router = useRouter();

const productId = computed(() => Number(route.params.id));

const quantity = ref(1);
const selectedImage = ref<string | null>(null);

const { pending, error } = await useAsyncData(
  `product-${productId.value}`,
  () => productStore.getProductById(productId.value),
  { lazy: true }
);

const { currentProduct: product } = storeToRefs(productStore);

watchEffect(() => {
  if (product.value && product.value.images.length > 0) {
    selectedImage.value = product.value.images[0] || null;
  }
});

function incrementQuantity() {
  quantity.value++;
}
function decrementQuantity() {
  if (quantity.value > 1) {
    quantity.value--;
  }
}

function handleAddToCart() {
  if (product.value) {
    for (let i = 0; i < quantity.value; i++) {
      cartStore.addProduct(product.value);
    }
    quantity.value = 1;
  }
}

function handleBuyNow() {
  handleAddToCart();
  router.push('/cart');
}
</script>

<style scoped>
.detail-container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 2.5rem 1rem;
}

.product-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

.product-gallery-col {
  width: 100%;
}

.product-image-main {
  width: 100%;
  height: auto;
  max-height: 500px;
  object-fit: cover;
  border-radius: 12px;
  border: 1px solid #E5E7EB;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  margin-bottom: 1rem;
}

.thumbnail-gallery {
  display: flex;
  gap: 10px;
  overflow-x: auto;
}

.thumbnail-image {
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 8px;
  border: 2px solid #E5E7EB;
  cursor: pointer;
  transition: border-color 0.2s;
}

.thumbnail-image:hover,
.thumbnail-image.active {
  border-color: #3B82F6;
}

.product-details-col {
  width: 100%;
}

.product-name {
  font-size: 2.2rem;
  font-weight: 700;
  margin-top: 0;
  margin-bottom: 0.5rem;
  color: #111827;
}

.product-price {
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 1rem;
}

.product-category-tag {
  font-weight: 500;
  margin-bottom: 1.5rem;
  padding: 5px 12px;
  background-color: #F3F4F6;
  border-radius: 20px;
  display: inline-block;
  font-size: 0.9rem;
}

.quantity-selector {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  border: 1px solid #D1D5DB;
  border-radius: 6px;
  width: fit-content;
}

.quantity-button {
  background-color: #F9FAFB;
  border: none;
  padding: 10px 16px;
  cursor: pointer;
  font-size: 1.2rem;
  color: #374151;
}
.quantity-button:first-child {
  border-right: 1px solid #D1D5DB;
  border-radius: 6px 0 0 6px;
}
.quantity-button:last-child {
  border-left: 1px solid #D1D5DB;
  border-radius: 0 6px 6px 0;
}
.quantity-button:disabled {
  color: #9CA3AF;
  cursor: not-allowed;
}

.quantity-value {
  padding: 10px 20px;
  font-size: 1.1rem;
  font-weight: 600;
}

.button-group {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  margin-bottom: 2rem;
}

.buy-now-button,
.add-to-cart-button {
  padding: 14px 24px;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
  border: 2px solid transparent;
  width: 100%;
}

.buy-now-button {
  background-color: #111827;
  color: white;
}
.buy-now-button:hover {
  background-color: #374151;
}

.add-to-cart-button {
  background-color: #ffffff;
  color: #111827;
  border-color: #D1D5DB;
}
.add-to-cart-button:hover {
  background-color: #F9FAFB;
  border-color: #9CA3AF;
}

.product-description h2 {
  font-size: 1.1rem;
  font-weight: 600;
  border-bottom: 1px solid #E5E7EB;
  padding-bottom: 8px;
  margin-bottom: 15px;
}
.product-description p {
  line-height: 1.6;
  color: #4B5563;
}

.not-found-message, .info-message {
  text-align: center;
  padding: 50px;
  border-radius: 8px;
  margin-top: 50px;
}
.info-message {
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 10px;
  font-size: 1.2rem;
}
.not-found-message {
  border: 2px dashed #e74c3c;
  background-color: #fcebeb;
}
.text-error { color: #e74c3c; }
.back-link {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  text-decoration: none;
  border-radius: 4px;
}

@media (min-width: 768px) {
  .product-layout {
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }
  .button-group {
    grid-template-columns: 1fr 1fr;
  }
}
</style>