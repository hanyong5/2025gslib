import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // 외부에서 접근 가능하도록 설정
    port: 3000, // 명시적 포트 설정
    proxy: {
      "/api": {
        target: "http://101.55.20.4:8000",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
        configure: (proxy, options) => {
          proxy.on("error", (err, req, res) => {
            console.log("프록시 에러:", err);
          });
          proxy.on("proxyReq", (proxyReq, req, res) => {
            console.log("프록시 요청:", req.method, req.url);
          });
          proxy.on("proxyRes", (proxyRes, req, res) => {
            console.log("프록시 응답:", proxyRes.statusCode, req.url);
          });
        },
      },
    },
  },
});
