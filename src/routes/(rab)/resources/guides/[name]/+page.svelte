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
        on:click={() => goto("/resources")}
        class="flex font-medium items-center text-sm px-2 hoverEffect justify-center rounded-full hover:bg-hoverBrightAzure hover:dark:bg-hoverDarkAzure bg-brightAzure dark:bg-darkAzure text-funBlue"
    >
        <span class="icon-[solar--arrow-left-linear] me-1"></span>
        <span>Back to portal</span>
    </button>
</div>

<h1 class="text-3xl text-funBlue font-bold my-2">{ md.data.fm.title }</h1>


<article class="md mt-3">
    {@html md.code}
</article>
