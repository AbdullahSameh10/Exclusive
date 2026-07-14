import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@Authentication": path.resolve(__dirname, "./src/Authentication"),
      "@Components": path.resolve(__dirname, "./src/Components"),
      "@Contexts": path.resolve(__dirname, "./src/Components/Contexts"),
      "@Elements": path.resolve(__dirname, "./src/Components/Elements"),
      "@Hooks": path.resolve(__dirname, "./src/Components/Hooks"),
      "@Layouts": path.resolve(__dirname, "./src/Components/Layouts"),
      "@Routers": path.resolve(__dirname, "./src/Components/Routers"),
      "@Utilities": path.resolve(__dirname, "./src/Components/Utilities"),
      "@Assets": path.resolve(__dirname, "./src/Components/Assets"),
    },
  },
});
