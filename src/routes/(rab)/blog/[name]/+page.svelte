<script lang="ts">
	import { goto } from '$app/navigation'

    export let data
    let { md }: any = data
    $:({ md } = data)

</script>

<svelte:head>
    <title>
        {md.data.fm.title} | Resources Portal
    </title>
</svelte:head>

<div class="flex justify-end">
    <button
        on:click={() => goto("/blog")}
        class="flex font-medium items-center text-sm px-2 hoverEffect justify-center rounded-full hover:bg-hoverBrightAzure hover:dark:bg-hoverDarkAzure bg-brightAzure dark:bg-darkAzure text-funBlue"
    >
        <span class="icon-[solar--arrow-left-linear] me-1"></span>
        <span>Back to blog</span>
    </button>
</div>

<div class="flex flex-col">
    <span class="{md.data.fm.icon} mb-1 text-5xl text-funBlue"></span>
    <span class="uppercase text-funBlue tracking-widest font-bold">{ md.data.fm.category }</span>
    <h1 class="text-3xl font-bold">{ md.data.fm.title }</h1>
    <span class="text-turquoisieGray font-medium">
        { md.data.fm.author }
        •
        { md.data.fm.date }
    </span>
</div>

<article class="md mt-5">
    {@html md.code}
</article>
