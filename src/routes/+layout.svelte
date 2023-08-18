<script lang="ts">  
	import { i } from "@inlang/sdk-js";
	import Icon from "@iconify/svelte";
	import { onMount } from "svelte";
	import Language from "$lib/components/Language.svelte";

	export const version = "0.0.2";

	let y: number;
	let startScroll: boolean;

	$: if (y > 30) {
		startScroll = true;
	} else {
		startScroll = false;
	}

	let loaded: string = "flex";

	onMount(()=>{
		loaded = "none";
	});
</script>

<svelte:window bind:scrollY={y} />

<div class="loading" style="display: {loaded};">
	<img src="/images/logo.png" alt={i("nav.logo_alt")}>
	<Icon icon="eos-icons:loading" class="loading-ico" />
</div>
<div class="blur"><span class="background"></span></div>
<header class:nav={startScroll} >
	<a href="/"><img src="/images/logo.png" alt={i("nav.logo_alt")}></a>
	<div class="left-nav">
		<a href="/" class="link">{i("nav.login")}</a>
		<button>{i("nav.signin")}</button>
	</div>
</header>

<slot></slot>

<footer>
	<h3>v{version}</h3>
	<div class="wrapper">{i("footer.lang")}: <Language /></div>
</footer>

<style lang="sass">
	.loading
		position: fixed
		height: 100vh
		width: 100vw
		display: flex
		background-color: hsla(0, 100%, 100%, 0.5)
		z-index: 5
		backdrop-filter: blur(50px)
		flex-direction: column
		justify-content: center
		align-items: center
		img
			width: 5rem
			margin-bottom: 2rem
		:global(.loading-ico)
			font-size: 2rem


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
		border-bottom: 1px solid hsl(0, 0%, 80%)
		backdrop-filter: blur(75px)
		background-color: hsla(0, 100%, 100%, 0.9)
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
				color: white
				background-color: hsl(0, 0%, 0%)
				border: none
				padding: 10px 20px
				border-radius: 24px
				font-size: 1rem
				&:lang(ar)
					margin: 0 2rem 0 0
				&:hover
					background-color: hsl(0, 0%, 25%)
			a
				font-weight: 400
				color: hsl(0, 0%, 30%)

	footer
		display: flex
		flex-direction: row
		justify-content: flex-end
		padding: .5rem 10rem
		align-items: center
		&:lang(ar)
			justify-content: flex-start
		h3
			color: hsl(0, 0%, 30%)
			font-size: 1rem
			font-weight: 400

	.wrapper
		color: hsl(0, 0%, 30%) 
		display: flex
		align-items: center
		margin: 0 0 0 auto
		&:lang(ar)
			margin: 0 auto 0 0	
</style>