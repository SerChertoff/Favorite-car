export interface Car {
  id: string
  brand: string
  model: string
  year: number
  price: number
  mileage: number
  fuelType: 'бензин' | 'дизель' | 'электричество' | 'гибрид'
  transmission: 'механика' | 'автомат' | 'робот' | 'вариатор'
  bodyType: 'седан' | 'хэтчбек' | 'универсал' | 'внедорожник' | 'купе' | 'кабриолет'
  color: string
  engineVolume: number
  description: string
  images: string[]
  location: string
  sellerId: string
  sellerName: string
  sellerPhone: string
  createdAt: string
  updatedAt: string
}

export interface User {
  id: string
  name: string
  email: string
  phone: string
  avatar?: string
  createdAt: string
}

export interface CarFilters {
  brand?: string
  model?: string
  minPrice?: number
  maxPrice?: number
  minYear?: number
  maxYear?: number
  fuelType?: Car['fuelType']
  transmission?: Car['transmission']
  bodyType?: Car['bodyType']
  location?: string
}

export interface CarSearchParams extends CarFilters {
  page?: number
  limit?: number
  sortBy?: 'price' | 'year' | 'mileage' | 'createdAt'
  sortOrder?: 'asc' | 'desc'
}

