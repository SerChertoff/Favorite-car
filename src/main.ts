import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './style.css'
import { logBasePath } from './utils/debug'

// Логируем информацию для отладки
logBasePath()

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// Обработка ошибок для отладки
app.config.errorHandler = (err, instance, info) => {
  console.error('Vue Error:', err, info)
  console.error('Error details:', {
    message: err instanceof Error ? err.message : String(err),
    stack: err instanceof Error ? err.stack : undefined,
    info
  })
}

// Проверяем, что элемент существует
const appElement = document.getElementById('app')
if (!appElement) {
  console.error('Element #app not found!')
} else {
  app.mount('#app')
  console.log('App mounted successfully')
}

