import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/portfolio/",
  plugins: [react()],
  build: {
    outDir: "gh-pages",
    emptyOutDir: true,
    assetsDir: "assets",
  },
});
