import { defineConfig } from "vite";
import path from 'path'

export default defineConfig({
  root: path.join(__dirname, 'src'),
  build: {
    outDir: path.join(__dirname, "dist"),
    rollupOptions: {
      input: path.join(__dirname, 'src','index.html')
    }
  }
});
