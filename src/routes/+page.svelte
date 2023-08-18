<svelte:head>
	<title>Msharfin | Socialize with 🔒 privacy.</title>
</svelte:head>

<script>
	import Icon from "@iconify/svelte";
	import { i, switchLanguage } from "@inlang/sdk-js";

	// switchLanguage("ar");
</script>  

<div class="wrapper">
	<section class="welcome">
		<div>
			<h1>
				<span>{i("moto.title.0")}</span> {i("moto.title.1")} <br><span class="ico"><Icon icon="iconamoon:eye-off-duotone"/></span> {i("moto.title.2")}<span>.</span>
			</h1>
						
		</div>
		<span class="circle">◉</span>			
		<img src="/images/welcome.png" alt="Person holding a phone.">
	</section>
	<section class="features">
		<div class="title-wrap"><span class="offset"></span><h2>{i("features.title.0")} <span>{i("features.title.1")}</span> {i("features.title.2")} <span class="ico"><Icon icon="mdi:done" /></span>{i("features.title.3")}<span>!</span></h2></div>
		<div class="content-wrap
		">		
		<div class="img-wrap">
			<span>◎</span>
			<img src="/images/sitting-reading.png" alt="Man sitting and reading.">
		</div>	
		<div class="container-wrap">
			<div>
				<h2><span><Icon icon="icon-park-twotone:personal-privacy" /></span> {i("features.0.title")}</h2>
				<p>{i("features.0.detail")}</p>
			</div>
			<div>
				<h2><span><Icon icon="ic:twotone-security" /></span> {i("features.1.title")}</h2>
				<p>{i("features.1.detail")}</p>
			</div>
		</div>

		</div>

	</section>

</div>

<style lang="sass">
	.ico
		color: red
		animation: gradient 35s infinite

	.wrapper
		position: relative
		display: flex
		flex-direction: column

	.welcome
		height: 50vh
		position: relative
		display: flex
		padding: 7rem 10rem
		display: flex
		justify-content: space-between
		align-items: center
		user-select: none
		h1
			font-size: 60px
			font-weight: 800
			line-height: 1
		img
			width: 40rem
			animation: gradient 35s infinite
			margin-right: -10rem
			&:lang(ar)
				margin-left: -10rem
		span, span *
			color: red
			animation: gradient 35s infinite

		.circle
			right: 25%
			top: 48%
			position: absolute
			transform: scale(25)
			font-weight: 900
			opacity: 0.2
			&:lang(ar)
				right: 75%
	.features
		padding: 0 10rem 3rem
		display: flex
		flex-direction: column
		justify-content: center
		text-align: center
		.title-wrap
			font-size: 1.5rem				
			h2 span
				color: red
				animation: gradient 35s infinite
			.offset
				background-color: red
				position: absolute
				top: 55%
				z-index: -1
				width: inherit
				height: 1.5rem
				opacity: 0.1
				right: 31%
				animation: gradient 35s infinite


	.content-wrap
		display: flex
	.container-wrap
		margin: 1rem 0 0 5rem
		&:lang(ar)
			margin: 1rem 5rem 0 0
		div
			background-color: hsl(0, 0%, 95%)
			padding: 2rem 2rem 
			border-radius: 14px
			text-align: justify
			&:last-child
				margin-top: 1rem

		h2
			margin: 0 0 1rem 
			font-size: 1.5rem
			font-family: "Inter"
			font-weight: 700
			&:lang(ar)
				font-family: "Tajawal"
			span
				color: white
				vertical-align: middle
				margin-right: .5rem
				border-radius: 8px
				padding: .45rem .65rem .15rem .65rem
				background-color: red
				animation: gradient 35s infinite
				&:lang(ar)
					margin-left: .5rem

		p
			margin: 0
			font-weight: 400
			color: hsl(0, 0%, 40%)
			font-size: 1.05rem
			&:lang(ar)
				font-weight: 500
	.img-wrap
		position: relative
		img
			width: 20rem
			margin-top: 5rem
			transform: scaleX(-1) scale(1.5)
			animation: gradient 35s infinite
			&:lang(ar)
				// This will remove the scaleX property while keeping the scale property
				transform: scale(1.5)
		span
			color: red
			z-index: -2
			animation: gradient 35s infinite
			right: 60%
			top: 70%
			position: absolute
			transform: scale(15)
			font-weight: 900
			opacity: 0.2
			&:lang(ar)
				left: 60%
				right: 0
</style>