<template>
  <div class="hero-banner" :style="{ backgroundImage: `url(${backgroundImage})` }">
    <div class="hero-banner__overlay"></div>
    <div class="hero-banner__content">
      <h1 class="hero-banner__content__title">{{ title }}</h1>
      <p class="hero-banner__content__subtitle">{{ subtitle }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: 'Descubre la Experiencia Tecnológica',
  },
  subtitle: {
    type: String,
    default: 'Los gadgets más innovadores y la mejor tecnología te esperan. ¡Explora nuestra colección!',
  },
  backgroundImage: {
    type: String,
    default: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
});
</script>

<style scoped lang="scss">
.hero-banner {
  position: relative;
  width: 100%;
  height: 450px;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 3rem;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);

  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3));
    z-index: 1;
  }

  &__content {
    position: relative;
    z-index: 2;
    max-width: 800px;
    padding: 1rem 2rem;


    &__title {
      font-size: 3.5rem;
      font-weight: 900;
      margin-bottom: 1rem;
      line-height: 1.1;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }

    &__subtitle {
      font-size: 1.3rem;
      font-weight: 400;
      margin-bottom: 2rem;
      opacity: 0.9;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    }
  }
}


@media (max-width: 768px) {
  .hero-banner {
    height: 350px;
    margin-bottom: 2rem;
    border-radius: 8px;

    &__content {
      &__title {
        font-size: 2.5rem;
      }

      &__subtitle {
        font-size: 1rem;
      }
    }
  }
}

@media (max-width: 480px) {
  .hero-banner {
    height: 280px;

    &__content {
      &__title {
        font-size: 2rem;
      }

      &__subtitle {
        font-size: 0.9rem;
        margin-bottom: 1.5rem;
      }
    }
  }
}
</style>