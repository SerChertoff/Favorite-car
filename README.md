# Favorite Car - Авто-площадка

Современное SPA-приложение для покупки и продажи автомобилей, построенное на Vue.js 3 с TypeScript.

## 🚀 Технологии

- **Vue.js 3** - прогрессивный JavaScript фреймворк
- **TypeScript** - типизированный JavaScript
- **Vue Router** - маршрутизация для SPA
- **Pinia** - управление состоянием
- **Vite** - быстрый сборщик
- **Axios** - HTTP-клиент

## 📋 Функциональность

- 🔍 Поиск и фильтрация автомобилей
- 📱 Адаптивный дизайн
- ❤️ Избранное (сохранение в localStorage)
- 👤 Авторизация и регистрация
- 🚗 Добавление собственных объявлений
- 📄 Детальная информация об автомобилях
- 🎨 Современный и удобный интерфейс

## 🛠️ Установка и запуск

### Требования

- Node.js 18+
- npm или yarn

### Установка зависимостей

```bash
npm install
```

### Разработка

```bash

```

Приложение будет доступно по адресу `http://localhost:3000`

### Сборка для продакшена

```bash
npm run build
```

Собранные файлы будут в папке `dist`

### Предпросмотр продакшен-сборки

```bash
npm run preview
```

## 📁 Структура проекта

```
favorite-car/
├── src/
│   ├── components/      # Переиспользуемые компоненты
│   │   ├── Header.vue
│   │   ├── Footer.vue
│   │   ├── AutoCard.vue
│   │   ├── SearchBar.vue
│   │   └── AuthModal.vue
│   ├── views/           # Страницы приложения
│   │   ├── Home.vue
│   │   ├── AutoList.vue
│   │   ├── AutoDetail.vue
│   │   ├── AddCar.vue
│   │   ├── Profile.vue
│   │   ├── Favorites.vue
│   │   └── NotFound.vue
│   ├── router/          # Конфигурация маршрутов
│   │   └── index.ts
│   ├── store/           # Pinia stores
│   │   ├── auth.ts
│   │   └── favorites.ts
│   ├── services/        # API сервисы
│   │   └── api.ts
│   ├── types/           # TypeScript типы
│   │   └── index.ts
│   ├── App.vue          # Корневой компонент
│   ├── main.ts          # Точка входа
│   └── style.css        # Глобальные стили
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🔧 Конфигурация

### Переменные окружения

Создайте файл `.env` в корне проекта:

```env
VITE_API_URL=http://localhost:3001/api
```

По умолчанию используется `http://localhost:3001/api`

## 📡 API

Приложение ожидает следующий API:

### Автомобили

- `GET /api/cars` - получить список автомобилей
- `GET /api/cars/:id` - получить автомобиль по ID
- `POST /api/cars` - создать новый автомобиль
- `PUT /api/cars/:id` - обновить автомобиль
- `DELETE /api/cars/:id` - удалить автомобиль

### Авторизация

- `POST /api/auth/login` - вход
- `POST /api/auth/register` - регистрация

## 🎨 Стилизация

Проект использует CSS переменные для цветовой схемы. Основные цвета можно изменить в `src/style.css`:

```css
:root {
  --primary-color: #e74c3c;
  --secondary-color: #3498db;
  --dark-color: #2c3e50;
  /* ... */
}
```

## 📝 Лицензия

MIT

## 👨‍💻 Разработка

Проект создан с использованием современных практик разработки:

- Компонентный подход
- TypeScript для типобезопасности
- SOLID принципы
- Адаптивный дизайн
- Оптимизация производительности
