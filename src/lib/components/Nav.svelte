<script lang="ts">
    import {i} from "@inlang/sdk-js"

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
	<div class="left-nav">
		<a href="/" class="link">{i("nav.login")}</a>
		<button>{i("nav.signin")}</button>
	</div>
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
	right: 50rem
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
	&:lang(ar)
		justify-content: flex-end

	img
		width: 3rem
	.left-nav
		margin: 0 0 0 auto
		&:lang(ar)
			margin: 0 auto 0 0
		button
			margin-left: 2rem
			font-weight: 600
			background-color: $text-color
			color: $button-text-color
			border: none
			padding: 10px 20px
			border-radius: 24px
			font-size: 1rem
			&:lang(ar)
				margin: 0 2rem 0 0
			&:hover
				background-color: $hover-color
		a
			font-weight: 400
			color: $text-color
			&:hover
				color: $hover-color
@media screen and (max-width: 1024px)
	header
		padding: 2rem 3rem
		.left-nav button
			margin-left: 1rem
			&:lang(ar)
				margin: 0 1rem 0 0
		img
			width: 2.75rem

</style>