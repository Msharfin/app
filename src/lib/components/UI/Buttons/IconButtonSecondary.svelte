
<script lang="ts">
    /*
        Secondary round button with only an icon
        
        - Last updated: v0.1.5 {@retr0cube}
    */

	import Icon from "@iconify/svelte"
    import type { EventHandler, HTMLAttributes } from "svelte/elements"

    export let onClickAction: EventHandler
    export let iconIdentifier: string
    export let iconProps: object = {}
    export let buttonTitle: string = "Secondary button"
    export let otherButtonProps: HTMLAttributes<any> = {}

</script>


<button {...otherButtonProps} title={buttonTitle} on:click|preventDefault={onClickAction}>
    <Icon icon={iconIdentifier} {...iconProps} />
</button>

<style lang="sass">

button
    display: flex
    align-items: center
    justify-content: center
    border-radius: 50%
    background-color: $white-1
    color: $blue-0x
    font-size: 2.25rem
    width: 2.5rem
    height: 2.5rem
    &:hover
        background-color: $gray-0
        
</style>