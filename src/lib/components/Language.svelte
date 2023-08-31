<script>
// @ts-nocheck

	import { browser } from '$app/environment'
	import { language, languages, switchLanguage } from '@inlang/sdk-js'
	import Icon from '@iconify/svelte'
	import data from "$lib/components/lang_list.json"

	let div

	let show = "none"
	function changeLang(locale) {
		if (browser) {localStorage.setItem("language", locale)}
		switchLanguage(locale)
	}

	function showList() {
		show = show === "flex" ? "none": "flex"
	}

	if (browser) {
		// https://thewebdev.info/2022/02/13/how-to-hide-a-div-when-it-loses-focus-with-javascript/
		document.onmouseup = (e) => {
		  if (e.target !== div) {
		    div.style.display = "none"
		    flip = false
		  }
		}

		if (localStorage.getItem("language") === undefined) {
			localStorage.setItem("language", document.documentElement.lang)
		}
	}

	$: flip = show === "flex" ? true: false

</script>

<div class="wrap">	
<div class="lang_choice" bind:this={div} style="display: {show};">
{#each languages as lang }
	{#if lang !== language}
		<button on:click={() => changeLang(lang)} >{data[lang]} <span>{lang}</span></button>
	{/if}
{/each}
</div>
<button class="lang_btn" on:click={() => showList()}>{data[language]} <span class:flip={flip} class="ico"><Icon icon="ep:arrow-down-bold" class="arrow" /></span></button></div>	


<style lang="sass">
.lang_btn, .lang_choice button
	border: none
	background-color: $container-color
	padding: .35rem .5rem .5rem
	border-radius: 12px 
	transition: all .5s ease
	font-weight: 600
	font-size: 13px
	width: 5rem
	height: 2rem
	&:lang(ar)
		direction: ltr
	&:hover
		background-color: $hover-container-color
.lang_btn
	display: flex
	justify-content: center
	align-items: center

.lang_choice
	position: absolute
	bottom: 125%
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
			color: hsl(0, 0%, 60%)
			margin-left: .25rem

.ico
	margin-inline-start: .5rem

.flip > :global(.arrow)
	transform: scaleY(-1)
	transition: transform .2s ease

:global(.arrow)
	color: $text-secondary-color
	transition: transform .2s ease

.wrap
	display: flex
	position: relative
	flex-direction: column
	margin: 0 .25rem 0 .25rem
</style>




