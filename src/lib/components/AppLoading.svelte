<script>
	import Icon from "@iconify/svelte"
</script>

<div class="loading">
	<Icon icon="eos-icons:loading" class="loading-ico" />
</div>	

<style lang="sass">

.loading
	position: fixed
	height: 100vh
	width: 100vw
	display: flex
	background: linear-gradient(to bottom, $background-color 0%, transparent 75%)
	z-index: 5
	backdrop-filter: blur(50px)
	flex-direction: column
	justify-content: center
	align-items: center
	:global(.loading-ico)
		color: $text-color
		font-size: 2rem
</style>