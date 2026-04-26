import basicSsl from "@vitejs/plugin-basic-ssl";
import { defineConfig } from "vite";
import { resolve } from "path";
import { NodePackageImporter } from "sass-embedded";

export default defineConfig({
  build: {
    outDir: "./docs",
    rolldownOptions: {
      output: {
        assetFileNames: "assets/[name][extname]",
        entryFileNames: "assets/[name].js",
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern",
        importers: [new NodePackageImporter()],
      }
    }
  },
  plugins: [basicSsl()],
  resolve: {
    alias: {
      "@app": resolve(__dirname, "src/app"),
      "@lib": resolve(__dirname, "src/lib"),
      "@lib/classes": resolve(__dirname, "src/lib/classes"),
      "@lib/extensions": resolve(__dirname, "src/lib/extensions"),
      "@lib/modules": resolve(__dirname, "src/lib/modules"),
      "@lib/types": resolve(__dirname, "src/lib/types"),
      "@lib/utils": resolve(__dirname, "src/lib/utils"),
    },
  },
  root: resolve(__dirname),
  server: {
    host: "localhost",
    https: true,
    port: 5173,
  },
});
