<script lang="ts">
	import { goto } from "$app/navigation"
	import { fly } from "svelte/transition"
</script>

<div class="fixed overflow-scroll inset-0 w-full h-auto pt-24 bg-white dark:bg-dimGray z-10 px-8" transition:fly={{ x: 500, duration: 500 }}>
    <div class="w-full flex justify-start items-end h-24">
        <h1 class="font-extrabold text-5xl leading-[0.75]">Menu</h1>
    </div>
    <div class="bg-yellow-100 dark:bg-yellow-900 text-yellow-600 mt-5 p-3 rounded-xl flex flex-col">
        <span class="icon-[solar--danger-triangle-bold-duotone] text-4xl mb-2"></span>
        <p class="leading-5">
            This project is in early development! if you found any bugs or issues please email us at <b>support@msharf.in</b> or report them at the Discord server.
        </p>
    </div>
    <div class="bg-brightAzure dark:bg-darkAzure text-indigo-500 mt-5 p-3 rounded-xl flex flex-col">
        <span class="icon-[tabler--brand-discord] text-4xl mb-2"></span>
        <p class="leading-5">
            Receive news, latest updates and discuss everything Msharfin on our Discord server, join us by clicking <b><a href="https://discord.gg/qv9fZ5Tr5F" class="externalLink hover:underline" target="_blank" rel="noopener noreferrer">here</a></b>
        </p>
    </div>
    <div class="flex flex-wrap mt-4 mb-8 w-full">
        <div class="w-full mb-3 inline-flex">
            <button on:click={() => goto("/app")} class="menuButton hoverEffect w-1/2">
                <span class="icon-[solar--home-2-outline] text-funBlue mb-1"></span>
                <span>Home</span>
            </button>
            <button class="menuButton hoverEffect w-full">
                <span class="icon-[solar--minimalistic-magnifer-linear] text-funBlue mb-1"></span>           
                <span>Search</span>
            </button>  
        </div>

        <button on:click={() => goto("/app/create")} class="menuButton bg-fancyShape bg-cover bg-no-repeat bg-center bg-funBlue text-white !border-transparent hoverEffect w-full">
            <span class="icon-[solar--pen-new-round-outline]"></span>
            <span>Create</span>
        </button>

        <div class="w-full mt-3 inline-flex">
            <button class="menuButton hoverEffect w-full">
                <span class="icon-[solar--bell-linear] text-funBlue mb-1"></span>
                <span>Notifications</span>
            </button>
            <button on:click={() => goto("/app/settings")} class="menuButton hoverEffect w-1/2">
                <span class="icon-[solar--settings-linear] text-funBlue mb-1"></span>         
                <span>Settings</span>
            </button>  
        </div>
    </div>
</div>

<style>

.menuButton {
    @apply border-turquoisieGray flex flex-col border-[.5px] rounded-xl p-4 text-2xl me-3 font-medium last-of-type:me-0;
}

</style>