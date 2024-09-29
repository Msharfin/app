<script lang="ts">
	import { goto } from "$app/navigation"
	import { page } from "$app/stores"
	import { changeTheme, theme } from "$lib/theme"
	import { scale } from "svelte/transition"
</script>

<header class="py-5 px-8 flex items-center justify-between z-10">
    <span
        class="bg-logo bg-contain bg-no-repeat size-14 bg-center"
        title="Msharfin logo"
    ></span>
    <div class="flex items-center">
        <button class="secondaryBtn" on:click={() => goto("/")}><span class="icon-[solar--home-2-bold]"></span></button>
        <button class="secondaryBtn ms-2" on:click={() => changeTheme()}>
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
</header>

<svelte:head>
    <title>{$page.status} Error | Msharfin</title>
</svelte:head>

<div class="px-8 w-full h-full flex-1 flex flex-col items-center justify-center">
    <img src="/images/error.webp" alt="Ooops" >

    <h1 class="text-6xl font-black mt-2">{$page.status}</h1>
    <p class="text-turquoisieGray">{$page.error?.message}</p>
</div>
