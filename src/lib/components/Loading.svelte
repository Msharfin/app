<script lang="ts">
  import Icon from "@iconify/svelte"
  import * as m from "$lang/messages"
</script>

<div class="loading">
  <div>
    <img
      src="/images/logo.png"
      class="logo"
      alt={m.alt_logo({ brand: m.main_features_title_1 })}
    />
  </div>
  <img class="logo-word" src="/images/msharfin.png" alt={m.alt_logo({ brand: m.main_features_title_1 })} />
</div>

<style lang="sass">

.loading
	position: fixed
	height: 100svh
	width: 100vw
	z-index: 999
	display: flex
	flex-direction: column
	justify-content: center
	align-items: center
	img
		width: 5rem
	div
		display: flex
		justify-content: center
		align-items: center
		flex:1
	.logo-word
		margin-block-end: 1rem
</style>
