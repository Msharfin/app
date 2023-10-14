<script lang="ts">
  import Nav from "$lib/components/Nav.svelte"
  import Footer from "$lib/components/Footer.svelte"

  export let data
  $:({session}= data)
</script>

<Nav {session} />

<slot />

<Footer />

