<script lang="ts">
	import { Toaster } from "svelte-french-toast"
	import "../app.sass"
	import { invalidate } from "$app/navigation"
	import { onMount } from "svelte"
	import { setSupaClient } from "$lib/supabaseSessionManage"
	import { browser } from "$app/environment"
	import Loading from "$lib/components/Loading.svelte"
	import {
		setLanguageTag,
		onSetLanguageTag,
		isAvailableLanguageTag,
		sourceLanguageTag,
	} from "$lang/runtime"

	$: savedLanguage = browser && localStorage.getItem("language")

	$: lang = isAvailableLanguageTag(savedLanguage)
		? savedLanguage
		: sourceLanguageTag

	$: setLanguageTag(lang)
	onSetLanguageTag((newLanguageTag) => {
		lang = newLanguageTag
		if (browser) {
            localStorage.setItem("language", newLanguageTag)
            document.documentElement.setAttribute("lang", newLanguageTag)
        }
	})

	export let data

	let { supabase, session } = data
	$: ({ supabase, session } = data)

	setSupaClient(supabase)

	onMount(() => {
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate("supabase:auth")
			}
		})

		return () => subscription.unsubscribe()
	})

	if (browser) {
		document.addEventListener("visibilitychange", async () => {
			if (document.visibilityState === "hidden") {
				const setStatus = await supabase
					.from("users")
					.update({ status: "offline" })
					.eq("id", session?.user.id)
					.select()
			} else if (document.visibilityState === "visible") {
				const setStatus = await supabase
					.from("users")
					.update({ status: "online" })
					.eq("id", session?.user.id)
					.select()
			}
		})
	}

	let isLoading = true
	onMount(() => setTimeout(() => (isLoading = false), 1000))
</script>

{#if isLoading}
	<Loading />
{:else}
	{#key lang}
		<slot />
	{/key}
{/if}

<Toaster />
