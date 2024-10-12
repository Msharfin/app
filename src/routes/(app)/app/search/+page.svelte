<script lang="ts">
	import { goto, invalidate } from "$app/navigation"
	import { page } from "$app/stores"
	import Post from "$lib/components/Post.svelte"

    export let data 
    $:({ searchResult, user } = data)

    let searchVal: string
</script>


<div class="md:w-1/3 md:ms-48 w-full flex items-end h-24 select-none">
    <h1 class="font-extrabold text-5xl leading-[0.75]">Search</h1>
</div>

<div class="w-full h-12 flex items-center mt-5 rounded-full bg-brightAzure dark:bg-darkAzure">
    <input bind:value={searchVal} placeholder="Search here..." class="placeholder:text-funBlue bg-transparent flex-1 rounded-s-full py-3 ps-5" type="text">
    <button type="submit" on:click={() => {if (searchVal) {
            goto($page.url.pathname + `?term=${searchVal}`)
        }}} class="p-3 smooth text-xl size-12 rounded-full hover:bg-hoverBrightAzure text-funBlue">
        <span class="icon-[solar--magnifer-linear]"></span>
    </button>
</div>

{#await searchResult}
    <div class="flex items-center justify-center mt-32">
        <span
            class="icon-[svg-spinners--180-ring-with-bg] text-4xl text-funBlue"
        ></span>
    </div>
{:then searchResult}
    {#if searchResult}
        <div class="text-turquoisieGray flex font-bold mt-4 items-center justify-between">
            <h1 class="flex items-center">
                <span class="icon-[solar--list-broken] me-1"></span>
                <span>Results</span>
            </h1>
            <span>{searchResult.length}</span>
        </div>
        {#each searchResult as s (s)}
            <Post post={s} postsList={searchResult} {user} />
        {/each}
    {/if}
{/await}

