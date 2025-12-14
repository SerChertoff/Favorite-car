import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useFavoritesStore = defineStore('favorites', () => {
  const favoriteIds = ref<string[]>([])

  // Загружаем избранное из localStorage
  function loadFavorites() {
    const stored = localStorage.getItem('favorites')
    if (stored) {
      favoriteIds.value = JSON.parse(stored)
    }
  }

  // Сохраняем избранное в localStorage
  function saveFavorites() {
    localStorage.setItem('favorites', JSON.stringify(favoriteIds.value))
  }

  const favoritesCount = computed(() => favoriteIds.value.length)

  function addToFavorites(carId: string) {
    if (!favoriteIds.value.includes(carId)) {
      favoriteIds.value.push(carId)
      saveFavorites()
    }
  }

  function removeFromFavorites(carId: string) {
    const index = favoriteIds.value.indexOf(carId)
    if (index > -1) {
      favoriteIds.value.splice(index, 1)
      saveFavorites()
    }
  }

  function toggleFavorite(carId: string) {
    if (isFavorite(carId)) {
      removeFromFavorites(carId)
    } else {
      addToFavorites(carId)
    }
  }

  function isFavorite(carId: string): boolean {
    return favoriteIds.value.includes(carId)
  }

  // Инициализация
  loadFavorites()

  return {
    favoriteIds,
    favoritesCount,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    loadFavorites
  }
})

