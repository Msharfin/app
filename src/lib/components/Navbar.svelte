<script lang="ts">
	import { goto } from "$app/navigation"
	import Icon from "@iconify/svelte"

    export let route: string
    export let title: string
</script>


<div class="nav">
    <button on:click={() => goto(route)}>
        <span class="ico"><Icon icon="solar:arrow-left-line-duotone" /></span
        ></button
    >
    <h2 id="post">{title}</h2>
</div>

<style lang="sass">
.nav
    display: flex
    align-items: center
    color: $text-secondary-color
    button, h2
        color: $text-color
    button
        @include secondaryBtn($color: $text-color)
        margin-inline-end: .25rem
        padding: .25rem
        border-radius: 50%
        span
            font-size: 1.75rem

</style>