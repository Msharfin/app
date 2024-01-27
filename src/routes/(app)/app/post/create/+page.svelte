<script lang="ts">
    import * as m from "$lang/messages"
	import TextPrompt from "$lib/components/TextPrompt.svelte"
</script>

<svelte:head>
    <title>{m.app_title_create()} | Msharfin</title>
</svelte:head>

<section class="app-page">
    <h1>{m.app_title_create()}</h1>
    <TextPrompt />
</section>

<style lang="sass">
section
    user-select: none
    @include page
    h1
        @include title
        font-size: 3rem
        font-weight: bolder
        margin-block: .5rem 1.5rem
</style>