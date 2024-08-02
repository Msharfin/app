<script>
	import Icon from "@iconify/svelte";
	import * as m from "$lang/messages";
	import { languageTag } from "$lang/runtime";
</script>

<svelte:head>
	<title>Msharfin | {m.title_main()}.</title>
</svelte:head>

<div class="wrapper">
	<section class="welcome">
		<div>
			<h1>
				<span>{m.main_moto_0()}</span>
				{m.main_moto_1()} <br /><span class="title-ico"
					><Icon icon="solar:lock-keyhole-bold-duotone" /></span
				>
				{m.main_moto_2()}<span>.</span>
			</h1>
			<img
				src="/images/patriotism.png"
				class="patriotism-img"
				alt="Made In Morocco"
			/>
		</div>
		<img
			src="/images/welcome.png"
			class="welcome-img"
			alt="{m.image_selfie_alt()}."
		/>
	</section>
	<section class="features">
		<div class="title-wrap">
			<h2>
				{m.main_features_title_0()}
				<mark>{m.main_features_title_1()}</mark>{"ar" ===
				new String(languageTag())
					? "؟"
					: "?"}
			</h2>
		</div>
		<div
			class="content-wrap
		"
		>
			<div class="img-wrap">
				<img
					src="/images/sitting-reading.png"
					class="features-img"
					alt="{m.main_features_0_detail()}."
				/>
			</div>
			<div class="container-wrap">
				<div>
					<h2>
						<span class="ico"
							><Icon
								icon="solar:shield-keyhole-bold-duotone"
							/></span
						>
						{m.main_features_0_title()}
					</h2>
					<p>{m.main_features_0_detail()}</p>
				</div>
				<div>
					<h2>
						<span class="ico"
							><Icon icon="solar:shield-bold-duotone" /></span
						>
						{m.main_features_1_title()}
					</h2>
					<p>{m.main_features_1_detail()}</p>
				</div>
			</div>
		</div>
	</section>
</div>

<style lang="sass">
.ico
	color: $blue-0

.wrapper
	position: relative
	display: flex
	flex-direction: column

.welcome
	height: 100%
	position: relative
	display: flex
	margin-block: 3rem
	margin-inline: 10rem
	display: flex
	justify-content: space-between
	align-items: center
	user-select: none
	div
		display: flex
		flex-direction: column
		h1
			@include title
			&
				font-size: 4rem
				margin-block: 0 .5rem
				line-height: 0.9
		.patriotism-img
			width: 13rem
	.welcome-img
		width: 20rem

	span, span *
		@include title
		&
			color: $blue-0

.features
	padding: 0 10rem 3rem
	display: flex
	flex-direction: column
	justify-content: center
	text-align: center
	.title-wrap 
		font-size: 1.5rem
		h2, *
			@include title
		mark
			background-color: hsl(from $blue-0 h s l / 25%)
			color: $blue-0

.content-wrap
	display: flex
.container-wrap
	margin-top: .5rem
	margin-inline-start: 5rem
	div
		background-color: $white-1
		padding: 2rem 2rem 
		border-radius: 14px
		text-align: justify
		&:last-child
			margin-top: 1rem

	h2
		margin: 0 0 1rem 
		font-size: 1.5rem
		font-weight: 700 
		display: inline-flex
		align-items: center
		span
			color: white
			margin-inline-end: .75rem
			border-radius: 8px
			padding: .5rem
			font-size: 1.75rem
			background-color: $blue-0

	p
		margin: 0
		font-weight: 400
		color: $gray-2
		font-size: 1.05rem
		&:lang(ar)
			font-weight: 500
.img-wrap
	display: flex
	align-items: center
	justify-content: center
	img
		width: 18rem
		margin-inline: 2rem
		transform: scaleX(-1) scale(1.5)
		&:lang(ar)
			// This will remove the scaleX property while keeping the scale property
			transform: scale(1.5)

@media only screen and (max-width: 789px)
	.welcome
		margin-block: 1rem
		margin-inline: 3rem
		display: flex
		flex-direction: column
		justify-content: center
		.welcome-img
			width: 18rem
		div
			margin-block-end: 2rem 
			h1
				font-size: 2.75rem
				text-align: center
			.patriotism-img
				width: 10rem
				align-self: center
	.content-wrap
		flex-direction: column

	.features
		padding: 0 1.5rem 1.5rem
		.title-wrap
			font-size: 1.25rem				
	.container-wrap
		margin-top: 1rem 
		margin-inline-start: 0
		h2
			margin: 0 0 1rem 
			font-size: 1.5rem
	.img-wrap
		img
			position: absolute
			visibility: hidden
			overflow: hidden
			margin-inline-end: 999rem
</style>
