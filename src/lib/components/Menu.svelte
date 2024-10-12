<script lang="ts">
	import { goto } from "$app/navigation"
	import { fly } from "svelte/transition"
</script>

<div class="fixed overflow-scroll md:rounded-2xl md:pt-0 inset-0 w-full md:mt-24 md:mb-4 md:me-8 md:w-1/3 md:border-[0.5px] border-turquoisieGray md:overflow-x-hidden md:start-auto md:end-0 h-auto pt-24 bg-white dark:bg-dimGray z-10 px-8" transition:fly={{ x: 500, duration: 500 }}>
    <div class="w-full flex justify-start items-end h-24">
        <h1 class="font-extrabold text-5xl leading-[0.75]">Menu</h1>
    </div>
    <div class="notice">
        <span class="mb-2"></span>
        <p class="leading-5">
            This project is in early development! if you found any bugs or issues please check this <a href="/resources/guides/report_bugs" class="externalLink hover:underline font-bold">article</a>.
        </p>
    </div>
    <div class="bg-brightAzure dark:bg-darkAzure text-indigo-500 mt-4 p-3 rounded-xl flex flex-col">
        <span class="icon-[tabler--brand-discord] text-4xl mb-2"></span>
        <p class="leading-5">
            Receive news, latest updates and discuss everything Msharfin on our Discord server, join us by clicking <b><a href="https://discord.gg/qv9fZ5Tr5F" class="externalLink hover:underline" target="_blank" rel="noopener noreferrer">here</a>.</b>
        </p>
    </div>
    <div class="flex flex-wrap mt-4 mb-8 w-full">
        <div class="w-full mb-3 inline-flex">
            <button on:click={() => goto("/app")} class="menuButton hoverEffect w-1/2">
                <span class="icon-[solar--home-2-outline] text-funBlue mb-1"></span>
                <span>Home</span>
            </button>
            <button on:click={() => goto("/app/search")} class="menuButton hoverEffect w-full">
                <span class="icon-[solar--minimalistic-magnifer-linear] text-funBlue mb-1"></span>           
                <span>Search</span>
            </button>  
        </div>

        <button on:click={() => goto("/app/create")} class="!me-0 menuButton bg-fancyShape bg-cover bg-no-repeat bg-center bg-funBlue text-white !border-transparent hoverEffect w-full">
            <span class="icon-[solar--pen-new-round-outline] mb-1"></span>
            <span>Create</span>
        </button>

        <div class="w-full my-3 inline-flex">
            <button class="menuButton hoverEffect max-fit">
                <span class="icon-[solar--bell-linear] text-funBlue mb-1"></span>
                <span>Notifications</span>
            </button>
            <button on:click={() => goto("/app/settings")} class="menuButton hoverEffect w-1/2">
                <span class="icon-[solar--settings-linear] text-funBlue mb-1"></span>         
                <span>Settings</span>
            </button>  
        </div>

        <button on:click={() => alert("Coming soon...")} class="menuButton hoverEffect w-full">
            <img src="/images/riads_icon.webp" alt="Riads" class="size-6 mb-1" />
            <span>Riads</span>
        </button>

    </div>
</div>

<style>

.menuButton {
    @apply border-turquoisieGray flex flex-col border-[.5px] rounded-xl p-4 text-2xl me-3 font-medium last-of-type:me-0;
}

</style>