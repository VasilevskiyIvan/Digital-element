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
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',

        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'assets/style.[hash].css';
          }
          if (/\.(woff|woff2|ttf|otf|eot)$/i.test(assetInfo.name || '')) {
            return 'assets/fonts/[name][extname]';
          }
          if (/\.(png|jpe?g|gif|svg|ico)$/i.test(assetInfo.name || '')) {
            return 'assets/[name][extname]';
          }
          return 'assets/[name][extname]';
        },
      },
    },
  },
});