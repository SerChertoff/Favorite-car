import axios, { AxiosInstance } from 'axios'
import type { Car, CarSearchParams } from '@/types'

class ApiService {
  private api: AxiosInstance

  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    // Добавляем interceptor для токенов авторизации
    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem('authToken')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    })
  }

  // Получить список автомобилей
  async getCars(params?: CarSearchParams): Promise<{ cars: Car[]; total: number }> {
    try {
      const response = await this.api.get('/cars', { params })
      return response.data
    } catch (error) {
      console.error('Ошибка при получении списка автомобилей:', error)
      throw error
    }
  }

  // Получить автомобиль по ID
  async getCarById(id: string): Promise<Car> {
    try {
      const response = await this.api.get(`/cars/${id}`)
      return response.data
    } catch (error) {
      console.error('Ошибка при получении автомобиля:', error)
      throw error
    }
  }

  // Создать новый автомобиль
  async createCar(carData: Omit<Car, 'id' | 'createdAt' | 'updatedAt' | 'sellerId' | 'sellerName' | 'sellerPhone'>): Promise<Car> {
    try {
      const response = await this.api.post('/cars', carData)
      return response.data
    } catch (error) {
      console.error('Ошибка при создании автомобиля:', error)
      throw error
    }
  }

  // Обновить автомобиль
  async updateCar(id: string, carData: Partial<Car>): Promise<Car> {
    try {
      const response = await this.api.put(`/cars/${id}`, carData)
      return response.data
    } catch (error) {
      console.error('Ошибка при обновлении автомобиля:', error)
      throw error
    }
  }

  // Удалить автомобиль
  async deleteCar(id: string): Promise<void> {
    try {
      await this.api.delete(`/cars/${id}`)
    } catch (error) {
      console.error('Ошибка при удалении автомобиля:', error)
      throw error
    }
  }

  // Авторизация
  async login(email: string, password: string): Promise<{ token: string; user: any }> {
    try {
      const response = await this.api.post('/auth/login', { email, password })
      return response.data
    } catch (error) {
      console.error('Ошибка при авторизации:', error)
      throw error
    }
  }

  // Регистрация
  async register(userData: { name: string; email: string; password: string; phone: string }): Promise<{ token: string; user: any }> {
    try {
      const response = await this.api.post('/auth/register', userData)
      return response.data
    } catch (error) {
      console.error('Ошибка при регистрации:', error)
      throw error
    }
  }
}

export default new ApiService()

