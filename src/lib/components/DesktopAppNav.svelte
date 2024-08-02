<script lang="ts">
	import { goto } from "$app/navigation"
	import Icon from "@iconify/svelte"
	import { fly } from "svelte/transition"
	import * as m from "$lang/messages"
	import { app_title_profile } from "$lang/messages/en"

	export let profile: any
</script>

<section class="desktop" in:fly={{ x: -200, duration: 500 }}>
	<a href="/app"
		><img
			class="logo"
			src="/images/logo.png"
			alt={m.alt_logo({ brand: m.main_features_title_1() })}
		/>
	</a>
	<div class="actions">
		<button title={m.app_title_create()} on:click={() => goto("/app/post/create")}
			><img src="/images/create.png" alt={m.app_title_create()} /></button
		>
		<button title={m.app_title_discover()} on:click={() => goto("/app")}
			><span class="ico"><Icon icon="solar:home-2-bold-duotone" /></span>
            </button
		>
		<button title={m.app_title_search()} on:click={() => goto("/app/search")}
			><span class="ico"><Icon icon="solar:magnifer-bold-duotone" /></span
			>
            </button
		>
		<button title={m.app_title_settings()} on:click={() => goto("/app/settings")}
			><span class="ico"><Icon icon="solar:settings-bold-duotone" /></span
			>
            </button
		>
		<button
            title={m.app_title_profile()}
			class="pfp"
			on:click={() => goto("/app/profile/me")}
			style="background-image: url({profile.avatar_url
				? profile.avatar_url
				: '/images/no_pfp.png'})"
		></button>
	</div>
</section>

<style lang="sass">
section
    position: sticky
    top: 0
    width: fit-content
    padding: 1rem
    height: 100vh
    z-index: 100
    display: flex
    color: $black-1
    flex-direction: column
    justify-content: flex-start
    align-items: center
    .logo
        width: 2.75rem
        align-self: center
    .actions 
        margin-block-start: auto
        display: flex
        flex-direction: column
        align-items: center
        img
            width: 2.25rem
            height: 2.25rem
        .pfp
            width: 3rem
            height: 3rem
            background-position: center center
            background-size: 3.125rem
        button
            background-color: $white-1
            width: 3rem
            height: 3rem 
            color: $blue-0x
            border-radius: 50%
            font-size: 1.75rem
            display: flex
            justify-content: center
            align-items: center
            padding: .5rem 
            &:not(:last-child)
                margin-block-end: .5rem   
            &:hover 
                background-color: $gray-0        
        p
            margin-block: 0

</style>
