import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.js',           // Entry point for the library
      name: 'swiperbox',               // Global variable name for UMD
      cssFileName: 'swiperbox.min',
      fileName: (format) => `swiperbox.${format}.js`, // Output filename pattern
      formats: ['es', 'umd', 'iife'],          // Output formats
    },
    rolldownOptions: {
      // Avoid bundling dependencies
      external: [
        /^swiper/i,
      ],
      output: {
        globals: {
          swiper: 'Swiper',
        }
      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      }
    }
  }
});
