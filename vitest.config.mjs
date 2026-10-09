import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    pool: "@cloudflare/vitest-pool-workers",
    poolOptions: {
      workers: {
        wrangler: { configPath: "./wrangler.toml" },
        miniflare: {
          compatibilityDate: "2024-11-01",
          kvNamespaces: ["STATE"],
          d1Databases: ["DB"],
        },
      },
    },
  },
});
