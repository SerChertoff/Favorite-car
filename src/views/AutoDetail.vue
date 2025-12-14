<template>
  <div class="auto-detail">
    <div class="container">
      <div v-if="loading" class="loading">
        Загрузка информации об автомобиле...
      </div>
      
      <div v-else-if="error" class="error">
        {{ error }}
      </div>
      
      <div v-else-if="car" class="detail-content">
        <button @click="$router.back()" class="back-btn">← Назад</button>
        
        <div class="detail-header">
          <h1>{{ car.brand }} {{ car.model }}</h1>
          <div class="header-actions">
            <button
              @click="toggleFavorite"
              class="favorite-btn"
              :class="{ active: isFavorite }"
            >
              {{ isFavorite ? '❤️ В избранном' : '🤍 В избранное' }}
            </button>
          </div>
        </div>
        
        <div class="detail-grid">
          <div class="detail-images">
            <div class="main-image">
              <img
                :src="currentImage || (car.images && car.images[0]) || '/placeholder-car.jpg'"
                :alt="`${car.brand} ${car.model}`"
                @error="handleImageError"
              />
            </div>
            <div v-if="car.images && car.images.length > 1" class="image-thumbnails">
              <img
                v-for="(img, index) in car.images"
                :key="index"
                :src="img"
                :alt="`Изображение ${index + 1}`"
                @click="currentImage = img"
                :class="{ active: currentImage === img || (!currentImage && index === 0) }"
              />
            </div>
          </div>
          
          <div class="detail-info">
            <div class="price-section">
              <div class="price">{{ formatPrice(car.price) }} ₽</div>
              <div class="location">📍 {{ car.location }}</div>
            </div>
            
            <div class="specs">
              <h3>Характеристики</h3>
              <div class="specs-grid">
                <div class="spec-item">
                  <span class="spec-label">Год выпуска:</span>
                  <span class="spec-value">{{ car.year }}</span>
                </div>
                <div class="spec-item">
                  <span class="spec-label">Пробег:</span>
                  <span class="spec-value">{{ formatMileage(car.mileage) }} км</span>
                </div>
                <div class="spec-item">
                  <span class="spec-label">Тип кузова:</span>
                  <span class="spec-value">{{ car.bodyType }}</span>
                </div>
                <div class="spec-item">
                  <span class="spec-label">Двигатель:</span>
                  <span class="spec-value">{{ car.engineVolume }} л, {{ car.fuelType }}</span>
                </div>
                <div class="spec-item">
                  <span class="spec-label">КПП:</span>
                  <span class="spec-value">{{ car.transmission }}</span>
                </div>
                <div class="spec-item">
                  <span class="spec-label">Цвет:</span>
                  <span class="spec-value">{{ car.color }}</span>
                </div>
              </div>
            </div>
            
            <div class="description">
              <h3>Описание</h3>
              <p>{{ car.description || 'Описание отсутствует' }}</p>
            </div>
            
            <div class="seller-info">
              <h3>Продавец</h3>
              <p><strong>{{ car.sellerName }}</strong></p>
              <p>Телефон: <a :href="`tel:${car.sellerPhone}`">{{ car.sellerPhone }}</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import type { Car } from '@/types'
import apiService from '@/services/api'
import { useFavoritesStore } from '@/store/favorites'

const route = useRoute()
const favoritesStore = useFavoritesStore()

const car = ref<Car | null>(null)
const loading = ref(false)
const error = ref('')
const currentImage = ref<string | null>(null)

const isFavorite = computed(() => {
  return car.value ? favoritesStore.isFavorite(car.value.id) : false
})

async function loadCar() {
  loading.value = true
  error.value = ''
  
  try {
    const id = route.params.id as string
    car.value = await apiService.getCarById(id)
    if (car.value.images && car.value.images.length > 0) {
      currentImage.value = car.value.images[0]
    }
  } catch (err: any) {
    error.value = 'Не удалось загрузить информацию об автомобиле.'
    console.error(err)
  } finally {
    loading.value = false
  }
}

function toggleFavorite() {
  if (car.value) {
    favoritesStore.toggleFavorite(car.value.id)
  }
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('ru-RU').format(price)
}

function formatMileage(mileage: number): string {
  return new Intl.NumberFormat('ru-RU').format(mileage)
}

function handleImageError(event: Event) {
  const target = event.target as HTMLImageElement
  target.src = 'https://via.placeholder.com/800x600?text=No+Image'
}

onMounted(() => {
  loadCar()
})
</script>

<style scoped>
.auto-detail {
  padding: 30px 0;
  min-height: 60vh;
}

.back-btn {
  background: none;
  border: none;
  color: var(--primary-color);
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 20px;
  padding: 5px 0;
}

.back-btn:hover {
  text-decoration: underline;
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 15px;
}

.detail-header h1 {
  font-size: 32px;
  color: var(--text-color);
}

.favorite-btn {
  padding: 12px 24px;
  border: 1.5px solid var(--border-color);
  background: var(--bg-card);
  color: var(--text-color);
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  font-size: 15px;
  font-weight: 500;
  transition: var(--transition);
  display: flex;
  align-items: center;
  gap: 8px;
}

.favorite-btn:hover {
  border-color: var(--primary-color);
  color: var(--primary-light);
  background: var(--bg-card-hover);
}

.favorite-btn.active {
  background: var(--accent-color);
  color: white;
  border-color: transparent;
  box-shadow: 0 4px 6px -1px rgba(220, 38, 38, 0.4);
}

.detail-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}

.detail-images {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.main-image {
  width: 100%;
  height: 400px;
  overflow: hidden;
  border-radius: var(--border-radius);
  background: var(--bg-darker);
}

.main-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-thumbnails {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.image-thumbnails img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: var(--border-radius);
  cursor: pointer;
  border: 2px solid transparent;
  transition: var(--transition);
}

.image-thumbnails img:hover,
.image-thumbnails img.active {
  border-color: var(--primary-color);
}

.detail-info {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.price-section {
  padding: 20px;
  background: var(--bg-darker);
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color);
}

.price {
  font-size: 40px;
  font-weight: 700;
  color: var(--accent-color);
  margin-bottom: 12px;
}

.location {
  font-size: 16px;
  color: var(--text-light);
}

.specs h3,
.description h3,
.seller-info h3 {
  font-size: 20px;
  margin-bottom: 15px;
  color: var(--text-color);
}

.specs-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.spec-item {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.spec-label {
  font-size: 14px;
  color: var(--text-light);
}

.spec-value {
  font-size: 16px;
  font-weight: 500;
  color: var(--text-color);
}

.description p {
  line-height: 1.8;
  color: var(--text-color);
}

.seller-info {
  padding: 20px;
  background: var(--bg-darker);
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color);
}

.seller-info p {
  margin-bottom: 10px;
}

.seller-info a {
  color: var(--primary-color);
  text-decoration: none;
}

.seller-info a:hover {
  text-decoration: underline;
}

@media (max-width: 968px) {
  .detail-grid {
    grid-template-columns: 1fr;
  }
  
  .specs-grid {
    grid-template-columns: 1fr;
  }
}
</style>

