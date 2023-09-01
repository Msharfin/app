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
        <h2><span class="ico"><Icon icon="line-md:document-twotone" /></span> {i("titles.res-portal")}</h2>
    </div>
    <ResourcesNav />
</section>

<slot></slot>

<style lang="sass">
.title 
    user-select: none
    display: flex
    align-items: center
    justify-content: center
    h2
        font-size: 2.5rem
        margin-bottom: 0
    .ico
        color: red
        animation: gradient 35s infinite
</style>