<script>
// @ts-nocheck

	import { browser } from '$app/environment';
	import { i, language, languages, switchLanguage } from '@inlang/sdk-js';
	import Icon from '@iconify/svelte';
	import data from "$lib/components/lang_list.json";

	let div;
	$: flip = show === "flex" ? true: false;

	let show = "none";
	function changeLang(locale) {
		if (browser) {
			localStorage.setItem("language", locale);
		}
		switchLanguage(locale);
	}

	function showList() {
		show = show === "flex" ? "none": "flex";
	}

	if (browser) {
		// https://thewebdev.info/2022/02/13/how-to-hide-a-div-when-it-loses-focus-with-javascript/
		document.onmouseup = (e) => {
		  if (e.target !== div) {
		    div.style.display = 'none';
		    flip = false;
		  }
		}

		if (localStorage.getItem("language") !== undefined) {
		  	localStorage.getItem("language");
		}
		localStorage.setItem("language", document.documentElement.lang);
	}


</script>

<div class="wrap">	
<div class="lang_choice" bind:this={div} style="display: {show};">
{#each languages as lang }
	{#if lang !== language}
		<button on:click={() => changeLang(lang)} >{data[lang]} <span>{lang}</span></button>
	{/if}
{/each}
</div>
<button on:click={() => showList()}>{data[language]} <span class:flip={flip} class="ico"><Icon icon="ep:arrow-down-bold" class="arrow" /></span></button></div>	


<style lang="sass">
	
	button
		margin: 0 0 0 .5rem
		border: none
		background-color: hsl(0, 0%, 90%)
		padding: .5rem
		border-radius: 12px 
		transition: all .5s ease
		font-weight: 600
		font-size: 13px
		width: 5rem
		&:lang(ar)
			margin: 0 .5rem 0 0 
			direction: ltr
		&:hover
			background-color: hsl(0, 0%, 80%)

	.lang_choice
		&:lang(ar)
			margin: 0 .5rem 0 0
		width: 5rem 
		padding: 5rem
		margin: 0 0 0 .5rem
		position: absolute
		bottom: 125%
		font-size: 0
		list-style-type: none
		flex-direction: column
		padding: 0
		button
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
				font-family: "Inter"
				color: hsl(0, 0%, 60%)
				margin-left: .5rem

	.ico
		margin: 0 0 0 .25rem
		&:lang(ar)
			margin: 0 .25rem 0 0

	.flip > :global(.arrow)
		transform: scaleY(-1)
		transition: transform .2s ease

	:global(.arrow)
		transition: transform .2s ease

	.wrap
		display: flex
		position: relative
		flex-direction: column
</style>




