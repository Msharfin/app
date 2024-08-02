<script lang="ts">
	import Nav from "$lib/components/Nav.svelte"
	import Footer from "$lib/components/Footer.svelte"
	import { navigating } from "$app/stores"
	import AppLoading from "$lib/components/AppLoading.svelte"

	export let data
	$: ({ session, userProfile } = data)

</script>

{#if $navigating}
	<AppLoading />
{/if}

<Nav {session} {userProfile} />

<slot />

<Footer />
