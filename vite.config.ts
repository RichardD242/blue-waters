import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        "/api/brave": {
          target: "https://api.search.brave.com/res/v1/web",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/brave/, ""),
          headers: {
            "X-Subscription-Token": env.BRAVE_API_KEY ?? "",
            Accept: "application/json",
          },
        },
      },
    },
  };
});
