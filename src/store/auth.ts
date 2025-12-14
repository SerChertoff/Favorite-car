import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from '@/types'
import apiService from '@/services/api'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(localStorage.getItem('authToken'))
  const isLoading = ref(false)

  const isAuthenticated = computed(() => !!token.value && !!user.value)

  function setAuth(authToken: string, userData: User) {
    token.value = authToken
    user.value = userData
    localStorage.setItem('authToken', authToken)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  function clearAuth() {
    token.value = null
    user.value = null
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
  }

  function loadUserFromStorage() {
    const storedUser = localStorage.getItem('user')
    if (storedUser && token.value) {
      user.value = JSON.parse(storedUser)
    }
  }

  async function login(email: string, password: string) {
    isLoading.value = true
    try {
      const response = await apiService.login(email, password)
      setAuth(response.token, response.user)
      return response
    } catch (error) {
      throw error
    } finally {
      isLoading.value = false
    }
  }

  async function register(userData: { name: string; email: string; password: string; phone: string }) {
    isLoading.value = true
    try {
      const response = await apiService.register(userData)
      setAuth(response.token, response.user)
      return response
    } catch (error) {
      throw error
    } finally {
      isLoading.value = false
    }
  }

  function logout() {
    clearAuth()
  }

  // Загружаем пользователя из localStorage при инициализации
  loadUserFromStorage()

  return {
    user,
    token,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    loadUserFromStorage
  }
})

