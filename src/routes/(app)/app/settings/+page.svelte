<script>
	import * as m from "$lang/messages"
	import Language from "$lib/components/Language.svelte"
	import Icon from "@iconify/svelte"
	import { version } from "$lib"
	import toast from "svelte-french-toast"
	import { errorToast } from "$lib/toastStyles"
	import { goto } from "$app/navigation"
	import { browser } from "$app/environment"
	import ThemeDropdown from "$lib/components/ThemeDropdown.svelte"

	const getTheme = browser && localStorage.getItem("theme")
	export let data

	let { supabase, session } = data
	$: ({ supabase, session } = data)

	async function signOut() {
		const { error } = await supabase.auth.signOut()
		if (error) {
			toast.error(error.message, errorToast)
		} else {
			goto("/")
		}
	}
</script>

<svelte:head>
	<title>{m.app_title_settings()} | Msharfin</title>
</svelte:head>

<section class="app-page">
	<h1>{m.app_title_settings()}</h1>
    <button on:click={() => goto("/app/settings/appearance")}> <div class="title"><span class="ico"><Icon icon="solar:paint-roller-bold" /></span> <h3>{m.settings_look()}</h3></div> <span class="arrow ico"><Icon icon="solar:alt-arrow-right-linear" /></span></button>
    <!-- <button> <div class="title"><span class="ico"><Icon icon="solar:user-circle-bold" /></span> <h3>{m.settings_acc()}</h3></div> <span class="arrow ico"><Icon icon="solar:alt-arrow-right-linear" /></span></button> -->
    <button on:click={() => goto("/app/settings/other")}> <div class="title"><span class="ico"><Icon icon="solar:info-circle-bold" /></span> <h3>{m.settings_misc()}</h3></div> <span class="arrow ico"><Icon icon="solar:alt-arrow-right-linear" /></span></button>
	<!-- <h3>
		<span class="title-ico"><Icon icon="solar:paint-roller-bold" /></span>
		{i("settings.appearance")}
	</h3>
	<div class="settings">
		<li><span>{i("settings.theme")}</span><ThemeDropdown /></li>
		<li><span>{i("footer.lang")}</span><Language /></li>
	</div>
	<h3>
		<span class="title-ico"><Icon icon="solar:user-circle-bold" /></span>
		{i("settings.account")}
	</h3>
	<div class="settings">
		<h4>
			{i("settings.acc-info")} <span class="email">{session?.user.email}</span>
		</h4>
	</div>
	<h3>
		<span class="title-ico"><Icon icon="solar:info-circle-bold" /></span>
		{i("settings.misc")}
	</h3>
	<div class="settings">
		<li><a href="/resources" class="link">{i("titles.res_portal")}</a></li>
		<li>
			<a
				target="_blank"
				rel="noopener noreferrer"
				href="https://msharfin.statuspage.io/"
				class="link">{i("footer.status")}</a
			>
		</li>
	</div> -->
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
    // h3 
    //     color: $text-secondary-color
    //     // border-bottom: solid 1px $text-secondary-color
    // .settings
    //     display: flex
    //     margin-inline-start: 2rem
    //     flex-direction: column
    //     list-style-type: none
    //     font-size: 1.1rem
    //     span
    //         font-family: "Inter", sans-serif 
    //         &:lang(ar)
    //             font-family: "Tajawal", sans-serif
    //     li
    //         margin-block: .25rem
    //         display: flex
    //         justify-content: space-between
    //         align-items: center
    //         a
    //             color: $text-color
    //             &:hover
    //                 color: $hover-color
    //     hr
    //         width: 100%
    //     h4
    //         margin-block: .25rem .5rem
    //         font-weight: normal
    //         .email
    //             border-radius: 24px
    //             padding: .25rem .65rem
    //             font-weight: 500
    //             background-color: $container-color
    //             .title-ico
    //                 padding-inline: 0
    //     button
    //         align-self: center
    //         justify-content: center
    //         display: flex    
    //         width: 100%
    //         border: none
    //         border-radius: 24px
    //         padding-block: .75rem
    //         font-size: 1.25rem
    //         .ico
    //             margin-inline-end: .25rem
    //     .signout
    //         margin-block-start: .5rem
    //         background-color: $text-color
    //         color: $background-color
    //         font-weight: bold
    button
        display: flex
        align-items: center
        justify-content: flex-start
        background-color: $container-color
        border-radius: 20px
        padding: .25rem 1.25rem
        .arrow
            margin-inline-start: auto
            font-size: 1.25rem
            color: $text-secondary-color
        .title
            display: flex
            align-items: center
            color: $text-secondary-color
            font-size: 1rem
            .ico
                font-size: 1.5rem
                margin-inline-end: .5rem
        &:hover
            background-color: $hover-container-color
        &:not(:last-child)
            margin-block-end: .5rem
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
