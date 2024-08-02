<script>
  import Icon from "@iconify/svelte"
  import * as m from "$lang/messages"
  import ResourcesNav from "$lib/components/ResourcesNav.svelte"
</script>

<svelte:head>
  <title>Msharfin | {m.res_portal_title()}</title>
</svelte:head>

<section>
  <div class="title">
    <h2>
      <span class="title-ico"
        ><Icon icon="solar:document-text-bold-duotone" /></span
      >
      {m.res_portal_title()}
    </h2>
  </div>
  <ResourcesNav />
</section>

<slot />

<style lang="sass">
.title 
    background-color: $blue-0
    user-select: none
    display: flex
    align-items: center
    justify-content: flex-start
    padding-inline-start: 10rem
    color: white
    h2
        @include title
        &
            font-size: 2.5rem
@media screen and (max-width: 789px)
    .title
        padding-inline-start: 3rem
        h2
           font-size: 2rem
</style>
