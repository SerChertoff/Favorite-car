<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <button class="close-btn" @click="$emit('close')">×</button>

      <h2>{{ isLogin ? "Вход" : "Регистрация" }}</h2>

      <form @submit.prevent="handleSubmit" class="auth-form">
        <div v-if="!isLogin" class="form-group">
          <label>Имя</label>
          <input
            v-model="form.name"
            type="text"
            class="input"
            required
            placeholder="Ваше имя"
          />
        </div>

        <div class="form-group">
          <label>Email</label>
          <input
            v-model="form.email"
            type="email"
            class="input"
            required
            placeholder="email@example.com"
          />
        </div>

        <div class="form-group">
          <label>Пароль</label>
          <input
            v-model="form.password"
            type="password"
            class="input"
            required
            :minlength="isLogin ? undefined : 6"
            placeholder="Пароль"
          />
        </div>

        <div v-if="!isLogin" class="form-group">
          <label>Телефон</label>
          <input
            v-model="form.phone"
            type="tel"
            class="input"
            required
            placeholder="+7 (999) 123-45-67"
          />
        </div>

        <div v-if="error" class="error">{{ error }}</div>

        <button
          type="submit"
          class="btn btn-primary"
          :disabled="authStore.isLoading"
        >
          {{
            authStore.isLoading
              ? "Загрузка..."
              : isLogin
              ? "Войти"
              : "Зарегистрироваться"
          }}
        </button>
      </form>

      <div class="auth-switch">
        <span>{{ isLogin ? "Нет аккаунта?" : "Уже есть аккаунт?" }}</span>
        <button @click="switchMode" class="link-btn">
          {{ isLogin ? "Зарегистрироваться" : "Войти" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useAuthStore } from "@/store/auth";

interface Props {
  isLogin: boolean;
}

interface Emits {
  (e: "close"): void;
  (e: "success"): void;
  (e: "switch-mode"): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const authStore = useAuthStore();
const error = ref("");

const form = reactive({
  name: "",
  email: "",
  password: "",
  phone: "",
});

async function handleSubmit() {
  error.value = "";

  try {
    if (props.isLogin) {
      await authStore.login(form.email, form.password);
    } else {
      await authStore.register({
        name: form.name,
        email: form.email,
        password: form.password,
        phone: form.phone,
      });
    }
    emit("success");
  } catch (err: any) {
    error.value =
      err.response?.data?.message || "Произошла ошибка. Попробуйте снова.";
  }
}

function switchMode() {
  error.value = "";
  emit("switch-mode");
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.75);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.modal-content {
  background: var(--bg-card);
  border-radius: 16px;
  padding: 40px;
  max-width: 440px;
  width: 100%;
  position: relative;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--border-color);
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.close-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  background: var(--bg-darker);
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: var(--text-light);
  line-height: 1;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  transition: var(--transition);
}

.close-btn:hover {
  background: var(--bg-card-hover);
  color: var(--text-color);
}

.modal-content h2 {
  margin-bottom: 32px;
  color: var(--text-color);
  font-size: 28px;
  font-weight: 700;
  text-align: center;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-light);
}

.auth-switch {
  margin-top: 24px;
  text-align: center;
  color: var(--text-light);
  font-size: 14px;
}

.link-btn {
  background: none;
  border: none;
  color: var(--primary-color);
  cursor: pointer;
  text-decoration: none;
  margin-left: 6px;
  font-weight: 500;
  transition: var(--transition);
}

.link-btn:hover {
  color: var(--primary-dark);
  text-decoration: underline;
}

.error {
  background: #fef2f2;
  color: #dc2626;
  padding: 12px 16px;
  border-radius: var(--border-radius-sm);
  font-size: 14px;
  border: 1px solid #fecaca;
}
</style>
