<template>
  <div class="detail-container">
    <div v-if="pending" class="detail-container__loading-message">
      <LoadingSpinner /> Cargando...
    </div>
    <div v-else-if="error" class="detail-container__not-found-message">
      <h1 class="detail-container__not-found-message__text-error">Error: {{ error.message }}</h1>
      <NuxtLink to="/" class="detail-container__not-found-message__back-link">Volver a la lista</NuxtLink>
    </div>
    <div v-else-if="product" class="product-container">
      <div class="product-container__gallery-col">
        <img :src="selectedImage || product.images[0]" :alt="product.title"
          class="product-container__gallery-col__main-image" />
        <div class="product-container__gallery-col__thumbnail-gallery">
          <img v-for="image in product.images" :key="image" :src="image" :alt="`${product.title} thumbnail`"
            :class="{ 'active': image === selectedImage }" @click="selectedImage = image"
            class="product-container__gallery-col__thumbnail-image" />
        </div>
      </div>
      <div class="product-container__details-col">
        <h1 class="product-container__details-col__name">{{ product.title }}</h1>
        <p class="product-container__details-col__price">${{ product.price.toFixed(2) }}</p>
        <p class="product-container__details-col__category-tag">Categoría: {{ product.category.name }}</p>
        <div class="product-container__details-col__quantity-selector">
          <button @click="decrementQuantity" :disabled="quantity <= 1"
            class="product-container__details-col__quantity-button">-</button>
          <span class="product-container__details-col__quantity-value">{{ quantity }}</span>
          <button @click="incrementQuantity" class="product-container__details-col__quantity-button">+</button>
        </div>
        <div class="button-group">
          <button @click="handleBuyNow" class="button-group__buy-now-button">
            Comprar Ahora
          </button>
          <button @click="handleAddToCart" class="button-group__add-to-cart-button">
            Agregar al Carrito
          </button>
        </div>

        <div class="product-container__details-col__description">
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

<style scoped lang="scss">
.detail-container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 2.5rem 1rem;

  &__loading-message {
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 10px;
    font-size: 1.2rem;
  }

  &__not-found-message {
    border: 2px dashed #e74c3c;
    background-color: #fcebeb;

    &__text-error {
      color: #e74c3c;
    }

    &__back-link {
      display: inline-block;
      margin-top: 20px;
      padding: 10px 20px;
      background-color: #3498db;
      color: white;
      text-decoration: none;
      border-radius: 4px;
    }
  }
}

.product-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  &__gallery-col {
    width: 100%;

    &__main-image {
      width: 100%;
      height: auto;
      max-height: 500px;
      object-fit: cover;
      border-radius: 12px;
      border: 1px solid #E5E7EB;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
      margin-bottom: 1rem;
    }

    &__thumbnail-gallery {
      display: flex;
      gap: 10px;
      overflow-x: auto;
    }

    &__thumbnail-image {
      width: 70px;
      height: 70px;
      object-fit: cover;
      border-radius: 8px;
      border: 2px solid #E5E7EB;
      cursor: pointer;
      transition: border-color 0.2s;

      &:hover,
      &.active {
        border-color: #3B82F6;
      }
    }
  }

  &__details-col {
    width: 100%;

    &__name {
      font-size: 2.2rem;
      font-weight: 700;
      margin-top: 0;
      margin-bottom: 0.5rem;
      color: #111827;
    }

    &__price {
      font-size: 2rem;
      font-weight: 700;
      color: #111827;
      margin-bottom: 1rem;
    }

    &__category-tag {
      font-weight: 500;
      margin-bottom: 1.5rem;
      padding: 5px 12px;
      background-color: #F3F4F6;
      border-radius: 20px;
      display: inline-block;
      font-size: 0.9rem;
    }

    &__quantity-selector {
      display: flex;
      align-items: center;
      margin-bottom: 2rem;
      border: 1px solid #D1D5DB;
      border-radius: 6px;
      width: fit-content;
    }

    &__quantity-button {
      background-color: #F9FAFB;
      border: none;
      padding: 10px 16px;
      cursor: pointer;
      font-size: 1.2rem;
      color: #374151;

      &:first-child {
        border-right: 1px solid #D1D5DB;
        border-radius: 6px 0 0 6px;
      }

      &:last-child {
        border-left: 1px solid #D1D5DB;
        border-radius: 0 6px 6px 0;
      }

      &:disabled {
        color: #9CA3AF;
        cursor: not-allowed;
      }
    }

    &__quantity-value {
      padding: 10px 20px;
      font-size: 1.1rem;
      font-weight: 600;
    }

    &__description {
      h2 {
        font-size: 1.1rem;
        font-weight: 600;
        border-bottom: 1px solid #E5E7EB;
        padding-bottom: 8px;
        margin-bottom: 15px;
      }

      p {
        line-height: 1.6;
        color: #4B5563;
      }

    }
  }
}

.button-group {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  margin-bottom: 2rem;

  &__buy-now-button {
    background-color: #111827;
    color: white;

    &:hover {
      background-color: #374151;
    }
  }

  &__add-to-cart-button {
    background-color: #ffffff;
    color: #111827;
    border-color: #D1D5DB;

    &:hover {
      background-color: #F9FAFB;
      border-color: #9CA3AF;
    }
  }
}

.button-group__buy-now-button,
.button-group__add-to-cart-button {
  padding: 14px 24px;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
  border: 2px solid transparent;
  width: 100%;
}


.detail-container__not-found-message,
.detail-container__loading-message {
  text-align: center;
  padding: 50px;
  border-radius: 8px;
  margin-top: 50px;
}

@media (min-width: 768px) {
  .product-container {
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }

  .button-group {
    grid-template-columns: 1fr 1fr;
  }
}
</style>