import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // Dev only: forwards /api calls to the local Express server
      "/api": "http://localhost:4000",
    },
  },
});