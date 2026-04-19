import { defineConfig } from "vite";
import type { IncomingMessage, ServerResponse } from "http";

export default defineConfig({
  plugins: [
    {
      name: "contact-endpoint",
      configureServer(server) {
        server.middlewares.use("/contact", (req: IncomingMessage, res: ServerResponse, next) => {
          if (req.method !== "POST") {
            next();
            return;
          }
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ ok: true }));
        });
      },
    },
  ],
  server: {
    port: 3000,
  },
  build: {
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith(".css")) {
            return "assets/style.[hash].css";
          }
          return assetInfo.name || "";
        },
      },
    },
  },
});