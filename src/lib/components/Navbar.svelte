<script lang="ts">
	import { goto } from "$app/navigation"
	import Icon from "@iconify/svelte"
	import IconButtonSecondary from "./UI/Buttons/IconButtonSecondary.svelte"

	export let route: string
	export let title: string
</script>

<div class="nav">
	<!-- <button on:click={() => goto(route)}>
		<span class="ico"><Icon icon="solar:arrow-left-linear" /></span></button
	> -->
	<IconButtonSecondary iconIdentifier="solar:arrow-left-linear" onClickAction={() => goto(route)} />
	<h2 id="post">{title}</h2>
</div>

<style lang="sass">
.nav
    display: flex
    align-items: center
    color: $gray-2
    h2
        color: $black-0
        font-size: 1.75rem
        margin-block: .5rem
        margin-inline-start: .75rem
</style>
