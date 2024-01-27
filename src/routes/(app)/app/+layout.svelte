
<script lang="ts">
	import { navigating } from "$app/stores"
	import { likePayload, postPayload } from "$lib"
	import AppLoading from "$lib/components/AppLoading.svelte"
  import DesktopAppNav from "$lib/components/DesktopAppNav.svelte"
  import MobileBottomAppNav from "$lib/components/MobileBottomAppNav.svelte"
  import MobileTopAppNav from "$lib/components/MobileTopAppNav.svelte"

  export let data
  let { supabase, userProfile } = data
  $: ({ supabase, userProfile } = data)
  let screenWidth: any

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

<svelte:window bind:innerWidth={screenWidth} />

{#if $navigating}
  <AppLoading />
{/if}

{#if screenWidth < 789}
  <MobileTopAppNav />
  <slot />
  <MobileBottomAppNav profile={userProfile} />
{:else}
  <div>
  <DesktopAppNav profile={userProfile}/>
  <slot />    
  </div>
{/if}

<style lang="sass">

div
  display: flex
</style>