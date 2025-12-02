import { defineConfig } from 'vite';
import injectHTML from 'vite-plugin-html-inject';

export default defineConfig({
    root: './src',
    base: '/businessCard/',
    server: {
        port: 3000,
    },
    build: {
        outDir: '../dist',
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: './src/index.html',
                eng: './src/indexEng.html',
                vi: './src/indexViet.html'
            },
        },
    },
    plugins: [
        injectHTML(),
    ],
});