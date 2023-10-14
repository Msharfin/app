<script lang="ts">
    import { i } from "@inlang/sdk-js"
	import type { Session } from "@supabase/supabase-js"

	export let session: Session | null

	let y = 0
	let startScroll = false

	$: if (y > 30) {
		startScroll = true
	} else {
		startScroll = false
	}
</script>

<svelte:window bind:scrollY={y} />

<header class:nav={startScroll} >
	<a class="logo" href="/"><img src="/images/logo.png" alt={i("nav.logo_alt")}></a>
	<div class="left-nav">
		{#if !session}
			<!-- <a href="/login" class="link">{i("nav.login")}</a> -->
			<a href="/login" class="btn">{i("nav.login")}</a>
		{:else}
			<a href="/app" class="btn">{i("nav.enter")}</a>
		{/if}
	</div>
</header>

<style lang="sass">

.nav
	z-index: 3
	backdrop-filter: blur(85px)
	background-color: hsla($background-color, 0.8)
	transition: all 0.1s ease		
header
	position: sticky
	top: 0
	display: flex
	align-items: center
	justify-content: flex-start
	padding: 2rem 10rem
	transition: all 0.1s ease

	img
		width: 3rem
	.left-nav
		margin-inline-start: auto
		.btn
			margin-inline-start: 2rem
			font-weight: 600
			text-decoration: none
			background-color: $text-color
			color: $button-text-color
			border: none
			padding: 10px 20px
			border-radius: 24px
			font-size: 1rem

			&:hover
				color: inherit
				background-color: $hover-color
		a
			font-weight: 400
			color: $text-color
			&:hover
				color: $hover-color
@media screen and (max-width: 789px)
	header
		padding: 2rem 2rem
		.left-nav
			// a:first-child
			// 	display: none 
			a:last-child
				margin-inline-start: 1rem 
		img
			width: 2.75rem
	

</style>