<script>
  import Icon from "@iconify/svelte";
  import { i } from "@inlang/sdk-js";
</script>

<svelte:head>
  <title>Msharfin | {i("titles.main")}.</title>
</svelte:head>

<div class="wrapper">
  <section class="welcome">
    <div>
      <h1>
        <span>{i("main.moto.0")}</span>
        {i("main.moto.1")} <br /><span class="ico"
          ><Icon icon="iconamoon:eye-off-duotone" /></span
        >
        {i("main.moto.2")}<span>.</span>
      </h1>
    </div>
    <img src="/images/welcome.png" class="welcome-img" alt="{i("alt.welcome")}." />
  </section>
  <section class="features">
    <div class="title-wrap">
      <h2>
        {i("main.features.title.0")} <span>{i("main.features.title.1")}</span>{i("main.features.title.2")}
      </h2>
    </div>
    <div
      class="content-wrap
		"
    >
      <div class="img-wrap">
        <img src="/images/sitting-reading.png" class="features-img" alt="Man sitting and reading." />
      </div>
      <div class="container-wrap">
        <div>
          <h2>
            <span><Icon class="f-ico" icon="icon-park-twotone:personal-privacy" /></span>
            {i("main.features.0.title")}
          </h2>
          <p>{i("main.features.0.detail")}</p>
        </div>
        <div>
          <h2>
            <span><Icon class="f-ico" icon="ic:twotone-security" /></span>
            {i("main.features.1.title")}
          </h2>
          <p>{i("main.features.1.detail")}</p>
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
	margin: 5rem auto
	margin-inline: 10rem
	display: flex
	justify-content: space-between
	align-items: center
	user-select: none
	h1
		font-size: 60px
		font-weight: 800
		line-height: 1
	img
		width: 20rem
		animation: gradient 35s infinite

	span, span *
		color: red
		animation: gradient 35s infinite

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
			font-weight: 800
			animation: gradient 35s infinite

.content-wrap
	display: flex
.container-wrap
	margin-top: .5rem
	margin-inline-start: 5rem
	div
		background-color: $container-color
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
		display: inline-flex
		align-items: center
		&:lang(ar)
			font-family: "Tajawal"
		span
			color: white
			margin-inline-end: .75rem
			border-radius: 8px
			padding: .5rem
			background-color: red
			animation: gradient 35s infinite
			height: fit-content
			:global(.f-ico)
				display: block

	p
		margin: 0
		font-weight: 400
		color: $text-secondary-color
		font-size: 1.05rem
		&:lang(ar)
			font-weight: 500
.img-wrap
	display: flex
	align-items: center
	justify-content: center
	img
		width: 18rem
		margin-left: 2rem
		transform: scaleX(-1) scale(1.5)
		animation: gradient 35s infinite
		&:lang(ar)
			// This will remove the scaleX property while keeping the scale property
			transform: scale(1.5)
@media only screen and (max-width: 789px)
	.welcome
		margin: 3rem auto 3rem
		margin-inline: 3rem
		display: flex
		flex-direction: column
		justify-content: center
		h1
			font-size: 40px
			text-align: center
		img
			width: 15rem
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
			display: none
</style>
