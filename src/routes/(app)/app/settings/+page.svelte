
<script>
    import { i } from "@inlang/sdk-js"
    import Language from "$lib/components/Language.svelte"
    import Theme from "$lib/components/Theme.svelte"
    import Icon from "@iconify/svelte"
    import { version } from "$lib"
    import toast from "svelte-french-toast"
    import { errorToast } from "$lib/toastStyles"
    import { goto } from "$app/navigation"
    import { browser } from "$app/environment"

    const getTheme = browser && localStorage.getItem("theme")
    export let data

    let { supabase, session } = data
    $:({supabase, session} = data)

    async function signOut () {
        const { error } = await supabase.auth.signOut()
        if (error) {
            toast.error(error.message,errorToast)
        } else {
            goto("/")
        }
    }
</script>

<section>
    <h1>{i("titles.settings")}</h1>
    <h3><span class="title-ico"><Icon icon="ic:twotone-brush" /></span> {i("settings.appearance")}</h3>
    <div class="settings">
        <li><span>{i("settings.theme.1")} {i("settings."+getTheme)} {i("settings.theme.2")}</span><Theme /></li>
        <li><span>{i("footer.lang")}</span><Language /></li>
    </div>
    <h3><span class="title-ico"><Icon icon="ic:twotone-manage-accounts" /></span> {i("settings.account")}</h3>
    <div class="settings">
        <h4>{i("settings.acc-info")} <span class="email">{session?.user.email}</span></h4>
        <button class="signout" on:click={() => signOut()}><span class="ico"><Icon icon="ph:sign-out-bold" /></span>{i("settings.sign-out")}</button>
    </div>
    <h3><span class="title-ico"><Icon icon="ic:twotone-info" /></span> {i("settings.misc")}</h3>
    <div class="settings">
        <li><a href="/resources" class="link">{i("titles.res-portal")}</a></li>
        <li><a target="_blank" rel="noopener noreferrer" href="https://msharfin.statuspage.io/" class="link">{i("footer.status")}</a></li>
    </div>
    <div class="version"><span>Version</span><span>{version}</span></div>
</section>

<style lang="sass">
section
    user-select: none
    display: flex
    margin-block-start: 1.5rem
    margin-inline: 1rem
    flex-direction: column
    flex: 1
    h1
        font-size: 3rem
        font-weight: bolder
        margin-block: .5rem
    h3 
        color: $text-secondary-color
        border-bottom: solid 1px $text-secondary-color
    .settings
        display: flex
        margin-inline-start: 2rem
        flex-direction: column
        list-style-type: none
        font-size: 1.1rem
        span
            font-family: "Inter", sans-serif 
            &:lang(ar)
                font-family: "Tajawal", sans-serif
        li
            margin-block: .25rem
            display: flex
            justify-content: space-between
            align-items: center
            a
                color: $text-color
                &:hover
                    color: $hover-color
        hr
            width: 100%
        h4
            margin-block: .25rem .5rem
            font-weight: normal
            .email
                border-radius: 24px
                padding: .25rem .65rem
                font-weight: 500
                background-color: $container-color
                .title-ico
                    padding-inline: 0
        button
            align-self: center
            justify-content: center
            display: flex    
            width: 100%
            border: none
            border-radius: 24px
            padding-block: .75rem
            font-size: 1.25rem
            .ico
                margin-inline-end: .25rem
        .signout
            margin-block-start: .5rem
            background-color: $text-color
            color: $background-color
            font-weight: bold
    .version
        margin-block-start: 3.5rem 
        display: flex
        justify-content: space-between
        font-weight: bolder
        color: $text-secondary-color
        span
            font-family: "Inter", sans-serif
        &:lang(ar)
            direction: ltr
</style>    