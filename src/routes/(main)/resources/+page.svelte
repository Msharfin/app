<script>
  import { goto } from "$app/navigation"
  import Icon from "@iconify/svelte"
  import * as m from "$lang/messages"
</script>

<section>
  <p>
    {m.res_portal_home()}
  </p>
  <div>
    <button on:click={() => goto("/resources/terms")}
      ><p>{m.title_tos()}</p>
      <span class="ico"><Icon icon="solar:document-text-outline" /></span
      ></button
    >
    <button on:click={() => goto("/resources/privacy")}
      ><p>{m.title_privacy()}</p>
      <span class="ico"><Icon icon="solar:shield-keyhole-outline" /></span
      ></button
    >
  </div>
</section>

<style lang="sass">
section
    margin-inline: 10rem
    text-indent: 2rem
    text-align: justify
    font-size: 1.25rem
    div
        display: flex
        margin-block-start: 2rem
        align-items: center
        justify-content: space-evenly
        p
            margin: 0
            position: relative
            z-index: 1
        button
            width: 100%
            padding: 2rem 1.5rem
            font-size: 1.5rem
            position: relative
            font-weight: 800
            border: none
            border-radius: 24px
            margin-inline: 1rem 1rem
            display: flex
            align-items: center
            justify-content: center
            background-color: $white-1 
        button:hover
            background-color: $gray-0 
            .ico
                transform: scale(1.2)
        .ico
            transition: .5s all ease
            left: 20%
            color: $gray-2
            position: absolute
            z-index: 0
            opacity: 0.4
            font-size: 5rem 

@media screen and (max-width: 789px)
    section
        margin-inline: 3rem
        div
            flex-direction: column
            button:last-child
                margin-top: 1rem
</style>
