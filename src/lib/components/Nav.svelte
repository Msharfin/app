<script lang="ts">
    import { i } from "@inlang/sdk-js"
	import { page } from '$app/stores';  

	let y: number
	let startScroll: boolean

	$: if (y > 30) {
		startScroll = true
	} else {
		startScroll = false
	}
</script>

<svelte:window bind:scrollY={y} />

<div class="blur"><span class="background"></span></div>
<header class:nav={startScroll} >
	<a class="logo" href="/"><img src="/images/logo.png" alt={i("nav.logo_alt")}></a>
	{#if $page.url.pathname === "/"}
	<div class="left-nav">
		<a href="/login" class="link">{i("nav.login")}</a>
		<a href="/signin" class="btn">{i("nav.signin")}</a>
	</div>
	{/if}
</header>

<style lang="sass">
.background 
	position: absolute
	background-color: red
	animation: gradient 35s infinite
	width: .5rem
	border-radius: 60%
	height: 50vh
	z-index: -1
	transform: rotate(45deg)
	top: -10rem
	inset-inline: 10rem
.blur
	filter: blur(30px)

.nav
	z-index: 3
	backdrop-filter: blur(75px)
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
@media screen and (max-width: 1024px)
	header
		padding: 2rem 3rem
		.left-nav
			a:first-child
				display: none 
			a:last-child
				margin-inline-start: 1rem 
		img
			width: 2.75rem
	

</style>