<script lang="ts">
	import { theme } from '$lib/theme'
	import { scale } from 'svelte/transition'

    export let data
    $:({ user } = data)

    let content: string
    let openPanel: boolean

    const addEmoji = (event: any) => {
		content = content
			? (content += event.detail.emoji.unicode)
			: event.detail.emoji.unicode
    }
</script>

<div class="w-full flex items-end h-24 select-none">
    <h1 class="font-extrabold text-5xl leading-[0.75]">Create</h1>
</div>

<form method="post">
    <div class="mt-10 flex">
        <div class="w-fit">
            <img draggable="false" src={user.avatar_url ? user.avatar_url: "/images/no_pfp.png"} class="size-12 border-turquoisieGray rounded-full select-none" alt="Your Avatar">
        </div>
        <div class="ms-2 flex-1">
            <textarea maxlength="256" bind:value={content} class="bg-transparent text-xl w-full resize-none p-2 h-48 placeholder:text-turquoisieGray" spellcheck name="content" id="content" placeholder="Tell the world your story!" draggable="false"></textarea>
        </div>
    </div>

    <div class="select-none flex items-center justify-between">
        <div class="flex relative items-center ps-2 bg-brightAzure dark:bg-darkAzure p-1.5 rounded-full">
            <button type="button" class="secondaryBtn !size-9">
                <span class="icon-[solar--gallery-add-outline]"></span>
            </button>
            <button type="button" class="secondaryBtn !size-9">
                <span class="icon-[solar--videocamera-add-outline]"></span>
            </button>
            <button type="button" class="secondaryBtn !size-9" on:click={() => openPanel = !openPanel}>
                <span class="icon-[solar--smile-circle-outline]"></span>
            </button>        
            {#if openPanel}
                <div class="z-10 absolute top-0 left-full" on:focusout={() => openPanel = !openPanel}>
                    <emoji-picker on:emoji-click={addEmoji} transition:scale={{ start: 1.25 }} class="{$theme}"></emoji-picker>
                </div>
            {/if}        
        </div>
        <div class="flex items-center">
            <span class="tabular-nums text-funBlue me-5">{content ? content.length: 0}/256</span>
            <button type="submit" class="mainBtn !text-3xl">
                <span class="icon-[mingcute--send-fill]"></span>
            </button>            
        </div>
    </div>    
</form>

