<script lang="ts">
	import { goto } from "$app/navigation"
	import { navigating } from "$app/stores"
	import Menu from "$lib/components/Menu.svelte"
	import { likePayload, postPayload } from "$lib/stores"
	import { scale } from "svelte/transition"

    export let data
    let { supabase, user } = data
    $:({ supabase, user } = data )

    let isClosed: boolean = true

    $: if ($navigating) {
        isClosed = true
    }

    const postListener = supabase.channel('posts')
    .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'posts' },
        (payload: any) => {
          postPayload.set(payload)  
        }).subscribe()

    const likeListener = supabase.channel('likes')
    .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'likes' },
        (payload: any) => {
          likePayload.set(payload)  
        }).subscribe()
</script>

<header class="py-5 sticky top-0 left-0 px-8 flex items-center justify-between z-50 bg-white dark:bg-dimGray">
    <span
        class="bg-logo bg-contain bg-no-repeat size-14 bg-center"
        title="Msharfin logo"
    ></span>
    <div class="flex items-center">
        <button class="secondaryBtn" on:click={() => goto(`/app/profile/${user.slug}`)}>
            {#if user.avatar_url}
                <img src={user.avatar_url} class="border-[.5px] border-turquoisieGray rounded-full" alt="Your Avatar">
            {:else}
                <span class="icon-[solar--user-linear]"></span>
            {/if}
        </button>
        <button class="secondaryBtn ms-2" on:click={() => isClosed = !isClosed}>
            {#if isClosed}
                <span in:scale={{ delay: 100, start: 1.5 }} class="icon-[solar--hamburger-menu-outline]"></span>
            {:else}
                <span in:scale={{ delay: 100, start: 1.5 }} class="icon-[radix-icons--cross-2]"></span>
            {/if}
        </button>
    </div>
</header>

<section class="px-8 pb-8 relative h-max">
    {#if !isClosed}
        <Menu />
    {/if}
    <slot />    
</section>
