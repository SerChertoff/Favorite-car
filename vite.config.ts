import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";

// Определяем base path для GitHub Pages
// Автоматически определяется из переменной окружения VITE_BASE_PATH
// В GitHub Actions эта переменная устанавливается автоматически из имени репозитория
const base = process.env.VITE_BASE_PATH || 
  (process.env.NODE_ENV === "production" ? "/Favorite-car/" : "/");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: base,
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
});
