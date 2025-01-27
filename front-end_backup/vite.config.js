import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    postcss: {
      plugins: [],
    },
  },
  base: "./",
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // if (id.includes('src/UserDetails') || id.includes('src/UserDashboard') || id.includes('src/UserProfileEdit')) {
          //               return 'group-user'
          // }
        },
      },
    },
  },
});

