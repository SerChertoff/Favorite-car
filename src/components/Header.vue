<template>
  <header class="header">
    <div class="container">
      <nav class="nav">
        <router-link to="/" class="logo">
          <h1>🚗 Favorite Car</h1>
        </router-link>

        <ul class="nav-links">
          <li><router-link to="/">Главная</router-link></li>
          <li><router-link to="/autos">Каталог</router-link></li>
          <li v-if="authStore.isAuthenticated">
            <router-link to="/add-car">Добавить авто</router-link>
          </li>
          <li>
            <router-link to="/favorites" class="favorites-link">
              Избранное
              <span v-if="favoritesStore.favoritesCount > 0" class="badge">
                {{ favoritesStore.favoritesCount }}
              </span>
            </router-link>
          </li>
        </ul>

        <div class="auth-section">
          <template v-if="authStore.isAuthenticated">
            <router-link to="/profile" class="profile-link">
              {{ authStore.user?.name || "Профиль" }}
            </router-link>
            <button @click="handleLogout" class="btn btn-outline">Выйти</button>
          </template>
          <template v-else>
            <button @click="showLogin = true" class="btn btn-outline">
              Войти
            </button>
            <button @click="showRegister = true" class="btn btn-primary">
              Регистрация
            </button>
          </template>
        </div>
      </nav>
    </div>

    <!-- Модалки авторизации -->
    <AuthModal
      v-if="showLogin || showRegister"
      :isLogin="showLogin"
      @close="
        showLogin = false;
        showRegister = false;
      "
      @success="handleAuthSuccess"
      @switch-mode="handleSwitchMode"
    />
  </header>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/auth";
import { useFavoritesStore } from "@/store/favorites";
import AuthModal from "./AuthModal.vue";

const router = useRouter();
const authStore = useAuthStore();
const favoritesStore = useFavoritesStore();

const showLogin = ref(false);
const showRegister = ref(false);

function handleLogout() {
  authStore.logout();
  router.push("/");
}

function handleAuthSuccess() {
  showLogin.value = false;
  showRegister.value = false;
}

function handleSwitchMode() {
  showLogin.value = !showLogin.value;
  showRegister.value = !showRegister.value;
}
</script>

<style scoped>
.header {
  background: var(--bg-card);
  box-shadow: var(--shadow);
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid var(--border-color);
}

.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
  gap: 20px;
}

.logo {
  text-decoration: none;
  color: var(--primary-light);
}

.logo h1 {
  font-size: 24px;
  font-weight: 700;
  margin: 0;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 32px;
  flex: 1;
  margin-left: 40px;
  padding: 0;
}

.nav-links a {
  text-decoration: none;
  color: var(--text-light);
  font-weight: 500;
  font-size: 15px;
  transition: var(--transition);
  position: relative;
  padding: 4px 0;
}

.nav-links a::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--primary-color);
  transition: var(--transition);
}

.nav-links a:hover,
.nav-links a.router-link-active {
  color: var(--primary-light);
}

.nav-links a:hover::after,
.nav-links a.router-link-active::after {
  width: 100%;
}

.favorites-link {
  display: flex;
  align-items: center;
  gap: 8px;
}

.badge {
  background: var(--accent-color);
  color: white;
  border-radius: 12px;
  padding: 2px 8px;
  font-size: 11px;
  font-weight: 600;
  min-width: 20px;
  text-align: center;
}

.auth-section {
  display: flex;
  gap: 12px;
  align-items: center;
}

.profile-link {
  text-decoration: none;
  color: var(--text-light);
  font-weight: 500;
  margin-right: 8px;
  font-size: 15px;
  transition: var(--transition);
}

.profile-link:hover {
  color: var(--primary-light);
}

@media (max-width: 768px) {
  .nav {
    flex-wrap: wrap;
  }

  .nav-links {
    order: 3;
    width: 100%;
    margin-left: 0;
    gap: 20px;
    flex-wrap: wrap;
    justify-content: center;
  }

  .auth-section {
    order: 2;
    flex-wrap: wrap;
  }

  .logo h1 {
    font-size: 20px;
  }
}
</style>
