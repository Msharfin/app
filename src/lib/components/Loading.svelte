
<script>
	import Icon from "@iconify/svelte"
	import * as m from "$lang/messages"
</script>

<div class="loading">
	<img src="/images/logo.png" class="logo" alt={m.alt_logo({ brand: m.main_features_title_1 })}>
	<Icon icon="eos-icons:loading" class="loading-ico" />
</div>	

<style lang="sass">

.loading
	position: fixed
	height: 100vh
	width: 100vw
	display: flex
	background-color: hsla($background-color, 0.5)
	z-index: 999
	backdrop-filter: blur(50px)
	flex-direction: column
	justify-content: center
	align-items: center
	img
		width: 5rem
		margin-bottom: 2rem
	:global(.loading-ico)
		color: $text-color
		font-size: 2rem
</style>