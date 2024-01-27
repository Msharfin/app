<script>
  import { goto } from "$app/navigation"
  import Icon from "@iconify/svelte"
  import SvelteMarkdown from "svelte-markdown"

  export let data
  let { resource } = data
</script>

<section>
  <div class="md">
    <SvelteMarkdown source={resource.content} />
  </div>
  {#if resource.pdf_link}
  <div class="pdf"><button on:click={()=> goto(resource.pdf_link)}><Icon icon="solar:download-minimalistic-bold" /> <p>Download as PDF</p></button></div>
  {/if}
</section>

<style lang="sass">
section
  display: flex
  flex-direction: column
  flex: 1
  margin-inline: 12rem
  .pdf
    display: flex
    align-items: center
    justify-content: center
    border-top: 1px solid $text-secondary-color
    margin-block-start: 1rem
    padding-block-start: .25rem
    button
      @include secondaryBtn($font-weight: normal)
      display: flex
      align-items: center
      font-size: 1.15rem
      padding-inline: .75rem
      p
        margin-block: .75rem 
        margin-inline-start: .25rem
@media screen and (max-width: 789px) 
  section
    margin-inline: 2.5rem
</style>