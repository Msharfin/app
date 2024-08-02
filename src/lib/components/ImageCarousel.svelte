<script lang="ts">
	// @ts-ignore
	import Carousel from "svelte-carousel"
    import IconButtonSecondary from "$lib/components/UI/Buttons/IconButtonSecondary.svelte"
	import { fade, fly } from "svelte/transition"

	export let imgs

	let showImgs: boolean = false
</script>

{#if showImgs}
    <div class="fullPreview" in:fade={{ duration: 100 }}>
        <div>
            <IconButtonSecondary onClickAction={(e) => {
                e.stopPropagation()    
                showImgs = false
            }} iconIdentifier="iconoir:cancel" />
        </div>
        <Carousel>
            {#each imgs as media}
                <img class="preview" src={media.mediaURL} alt="User upload" />
            {/each}
        </Carousel>
    </div>
{/if}


<button on:click|stopPropagation={() => (showImgs = true)}>
	{#if imgs.length === 1}
		<span style="background-image: url({imgs[0].mediaURL});" class="img-full"
		></span>
	{:else if imgs.length === 2}
		<span style="background-image: url({imgs[0].mediaURL});" class="img-half-1"
		></span>
		<span style="background-image: url({imgs[1].mediaURL});" class="img-half-2"
		></span>
	{:else if imgs.length === 3}
		<span style="background-image: url({imgs[0].mediaURL});" class="img-half-3"
		></span>
		<div>
			<span
				style="background-image: url({imgs[1].mediaURL});"
				class="img-quart-1"
			></span>
			<span
				style="background-image: url({imgs[2].mediaURL});"
				class="img-quart-2"
			></span>
		</div>
	{/if}
</button>

<style lang="sass">

button
    width: 100%
    height: 19rem
    padding: .25rem
    border-radius: 22px
    display: flex
    margin-bottom: .25rem
    span
        display: flex
        background-position: center
        background-repeat: no-repeat
    .img-full
        width: 100%
        height: 100%
        border-radius: 18px
    .img-half-2, .img-half-1
        width: 50%
        height: 100%
    .img-half-1
        border-start-start-radius: 18px 
        border-end-start-radius: 18px 
        margin-inline-end: .25rem
    .img-half-2
        border-start-end-radius: 18px 
        border-end-end-radius: 18px        
    .img-half-3
        width: 50%
        height: 100%
        border-start-start-radius: 18px 
        border-end-start-radius: 18px 
        margin-inline-end: .25rem
    div
        width: 50%
        height: 100%
        display: flex
        flex-direction: column
        .img-quart-1, .img-quart-2
            height: 50%
            width: 100%
        .img-quart-1
            border-start-end-radius: 18px
            margin-block-end: .25rem
        .img-quart-2
            border-end-end-radius: 18px 
    &:hover
        background-color: $white-1



.fullPreview
    z-index: 7
    position: fixed
    top: 0
    left: 0
    width: 100svw
    height: 100svh
    padding-inline: 1rem
    background: linear-gradient(to bottom, $white-0 25%, hsla(216, 50%, 10%, 0.25) 100%)
    backdrop-filter: blur(15px)
    display: flex
    flex-direction: column
    align-items: center
    padding-block-start: 5rem
    div
        width: 100%
        margin-bottom: 7rem
        display: flex
        justify-content: end

@media screen and (min-width: 790px)
    .fullPreview
        background: linear-gradient(60deg, $white-0 25%, hsla(216, 50%, 10%, 0.25) 100%)
        padding: 2rem 18rem 0 18rem 
        div
            margin-bottom: 2rem

</style>