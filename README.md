# 🛍️ TuShop - Tienda de Productos con Nuxt 3 y Pinia

Una aplicación de tienda en línea moderna y responsive construida con Nuxt 3 y Pinia. Esta aplicación simula un catálogo de productos, permitiendo a los usuarios explorar, ver detalles y añadir artículos al carrito de compras utilizando el almacenamiento global de Pinia.

El proyecto se encuentra desplegado en el siguiente enlace: https://veluaru.github.io/store-nuxt/

## 🌟 Características Principales

- **Catálogo de Productos Dinámico:** Carga la lista de productos de la API Platzi Fakestore ([https://api.escuelajs.co/api/v1/products](https://fakeapi.platzi.com/en/rest/products/)) y soporta paginación al cargar más.
- **Gestión de Estado Centralizada:** Utiliza Pinia para manejar el estado del carrito de compras y los productos.
- **Rutas Dinámicas:** Muestra la página de detalles de cada producto usando rutas dinámicas de Nuxt.
- **Carrito de Compras Persistente:** Permite añadir, eliminar y ver el resumen del pedido en una vista dedicada.
- **Diseño Modular:** Componentes Vue bien definidos para la lista de productos, tarjetas individuales y la cabecera.

## 🛠️ Tecnologías Utilizadas

- **Nuxt 3:** Framework Vue.js con renderizado del lado del servidor (SSR) para desarrollo rápido.
- **Vue 3:** El núcleo reactivo de la aplicación.
- **Pinia:** Librería de gestión de estado moderna y ligera para Vue.
- **TypeScript:** Para un desarrollo más robusto y seguro.
- **API Externa:** Consumo de datos de productos desde https://api.escuelajs.co/api/v1/products.
- **SASS:** Preprocesador de estilos para generar un codigo mas ordenado y eficiente.

## ⚙️ Instalación y Configuración

Sigue estos pasos para poner el proyecto en funcionamiento en tu entorno local.

### 1. Requisitos Previos

Asegúrate de tener instalado Node.js (versión recomendada 18+) y [npm] o [Yarn]/[pnpm].

### 2. Clonar el Repositorio
```bash
git clone https://github.com/veluaru/store-nuxt.git
cd store-nuxt
```

### 3. Instalar Dependencias

Utiliza tu gestor de paquetes preferido:
```bash
# Con npm
npm install

# Con yarn
yarn install

# Con pnpm
pnpm install
```

## 🚀 Uso (Ejecución de la Aplicación)

Una vez instaladas las dependencias, puedes iniciar el servidor de desarrollo:
```bash
# Modo desarrollo con recarga en caliente
npm run dev
```

La aplicación estará disponible en [este enlace](https://veluaru.github.io/store-nuxt/).
