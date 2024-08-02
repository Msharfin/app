<script>
	import Icon from "@iconify/svelte"
	import { page } from "$app/stores"
	import { goto } from "$app/navigation"
	import * as m from "$lang/messages"
	import Theme from "$lib/components/Theme.svelte"
	import IconButtonSecondary from "$lib/components/UI/Buttons/IconButtonSecondary.svelte"
</script>

<header>

    <div class="left">
        <IconButtonSecondary onClickAction={() => goto("/")} iconIdentifier="solar:arrow-left-linear" />
        <a href={$page.url.pathname}
            ><img
                class="logo"
                src="/images/logo.png"
                alt={m.alt_logo({ brand: m.main_features_title_1() })}
            /></a
        >        
    </div>

	<Theme />
</header>

<slot />

<style lang="sass">
header
    display: flex
    color: $gray-2    
    padding: 2rem 10rem
    align-items: center
    user-select: none
    justify-content: start
    div
        margin-right: auto
        display: flex
        align-items: center
        a
            .logo
                width: 2.75rem
                margin-inline-start: 1.25rem
                vertical-align: bottom

@media screen and (max-width: 789px)
    header
        padding: 2rem 2rem
</style>
