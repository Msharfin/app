import { addDynamicIconSelectors } from '@iconify/tailwind';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["selector", "[theme='dark']"],
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
        extend: {
            backgroundImage: {
                "logo": "url('/images/logo.webp')",
                "fancyShape": "url('/images/fancy_shape.webp')",
                "maDark": "url('/images/patriotism.webp')",
                "maLight": "url('/images/patriotism_dark.webp')",
                "blueCity": "url('/images/chefchaouen.webp')",
                "zellige": "url('/images/zellige.webp')"
            },
            colors: {
                transparent: "transparent",
                currentColor: "currentColor",
                "dimGray": "#1E1E1E",
                "brightGray": "#333c47",
                "darkAzure": "#16386A",
                "hoverDarkAzure": "#1C4685",
                "funBlue": "#0278F7",
                "hoverFunBlue": "#0250f7",
                "white": "#FFFFFF",
                "turquoisieGray": "#6A8AA9",
                "brightAzure": "#eaf2ff",
                "hoverBrightAzure": "#c9ddff",
            }
        },
        fontFamily: {
            "sans": ["Instrument Sans","sans-serif","Noto Color Emoji"]
        }
	},
	plugins: [
        addDynamicIconSelectors()
    ],
}
