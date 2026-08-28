import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        dashboard: resolve(__dirname, 'dashboard.html'),
        learning: resolve(__dirname, 'learning.html'),
        about: resolve(__dirname, 'about.html'),
        guides: resolve(__dirname, 'guides.html'),
        feedback: resolve(__dirname, 'feedback.html'),
        markerbeta: resolve(__dirname, 'markerbeta.html'),
        quiz: resolve(__dirname, 'quiz.html'),
        camera: resolve(__dirname, 'camera.html'),
        starts: resolve(__dirname, 'starts.html'),
        detail: resolve(__dirname, 'page/detail.html'),
        challengestart: resolve(__dirname, 'rekap/challengestart.html'),
        opsiquiz: resolve(__dirname, 'rekap/opsiquiz.html'),
      },
    },
  },
});
