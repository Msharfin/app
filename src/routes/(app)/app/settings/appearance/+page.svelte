<script lang="ts">
    import * as m from "$lang/messages"
	import Language from "$lib/components/Language.svelte"
	import Navbar from "$lib/components/Navbar.svelte"
	import ThemeDropdown from "$lib/components/ThemeDropdown.svelte"

</script>


<section class="app-page">
    <Navbar route="/app/settings" title={m.settings_look()} />
    <div>
        <li><span>{m.settings_theme()}</span><ThemeDropdown /></li>
        <p>The look and feel of the app, you can choose between dark and light mode.</p>
        <li><span>{m.settings_lang()}</span><Language /></li>
        <p>The Language of the app, you can choose between english and french (Arabic is coming soon)</p>
    </div>
</section>

<style lang="sass">
section
    user-select: none
    @include page
div
    display: flex
    margin-inline-start: 2rem
    flex-direction: column
    list-style-type: none
    font-size: 1.1rem
    li
        margin-block-start: .25rem
        display: flex
        justify-content: space-between
        align-items: center
    p
        font-weight: light
        margin-block-start: 0.25rem
        margin-inline-start: .75rem
        font-size: 1rem
        color: $text-secondary-color
</style>