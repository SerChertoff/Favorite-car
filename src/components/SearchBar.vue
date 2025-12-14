<template>
  <div class="search-bar card">
    <form @submit.prevent="handleSearch" class="search-form">
      <div class="search-row">
        <input
          v-model="searchQuery"
          type="text"
          class="input search-input"
          placeholder="Марка, модель или ключевое слово..."
          @input="handleInput"
        />
        <button type="submit" class="btn btn-primary">Найти</button>
      </div>

      <div class="filters" v-if="showFilters">
        <div class="filter-group">
          <label>Цена от</label>
          <input
            v-model.number="filters.minPrice"
            type="number"
            class="input"
            placeholder="0"
            @input="handleFilterChange"
          />
        </div>
        <div class="filter-group">
          <label>Цена до</label>
          <input
            v-model.number="filters.maxPrice"
            type="number"
            class="input"
            placeholder="∞"
            @input="handleFilterChange"
          />
        </div>
        <div class="filter-group">
          <label>Год от</label>
          <input
            v-model.number="filters.minYear"
            type="number"
            class="input"
            :placeholder="String(currentYear - 20)"
            @input="handleFilterChange"
          />
        </div>
        <div class="filter-group">
          <label>Тип кузова</label>
          <select
            v-model="filters.bodyType"
            class="input"
            @change="handleFilterChange"
          >
            <option value="">Все</option>
            <option value="седан">Седан</option>
            <option value="хэтчбек">Хэтчбек</option>
            <option value="универсал">Универсал</option>
            <option value="внедорожник">Внедорожник</option>
            <option value="купе">Купе</option>
            <option value="кабриолет">Кабриолет</option>
          </select>
        </div>
        <div class="filter-group">
          <label>Топливо</label>
          <select
            v-model="filters.fuelType"
            class="input"
            @change="handleFilterChange"
          >
            <option value="">Все</option>
            <option value="бензин">Бензин</option>
            <option value="дизель">Дизель</option>
            <option value="электричество">Электричество</option>
            <option value="гибрид">Гибрид</option>
          </select>
        </div>
        <div class="filter-group">
          <label>КПП</label>
          <select
            v-model="filters.transmission"
            class="input"
            @change="handleFilterChange"
          >
            <option value="">Все</option>
            <option value="механика">Механика</option>
            <option value="автомат">Автомат</option>
            <option value="робот">Робот</option>
            <option value="вариатор">Вариатор</option>
          </select>
        </div>
        <button type="button" @click="clearFilters" class="btn btn-outline">
          Сбросить
        </button>
      </div>

      <button
        type="button"
        @click="showFilters = !showFilters"
        class="toggle-filters"
      >
        {{ showFilters ? "Скрыть фильтры" : "Показать фильтры" }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import type { CarFilters } from "@/types";

interface Emits {
  (e: "search", query: string, filters: CarFilters): void;
}

const emit = defineEmits<Emits>();

const searchQuery = ref("");
const showFilters = ref(false);

const currentYear = computed(() => new Date().getFullYear());

const filters = reactive<CarFilters>({
  minPrice: undefined,
  maxPrice: undefined,
  minYear: undefined,
  bodyType: undefined,
  fuelType: undefined,
  transmission: undefined,
});

function handleSearch() {
  emit("search", searchQuery.value, filters);
}

function handleInput() {
  // Можно добавить debounce для поиска в реальном времени
  emit("search", searchQuery.value, filters);
}

function handleFilterChange() {
  emit("search", searchQuery.value, filters);
}

function clearFilters() {
  searchQuery.value = "";
  Object.keys(filters).forEach((key) => {
    filters[key as keyof CarFilters] = undefined;
  });
  emit("search", "", filters);
}
</script>

<style scoped>
.search-bar {
  margin-bottom: 32px;
}

.search-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.search-row {
  display: flex;
  gap: 12px;
}

.search-input {
  flex: 1;
}

.filters {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 20px;
  padding-top: 24px;
  border-top: 1px solid var(--border-color);
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.filter-group label {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-color);
}

.toggle-filters {
  background: none;
  border: none;
  color: var(--primary-color);
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  padding: 8px 0;
  align-self: flex-start;
  transition: var(--transition);
  text-decoration: none;
}

.toggle-filters:hover {
  color: var(--primary-dark);
  text-decoration: underline;
}

@media (max-width: 768px) {
  .search-row {
    flex-direction: column;
  }

  .filters {
    grid-template-columns: 1fr;
  }
}
</style>
