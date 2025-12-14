<template>
  <div class="add-car">
    <div class="container">
      <h1 class="page-title">Добавить автомобиль</h1>
      
      <form @submit.prevent="handleSubmit" class="add-car-form card">
        <div v-if="error" class="error">{{ error }}</div>
        <div v-if="success" class="success">Автомобиль успешно добавлен!</div>
        
        <div class="form-grid">
          <div class="form-group">
            <label>Марка *</label>
            <input v-model="form.brand" type="text" class="input" required />
          </div>
          
          <div class="form-group">
            <label>Модель *</label>
            <input v-model="form.model" type="text" class="input" required />
          </div>
          
          <div class="form-group">
            <label>Год выпуска *</label>
            <input
              v-model.number="form.year"
              type="number"
              class="input"
              :min="1900"
              :max="currentYear + 1"
              required
            />
          </div>
          
          <div class="form-group">
            <label>Цена (₽) *</label>
            <input
              v-model.number="form.price"
              type="number"
              class="input"
              min="0"
              required
            />
          </div>
          
          <div class="form-group">
            <label>Пробег (км) *</label>
            <input
              v-model.number="form.mileage"
              type="number"
              class="input"
              min="0"
              required
            />
          </div>
          
          <div class="form-group">
            <label>Тип топлива *</label>
            <select v-model="form.fuelType" class="input" required>
              <option value="">Выберите</option>
              <option value="бензин">Бензин</option>
              <option value="дизель">Дизель</option>
              <option value="электричество">Электричество</option>
              <option value="гибрид">Гибрид</option>
            </select>
          </div>
          
          <div class="form-group">
            <label>КПП *</label>
            <select v-model="form.transmission" class="input" required>
              <option value="">Выберите</option>
              <option value="механика">Механика</option>
              <option value="автомат">Автомат</option>
              <option value="робот">Робот</option>
              <option value="вариатор">Вариатор</option>
            </select>
          </div>
          
          <div class="form-group">
            <label>Тип кузова *</label>
            <select v-model="form.bodyType" class="input" required>
              <option value="">Выберите</option>
              <option value="седан">Седан</option>
              <option value="хэтчбек">Хэтчбек</option>
              <option value="универсал">Универсал</option>
              <option value="внедорожник">Внедорожник</option>
              <option value="купе">Купе</option>
              <option value="кабриолет">Кабриолет</option>
            </select>
          </div>
          
          <div class="form-group">
            <label>Цвет *</label>
            <input v-model="form.color" type="text" class="input" required />
          </div>
          
          <div class="form-group">
            <label>Объем двигателя (л) *</label>
            <input
              v-model.number="form.engineVolume"
              type="number"
              class="input"
              step="0.1"
              min="0"
              required
            />
          </div>
          
          <div class="form-group">
            <label>Город *</label>
            <input v-model="form.location" type="text" class="input" required />
          </div>
          
          <div class="form-group full-width">
            <label>Описание</label>
            <textarea
              v-model="form.description"
              class="input"
              rows="5"
              placeholder="Опишите состояние автомобиля, историю обслуживания и т.д."
            ></textarea>
          </div>
          
          <div class="form-group full-width">
            <label>URL изображений (по одному на строку)</label>
            <textarea
              v-model="imageUrls"
              class="input"
              rows="3"
              placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
            ></textarea>
          </div>
        </div>
        
        <div class="form-actions">
          <button type="submit" class="btn btn-primary" :disabled="loading">
            {{ loading ? 'Добавление...' : 'Добавить автомобиль' }}
          </button>
          <router-link to="/autos" class="btn btn-outline">Отмена</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import apiService from '@/services/api'

const router = useRouter()
const authStore = useAuthStore()

const loading = ref(false)
const error = ref('')
const success = ref(false)
const imageUrls = ref('')

const currentYear = computed(() => new Date().getFullYear())

const form = reactive({
  brand: '',
  model: '',
  year: currentYear.value,
  price: 0,
  mileage: 0,
  fuelType: '' as 'бензин' | 'дизель' | 'электричество' | 'гибрид' | '',
  transmission: '' as 'механика' | 'автомат' | 'робот' | 'вариатор' | '',
  bodyType: '' as 'седан' | 'хэтчбек' | 'универсал' | 'внедорожник' | 'купе' | 'кабриолет' | '',
  color: '',
  engineVolume: 0,
  description: '',
  location: ''
})

async function handleSubmit() {
  if (!authStore.isAuthenticated) {
    error.value = 'Необходимо войти в систему'
    return
  }
  
  loading.value = true
  error.value = ''
  success.value = false
  
  try {
    const images = imageUrls.value
      .split('\n')
      .map(url => url.trim())
      .filter(url => url.length > 0)
    
    const carData = {
      ...form,
      images
    }
    
    const car = await apiService.createCar(carData)
    success.value = true
    
    setTimeout(() => {
      router.push(`/autos/${car.id}`)
    }, 1500)
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Не удалось добавить автомобиль. Попробуйте позже.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.add-car {
  padding: 30px 0;
  min-height: 60vh;
}

.add-car-form {
  max-width: 800px;
  margin: 0 auto;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-group label {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-color);
}

.form-actions {
  display: flex;
  gap: 15px;
  justify-content: flex-end;
}

.success {
  background-color: #dfd;
  color: #3a3;
  padding: 12px;
  border-radius: var(--border-radius);
  margin-bottom: 20px;
}

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .form-actions {
    flex-direction: column;
  }
}
</style>

