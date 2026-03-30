import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { resolve } from "node:path";

// https://vite.dev/config/
export default defineConfig({
  build: {
    rolldownOptions: {
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          "react-dom": "ReactDOM",
          react: "React",
        },
      },
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["react", "react-dom"],
    },
    lib: {
      entry: resolve(import.meta.dirname, "lib/main.js"),
      // the proper extensions will be added
      fileName: "my-lib",
      name: "MyLib",
    },
    outDir: "build",
  },
  plugins: [react()],
});
