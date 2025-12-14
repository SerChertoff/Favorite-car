<template>
  <div class="auto-list">
    <div class="container">
      <h1 class="page-title">Каталог автомобилей</h1>
      
      <SearchBar @search="handleSearch" />
      
      <div v-if="loading" class="loading">
        Загрузка автомобилей...
      </div>
      
      <div v-else-if="error" class="error">
        {{ error }}
      </div>
      
      <div v-else-if="cars.length === 0" class="empty-state">
        <p>Автомобили не найдены</p>
        <p>Попробуйте изменить параметры поиска</p>
      </div>
      
      <div v-else>
        <div class="results-info">
          <p>Найдено автомобилей: {{ total }}</p>
        </div>
        
        <div class="cars-grid">
          <AutoCard v-for="car in cars" :key="car.id" :car="car" />
        </div>
        
        <div v-if="total > cars.length" class="pagination">
          <button
            @click="loadMore"
            class="btn btn-primary"
            :disabled="loadingMore"
          >
            {{ loadingMore ? 'Загрузка...' : 'Загрузить еще' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Car, CarFilters } from '@/types'
import apiService from '@/services/api'
import AutoCard from '@/components/AutoCard.vue'
import SearchBar from '@/components/SearchBar.vue'

const cars = ref<Car[]>([])
const loading = ref(false)
const loadingMore = ref(false)
const error = ref('')
const total = ref(0)
const currentPage = ref(1)
const currentFilters = ref<CarFilters>({})
const currentQuery = ref('')

async function loadCars(page = 1, reset = false) {
  if (reset) {
    loading.value = true
    cars.value = []
    currentPage.value = 1
  } else {
    loadingMore.value = true
  }
  
  error.value = ''
  
  try {
    const params: any = {
      page,
      limit: 12,
      ...currentFilters.value
    }
    
    if (currentQuery.value) {
      // В реальном API можно передать query для поиска по тексту
      params.search = currentQuery.value
    }
    
    const response = await apiService.getCars(params)
    
    if (reset) {
      cars.value = response.cars
    } else {
      cars.value.push(...response.cars)
    }
    
    total.value = response.total
    currentPage.value = page
  } catch (err: any) {
    error.value = 'Не удалось загрузить автомобили. Попробуйте позже.'
    console.error(err)
  } finally {
    loading.value = false
    loadingMore.value = false
  }
}

function handleSearch(query: string, filters: CarFilters) {
  currentQuery.value = query
  currentFilters.value = filters
  loadCars(1, true)
}

function loadMore() {
  loadCars(currentPage.value + 1, false)
}

onMounted(() => {
  loadCars(1, true)
})
</script>

<style scoped>
.auto-list {
  padding: 30px 0;
  min-height: 60vh;
}

.page-title {
  font-size: 36px;
  margin-bottom: 30px;
  color: var(--text-color);
}

.results-info {
  margin-bottom: 20px;
  color: var(--text-muted);
}

.cars-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
  margin-bottom: 30px;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: var(--text-light);
}

.empty-state p:first-child {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 10px;
  color: var(--text-color);
}

.pagination {
  text-align: center;
  margin-top: 40px;
}

@media (max-width: 768px) {
  .cars-grid {
    grid-template-columns: 1fr;
  }
  
  .page-title {
    font-size: 28px;
  }
}
</style>

