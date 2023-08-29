
<script>
	import Icon from "@iconify/svelte";
	import { changeTheme, theme } from "$lib/theme";
</script>

<button class="theme_btn" on:click={() => changeTheme()}>
	{#if $theme === "light"}
		<Icon class="theme" icon="line-md:moon-twotone" />
	{:else}		
		<Icon class="theme" icon="line-md:sunny-outline-twotone" />
	{/if}
</button>

<style lang="sass">
.theme_btn
	border: none
	border-radius: 75px 
	transition: all .5s ease
	font-weight: 600
	color: hsl(0, 0%, 50%)
	background: none
	width: 2.2rem
	height: 2rem		
	font-size: 24px
	padding-block: .25rem
	&:hover
		background-color: $container-color
</style>