<script lang="ts">
	import { page } from "$app/stores"
	import { brandLogos } from "$lib/formatPost"
	import { theme } from "$lib/theme"
	import { alertToast } from "$lib/toastStyles"
	import Icon from "@iconify/svelte"
	import toast from "svelte-french-toast"
	import SvelteMarkdown from "svelte-markdown"
	import OutClick from "svelte-outclick"
	import { fly } from "svelte/transition"
	import * as m from "$lang/messages"

	let text: string
	let openPanel = false
	let panelTrigger: any
	let mode = "edit"

	export let style = "large"

	function addEmoji(event: any) {
		text = text
			? (text += event.detail.emoji.unicode)
			: event.detail.emoji.unicode
		openPanel = !openPanel
	}
</script>

<form method="post" class={style}>
	{#if mode === "edit"}
		<textarea
			bind:value={text}
			name="content"
			id="post_content"
			spellcheck="true"
			autofocus={style !== "compact" || $page.url.hash === "#post_content"}
			required
			maxlength="256"
			autocomplete="username"
			placeholder={"Type something cool"}
		></textarea>
	{:else}
		<p class="preview">
			<SvelteMarkdown source={brandLogos(text)} />
		</p>
	{/if}
	<div class="taskbar">
		{#if style !== "compact"}
			<h5><Icon icon="octicon:markdown-16" /></h5>
			<p class="length">{text ? text.length : 0}/256</p>
		{/if}
		<div class="btns">
			<button
				bind:this={panelTrigger}
				class="emoji"
				on:click|preventDefault={() => {
					if (text) {
						mode === "edit" ? (mode = "preview") : (mode = "edit")
					} else {
						toast("Type something first to preview it!", alertToast)
					}
				}}
				><span class="ico">
					{#if mode === "edit"}
						<Icon icon="solar:text-selection-linear" />
					{:else}
						<Icon icon="solar:pen-new-square-linear" />
					{/if}
				</span></button
			>
			<button
				bind:this={panelTrigger}
				class="emoji"
				on:click|preventDefault={() => (openPanel = !openPanel)}
			>
				<span class="ico"><Icon icon="solar:emoji-funny-circle-linear" /></span
				></button
			>
			<button disabled={mode === "preview"} class="send"
				><span class="ico"
					><span class="ico"
						><Icon icon="mingcute:send-fill" hFlip={true} /></span
					></span
				></button
			>
		</div>
	</div>
	{#if openPanel}
		<OutClick
			class="emoji-btns"
			on:outclick={() => (openPanel = false)}
			excludeElements={panelTrigger}
		>
			<emoji-picker
				class={$theme === "dark" ? "theme_light" : "dark"}
				transition:fly={{ y: 50, duration: 300 }}
				on:emoji-click={addEmoji}
			></emoji-picker>
		</OutClick>
	{/if}
</form>

<style lang="sass">
.large 
    display: flex
    flex-direction: column
    background-color: $container-color
    border-radius: 12px
    position: relative
    h5
        display: flex
        align-items: center
        color: $text-secondary-color
        font-size: 1.25rem
        margin-block: 0
    textarea, .preview
        padding: 1rem 
        border-top-left-radius: 12px
        border-top-right-radius: 12px
        background: none    
        font-size: 1.125rem
        resize: none
        min-height: 10rem
        max-height: 10rem
        color: $text-color
        border: none
        transition: all .25s ease 
    textarea:hover
        background-color: $hover-container-color
    textarea::placeholder
        color: $text-secondary-color           
    .taskbar
        display: flex
        justify-content: flex-end
        align-items: center
        margin: .5rem 1rem
        .length
            margin: 0
            margin-inline-start: 1rem
            color: $text-secondary-color
            font-size: .85rem
            font-variant-numeric: tabular-nums
        .btns
            display: flex
            align-items: center
            margin-inline-start: auto
            button
                font-size: 1.5rem
            .emoji
                @include secondaryBtn
                margin-inline-end: .25rem
                padding: .25rem
                border-radius: 50%
                &:hover
                    background-color: $hover-container-color   
            .send
                @include mainBtn
                display: flex
                align-items: center
                justify-content: center 
                width: 2.5rem
                height: 2.5rem
                border-radius: 50%
                margin-inline-start: .25rem
                &:disabled
                    background-color: $hover-color   

    :global(.emoji-btns)
        position: absolute
        top: 100%
        right: 0%
        width: 100%

.compact
    display: flex
    background-color: $container-color
    border-radius: 50px
    h5
        display: flex
        align-items: center
        color: $text-secondary-color
        font-size: 1.25rem
        margin-block: 0
    textarea, .preview
        padding: 1rem 
        border-top-left-radius: 24px
        border-bottom-left-radius: 24px
        background: none    
        font-size: 1rem
        resize: none
        min-height: 3.25rem
        max-height: 3.25rem
        color: $text-color
        width: 100%
        border: none
        transition: all .25s ease 
    textarea:hover
        background-color: $hover-container-color    
    textarea::placeholder
        color: $text-secondary-color       
    .taskbar
        display: flex
        margin: .25rem .5rem
        .btns
            display: flex
            align-items: center
            button
                font-size: 1.5rem
            .emoji
                @include secondaryBtn
                margin-inline-end: .25rem
                padding: .25rem
                border-radius: 50%
                &:hover
                    background-color: $hover-container-color   
            .send
                @include mainBtn
                display: flex
                align-items: center
                justify-content: center 
                width: 2.5rem
                height: 2.5rem
                border-radius: 50%
                margin-inline-start: .25rem

    :global(.emoji-btns)
        position: fixed
        top: 50%
        left: 50%
        z-index: 5
        transform: translate(-50%, -50%)
</style>
