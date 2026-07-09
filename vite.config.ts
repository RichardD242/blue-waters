import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        "/api/tavily": {
          target: "https://api.tavily.com",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/tavily/, ""),
          headers: {
            Authorization: `Bearer ${env.TAVILY_API_KEY ?? ""}`,
          },
        },
      },
    },
  };
});
