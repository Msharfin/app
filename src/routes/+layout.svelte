<script>
    import "../app.css"
	import { invalidate } from "$app/navigation"
	import { onMount } from "svelte"
	import { navigating } from "$app/stores"
    import Loading from "$lib/components/Loading.svelte"

	export let data
	$: ({ session, supabase } = data)

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate("supabase:auth")
			}
		})

		return () => data.subscription.unsubscribe()
	})
</script>

<main class="transition-all duration-100 ease-in-out font-sans h-svh overflow-auto flex flex-col text-dimGray bg-white dark:text-white dark:bg-dimGray">
	<slot />
    {#if $navigating}
        <Loading />
    {/if}
</main>

