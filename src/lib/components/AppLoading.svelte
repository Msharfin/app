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
	background: $white-0
	z-index: 5
	flex-direction: column
	justify-content: center
	align-items: center
	:global(.loading-ico)
		color: $blue-0
		font-size: 2rem
</style>
