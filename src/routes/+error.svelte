<script lang="ts">
  import { page } from '$app/stores'
  import * as m from "$lang/messages"
	import Footer from '$lib/components/Footer.svelte'
	import Nav from '$lib/components/Nav.svelte'
	import type { LayoutData } from './$types'

  export let data: LayoutData
  let {session, userProfile} = data
  $:({session, userProfile} = data)
</script>

<Nav {session} {userProfile} />
<div class="error-pg">
  <img src="/images/error.png" alt={m.image_reading_alt()}>
  <h1>{$page.status}</h1>
  <h5>{$page.error?.message}</h5>
</div>
<Footer />

<svelte:head>
    <title>Oooops... | Msharfin</title>
</svelte:head>

<style lang="sass">

div
  display: flex
  align-items: center
  justify-content: center
  img
    width: 20rem
    animation: gradient 35s infinite
  h1, h5
    margin: 0
    padding: 0
  h1
    @include title
    font-size: 5rem
  h5
    font-size: 1.25rem
    color: $text-secondary-color
</style>