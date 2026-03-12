import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react({ include: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"] })],
  server: { host: "0.0.0.0", port: 3000 },
  publicDir: "public",
});
