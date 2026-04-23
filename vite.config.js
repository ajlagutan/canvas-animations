import { defineConfig } from "vite";
import { resolve } from "path";
import basicSsl from "@vitejs/plugin-basic-ssl";

export default defineConfig({
  root: resolve(__dirname),
  build: {
    outDir: "./docs",
    rolldownOptions: {
      output: {
        assetFileNames: "assets/[name][extname]",
        entryFileNames: "assets/[name].js",
      },
    },
  },
  plugins: [basicSsl()],
  server: {
    host: 'localhost',
    https: true,
    port: 5173,
  },
});
