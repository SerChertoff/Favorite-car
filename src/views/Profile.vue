<template>
  <div class="profile">
    <div class="container">
      <h1 class="page-title">Личный кабинет</h1>
      
      <div v-if="!authStore.isAuthenticated" class="not-authorized">
        <p>Необходимо войти в систему</p>
        <router-link to="/" class="btn btn-primary">На главную</router-link>
      </div>
      
      <div v-else class="profile-content">
        <div class="profile-card card">
          <h2>Профиль пользователя</h2>
          <div class="profile-info">
            <div class="info-item">
              <span class="label">Имя:</span>
              <span class="value">{{ authStore.user?.name || 'Не указано' }}</span>
            </div>
            <div class="info-item">
              <span class="label">Email:</span>
              <span class="value">{{ authStore.user?.email || 'Не указано' }}</span>
            </div>
            <div class="info-item">
              <span class="label">Телефон:</span>
              <span class="value">{{ authStore.user?.phone || 'Не указано' }}</span>
            </div>
          </div>
          <button @click="authStore.logout()" class="btn btn-outline">Выйти</button>
        </div>
        
        <div class="my-cars card">
          <h2>Мои автомобили</h2>
          <div v-if="loading" class="loading">Загрузка...</div>
          <div v-else-if="myCars.length === 0" class="empty-state">
            <p>У вас пока нет добавленных автомобилей</p>
            <router-link to="/add-car" class="btn btn-primary">Добавить автомобиль</router-link>
          </div>
          <div v-else class="cars-grid">
            <AutoCard v-for="car in myCars" :key="car.id" :car="car" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import type { Car } from '@/types'
import apiService from '@/services/api'
import AutoCard from '@/components/AutoCard.vue'

const router = useRouter()
const authStore = useAuthStore()
const myCars = ref<Car[]>([])
const loading = ref(false)

onMounted(async () => {
  if (!authStore.isAuthenticated) {
    router.push('/')
    return
  }
  
  loading.value = true
  try {
    // В реальном API должен быть endpoint для получения автомобилей пользователя
    // Пока используем общий список
    const response = await apiService.getCars()
    // Фильтруем по sellerId (в реальном API это должно быть на бэкенде)
    myCars.value = response.cars.filter(
      car => car.sellerId === authStore.user?.id
    )
  } catch (error) {
    console.error('Ошибка при загрузке автомобилей:', error)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.profile {
  padding: 30px 0;
  min-height: 60vh;
}

.profile-content {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.profile-card,
.my-cars {
  padding: 30px;
}

.profile-card h2,
.my-cars h2 {
  margin-bottom: 20px;
  color: var(--dark-color);
}

.profile-info {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;
}

.info-item {
  display: flex;
  gap: 10px;
}

.info-item .label {
  font-weight: 500;
  min-width: 100px;
  color: var(--text-light);
}

.info-item .value {
  color: var(--text-color);
}

.not-authorized,
.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: var(--text-light);
}

.not-authorized p,
.empty-state p {
  font-size: 18px;
  margin-bottom: 20px;
}

.cars-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
}

@media (max-width: 768px) {
  .cars-grid {
    grid-template-columns: 1fr;
  }
}
</style>

