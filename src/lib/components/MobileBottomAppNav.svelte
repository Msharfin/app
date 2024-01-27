<script lang="ts">
  import Icon from "@iconify/svelte"
  import * as m from "$lang/messages"
  import { page } from "$app/stores"
  import { goto, invalidateAll } from "$app/navigation"
	import { fly } from "svelte/transition"
	import { signOut } from "$lib"

  export let profile: any  
  let expanded = false

</script>


<footer in:fly={{ y: 200, duration: 500}}  class:expanded class="mobile">
  <button on:click={() => expanded === true ? expanded = false : expanded = true} class="expand"> <span class="ico">
    {#if !expanded}
      <Icon icon="solar:alt-arrow-up-linear" />
    {:else}
      <Icon icon="solar:alt-arrow-down-linear" />    
    {/if}
  </span>
  </button>
  <div class="main-btns">
    <!-- Create -->
    {#if $page.url.pathname === "/app/post/create"}
      <button class="current" disabled ><span class="ico"><Icon icon="solar:add-circle-bold-duotone" /></span></button>
    {:else}
      <button on:click={() => goto("/app/post/create")} ><span class="ico"><Icon icon="solar:add-circle-bold-duotone" /></span></button>
    {/if}  
    <!-- Me -->
    
    {#if $page.url.pathname === "/app/profile/me"}
      <button class="current" disabled ><img src={profile.avatar_url ? profile.avatar_url: "/images/no_pfp.png" } alt="Your avatar"></button>
    {:else}
      <button on:focus={() => goto("/app/profile/me")} ><img src={profile.avatar_url ? profile.avatar_url: "/images/no_pfp.png" } alt="Your avatar"></button>
    {/if}   
  </div>
    {#if expanded}
      <div out:fly={{ y:200, duration: 1000}} class="more-opt">
        <button on:click={() => {
          expanded = false
          $page.url.pathname.endsWith("/app" || "/app")? invalidateAll() :goto("/app")}}><span class="ico"><Icon icon="solar:home-2-bold-duotone" /></span> <p>Discover</p></button>
        <!-- <button on:click={() => alert("Coming Soon...")}><span class="ico"><Icon icon="solar:users-group-rounded-bold-duotone" /></span> <p>Friends</p></button> -->
        <button on:click={() => {expanded = false 
          goto("/app/search")}}><span class="ico"><Icon icon="solar:magnifer-bold-duotone" /></span> <p>Search</p></button>
        <button on:click={() => {expanded = false 
          goto("/app/settings")}}><span class="ico"><Icon icon="solar:settings-bold-duotone" /></span> <p>Settings</p></button>
        <button on:click={() => 
        {expanded = false
        signOut()}}><span class="ico"><Icon icon="solar:logout-2-bold-duotone" /></span> <p>Sign out</p></button>
      </div>
    {/if}
</footer>

<style lang="sass">

.mobile 
  z-index: 50
  position: sticky
  background-color: $text-color
  bottom: 0px
  left: 0px
  border-top-right-radius: 24px
  border-top-left-radius: 24px
  height: 6.5rem
  display: flex
  align-items: center
  flex-direction: column
  padding-inline: 1.75rem
  user-select: none
  transition: height .75s ease
  .expand
    margin-block-start: .25rem
    border-radius: 50%
    color: $nav-bar-button-hover
    font-size: 1.25rem
    display: flex
    justify-content: center
    align-items: center
    height: 1.45rem
    width: 1.45rem
    &:hover
      background-color: $nav-bar-button
    span
      padding: .125rem
  .main-btns
    display: flex
    width: 100%
    align-items: center
    padding-block: .5rem
    height: 4.25rem
    justify-content: space-between
    .ico
      color: red
      animation: gradient 35s infinite
    button
      border-radius: 50%
      font-size: 3rem
      display: flex
      align-items: center
      justify-content: center
      padding: .5rem
      width: 3.5rem
      height: 3.5rem      
      img
        width: 2.75rem
        height: 2.75rem 
        border-radius: 50%
      &:hover
        background-color: $nav-bar-button
    .current
      pointer-events: none
      cursor: default
      position: relative
      background-color: $nav-bar-button

  .more-opt
    display: flex
    flex-wrap: wrap
    margin-block-start: 1.5rem
    align-items: center
    justify-content: center
    width: 100%
    button
      width: 48%
      color: $container-color
      background-color: $nav-bar-button
      text-align: start
      font-size: 1.5rem
      padding: .5rem 
      margin-block-end: .25rem
      margin-inline-end: .25rem
      p
        margin-block: 0.25rem
        font-weight: 300
        color: $button-text-color
      &:hover
        background-color: $nav-bar-button-hover
  
.expanded
  height: 20rem
</style>