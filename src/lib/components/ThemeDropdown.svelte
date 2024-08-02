<script lang="ts">
  import * as m from "$lang/messages"
  import Icon from "@iconify/svelte"
  import { themes } from "$lib/components/dropdown.json"
  import { fly } from "svelte/transition"
  import { changeTheme, theme } from "$lib/theme"

  let themeList: any = themes

  $: defaultTheme = $theme as any
  let show = "none"

  function showList() {
	show = show === "flex" ? "none" : "flex"
  }

  $: flip = show === "flex" ? true : false
</script>

<div class="wrap">
  {#if flip}
	<!-- TODO: Fix focus out -->
	<div transition:fly={{ y: 50, duration: 200 }} class="theme_choice">
	  {#each ["dark", "light"] as theme}
		{#if theme !== localStorage.getItem("theme")}
		  <button
			on:click={() => {
			  flip = false
			  changeTheme()
			}}
		  >
			<span class="ico"><Icon icon={themeList[theme]} /></span>
			{theme === "dark" ? m.theme_dark() : m.theme_light()}</button
		  >
		{/if}
	  {/each}
	</div>
  {/if}
  <button class="theme_btn" on:click={() => showList()}>
	<div>
		<span class="shape ico"><Icon icon={themeList[defaultTheme]} /></span
		>{defaultTheme === "dark" ? m.theme_dark() : m.theme_light()}
	</div>
	<span class:flip class="ico"
	  ><Icon icon="ep:arrow-down-bold" class="arrow" /></span
	></button
  >
</div>

<style lang="sass">
.theme_btn, .theme_choice button
	color: $black-0
	background-color: $white-1
	padding: 0 .75rem
	border-radius: 12px 
	transition: all .5s ease
	font-weight: 600
	font-size: .85rem
	width: 6rem
	height: 2.25rem
	&:hover
		background-color: $gray-0
.theme_btn
	display: flex
	justify-content: space-between
	align-items: center
	div
		display: flex
		align-items: center
	.shape
		margin-inline-end: .25rem

.theme_choice button
	display: flex
	align-items: center
	span
		margin-inline-end: .25rem

.theme_choice
	position: absolute
	bottom: 125%
	z-index: 5
	font-size: 0
	list-style-type: none
	flex-direction: column
	padding: 0
	button
		border: none
		margin: 0
		text-align: justify
		border-radius: 0
		&:first-child
			border-top-left-radius: 12px
			border-top-right-radius: 12px
		&:last-child
			border-bottom-left-radius: 12px
			border-bottom-right-radius: 12px

span
	font-family: "Inter" !important
	color: $gray-2

.flip
	:global(.arrow)
		transform: scaleY(-1)
		transition: transform .2s ease

:global(.arrow)
	color: $gray-2
	transition: transform .2s ease

.wrap
	display: flex
	position: relative
	flex-direction: column
	margin: 0 .25rem 0 .25rem
</style>
