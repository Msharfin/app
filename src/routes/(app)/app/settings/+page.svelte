<script lang="ts">
  import * as m from "$lang/messages"
  import Language from "$lib/components/Language.svelte"
  import Icon from "@iconify/svelte"
  import { version } from "$lib"
  import toast from "svelte-french-toast"
  import { errorToast } from "$lib/toastStyles"
  import { goto } from "$app/navigation"
  import { browser } from "$app/environment"
  import ThemeDropdown from "$lib/components/ThemeDropdown.svelte"
  import { createAccordion } from "@melt-ui/svelte"

  const getTheme = browser && localStorage.getItem("theme")
  export let data

  let username: any
  let { supabase, session, userProfile } = data
  $: ({ supabase, session } = data)

  async function signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) {
      toast.error(error.message, errorToast)
    } else {
      goto("/")
    }
  }

  const {
    elements: { content, item, trigger, root },
    helpers: { isSelected },
  } = createAccordion({
    defaultValue: "item-1",
  })
</script>

<svelte:head>
  <title>{m.app_title_settings()} | Msharfin</title>
</svelte:head>

<section class="app-page">
  <h1>{m.app_title_settings()}</h1>
  <div class="container">
    <h2>
      <span class="ico"><Icon icon="solar:pallete-2-bold-duotone" /></span><span
        class="title">{m.settings_look()}</span
      >
    </h2>
    <span class="desc">Customise the look and feel of the app</span>
    <div class="options">
      <!-- <li><span>{m.settings_lang()}</span> <Language /></li> -->
      <li><span>{m.settings_theme()}</span> <ThemeDropdown /></li>
    </div>
  </div>
  <div class="container">
    <h2>
      <span class="ico"><Icon icon="solar:user-circle-bold-duotone" /></span
      ><span class="title">{m.settings_acc()}</span>
    </h2>
    <span class="desc">Account settings/preferences and profile</span>
    <div class="options">
      <li>
        <span>Username</span> <span class="user-data">{userProfile.name}</span>
      </li>
      <li>
        <span>Tag</span> <span class="user-data">{userProfile.slug}</span>
      </li>
      <li>
        <span>E-mail address</span>
        <span class="user-data">{session?.user.email}</span>
      </li>
    </div>
    <div class="button-container">
      <!-- <button on:click={() => goto("/app/settings/modify_account")}
        ><span class="ico"
          ><Icon icon="solar:ruler-cross-pen-bold-duotone" /></span
        ><span>Modify</span></button
      > -->
      <button on:click={() => signOut()}
        ><span class="ico"><Icon icon="solar:logout-2-bold-duotone" /></span
        ><span>{m.auth_signout()}</span></button
      >
    </div>
  </div>
  <div class="container">
    <h2>
      <span class="ico"><Icon icon="solar:info-circle-bold-duotone" /></span
      ><span class="title">{m.settings_misc()}</span>
    </h2>
    <span class="desc">Resources and info about the app</span>
    <div class="options">
      <li><span>Version</span> <span class="user-data">v{version}</span></li>
      <li><a href="/resources" class="link">{m.res_portal_title()}</a></li>
      <li>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://msharfin.statuspage.io/"
          class="link">{m.title_site_status()}</a
        >
      </li>
    </div>
  </div>
</section>

<style lang="sass">
section
    user-select: none
    @include page
    h1
        @include title
        font-size: 3rem
        font-weight: bolder
        margin-block: .5rem
    .container
        border: 1px solid $gray-0
        border-radius: 12px
        padding: 1rem
        h2
            font-weight: bold
            margin-block: 0 .5rem
            display: flex
            align-items: center
            .ico
                color: $blue-0
                margin-inline-end: .5rem
        .desc
            color: $gray-2
        .options
            margin-block-start: .75rem
            li
                list-style-type: none
                display: flex
                align-items: center
                justify-content: space-between
                &:not(:last-child)
                    margin-block-end: .5rem
                .user-data
                    font-weight: bold
                    color: $gray-2
                a
                    color: $blue-0
                    &:hover
                        color: $gray-3
        &:not(:last-child)
            margin-block-end: .5rem

        .button-container
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
                    background-color: $white-1
                    color: $gray-2
                    &:hover
                        background-color: $gray-0
                &:last-child
                    background-color: hsla(17, 100%, 50%, 0.2)
                    color: hsl(17, 100%, 50%)
                    &:hover
                        background-color: hsla(17, 100%, 50%, 0.4)
</style>
