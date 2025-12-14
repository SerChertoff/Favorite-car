<template>
  <div class="not-found">
    <div class="container">
      <div class="not-found-content">
        <h1>404</h1>
        <h2>Страница не найдена</h2>
        <p>Извините, запрашиваемая страница не существует.</p>
        <router-link to="/" class="btn btn-primary">На главную</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Компонент для страницы 404
</script>

<style scoped>
.not-found {
  padding: 60px 0;
  min-height: 60vh;
  display: flex;
  align-items: center;
}

.not-found-content {
  text-align: center;
  max-width: 500px;
  margin: 0 auto;
}

.not-found-content h1 {
  font-size: 120px;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 20px;
}

.not-found-content h2 {
  font-size: 32px;
  margin-bottom: 15px;
  color: var(--dark-color);
}

.not-found-content p {
  font-size: 18px;
  color: var(--text-light);
  margin-bottom: 30px;
}

@media (max-width: 768px) {
  .not-found-content h1 {
    font-size: 80px;
  }
  
  .not-found-content h2 {
    font-size: 24px;
  }
}
</style>

