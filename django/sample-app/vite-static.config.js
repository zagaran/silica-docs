import { defineConfig } from 'vite'
import externalGlobals from 'rollup-plugin-external-globals';

const glob = require('glob');

const SRC_LOCATION = 'src/pages';
const DEST_LOCATION = 'static/js/dist';

export default defineConfig({
  plugins: [
    externalGlobals({
      vue: 'Vue'
    }),
  ],
  build: {
    emptyOutDir: false,
    outDir: DEST_LOCATION,
    minify: "terser",
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      input: glob.sync(`${SRC_LOCATION}/**/*.js`),
      preserveEntrySignatures: true,
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue'
        },
        preserveModules: true,
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
        assetFileNames: `[name].[ext]`,
      }
    }
  }
})