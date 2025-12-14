<template>
  <div class="auto-card card" @click="goToDetail">
    <div class="card-image">
      <img
        v-if="car.images && car.images.length > 0"
        :src="car.images[0]"
        :alt="`${car.brand} ${car.model}`"
        @error="handleImageError"
        loading="lazy"
      />
      <div v-else class="image-placeholder">
        <div class="placeholder-icon">🚗</div>
        <div class="placeholder-text">{{ car.brand }} {{ car.model }}</div>
      </div>
      <button
        @click.stop="toggleFavorite"
        class="favorite-btn"
        :class="{ active: isFavorite }"
        :aria-label="
          isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'
        "
      >
        ❤️
      </button>
      <div class="image-overlay">
        <span class="badge mileage" v-if="car.mileage < 50000"
          >{{ formatMileage(car.mileage) }} км</span
        >
        <span class="badge owner" v-if="car.mileage < 50000">1 владелец</span>
      </div>
    </div>

    <div class="card-content">
      <h3 class="card-title">{{ car.brand }} {{ car.model }}</h3>
      <div class="card-info">
        <span class="year">{{ car.year }} год</span>
        <span class="fuel">{{ car.fuelType }}</span>
        <span class="transmission">{{ car.transmission }}</span>
      </div>
      <div class="card-details">
        <span>{{ car.bodyType }}</span>
        <span>{{ car.engineVolume }} л</span>
      </div>
      <div class="card-footer">
        <div class="price-box">
          <div class="price">{{ formatPrice(car.price) }} ₽</div>
        </div>
        <div class="location">📍 {{ car.location }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import type { Car } from "@/types";
import { useFavoritesStore } from "@/store/favorites";

interface Props {
  car: Car;
}

const props = defineProps<Props>();
const router = useRouter();
const favoritesStore = useFavoritesStore();

const isFavorite = computed(() => favoritesStore.isFavorite(props.car.id));

function toggleFavorite() {
  favoritesStore.toggleFavorite(props.car.id);
}

function goToDetail() {
  router.push(`/autos/${props.car.id}`);
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("ru-RU").format(price);
}

function formatMileage(mileage: number): string {
  return new Intl.NumberFormat("ru-RU").format(mileage);
}

function handleImageError(event: Event) {
  const target = event.target as HTMLImageElement;
  // Пробуем следующее изображение из массива
  const currentSrc = target.src;
  const carImages = props.car.images || [];
  const currentIndex = carImages.findIndex(img => {
    try {
      return img === currentSrc || currentSrc.includes(img) || new URL(img).href === new URL(currentSrc).href;
    } catch {
      return img === currentSrc || currentSrc.includes(img);
    }
  });
  
  if (currentIndex >= 0 && currentIndex < carImages.length - 1) {
    // Пробуем следующее изображение
    target.src = carImages[currentIndex + 1];
  } else if (carImages.length > 0 && currentIndex < 0) {
    // Если текущий src не найден в массиве, пробуем первое изображение
    target.src = carImages[0];
  } else {
    // Если все изображения не загрузились, используем placeholder
    target.src = `https://via.placeholder.com/800/1e293b/ffffff?text=${encodeURIComponent(props.car.brand + ' ' + props.car.model)}`;
    target.style.objectFit = 'cover';
  }
}
</script>

<style scoped>
.auto-card {
  cursor: pointer;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.card-image {
  position: relative;
  width: 100%;
  height: 220px;
  overflow: hidden;
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  border-radius: var(--border-radius-sm) var(--border-radius-sm) 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-image::before {
  content: '🚗';
  position: absolute;
  font-size: 64px;
  opacity: 0.3;
  z-index: 0;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  position: relative;
  z-index: 1;
}

.image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  position: relative;
  z-index: 1;
}

.placeholder-icon {
  font-size: 64px;
  opacity: 0.5;
  margin-bottom: 12px;
  filter: grayscale(100%);
}

.placeholder-text {
  color: var(--text-light);
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  padding: 0 16px;
  opacity: 0.7;
}

.auto-card:hover .card-image img {
  transform: scale(1.08);
}

.favorite-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition);
  backdrop-filter: blur(5px);
}

.favorite-btn:hover {
  background: white;
  transform: scale(1.1);
}

.favorite-btn.active {
  background: var(--accent-color);
  color: white;
  box-shadow: 0 4px 6px -1px rgba(220, 38, 38, 0.4);
}

.image-overlay {
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  z-index: 2;
}

.badge {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  color: white;
  backdrop-filter: blur(4px);
}

.badge.mileage {
  background: rgba(0, 0, 0, 0.7);
}

.badge.owner {
  background: rgba(220, 38, 38, 0.9);
}

.card-content {
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.card-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 12px;
  color: var(--text-color);
  line-height: 1.3;
}

.card-info {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 12px;
  font-size: 14px;
  color: var(--text-light);
}

.card-info span {
  padding: 4px 8px;
  background: var(--bg-darker);
  border-radius: 4px;
  font-size: 13px;
  color: var(--text-light);
}

.card-details {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 16px;
  font-size: 13px;
  color: var(--text-light);
}

.card-details span {
  padding: 4px 8px;
  background: var(--bg-darker);
  border-radius: 4px;
}

.card-footer {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid var(--border-color);
}

.price-box {
  background: rgba(220, 38, 38, 0.1);
  padding: 8px 12px;
  border-radius: var(--border-radius-sm);
  border: 1px solid rgba(220, 38, 38, 0.3);
}

.price {
  font-size: 24px;
  font-weight: 700;
  color: var(--accent-color);
}

.location {
  font-size: 14px;
  color: var(--text-muted);
}

@media (max-width: 768px) {
  .card-image {
    height: 180px;
  }

  .price {
    font-size: 20px;
  }
}
</style>
