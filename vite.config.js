import { defineConfig } from 'vite';
import { createHash } from 'crypto';
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

export default defineConfig({
  css: { postcss: {} },
  build: {
    target: 'es2022',
    minify: 'esbuild',
    cssMinify: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: id => {
          if (id.includes('three')) return 'vendor';
          if (id.includes('transformers')) return 'ai';
        },
      },
    },
  },
  worker: { format: 'es' },
  server: { open: true },
  plugins: [sriPlugin()],
});

function sriPlugin() {
  return {
    name: 'sri-inject',
    enforce: 'post',
    apply: 'build',
    closeBundle() {
      const dist = resolve(__dirname, 'dist');
      const htmlPath = resolve(dist, 'index.html');
      try {
        let html = readFileSync(htmlPath, 'utf-8');
        html = html.replace(/<script[^>]+src="([^"]+)"[^>]*><\/script>/g, (match, src) => {
          const assetPath = resolve(dist, src.replace(/^\//, ''));
          try {
            const content = readFileSync(assetPath);
            const integrity = 'sha384-' + createHash('sha384').update(content).digest('base64');
            return match.replace('<script', `<script integrity="${integrity}" crossorigin="anonymous"`);
          } catch { return match; }
        });
        html = html.replace(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"[^>]*>/g, (match, href) => {
          const assetPath = resolve(dist, href.replace(/^\//, ''));
          try {
            const content = readFileSync(assetPath);
            const integrity = 'sha384-' + createHash('sha384').update(content).digest('base64');
            return match.replace('<link', `<link integrity="${integrity}" crossorigin="anonymous"`);
          } catch { return match; }
        });
        writeFileSync(htmlPath, html);
      } catch {}
    },
  };
}
