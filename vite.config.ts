import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig(({ mode }) => {
  const envDir = path.resolve(import.meta.dirname, "");
  const env = loadEnv(mode, envDir, "");

  let allowedHostUrls = [];
  allowedHostUrls = JSON.parse(env.VITE_ALLOWED_HOST_URLS ?? "[]");
  if (allowedHostUrls) {
    for (let i = 0; i < allowedHostUrls.length; i++) {
      try {
        allowedHostUrls[i] = new URL(allowedHostUrls[i]).hostname;
      } catch (_) {}
    }
  }
  console.log(path.resolve(import.meta.dirname, "./src"));
  return {
    plugins: [react(), tailwindcss()],
    envDir: envDir,
    server: {
      allowedHosts: allowedHostUrls,
      hmr: {
        host: allowedHostUrls[0],
        protocol: "wss",
        clientPort: 443,
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "./src"),
      },
    },
  };
});
