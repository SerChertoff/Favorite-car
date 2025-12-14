import axios, { AxiosInstance, AxiosError } from 'axios'
import type { Car, CarSearchParams } from '@/types'
import { mockCars, filterMockCars, sortMockCars } from './mockData'

class ApiService {
  private api: AxiosInstance
  private useMockData: boolean

  constructor() {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'
    // Определяем, нужно ли использовать моковые данные по умолчанию
    // В продакшене на GitHub Pages API недоступен, поэтому всегда используем моковые данные
    const isProduction = import.meta.env.PROD
    const isLocalhost = apiUrl.includes('localhost') || apiUrl.includes('127.0.0.1')
    
    // Используем моковые данные если:
    // 1. В продакшене (GitHub Pages) - всегда используем моковые данные
    // 2. Или API URL указывает на localhost (в продакшене это означает отсутствие реального API)
    // 3. Или в разработке, но API URL указывает на localhost (для демо)
    this.useMockData = isProduction || isLocalhost
    
    console.log('API Service init:', { 
      isProduction, 
      apiUrl, 
      useMockData: this.useMockData,
      mockCarsCount: mockCars.length 
    })

    this.api = axios.create({
      baseURL: apiUrl,
      timeout: 3000, // Короткий таймаут для быстрого переключения на моковые данные
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
    // Если используем моковые данные по умолчанию (в продакшене без API)
    if (this.useMockData) {
      console.log('Используем моковые данные (useMockData = true)')
      const result = this.getMockCars(params)
      console.log('Моковые данные возвращены:', result)
      return result
    }

    // Пытаемся получить данные с API
    try {
      const response = await this.api.get('/cars', { params })
      // Убеждаемся, что response.data имеет правильную структуру
      if (response.data && Array.isArray(response.data.cars)) {
        return response.data
      }
      // Если структура неправильная, используем моковые данные
      console.warn('Неправильная структура ответа API, используем моковые данные')
      return this.getMockCars(params)
    } catch (error) {
      // Если ошибка сети или CORS, используем моковые данные
      if (error instanceof AxiosError && (error.code === 'ERR_NETWORK' || error.code === 'ERR_CORS' || error.message.includes('CORS'))) {
        console.warn('API недоступен, используем моковые данные:', error.code)
        return this.getMockCars(params)
      }
      console.error('Ошибка при получении списка автомобилей:', error)
      // В любом случае, если API не работает, возвращаем моковые данные
      console.warn('Возвращаем моковые данные из-за ошибки API')
      return this.getMockCars(params)
    }
  }

  // Получить моковые данные
  private getMockCars(params?: CarSearchParams): { cars: Car[]; total: number } {
    let cars = [...mockCars]
    console.log('getMockCars вызван, исходное количество:', cars.length)

    // Применяем фильтры
    if (params) {
      cars = filterMockCars(cars, {
        brand: params.brand,
        model: params.model,
        minYear: params.minYear,
        maxYear: params.maxYear,
        minPrice: params.minPrice,
        maxPrice: params.maxPrice,
        fuelType: params.fuelType,
        transmission: params.transmission,
        bodyType: params.bodyType,
        location: params.location
      })
      console.log('После фильтрации:', cars.length)

      // Применяем сортировку
      if (params.sortBy) {
        cars = sortMockCars(cars, params.sortBy, params.sortOrder || 'desc')
      }
    }

    // Применяем пагинацию
    const total = cars.length
    const limit = params?.limit || 10
    const page = params?.page || 1
    const offset = (page - 1) * limit
    cars = cars.slice(offset, offset + limit)
    console.log('После пагинации:', cars.length, 'из', total)

    return { cars, total }
  }

  // Получить автомобиль по ID
  async getCarById(id: string): Promise<Car> {
    // Если используем моковые данные по умолчанию
    if (this.useMockData) {
      const car = mockCars.find(c => c.id === id)
      if (car) {
        return car
      }
      throw new Error(`Автомобиль с ID ${id} не найден`)
    }

    // Пытаемся получить данные с API
    try {
      const response = await this.api.get(`/cars/${id}`)
      return response.data
    } catch (error) {
      // Если ошибка сети или CORS, ищем в моковых данных
      if (error instanceof AxiosError && (error.code === 'ERR_NETWORK' || error.code === 'ERR_CORS')) {
        const car = mockCars.find(c => c.id === id)
        if (car) {
          console.warn('API недоступен, используем моковые данные')
          return car
        }
      }
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

