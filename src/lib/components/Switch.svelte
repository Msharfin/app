<script lang="ts">
    import { createSwitch, melt } from '@melt-ui/svelte'
	import { writable } from 'svelte/store'
  
    export let checked: boolean = false
    export let checkAction: EventListener

    $: isChecked = writable(checked)

    const {
        elements: { root, input },
    } = createSwitch({
        checked: isChecked,
    })
</script>

<form>
    <button
        use:melt={$root}
        on:m-click|preventDefault={checkAction}
        class="rounded-full hoverEffect transition-colors flex items-center justify-center text-3xl"
    >
        {#if $isChecked}
            <span class="icon-[solar--check-square-bold-duotone] text-funBlue"></span>
        {:else}
            <span class="icon-[solar--close-square-line-duotone] text-turquoisieGray"></span>
        {/if}
    </button>
    <input use:melt={$input} />    
</form>
