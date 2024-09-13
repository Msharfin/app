<script>
	import { goto } from "$app/navigation"


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

<slot />