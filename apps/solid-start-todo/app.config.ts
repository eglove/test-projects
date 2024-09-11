import { defineConfig } from "@solidjs/start/config";

export default defineConfig({
  server: {
    preset: "static",
  },
  solid: {
    ssr: false,
  },
  ssr: false,
});
