<script lang="ts">
    import * as m from "$lang/messages"
	import { version } from "$lib"
	import Navbar from "$lib/components/Navbar.svelte"

</script>


<section class="app-page">
    <Navbar route="/app/settings" title={m.settings_misc()} />
    <div class="links">
        <li><a target="_blank" rel="noopener noreferrer" href="https://msharfin.statuspage.io/" class="link">{m.title_site_status()}</a></li>
        <li><a href="/resources" class="link">{m.res_portal_title()}</a></li>
    </div>
    <div class="credits">
        <h1>{m.main_features_title_1()}</h1> <br>
        <img src="/images/project_status.png" alt="INDEV">
        <h5>v{version}, Made with &#9825; by Retcy</h5>
    </div>
</section>

<style lang="sass">
section
    user-select: none
    @include page
.links
    display: flex
    margin-inline-start: 2rem
    height: 75vw
    flex-direction: column
    list-style-type: none
    font-size: 1.1rem
    li
        margin-block-start: .25rem
        display: flex
        justify-content: space-between
        align-items: center
        a
            color: inherit
            &:hover
                color: $hover-color
.credits
    margin-inline-start: 2rem
    h1, h5
        color: $text-secondary-color
        margin-block: 0
    h1
        @include title
        display: contents
        transition: all .45s ease
        font-size: 2.5rem
        &:hover
            cursor: pointer
            &::after
                margin-inline-start: .5rem
                content: "🇲🇦"
    img
        width: 5rem
            
</style>