import type { Car } from "@/types";

// Моковые данные для демонстрации, когда API недоступен
export const mockCars: Car[] = [
  {
    id: "1",
    brand: "Toyota",
    model: "Camry",
    year: 2022,
    price: 2500000,
    mileage: 15000,
    fuelType: "бензин",
    transmission: "автомат",
    bodyType: "седан",
    color: "Белый",
    engineVolume: 2.5,
    description:
      "Отличное состояние, один владелец, полная комплектация. Все документы в порядке.",
    images: [],
    location: "Москва",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    sellerId: "1",
    sellerName: "Иван Петров",
    sellerPhone: "+7 (999) 123-45-67",
  },
  {
    id: "2",
    brand: "BMW",
    model: "X5",
    year: 2021,
    price: 4500000,
    mileage: 25000,
    fuelType: "бензин",
    transmission: "автомат",
    bodyType: "внедорожник",
    color: "Черный",
    engineVolume: 3.0,
    description:
      "Премиум комплектация, кожаный салон, панорамная крыша. Идеальное состояние.",
    images: [],
    location: "Санкт-Петербург",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
    sellerId: "2",
    sellerName: "Мария Сидорова",
    sellerPhone: "+7 (999) 234-56-78",
  },
  {
    id: "3",
    brand: "Mercedes-Benz",
    model: "C-Class",
    year: 2023,
    price: 3200000,
    mileage: 5000,
    fuelType: "бензин",
    transmission: "автомат",
    bodyType: "седан",
    color: "Серебристый",
    engineVolume: 2.0,
    description: "Новый автомобиль, почти без пробега. Все гарантии сохранены.",
    images: [],
    location: "Москва",
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    updatedAt: new Date(Date.now() - 172800000).toISOString(),
    sellerId: "3",
    sellerName: "Алексей Иванов",
    sellerPhone: "+7 (999) 345-67-89",
  },
  {
    id: "4",
    brand: "Audi",
    model: "A4",
    year: 2020,
    price: 2800000,
    mileage: 40000,
    fuelType: "бензин",
    transmission: "автомат",
    bodyType: "седан",
    color: "Синий",
    engineVolume: 2.0,
    description: "Отличное техническое состояние, регулярное ТО. Без ДТП.",
    images: [],
    location: "Казань",
    createdAt: new Date(Date.now() - 259200000).toISOString(),
    updatedAt: new Date(Date.now() - 259200000).toISOString(),
    sellerId: "4",
    sellerName: "Дмитрий Смирнов",
    sellerPhone: "+7 (999) 456-78-90",
  },
  {
    id: "5",
    brand: "Volkswagen",
    model: "Tiguan",
    year: 2021,
    price: 2200000,
    mileage: 30000,
    fuelType: "бензин",
    transmission: "автомат",
    bodyType: "внедорожник",
    color: "Белый",
    engineVolume: 2.0,
    description:
      "Семейный автомобиль в отличном состоянии. Все документы готовы.",
    images: [],
    location: "Екатеринбург",
    createdAt: new Date(Date.now() - 345600000).toISOString(),
    updatedAt: new Date(Date.now() - 345600000).toISOString(),
    sellerId: "5",
    sellerName: "Ольга Козлова",
    sellerPhone: "+7 (999) 567-89-01",
  },
  {
    id: "6",
    brand: "Hyundai",
    model: "Solaris",
    year: 2022,
    price: 1500000,
    mileage: 20000,
    fuelType: "бензин",
    transmission: "механика",
    bodyType: "седан",
    color: "Красный",
    engineVolume: 1.6,
    description: "Экономичный и надежный автомобиль. Идеален для города.",
    images: [],
    location: "Новосибирск",
    createdAt: new Date(Date.now() - 432000000).toISOString(),
    updatedAt: new Date(Date.now() - 432000000).toISOString(),
    sellerId: "6",
    sellerName: "Сергей Волков",
    sellerPhone: "+7 (999) 678-90-12",
  },
];

// Функция для фильтрации моковых данных
export function filterMockCars(
  cars: Car[],
  filters?: {
    brand?: string;
    model?: string;
    minYear?: number;
    maxYear?: number;
    minPrice?: number;
    maxPrice?: number;
    fuelType?: string;
    transmission?: string;
    bodyType?: string;
    location?: string;
  }
): Car[] {
  let filtered = [...cars];

  if (filters?.brand) {
    filtered = filtered.filter((car) =>
      car.brand.toLowerCase().includes(filters.brand!.toLowerCase())
    );
  }

  if (filters?.model) {
    filtered = filtered.filter((car) =>
      car.model.toLowerCase().includes(filters.model!.toLowerCase())
    );
  }

  if (filters?.minYear) {
    filtered = filtered.filter((car) => car.year >= filters.minYear!);
  }

  if (filters?.maxYear) {
    filtered = filtered.filter((car) => car.year <= filters.maxYear!);
  }

  if (filters?.minPrice) {
    filtered = filtered.filter((car) => car.price >= filters.minPrice!);
  }

  if (filters?.maxPrice) {
    filtered = filtered.filter((car) => car.price <= filters.maxPrice!);
  }

  if (filters?.fuelType) {
    filtered = filtered.filter((car) => car.fuelType === filters.fuelType);
  }

  if (filters?.transmission) {
    filtered = filtered.filter(
      (car) => car.transmission === filters.transmission
    );
  }

  if (filters?.bodyType) {
    filtered = filtered.filter((car) => car.bodyType === filters.bodyType);
  }

  if (filters?.location) {
    filtered = filtered.filter((car) =>
      car.location.toLowerCase().includes(filters.location!.toLowerCase())
    );
  }

  return filtered;
}

// Функция для сортировки моковых данных
export function sortMockCars(
  cars: Car[],
  sortBy?: string,
  sortOrder: "asc" | "desc" = "desc"
): Car[] {
  const sorted = [...cars];

  if (!sortBy) return sorted;

  sorted.sort((a, b) => {
    let aValue: any;
    let bValue: any;

    switch (sortBy) {
      case "price":
        aValue = a.price;
        bValue = b.price;
        break;
      case "year":
        aValue = a.year;
        bValue = b.year;
        break;
      case "mileage":
        aValue = a.mileage;
        bValue = b.mileage;
        break;
      case "createdAt":
        aValue = new Date(a.createdAt).getTime();
        bValue = new Date(b.createdAt).getTime();
        break;
      default:
        return 0;
    }

    if (sortOrder === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  return sorted;
}
