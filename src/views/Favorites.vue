<template>
  <div class="favorites">
    <div class="container">
      <h1 class="page-title">Избранное</h1>
      
      <div v-if="loading" class="loading">
        Загрузка избранных автомобилей...
      </div>
      
      <div v-else-if="favoriteCars.length === 0" class="empty-state">
        <p>У вас пока нет избранных автомобилей</p>
        <router-link to="/autos" class="btn btn-primary">Перейти в каталог</router-link>
      </div>
      
      <div v-else>
        <div class="results-info">
          <p>Избранных автомобилей: {{ favoriteCars.length }}</p>
        </div>
        
        <div class="cars-grid">
          <AutoCard v-for="car in favoriteCars" :key="car.id" :car="car" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { Car } from '@/types'
import apiService from '@/services/api'
import { useFavoritesStore } from '@/store/favorites'
import AutoCard from '@/components/AutoCard.vue'

const favoritesStore = useFavoritesStore()
const favoriteCars = ref<Car[]>([])
const loading = ref(false)

async function loadFavoriteCars() {
  if (favoritesStore.favoriteIds.length === 0) {
    return
  }
  
  loading.value = true
  
  try {
    // Загружаем все автомобили и фильтруем по избранным ID
    // В реальном API должен быть endpoint для получения нескольких автомобилей по ID
    const response = await apiService.getCars({ limit: 1000 })
    favoriteCars.value = response.cars.filter(car =>
      favoritesStore.favoriteIds.includes(car.id)
    )
  } catch (error) {
    console.error('Ошибка при загрузке избранных автомобилей:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadFavoriteCars()
})
</script>

<style scoped>
.favorites {
  padding: 30px 0;
  min-height: 60vh;
}

.results-info {
  margin-bottom: 20px;
  color: var(--text-light);
}

.cars-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: var(--text-light);
}

.empty-state p {
  font-size: 18px;
  margin-bottom: 20px;
}

@media (max-width: 768px) {
  .cars-grid {
    grid-template-columns: 1fr;
  }
}
</style>

