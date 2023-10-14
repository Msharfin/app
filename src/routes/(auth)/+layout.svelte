
<script>
    import { i } from "@inlang/sdk-js"
    import Icon from "@iconify/svelte"
    import { page } from "$app/stores"
    import Theme from "$lib/components/Theme.svelte"

</script>

<header>
    <div>
        <a class="arrow" href="/"><Icon icon="ion:arrow-back" /></a>
        |
        <a href={$page.url.pathname} class="logo"><img src="/images/logo.png" alt={i("nav.logo_alt")}></a>
    </div>
    <Theme />
</header>

<slot />

<style lang="sass">
header
    display: flex
    color: $text-secondary-color    
    padding: 2rem 10rem
    align-items: center
    user-select: none
    justify-content: flex-start
    div
        margin-inline-end: auto
    .logo
        margin-inline-start: 1rem
        img
            width: 3rem
    .arrow
        color: $text-color
        display: inline-flex
        align-items: center
        text-decoration: none
        margin-inline-end: 1rem
        transition: .3s all ease
        font-size: 2rem
        &:lang(ar)
            transform: scaleX(-1)
        &:hover
            color: $hover-color
@media screen and (max-width: 789px)
    header
        padding: 2rem 2rem
</style>