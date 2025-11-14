<template>
  <header class="app-header">
    <div class="header-content">
      <NuxtLink to="/" class="header-content__logo-link">
        <img src="~/assets/images/logo.png" alt="TuShop" class="header-content__logo-image" />
      </NuxtLink>

      <div class="header-content__header-actions">
        <!-- <NuxtLink to="/account" class="action-link">
          <i class="fa-solid fa-user"></i>
          <span>Cuenta</span>
        </NuxtLink> -->

        <NuxtLink to="/cart"
          class="header-content__header-actions__action-link header-content__header-actions__cart-link">
          <i class="fa-solid fa-shopping-cart"></i>
          <span>Carrito</span>
          <span v-if="totalItems > 0" class="header-content__header-actions__cart-badge">{{ totalItems }}</span>
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useCartStore } from '~/store/cart';
import { storeToRefs } from 'pinia';

const cartStore = useCartStore();
const { totalItems } = storeToRefs(cartStore);
</script>

<style scoped lang="scss">
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css');

.app-header {
  background-color: #ffffff;
  color: #333;
  padding: 1rem 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.header-content {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;


  &__logo-link {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #111827;
  }

  &__logo-image {
    height: 32px;
    width: auto;
    margin-right: 10px;
  }

  &__header-actions {
    display: flex;
    align-items: center;
    gap: 24px;

    &__action-link {
      display: flex;
      align-items: center;
      gap: 8px;
      text-decoration: none;
      color: #374151;
      font-weight: 500;
      font-size: 0.95rem;
      transition: color 0.2s ease;
      cursor: pointer;

      &:hover {
        color: #000;
      }

      i {
        font-size: 1.2rem;
      }
    }

    &__cart-link {
      position: relative;
    }

    &__cart-badge {
      position: absolute;
      top: -12px;
      right: -12px;
      background-color: #ef4444;
      color: white;
      border-radius: 50%;
      padding: 2px 6px;
      font-size: 0.7rem;
      font-weight: 700;
      line-height: 1;
      text-align: center;
      border: 1px solid white;
    }
  }
}
</style>