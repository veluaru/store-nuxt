<template>
  <div class="cart-container">
    <h1 class="page-title">Tu Carrito de Compras</h1>

    <div v-if="totalItems === 0" class="empty-cart-message">
      <p>Tu carrito está vacío. ¡Añade algunos productos para empezar!</p>
      <NuxtLink to="/" class="continue-shopping-button">
        ← Volver a la Tienda
      </NuxtLink>
    </div>

    <div v-else class="cart-content">
      <div class="item-list">
        <div v-for="item in items" :key="item.id" class="cart-item">
          
          <NuxtLink :to="`/products/${item.id}`" class="item-image-link">
            <img 
                :src="item.images[0]" 
                :alt="item.title" 
                class="item-image"
            />
          </NuxtLink>
          
          <div class="item-details">
            <h2 class="item-name">{{ item.title }}</h2>
            <p class="item-price">${{ item.price.toFixed(2) }}</p>
          </div>
          
          <div class="item-quantity">
            <span class="quantity-label">Cantidad: </span>
            <span class="quantity-value">{{ item.quantity }}</span>
          </div>

          <div class="item-subtotal">
            <span class="subtotal-label">Subtotal: </span>
            <strong class="subtotal-value">${{ (item.price * item.quantity).toFixed(2) }}</strong>
          </div>

          <button @click="handleRemove(item.id)" class="remove-button">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>

      <aside class="cart-summary">
        <h2>Resumen de la Orden</h2>
        <div class="summary-line">
          <span>Total de Productos:</span>
          <strong>{{ totalItems }}</strong>
        </div>
        <div class="summary-line total-price">
          <span>Total a Pagar:</span>
          <strong class="total-value">${{ totalPrice.toFixed(2) }}</strong>
        </div>
        
        <button @click="checkout" class="checkout-button">
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

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css');

.cart-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  font-family: 'Inter', sans-serif;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 2.5rem;
  color: #111827;
  text-align: left;
  border-bottom: 2px solid #F3F4F6;
  padding-bottom: 1rem;
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
}

.cart-item {
  display: flex;
  align-items: center;
  padding: 20px;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); 
  transition: box-shadow 0.2s;
}

.cart-item:hover {
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.08); 
}

.item-image-link {
    flex-shrink: 0;
    margin-right: 20px;
}

.item-image {
  width: 90px;
  height: 90px;
  object-fit: cover;
  border-radius: 8px;
}

.item-details {
  flex-grow: 1;
  min-width: 150px;
}

.item-name {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: #1F2937;
  transition: color 0.2s;
}

.item-name:hover {
    color: #000;
}

.item-price {
  font-weight: 700;
  color: #4B5563;
  margin: 0;
}

.item-quantity, .item-subtotal {
  margin: 0 20px;
  min-width: 120px;
  text-align: right;
  font-size: 1rem;
  color: #4B5563;
}

.subtotal-value {
    color: #111827;
    font-size: 1.1rem;
}

.remove-button {
  background: none;
  border: none;
  color: #EF4444;
  cursor: pointer;
  padding: 10px;
  margin-left: 15px;
  flex-shrink: 0;
  transition: color 0.2s, transform 0.2s;
  border-radius: 50%;
}

.remove-button:hover {
  color: #B91C1C;
  transform: scale(1.1);
}

.cart-summary {
  width: 350px;
  padding: 30px;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  background-color: #F9FAFB;
  align-self: flex-start;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  flex-shrink: 0;
}

.cart-summary h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-top: 0;
  padding-bottom: 15px;
  border-bottom: 1px solid #E5E7EB;
  color: #1F2937;
}

.summary-line {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 1rem;
  color: #4B5563;
}

.total-price {
  font-size: 1.4rem;
  font-weight: 800;
  padding-top: 15px;
  border-top: 1px solid #E5E7EB;
  color: #111827;
}

.checkout-button {
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
}

.checkout-button:hover {
  background-color: #374151;
  transform: translateY(-1px);
}

.empty-cart-message {
  text-align: center;
  padding: 80px 20px;
  border: 1px solid #D1D5DB;
  background-color: #F9FAFB;
  border-radius: 12px;
  margin-top: 50px;
}

.empty-cart-message p {
    font-size: 1.2rem;
    color: #4B5563;
    margin-bottom: 30px;
}

.continue-shopping-button {
  display: inline-block;
  padding: 12px 25px;
  background-color: #3B82F6;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  transition: background-color 0.3s;
}

.continue-shopping-button:hover {
  background-color: #2563EB;
}

@media (max-width: 1024px) {
    .cart-content {
        flex-direction: column;
    }
    .cart-summary {
        width: 100%;
        margin-top: 20px;
    }
}

@media (max-width: 768px) {
    .page-title {
        font-size: 2rem;
    }

    .cart-item {
        flex-wrap: wrap;
        justify-content: space-between;
    }
    
    .item-image {
        width: 60px;
        height: 60px;
        margin-right: 15px;
    }

    .item-details {
        min-width: unset;
        width: 100%;
        order: 2;
        margin-top: 10px;
    }

    .item-quantity {
        order: 3;
        text-align: left;
        min-width: unset;
        margin: 10px 0 0 0;
    }

    .item-subtotal {
        order: 4;
        text-align: right;
        min-width: unset;
        margin: 10px 0 0 auto;
    }
    
    .remove-button {
        order: 1;
        margin-left: auto;
    }
    
    .item-image-link {
        order: 0;
    }
}
</style>