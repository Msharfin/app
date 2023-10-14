<script>
  import Icon from "@iconify/svelte"
  import { i } from "@inlang/sdk-js"
  import { page } from "$app/stores"
  import { goto } from "$app/navigation"
</script>


<footer class="mobile">
  {#if $page.url.pathname === "/app"}
    <button class="current" disabled><span class="ico"><Icon icon="ic:twotone-home" /></span><span class="selected"></span></button>
  {:else}
    <button on:click={() => goto("/app")} ><span class="ico"><Icon icon="ic:twotone-home" /></span></button>
  {/if}
  {#if $page.url.pathname === "/app/settings"}
    <button class="current" disabled ><span class="ico"><Icon icon="ph:gear-duotone" /></span></button>
  {:else}
    <button on:click={() => goto("/app/settings")} ><span class="ico"><Icon icon="ph:gear-duotone" /></span></button>
  {/if}
</footer>


<style lang="sass">

.mobile 
  z-index: 999
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
    color: $text-color
  button:not(button.current):hover
    background-color: $container-color
  .current 
    cursor: default
    position: relative
    background-color: $container-color
  


</style>