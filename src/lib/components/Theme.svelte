<script>
	// Status : √ Refactored as of v0.1.5

	import Icon from "@iconify/svelte"
	import * as m from "$lang/messages"
	import { changeTheme, theme } from "$lib/theme"
	import { fly } from "svelte/transition"
</script>

<button
	title={m.nav_alt_theme({
		theme: $theme === "dark" ? m.theme_light() : m.theme_dark(),
	})}
	on:click={() => changeTheme()}
>
	{#if $theme === "light"}
		<span in:fly={{ y: -50, duration: 200 }} class="ico">
			<Icon icon="solar:moon-bold-duotone" />
		</span>
	{:else}
		<span in:fly={{ y: 50, duration: 200 }} class="ico">
			<Icon icon="solar:sun-bold-duotone" />
		</span>
	{/if}
</button>

<style lang="sass">
button
    display: flex
    align-items: center
    justify-content: center
    border-radius: 50%
    background-color: $white-1
    color: $blue-0x
    font-size: 1.75rem
    width: 2.5rem
    height: 2.5rem
    &:hover
        background-color: $gray-0    
</style>
