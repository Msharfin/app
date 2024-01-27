import { sveltekit } from "@sveltejs/kit/vite"
import { defineConfig } from "vite"
import { paraglide } from "@inlang/paraglide-js-adapter-vite"

// import mkcert from "vite-plugin-mkcert"

export default defineConfig({
  // server: { https:true },
  plugins: [
    paraglide({
      project: "./project.inlang",
      outdir: "./src/paraglide",
    }), sveltekit(),
    // mkcert()
  ],
  ssr: {
    noExternal: ['@inlang/paraglide-js']
  },
  css: {
    preprocessorOptions: {
      sass: {
        additionalData: '@use "src/variables.sass" as *',
      },
    },
  },
})
