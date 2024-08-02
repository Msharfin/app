<script>
  import Icon from "@iconify/svelte"
  import * as m from "$lang/messages"
  import { page } from "$app/stores"
</script>

<div>
  {#if $page.url.pathname !== "/resources"}
	<a href="/resources"><Icon icon="solar:arrow-left-line-duotone" /></a>
  {:else}
	<a href="/resources"><Icon icon="solar:home-2-line-duotone" /></a>
  {/if}
  |
  <h3>
	{$page.url.pathname.endsWith("terms") ? m.title_tos() : m.title_privacy()}
  </h3>
</div>

<style lang="sass">

div
	margin-inline-start: 10rem
	display: flex
	align-items: center
	color: $white-1
	a
		@include secondaryBtn
		&
			text-decoration: none
			display: flex
			border-radius: 50%
			padding: .25rem
			margin-inline-end: .5rem
			font-size: 2rem
			&:lang(ar)
				transform: scaleX(-1)

	h3  
		font-size: 1.5rem
		color: $gray-2
		margin-inline-start: .5rem
@media screen and (max-width: 789px)
	div
		margin-inline-start: 2.5rem
</style>
