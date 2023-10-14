<svelte:head>
    <title>Msharfin | {i("titles.res-portal")}</title>
</svelte:head>

<script>
    import Icon from "@iconify/svelte";
    import { i } from "@inlang/sdk-js";
    import ResourcesNav from "$lib/components/ResourcesNav.svelte";
</script>

<section>
    <div class="title">
        <h2><span class="title-ico"><Icon icon="line-md:document-twotone" /></span> {i("titles.res-portal")}</h2>
    </div>
    <ResourcesNav />
</section>

<slot></slot>

<style lang="sass">
.title 
    background-color: red
    animation: gradient 35s infinite
    user-select: none
    display: flex
    align-items: center
    justify-content: flex-start
    padding-inline-start: 10rem
    color: white
    h2
        font-size: 2.5rem
@media screen and (max-width: 789px)
    .title
        padding-inline-start: 3rem
        h2
           font-size: 2rem 
</style>