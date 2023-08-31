<script lang="ts">
  import Loading from "$lib/components/Loading.svelte";
  import { navigating } from "$app/stores";
  import Nav from "$lib/components/Nav.svelte";
  import Footer from "$lib/components/Footer.svelte";
</script>

{#if $navigating}
  <Loading />
{/if}

<Nav />

<slot />

<Footer />

