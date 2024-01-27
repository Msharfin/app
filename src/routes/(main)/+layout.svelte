<script lang="ts">
	import Nav from "$lib/components/Nav.svelte"
	import Footer from "$lib/components/Footer.svelte"
	import { navigating } from "$app/stores"
	import Loading from "$lib/components/Loading.svelte"

	export let data
	$: ({ session, userProfile } = data)

</script>

{#if $navigating}
	<Loading />
{/if}

<Nav {session} {userProfile} />

<slot />

<Footer />
