import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
    plugins: [
        react(),
        tsconfigPaths(),
        viteStaticCopy({
            targets: [
                {
                    src: '404.html',
                    dest: '',
                },
            ],
        }),
    ],
    base: '/unofficial_fivem_spotify_integration/',
    optimizeDeps: {
        include: ['@asaayu-base/brand'],
        esbuildOptions: {
            target: 'esnext',
        },
    },
    build: {
        target: 'esnext',
        rollupOptions: {
            input: {
                main: 'index.html',
                player: 'player/index.html',
                login: 'login/index.html',
                logout: 'logout/index.html',
                'privacy-policy': 'privacy-policy/index.html',
                'end-user-license-agreement': 'end-user-license-agreement/index.html',
            },
        },
    },
    resolve: {
        alias: {
            process: 'process/browser',
            stream: 'stream-browserify',
            zlib: 'browserify-zlib',
            util: 'util',
        },
    },
});
