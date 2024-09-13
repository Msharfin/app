import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import viteBasicSslPlugin from '@vitejs/plugin-basic-ssl';

export default defineConfig({
	plugins: [sveltekit(), process.env.NODE_ENV === "development" ? viteBasicSslPlugin(): null ]
});
