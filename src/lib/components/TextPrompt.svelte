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

    let uploadedContent: string[]  = []

    const getImgSrc = (inpEvent: any) => {
        const files = inpEvent.target?.files
        
        if (files.length > 3) {
            toast("Media upload limited to only 3 files!", alertToast)
            return null
        }

        for (let file = 0; file < files.length; file ++) {         
            const imgSrc = URL.createObjectURL(files[file])           
            uploadedContent = [...uploadedContent, imgSrc]       
        }
    }

    const deleteImg = (img: string) => {
        uploadedContent = uploadedContent.toSpliced(uploadedContent.indexOf(img), 1)
    }

	const addEmoji = (event: any) => {
		text = text
			? (text += event.detail.emoji.unicode)
			: event.detail.emoji.unicode
		openPanel = !openPanel
	}
</script>

<form method="post" class={style} enctype="multipart/form-data">
	{#if mode === "edit"}
		<!-- svelte-ignore a11y-autofocus -->
		<textarea
			bind:value={text}
			name="content"
			id="post_content"
			spellcheck="true"
			autofocus={style !== "compact" ||
				$page.url.hash === "#post_content"}
			required
			maxlength="256"
			autocomplete="username"
			placeholder={"Type here..."}
		></textarea>
	{:else}
		<p class="preview">
			<SvelteMarkdown source={brandLogos(text)} />
		</p>
	{/if}
    <div class="media">
        {#each uploadedContent as i (i)}
            <span class="media-wrap">
                <img src={i} alt="User upload"/>
                <button on:click|preventDefault={() => deleteImg(i)}><span class="ico"><Icon icon="solar:trash-bin-minimalistic-linear" /></span></button>
            </span>
        {/each}
    </div>
	<div class="taskbar">
		{#if style !== "compact"}
			<h5><Icon icon="octicon:markdown-16" /></h5>
			<p class="length">{text ? text.length : 0}/256</p>
		{/if}
		<div class="btns">
			<button
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
						<Icon icon="solar:text-bold-square-outline" />
					{:else}
						<Icon icon="solar:pen-new-square-linear" />
					{/if}
				</span></button
			>
			<label class="ico"
				><Icon icon="solar:camera-add-linear" />
				<input
                    on:change={(event) => getImgSrc(event)}
					accept="image/jpeg,image/jpg,image/png"
					name="media"
					type="file"
                    multiple
					hidden
				/></label
			>
			<button
				bind:this={panelTrigger}
				class="emoji"
				on:click|preventDefault={() => (openPanel = !openPanel)}
			>
				<span class="ico"
					><Icon icon="solar:smile-circle-linear" />
				</span></button
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
				class={$theme}
				transition:fly={{ y: 50, duration: 300 }}
				on:emoji-click={addEmoji}
			></emoji-picker>
		</OutClick>
	{/if}
</form>

<style lang="sass">

.send
    @include mainBtn
    &
        display: flex
        align-items: center
        justify-content: center 
        width: 2.5rem
        height: 2.5rem
        border-radius: 50%
        margin-inline: .25rem 0
        &:disabled
            background-color: $gray-1 

button, label
    font-size: 1.5rem
    @include secondaryBtn($color: $gray-3)
    &
        margin-inline-end: .25rem
        padding: .25rem
        border-radius: 50%
    &:hover
        background-color: $gray-0

label
    cursor: pointer
    transition: all .5s ease 

.btns
    display: flex
    align-items: center

textarea, .preview
    padding: 1rem 
    border-radius: 12px
    background: none    
    font-size: 1.125rem
    resize: none
    color: $black-0
    border: none
    transition: all .25s ease    

textarea:hover
    background-color: $gray-0   
textarea::placeholder
    color: $gray-3       

h5
    display: flex
    align-items: center
    color: $gray-3
    font-size: 1.25rem
    margin-block: 0

.media
    padding-inline: 1rem
    padding-block-start: .25rem
    display: flex
    span
        position: relative
    img
        border-radius: 8px
        background: $gray-3
        max-width: 4rem
        aspect-ratio: 10 / 7
        box-shadow: 0px 0px 15px $gray-1
        &:not(:last-child)
            margin-inline-end: .5rem
    button
        position: absolute
        font-size: 1rem
        top: -.125rem
        right: 0
        background-color: $blue-m1
        color: white
        &:hover
            background-color: $blue-0
 
.large 
    display: flex
    flex-direction: column
    background-color: $white-1
    border-radius: 12px
    position: relative
    textarea, .preview
        min-height: 10rem
        max-height: 10rem 
    .taskbar
        display: flex
        justify-content: flex-end
        align-items: center
        margin: .5rem 1rem
        .length
            margin: 0
            margin-inline-start: 1rem
            color: $gray-3
            font-size: .85rem
            font-variant-numeric: tabular-nums
        .btns
            display: flex
            align-items: center
            margin-inline-start: auto
    :global(.emoji-btns)
        position: absolute
        top: 100%
        right: 0%
        width: 100%

.compact
    display: flex
    background-color: $white-1
    border-radius: 50px
    textarea, .preview
        border-top-left-radius: 24px
        border-top-right-radius: 0
        border-bottom-left-radius: 24px
        background: none    
        font-size: 1rem
        resize: none
        min-height: 3.25rem
        max-height: 3.25rem
        width: 100%
    input
        display: hidden
    .taskbar
        display: flex
        margin: .25rem .5rem
    :global(.emoji-btns)
        position: fixed
        top: 50%
        left: 50%
        z-index: 5
        transform: translate(-50%, -50%)
</style>
