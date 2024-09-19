<script>
	import { goto } from "$app/navigation"
	import { changeTheme, theme } from "$lib/theme"
	import { scale } from "svelte/transition"
</script>

<section class="m-8 h-full flex justify-center">
    <div class="flex flex-col md:w-1/3">
        <div class="w-full flex">
            <div
                class="hoverEffect size-28 flex items-center justify-center rounded-xl p-4 bg-brightAzure dark:bg-darkAzure"
            >
                <span
                    class="bg-logo bg-contain bg-no-repeat size-20 bg-center"
                    title="Msharfin logo"
                ></span>
            </div>
            <div class="hoverEffect flex items-center ms-4 ps-4">
                <span class="text-funBlue font-bold text-4xl leading-8"
                    >Socialize with privacy</span
                >
            </div>
        </div>

        <div
            class="hoverEffect text-2xl md:text-3xl mt-4 py-1 px-2 w-full h-1/6 rounded-xl bg-funBlue bg-fancyShape bg-no-repeat bg-cover"
        >
            <div class=" text-white flex items-center">
                <span class="icon-[solar--shield-bold-duotone] me-2"></span>
                <span class="font-semibold"> Secure </span>
            </div>
            <div class=" text-white flex items-center">
                <span class="icon-[solar--lock-bold-duotone] me-2"></span>
                <span class="font-semibold"> Private </span>
            </div>
        </div>

        <div class="mt-4 w-full h-1/6 flex">
            <div
                class="hoverEffect w-2/3 flex items-center justify-center rounded-xl border-2 border-funBlue dark:border-darkAzure h-full"
            >
                <span
                    class="dark:bg-maLight bg-maDark bg-contain bg-no-repeat size-44 bg-center"
                ></span>
            </div>
            <button
                on:click={() => changeTheme()}
                class="hoverEffect text-funBlue text-5xl flex items-center justify-center rounded-xl bg-brightAzure hover:bg-hoverBrightAzure dark:bg-darkAzure hover:dark:bg-hoverDarkAzure ms-4 w-1/3"
            >
                {#if $theme === "dark"}
                    <span
                        in:scale={{ delay: 100, start: 1.5 }}
                        class="icon-[solar--moon-bold]"
                    ></span>
                {:else}
                    <span
                        in:scale={{ delay: 100, start: 1.5 }}
                        class="icon-[solar--moon-line-duotone]"
                    ></span>
                {/if}
            </button>
        </div>

        <div class="mt-4 w-full h-[10%]">
            <button
                on:click={() => goto("/auth/signup")}
                class="hover:bg-hoverFunBlue text-2xl flex items-center justify-center font-bold text-white hoverEffect py-1 px-2 w-full h-full rounded-xl bg-funBlue"
            >
                <span class="icon-[solar--add-circle-bold-duotone] me-2 text-3xl"
                ></span>
                <span>Create an account</span>
            </button>
        </div>

        <div class="mt-4 w-full h-[10%] flex">
            <button
                on:click={() => goto("/auth/login")}
                class="text-2xl me-4 flex items-center justify-center font-bold text-funBlue hoverEffect w-1/2 h-full rounded-xl bg-brightAzure hover:bg-hoverBrightAzure dark:bg-darkAzure dark:hover:bg-hoverDarkAzure"
            >
                <span class="icon-[solar--login-bold-duotone] me-2 text-3xl"></span>
                <span>Log in</span>
            </button>
            <span class="hoverEffect bg-blueCity w-1/2 bg-cover bg-center rounded-xl"
            ></span>
        </div>

        <div
            class="hoverEffect bg-zellige bg-contain bg-right rtl:bg-left bg-no-repeat mt-4 w-full flex-1 rounded-xl bg-brightAzure justify-end dark:bg-darkAzure font-semibold p-4 flex flex-col text-funBlue"
        >
            <a
                href="/blog"
                class="hover:text-hoverFunBlue transition-all duration-500 ease-in-out w-fit"
                >Blog</a
            >
            <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://msharfin.statuspage.io/"
                class="externalLink hover:text-hoverFunBlue transition-all duration-500 ease-in-out w-fit"
                >Services status</a
            >
        </div>
    </div>
</section>

