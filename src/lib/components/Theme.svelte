
<script>
	import Icon from "@iconify/svelte"
	import { i } from "@inlang/sdk-js"
	import { changeTheme, theme } from "$lib/theme"
</script>

<button title={i("alt.theme-switch")} class="theme_btn" on:click={() => changeTheme()}>
	<span class="ico">
	{#if $theme === "light"}
		<Icon icon="line-md:moon-twotone" />
	{:else}		
		<Icon icon="line-md:sunny-outline-twotone" />
	{/if}		
	</span>

</button>

<style lang="sass">
.theme_btn
	border: none
	border-radius: 75px 
	transition: all .5s ease
	color: $text-secondary-color
	background: none
	font-size: 24px
	padding: .25rem
	&:hover
		background-color: $container-color
</style>