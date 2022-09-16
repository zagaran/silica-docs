import path from 'path'
import { defineConfig } from 'vite'
import vuePlugin from "@vitejs/plugin-vue2";
import externalGlobals from 'rollup-plugin-external-globals';

const DEST_PATH = path.join(__dirname, 'static/js/dist/vue/');

export default defineConfig({
  plugins: [
    vuePlugin(),
    externalGlobals({
      vue: 'Vue'
    }),
  ],
  build: {
    emptyOutDir: false,
    outDir: DEST_PATH,
    // minify: "terser",
    rollupOptions: {
      input: "src/main.js",
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue'
        },
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
        assetFileNames: `[name].[ext]`,
      }
    }
  }
})