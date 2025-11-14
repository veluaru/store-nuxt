<template>
  <div class="cart-container">
    <h1 class="cart-container__page-title">Tu Carrito de Compras</h1>

    <div v-if="totalItems === 0" class="cart-container__empty-cart-message">
      <p>Tu carrito está vacío. ¡Añade algunos productos para empezar!</p>
      <NuxtLink to="/" class="cart-container__empty-cart-message__continue-shopping-button">
        ← Volver a la Tienda
      </NuxtLink>
    </div>

    <div v-else class="cart-content">
      <div class="item-list">
        <div v-for="item in items" :key="item.id" class="item-list__cart-item">

          <NuxtLink :to="`/products/${item.id}`" class="item-list__image-link">
            <img :src="item.images[0]" :alt="item.title" class="item-list__image" />
          </NuxtLink>

          <div class="item-list__item-details">
            <h2 class="item-list__item-name">{{ item.title }}</h2>
            <p class="item-list__item-price">${{ item.price.toFixed(2) }}</p>
          </div>

          <div class="item-list__item-quantity">
            <span>Cantidad: </span>
            <span>{{ item.quantity }}</span>
          </div>

          <div class="item-list__item-subtotal">
            <span class="item-list__subtotal-label">Subtotal: </span>
            <strong class="item-list__subtotal-value">${{ (item.price * item.quantity).toFixed(2)
            }}</strong>
          </div>

          <button @click="handleRemove(item.id)" class="item-list__remove-button">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>

      <aside class="summary">
        <h2>Resumen de la Orden</h2>
        <div class="summary__summary-line">
          <span>Total de Productos:</span>
          <strong>{{ totalItems }}</strong>
        </div>
        <div class="summary__summary-line summary__total-price">
          <span>Total a Pagar:</span>
          <strong class="total-value">${{ totalPrice.toFixed(2) }}</strong>
        </div>

        <button @click="checkout" class="summary__checkout-button">
          Pagar y Finalizar Compra
        </button>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useCartStore } from '~/store/cart';

const cartStore = useCartStore();
const { items, totalItems, totalPrice } = storeToRefs(cartStore);

function handleRemove(productId: number) {
  cartStore.removeProduct(productId);
}


function checkout() {
  if (totalItems.value === 0) {
    return;
  }
  cartStore.$reset();
}
</script>

<style scoped lang="scss">
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css');

.cart-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  font-family: 'Inter', sans-serif;

  &__page-title {
    font-size: 2.5rem;
    font-weight: 800;
    margin-bottom: 2.5rem;
    color: #111827;
    text-align: left;
    border-bottom: 2px solid #F3F4F6;
    padding-bottom: 1rem;
  }

  &__empty-cart-message {
    text-align: center;
    padding: 80px 20px;
    border: 1px solid #D1D5DB;
    background-color: #F9FAFB;
    border-radius: 12px;
    margin-top: 50px;

    p {
      font-size: 1.2rem;
      color: #4B5563;
      margin-bottom: 30px;
    }

    &__continue-shopping-button {
      display: inline-block;
      padding: 12px 25px;
      background-color: #3B82F6;
      color: white;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      transition: background-color 0.3s;

      &:hover {
        background-color: #2563EB;
      }
    }
  }
}



.cart-content {
  display: flex;
  gap: 30px;
}

.item-list {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;

  &__cart-item {
    display: flex;
    align-items: center;
    padding: 20px;
    border: 1px solid #E5E7EB;
    border-radius: 12px;
    background-color: white;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    transition: box-shadow 0.2s;

    &:hover {
      box-shadow: 0 6px 10px rgba(0, 0, 0, 0.08);
    }
  }

  &__image-link {
    flex-shrink: 0;
    margin-right: 20px;
  }

  &__image {
    width: 90px;
    height: 90px;
    object-fit: cover;
    border-radius: 8px;
  }

  &__item-details {
    flex-grow: 1;
    min-width: 150px;
  }

  &__item-name {
    font-size: 1.2rem;
    font-weight: 600;
    margin: 0 0 4px 0;
    color: #1F2937;
    transition: color 0.2s;
  }

  &__item-name:hover {
    color: #000;
  }

  &__item-price {
    font-weight: 700;
    color: #4B5563;
    margin: 0;
  }

  &__item-quantity,
  &__item-subtotal {
    margin: 0 20px;
    min-width: 120px;
    text-align: right;
    font-size: 1rem;
    color: #4B5563;
  }

  &__subtotal-value {
    color: #111827;
    font-size: 1.1rem;
  }

  &__remove-button {
    background: none;
    border: none;
    color: #EF4444;
    cursor: pointer;
    padding: 10px;
    margin-left: 15px;
    flex-shrink: 0;
    transition: color 0.2s, transform 0.2s;
    border-radius: 50%;

    &:hover {
      color: #B91C1C;
      transform: scale(1.1);
    }
  }
}

.summary {
  width: 350px;
  padding: 30px;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  background-color: #F9FAFB;
  align-self: flex-start;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  flex-shrink: 0;

  h2 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-top: 0;
    padding-bottom: 15px;
    border-bottom: 1px solid #E5E7EB;
    color: #1F2937;
  }

  &__summary-line {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
    font-size: 1rem;
    color: #4B5563;
  }

  &__total-price {
    font-size: 1.4rem;
    font-weight: 800;
    padding-top: 15px;
    border-top: 1px solid #E5E7EB;
    color: #111827;
  }

  &__checkout-button {
    width: 100%;
    background-color: #111827;
    color: white;
    border: none;
    padding: 15px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    font-size: 1.1rem;
    margin-top: 20px;
    transition: background-color 0.3s, transform 0.1s;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    &:hover {
      background-color: #374151;
      transform: translateY(-1px);
    }
  }
}

@media (max-width: 1024px) {
  .cart-content {
    flex-direction: column;
  }

  .summary {
    width: 100%;
    margin-top: 20px;
  }
}

@media (max-width: 768px) {
  .cart-container__page-title {
    font-size: 2rem;
  }

  .item-list {
    .item-list__cart-item {
      flex-wrap: wrap;
      justify-content: space-between;
    }

    .item-list__image {
      width: 60px;
      height: 60px;
      margin-right: 15px;
    }

    .item-list__item-details {
      min-width: unset;
      width: 100%;
      order: 2;
      margin-top: 10px;
    }

    &__item-quantity {
      order: 3;
      text-align: left;
      min-width: unset;
      margin: 10px 0 0 0;
    }

    &__item-subtotal {
      order: 4;
      text-align: right;
      min-width: unset;
      margin: 10px 0 0 auto;
    }

    &__remove-button {
      order: 1;
      margin-left: auto;
    }

    &__image-link {
      order: 0;
    }
  }

}
</style>