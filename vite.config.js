import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "dist",
    assetsDir: "assets",
    cssCodeSplit: false, // CSS를 하나의 파일로 번들링
    rollupOptions: {
      output: {
        manualChunks: undefined,
        // 안드로이드 웹뷰 호환성을 위한 설정
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith(".css")) {
            return "assets/[name]-[hash][extname]";
          }
          return "assets/[name]-[hash][extname]";
        },
      },
    },
    // 안드로이드 웹뷰 호환성을 위한 설정
    target: "es2015",
    // minify: "terser",
    minify: "esbuild", // ✅ 기본값으로 지정
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
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
