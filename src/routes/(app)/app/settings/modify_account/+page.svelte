<script lang="ts">
  import { goto } from "$app/navigation"
  import * as m from "$lang/messages"
  import Icon from "@iconify/svelte"

  export let data
  let { userProfile } = data

  let newUsername: string | undefined
  let hasChanged: boolean = true

  $: if (newUsername !== undefined) {
    hasChanged = false
  } else if (
    newUsername === undefined ||
    newUsername === userProfile.name ||
    newUsername?.length !== 0
  ) {
    hasChanged = true
  }
</script>

<section>
  <h1>Modify account</h1>
  <div class="input">
    <label for="name">Username</label>
    <input
      bind:value={newUsername}
      name="name"
      placeholder={userProfile.name}
    />
  </div>
  <div class="action">
    <button disabled={hasChanged}
      ><span class="ico"><Icon icon="solar:diskette-bold-duotone" /></span><span
      >
        Save
      </span></button
    >
    <button on:click={() => goto("/app/settings")}>Cancel</button>
  </div>
</section>

<style lang="sass">
section
    @include page
    h1
        @include title
        font-size: 3rem
        font-weight: bolder
        margin-block: .5rem
    .action
        display: flex
        justify-content: center
        align-items: center
        margin-block-start: 1rem
        button
            width: 100%
            display: flex
            align-items: center
            justify-content: center
            padding-block: .75rem
            font-size: 1.2rem
            .ico
                margin-inline-end: .25rem
            &:first-child
                margin-inline-end: .5rem
                @include mainBtn
                &:disabled
                    background-color: $gray-0
            &:last-child
                background-color: $white-1
                color: $gray-2
                &:hover
                    background-color: $gray-0
                    
    .input
        display: flex
        flex-direction: column
        input
            background: $white-1
            border: none
            color: $black-0
            font-size: 1rem
            padding: 1rem 2rem
            font-family: "Inter", sans-serif
            border-radius: 48px     
            &::placeholder
                color: $black-0       
        label
            font-weight: 500
            text-indent: 1.5rem
            margin-bottom: .25rem
            &:not(:first-child)
                margin-top: .75rem
</style>
