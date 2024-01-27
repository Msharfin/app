
<script>
    import Icon from "@iconify/svelte"
    import { page } from "$app/stores"
	import { goto } from "$app/navigation"
    import * as m from "$lang/messages"
</script>

<header>
    <div class="left">
        <button class="arrow" on:click={() => goto("/")} ><span class="ico"><Icon icon="solar:arrow-left-line-duotone" /></span></button>
        <a href={$page.url.pathname}><img class="logo" src="/images/logo.png" alt={m.alt_logo({ brand: m.main_features_title_1() })}></a>
    </div>
    <div class="right">
    <button class="sign-up" on:click={()=>{
        $page.url.pathname === "/login"? goto("/signup"): goto("/login")
    }}>
        {#if $page.url.pathname === "/login"}
            <span class="ico"><Icon icon="solar:user-plus-rounded-linear" /></span> <p>{m.auth_login_title()}</p>
        {:else}
            <span class="ico"><Icon icon="solar:login-2-linear" /></span> <p>{m.auth_login_title()}</p>
        {/if}
        
    </button>
    </div>
    
</header>

<slot />

<style lang="sass">
header
    display: flex
    color: $text-secondary-color    
    padding: 2rem 10rem
    align-items: center
    user-select: none
    justify-content: flex-start
    .left
        display: flex
        align-items: center
        margin-inline-end: auto
    .right
        display: flex
        align-items: center
        // div
        //     margin-inline-start: .5rem
        .sign-up
            // margin-inline-end: .5rem
            display: flex
            color: $text-color
            align-items: center
            justify-content: center
            font-weight: 600
            padding-inline: .75rem
            p, .ico
                font-size: 1.25rem
            p
                margin: .5rem
            &:hover
                background-color: $container-color
    a
        margin-inline-start: 1rem
        .logo
            width: 3rem
            vertical-align: bottom
    .arrow
        color: $text-color
        display: inline-flex
        align-items: center
        text-decoration: none
        margin-inline-end: .25rem
        transition: .3s all ease
        border-radius: 50%
        padding: .25rem
        font-size: 2rem
        &:lang(ar)
            transform: scaleX(-1)
        &:hover
            background-color: $container-color
@media screen and (max-width: 789px)
    header
        padding: 2rem 1rem
</style>