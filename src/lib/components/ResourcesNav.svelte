<script>
  import Icon from "@iconify/svelte"
  import { i } from "@inlang/sdk-js"
  import { page } from "$app/stores";
</script>

<div>
    {#if $page.url.pathname !== "/resources"}
        <a href="/resources"><Icon icon="ion:arrow-back" /></a>
    {:else}
        <a href="/resources"><Icon icon="ic:twotone-home" /></a>
    {/if}
    | 
    <h3>{i(`resources.res-nav.${$page.url.pathname}`)}</h3>
</div>

<style lang="sass">

div
    margin-inline-start: 10rem
    display: flex
    align-items: center
    color: $container-color
    a
        color: $text-secondary-color
        display: inline-flex
        align-items: center
        text-decoration: none
        margin-inline-end: .5rem
        font-size: 2rem
        &:lang(ar)
            transform: scaleX(-1)
        &:hover
            color: $text-color
    h3  
        font-size: 1.5rem
        color: $text-secondary-color
        margin-inline-start: .5rem
@media screen and (max-width: 789px)
    div
        margin-inline-start: 3rem
</style>


