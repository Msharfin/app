<script lang="ts">
  import Icon from "@iconify/svelte"
  import { i } from "@inlang/sdk-js"
  import { page } from "$app/stores"
  import { goto } from "$app/navigation"

  export let profile: any  
</script>


<footer class="mobile">
  {#if $page.url.pathname === "/app"}
    <button class="current" disabled><span class="ico"><Icon icon="ic:twotone-home" /></span><span class="selected"></span></button>
  {:else}
    <button on:click={() => goto("/app")} ><span class="ico"><Icon icon="ic:twotone-home" /></span></button>
  {/if}
  <!-- Create -->
  {#if $page.url.pathname === "/app/post/create"}
    <button class="gradient" disabled ><span class="ico"><Icon icon="icon-park-twotone:add" /></span></button>
  {:else}
    <button class="create" on:click={() => goto("/app/post/create")} ><span class="ico"><Icon icon="icon-park-twotone:add" /></span></button>
  {/if}  
  <!-- Friends -->
  <!-- {#if $page.url.pathname === "/app/friends"}
    <button class="current" disabled ><span class="ico"><Icon icon="ic:twotone-group" /></span></button>
  {:else}
    <button on:click={() => goto("/app/friends")} ><span class="ico"><Icon icon="ic:twotone-group" /></span></button>
  {/if} -->

  <!-- Me -->
  
  {#if $page.url.pathname === "/app/profile/me"}
    <button class="current" disabled ><img src={profile.avatar_url} alt=""></button>
  {:else}
    <button on:click={() => goto("/app/profile/me")} ><img src={profile.avatar_url} alt=""></button>
  {/if}
</footer>


<style lang="sass">

.mobile 
  z-index: 50
  position: sticky
  background-color: $background-color
  padding-block: .25rem
  bottom: 0px
  left: 0px
  height: 4.5rem
  display: flex
  align-items: center
  justify-content: space-around
  button
    background: none
    padding: .5rem
    border-radius: 50px
    border: none
    font-size: 2.5rem
    display: flex
    align-items: center
    color: $text-color
    img
      border-radius: 50%
      width: 2.5rem
      height: 2.5rem
    &:hover
      background-color: $container-color
  .current
    pointer-events: none
    cursor: default
    position: relative
    background-color: $container-color
  .create
    color: red
    animation: gradient 35s infinite
  .gradient
    cursor: default
    pointer-events: none
    position: relative
    color: white
    background-color: red
    animation: gradient 35s infinite

</style>