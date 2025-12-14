<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h3>🚗 Favorite Car</h3>
          <p>Авто-площадка для покупки и продажи автомобилей</p>
        </div>

        <div class="footer-section">
          <h4>Навигация</h4>
          <ul>
            <li><router-link to="/">Главная</router-link></li>
            <li><router-link to="/autos">Каталог</router-link></li>
            <li><router-link to="/favorites">Избранное</router-link></li>
          </ul>
        </div>

        <div class="footer-section">
          <h4>Контакты</h4>
          <p>Email: info@lovecar.ru</p>
          <p>Телефон: 89609463275</p>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; {{ currentYear }} Favorite Car. Все права защищены.</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from "vue";

const currentYear = computed(() => new Date().getFullYear());
</script>

<style scoped>
.footer {
  background: var(--bg-darker);
  color: white;
  margin-top: auto;
  padding: 60px 0 24px;
  border-top: 1px solid var(--border-color);
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  margin-bottom: 40px;
}

.footer-section h3 {
  margin-bottom: 16px;
  color: var(--primary-light);
  font-size: 24px;
  font-weight: 700;
}

.footer-section h4 {
  margin-bottom: 16px;
  color: white;
  font-size: 18px;
  font-weight: 600;
}

.footer-section p {
  color: #cbd5e1;
  line-height: 1.8;
  font-size: 14px;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section ul li {
  margin-bottom: 12px;
}

.footer-section a {
  color: #cbd5e1;
  text-decoration: none;
  transition: var(--transition);
  font-size: 14px;
  display: inline-block;
}

.footer-section a:hover {
  color: var(--primary-light);
  transform: translateX(4px);
}

.footer-bottom {
  text-align: center;
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: #94a3b8;
  font-size: 14px;
}
</style>
