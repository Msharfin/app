<script lang="ts">
	import Icon from "@iconify/svelte"
	import { languageSelection } from "$lib/components/dropdown.json"
	import { fly } from "svelte/transition"
	import {
		setLanguageTag,
		availableLanguageTags,
		languageTag,
	} from "$lang/runtime"
	import * as m from "$lang/messages"

	let langList: any = languageSelection

	let show = "none"

	function showList() {
		show = show === "flex" ? "none" : "flex"
	}

	$: flip = show === "flex" ? true : false
</script>

<div class="wrap" title={m.alt_lang_switch()}>
	{#if flip}
		<!-- TODO: Fix focus out -->
		<div
			transition:fly={{ y: 50, duration: 200 }}
			class="lang_choice"
			on:focusout={() => (flip = false)}
		>
			{#each availableLanguageTags as lang}
				{#if lang !== languageTag()}
					<button
						on:click={() => {
							flip = false
							setLanguageTag(lang)
						}}>{langList[lang]} <span>{lang}</span></button
					>
				{/if}
			{/each}
		</div>
	{/if}
	<button class="lang_btn" on:click={() => showList()}
		>{langList[languageTag()]}
		<span class:flip class="ico"
			><Icon icon="ep:arrow-down-bold" class="arrow" /></span
		></button
	>
</div>

<style lang="sass">
.lang_btn, .lang_choice button
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
.lang_btn, .lang_choice button
	display: flex
	justify-content: space-between
	align-items: center

.lang_choice
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
		span
			font-family: "Inter" !important
			color: $gray-2
			margin-left: .25rem
		&:first-child
			border-top-left-radius: 12px
			border-top-right-radius: 12px
		&:last-child
			border-bottom-left-radius: 12px
			border-bottom-right-radius: 12px

.ico
	margin-inline-start: .5rem

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
