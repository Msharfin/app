<script>
	import { goto } from "$app/navigation"
	import { page } from "$app/stores"

</script>

<div class="w-full px-8 my-4 flex flex-col md:flex-row">
    <div class="md:w-1/4 pe-4" style:display={$page.url.pathname !== "/blog" ? "none" : null}>
        <div class="flex flex-col">
            <span class="icon-[solar--pen-new-square-bold-duotone] text-funBlue text-5xl"></span>
            <span class="font-bold text-3xl mt-2">
                Blog & <br>
                Anouncements
            </span>
            <p class="text-turquoisieGray text-sm mt-4">
                Find the latest news and anouncements related to Msharfin, 
                and even feature sneak-peaks!
            </p>
            <button
                on:click={() => goto("/resources")}
                class="mt-5 flex font-medium w-fit items-center text-sm px-2 hoverEffect justify-center rounded-full hover:bg-hoverBrightAzure hover:dark:bg-hoverDarkAzure bg-brightAzure dark:bg-darkAzure text-funBlue"
            >
                <span class="icon-[solar--book-linear] me-1"></span>
                <span>Resources portal</span>
            </button>
        </div>
    </div>
    
    <div class="flex flex-col flex-1 md:px-8 mt-5 md:mt-0 pb-8">
        <slot />    
    </div>
</div>
