<template>
  <div class="home">
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">Найдите свой идеальный автомобиль</h1>
          <p class="hero-subtitle">Тысячи автомобилей от проверенных продавцов</p>
          <router-link to="/autos" class="btn btn-primary btn-large">
            Смотреть каталог
          </router-link>
        </div>
      </div>
    </section>

    <section class="features">
      <div class="container">
        <h2 class="section-title">Почему выбирают нас?</h2>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">🔍</div>
            <h3>Удобный поиск</h3>
            <p>Мощные фильтры для быстрого поиска нужного автомобиля</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">✅</div>
            <h3>Проверенные продавцы</h3>
            <p>Все объявления проходят модерацию</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">💰</div>
            <h3>Лучшие цены</h3>
            <p>Сравнивайте цены и находите выгодные предложения</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">❤️</div>
            <h3>Избранное</h3>
            <p>Сохраняйте понравившиеся автомобили</p>
          </div>
        </div>
      </div>
    </section>

    <section class="popular-cars" v-if="popularCars.length > 0">
      <div class="container">
        <h2 class="section-title">Популярные автомобили</h2>
        <div class="cars-grid">
          <AutoCard v-for="car in popularCars" :key="car.id" :car="car" />
        </div>
        <div class="text-center" style="margin-top: 30px;">
          <router-link to="/autos" class="btn btn-outline">
            Смотреть все автомобили
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Car } from '@/types'
import apiService from '@/services/api'
import AutoCard from '@/components/AutoCard.vue'

const popularCars = ref<Car[]>([])

onMounted(async () => {
  try {
    const response = await apiService.getCars({ limit: 6, sortBy: 'createdAt', sortOrder: 'desc' })
    popularCars.value = response.cars
  } catch (error) {
    console.error('Ошибка при загрузке популярных автомобилей:', error)
  }
})
</script>

<style scoped>
.hero {
  background: linear-gradient(135deg, var(--bg-card) 0%, var(--bg-darker) 100%);
  color: white;
  padding: 100px 0;
  text-align: center;
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid var(--border-color);
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  opacity: 0.3;
}

.hero-content {
  max-width: 700px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.hero-title {
  font-size: 56px;
  font-weight: 800;
  margin-bottom: 24px;
  line-height: 1.2;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.hero-subtitle {
  font-size: 22px;
  margin-bottom: 40px;
  opacity: 0.95;
  font-weight: 400;
}

.btn-large {
  padding: 16px 32px;
  font-size: 18px;
}

.features {
  padding: 80px 0;
  background: var(--bg-dark);
}

.section-title {
  text-align: center;
  font-size: 42px;
  margin-bottom: 60px;
  color: var(--text-color);
  font-weight: 700;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 32px;
}

.feature-card {
  text-align: center;
  padding: 40px 32px;
  border-radius: var(--border-radius);
  transition: var(--transition);
  border: 1px solid var(--border-color);
  background: var(--bg-card);
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-hover);
  border-color: var(--primary-color);
  background: var(--bg-card-hover);
}

.feature-icon {
  font-size: 56px;
  margin-bottom: 20px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.feature-card h3 {
  font-size: 22px;
  margin-bottom: 12px;
  color: var(--text-color);
  font-weight: 600;
}

.feature-card p {
  color: var(--text-light);
  line-height: 1.6;
  font-size: 15px;
}

.popular-cars {
  padding: 80px 0;
  background: var(--bg-darker);
}

.cars-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
}

.text-center {
  text-align: center;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 32px;
  }
  
  .hero-subtitle {
    font-size: 16px;
  }
  
  .cars-grid {
    grid-template-columns: 1fr;
  }
}
</style>

