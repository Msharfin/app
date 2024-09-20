
<script lang="ts">
	import { blogIcon } from '$lib/stores.js'


    export let data
    let { list }: any = data
    $:({ list } = data)
</script>

<svelte:head>
    <title>
        Blog & Anouncements | Msharfin
    </title>
</svelte:head>

{#each list as l}
    <div class="border-b-[0.5px] border-turquoisieGray last-of-type:border-b-0 py-4">
        <div class="flex items-center">
            <span class="{blogIcon[l.data.fm.category]} me-1 text-funBlue"></span>
            <span class="uppercase text-funBlue tracking-widest font-bold">{ l.data.fm.category }</span>
        </div>
        <h1 class="text-2xl font-bold"><a href="/blog/{l.name}" class="hover:underline">{ l.data.fm.title }</a></h1>
        <span class="text-turquoisieGray font-medium">
            { l.data.fm.author }
            •
            { l.data.fm.date }
        </span>        
        <p>{ l.data.fm.desc }</p>
    </div>
{/each}    
