import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// Vite configuration
export default defineConfig({
  plugins: [
    react(), // Add React plugin
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Resolve '@' to the 'src' directory
    },
  },
  build: {
    outDir: "dist", // Output directory for production build
    sourcemap: true, // Enable source maps for debugging in production
    rollupOptions: {
      input: path.resolve(__dirname, "index.html"), // Ensure correct entry point
    },
  },
  define: {
    "process.env": {}, // Ensure compatibility for libraries expecting 'process.env'
  },
})
