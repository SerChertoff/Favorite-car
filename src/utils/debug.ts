// Утилита для отладки на GitHub Pages
export function logBasePath() {
  if (import.meta.env.PROD) {
    console.log('Base URL:', import.meta.env.BASE_URL)
    console.log('Current pathname:', window.location.pathname)
    console.log('Current href:', window.location.href)
  }
}

