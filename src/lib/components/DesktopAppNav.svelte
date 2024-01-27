<script lang="ts">
	import { goto } from "$app/navigation"
	import { signOut } from "$lib"
  import Icon from "@iconify/svelte"
	import { fly } from "svelte/transition"
  import * as m from "$lang/messages"

  export let profile: any
</script>

<section class="desktop" in:fly={{ x: -200, duration: 500}}>
  <a href="/app"><img class="logo" src="/images/logo.png" alt={m.alt_logo({brand:m.main_features_title_1()})}> </a>
  <div class="actions">
    <button on:click={() => goto("/app/post/create")} class="create"><span class="ico"><Icon icon="solar:add-circle-bold-duotone" /></span></button>
    <button on:click={() => goto("/app")}><span class="ico"><Icon icon="solar:home-2-bold-duotone" /></span> <p></p></button>
    <button on:click={() => goto("/app/search")}><span class="ico"><Icon icon="solar:magnifer-bold-duotone" /></span> <p></p></button>
    <button on:click={() =>
      goto("/app/settings")}><span class="ico"><Icon icon="solar:settings-bold-duotone" /></span> <p></p></button>
    <button on:click={() => signOut()}><span class="ico"><Icon icon="solar:logout-2-bold-duotone" /></span> <p></p></button>
    <button class="pfp" on:click={() =>
      goto("/app/profile/me")} style="background-image: url({profile.avatar_url ? profile.avatar_url: "/images/no_pfp.png"})"></button>
  </div>
</section>


<style lang="sass">
section
  position: sticky
  top: 0
  width: fit-content
  padding: 1rem
  height: 100vh
  z-index: 100
  display: flex
  color: $nav-bar-button
  flex-direction: column
  justify-content: flex-start
  align-items: center
  .logo
    width: 2.75rem
    align-self: center
  .actions 
    margin-block-start: auto
    display: flex
    flex-direction: column
    align-items: center
    .create
      background-color: hsl(0, 100%, 40%)
      color: white
      animation: gradient 35s infinite
    .pfp
      width: 3rem
      height: 3rem
      background-position: center center
      background-size: 3.123rem
    button
      background-color: $container-color
      width: 100%
      font-size: 1.5rem
      display: flex
      justify-content: center
      align-items: center
      padding: .75rem 
      &:not(:last-child)
        margin-block-end: .5rem   
      &:hover 
        background-color: $hover-container-color   
      p
        margin-block: 0
</style>