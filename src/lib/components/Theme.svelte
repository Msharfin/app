
<script>
	// Status : √ Refactored as of v0.1.4
	
	import Icon from "@iconify/svelte"
	import * as m from "$lang/messages"
	import { changeTheme, theme } from "$lib/theme"
  	import { fly } from "svelte/transition"
</script>

<button title={m.nav_alt_theme({ theme: $theme === "dark"? m.theme_light(): m.theme_dark() })} class="theme-btn" on:click={() => changeTheme()}>
	{#if $theme === "light"}
		<span in:fly={{ y: 200, duration: 400 }} class="ico">
			<Icon icon="solar:moon-bold-duotone" />
		</span>
	{:else}		
		<span in:fly={{ y: 200, duration: 400 }} class="ico">
			<Icon icon="solar:sun-2-line-duotone" />
		</span>
	{/if}
</button>

<style lang="sass">
.theme-btn
	@include button
	@include secondaryBtn($color: $text-color)
	font-size: 1.75rem
	padding: .5rem
	border-radius: 50%
</style>