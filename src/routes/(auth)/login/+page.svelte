<script lang="ts">
    // @ts-ignore
    import HCaptcha  from 'svelte-hcaptcha'
    import Icon from "@iconify/svelte"
    import * as m from "$lang/messages"
    import toast from "svelte-french-toast"
    import { fly } from "svelte/transition"
    import { errorToast } from "$lib/toastStyles"
    import { PUBLIC_HCAPTCHA_SITE_KEY } from "$env/static/public"
    import { goto } from '$app/navigation'
    
    export let data

    let { supabase, session } = data
    $: ({ supabase, session } = data)

    let show = false
    let loading = false
    let oauthLoading = false
    let disableButton = true

    let password: string
    let email: string
    let captcha: string

    let captchaBtn: any
    let pass: any

    function showPass() {
        if (show === true) {
            pass.type = "password"
            show = false
        } else {
            pass.type = "text"
            show = true
        }
    }

    async function logIn() {
        loading = true
        const tokenVerify = await fetch("/auth/hcaptcha", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
                captcha: captcha
            }),
        })
        const response = await tokenVerify.json()
        if (response?.error) {
            loading = false
            return toast.error(response?.error, errorToast)
        }
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
            options: {
                captchaToken: captcha,
            }
            })
        if (error) {
            loading = false
            captchaBtn.reset()
            return toast.error(error.message, errorToast)
        } 
        return goto("/app")
    }

    async function googleLogin() {
        oauthLoading = true
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google"
        })
        if (error) {
            toast.error(error.message, errorToast)
            loading = false
        }
    }

    function enableBtn (token: any) {
        disableButton = false
        captcha = token.detail.token
    }
</script>

<svelte:head>    
    <title>Msharfin | {m.auth_login_title()} </title>
</svelte:head>

<section>
<form method="POST" on:submit|preventDefault={logIn} >
    <h2> <span class="title-ico"><Icon icon="solar:login-2-bold-duotone" /></span> {m.auth_login_title()}</h2>
    <div class="email_auth">
        <label for="email">{m.auth_email()}</label>
        <input bind:value={email} id="email" type="email" name="email" autocomplete="email" placeholder="ali@example.ma">
        {#if email}
        <label transition:fly={{ y: 200, duration: 200 }} for="pass">{m.auth_password()}</label>
        <div transition:fly={{ y: 200, duration: 200 }} class="pass">
            <input bind:value={password} bind:this={pass} maxlength=12 id="pass" placeholder="********" autocomplete="current-password" type="password" name="password">
            {#if show === true}
                <button title={m.auth_hide_pass()} on:click={() => showPass()}><Icon class="show-pass ico" icon="solar:eye-closed-bold" /></button>
            {:else}  
                <button title={m.auth_show_pass()} on:click={() => showPass()}><Icon class="show-pass ico" icon="solar:eye-bold" /></button>    
            {/if}
        </div>
        {/if}          
        {#if password && email}        
        <div class="captcha">
            <HCaptcha bind:this={captchaBtn} sitekey={PUBLIC_HCAPTCHA_SITE_KEY} theme="dark" on:success={enableBtn} />
        </div>
        <button disabled={loading ? disableButton = true: disableButton} transition:fly={{ y: 200, duration: 200 }} class="confirm">
            {#if loading}
                <Icon icon="eos-icons:loading" class="loading-ico" />
            {:else}
                {m.auth_confirm()}
            {/if}
        </button>
        {/if}
    </div>        

</form>
<div class="sep">– {m.auth_seperator()} –</div>
<div class="oauth">
    <button disabled={oauthLoading} class="auth_btn" on:click={googleLogin}>
            {#if oauthLoading}
                <Icon icon="eos-icons:loading" class="loading-ico" />
            {:else}
                <Icon icon="grommet-icons:google" /><p>{m.auth_google_oauth()}</p>
            {/if}
    </button>
</div>
<div class="notice">
    <Icon class="icognito" icon="solar:incognito-bold-duotone" /><p>{m.auth_login_safety_notice()}</p>
</div>  
</section>

<style lang="sass">
section
    user-select: none
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    h2
        @include title
        text-align: center
        font-size: 2.5rem
        .title-ico
            color: red
            animation:  gradient 35s infinite
    .email_auth
        display: flex
        height: 20rem
        flex-direction: column
        .captcha
            display: flex
            justify-content: center
            margin-top: .75rem
        input, .pass
            width: 20rem
        label
            font-weight: 500
            text-indent: 1.5rem
            margin-bottom: .25rem
            &:not(:first-child)
                margin-top: .75rem
        input:not([name="password"]), .pass
            background: $container-color
            border: none
            color: $text-color
            font-size: 1rem
            padding: 1rem 2rem
            font-family: "Inter", sans-serif
            border-radius: 48px            
        .pass
            display: flex
            padding: 0
            align-items: center
            justify-content: space-between
            button
                background: none
                font-size: 1.25rem
                border: none
                padding-block: .25rem
                margin-inline-end: .5rem
                border-radius: 50%
                :global(.show-pass)
                    color: gray            
                &:hover
                    background-color: $hover-container-color

            input
                padding: 1rem 2rem
                width: 85%
                border: none
                font-size: 1rem
                background: none
                color: $text-color
                border-start-start-radius: 48px 48px
                border-end-start-radius: 48px 48px           
        .confirm
            background-color: $text-color
            border: none
            display: flex
            justify-content: center
            align-items: center
            border-radius: 48px
            padding: 1rem 2rem
            color: $background-color
            width: 100%
            font-weight: bold
            margin-block-start: .25rem
            font-size: 1.25rem
            vertical-align: middle
            :global(.loading-ico)
                font-size: 1.5rem
                display: block
            &:hover
                background-color: $hover-color
            &:disabled
                pointer-events: none
                cursor: none
                background-color: $hover-color
    .notice
        color: $text-secondary-color
        width: 20rem
        display: flex
        align-items: center
        vertical-align: middle
        p
            font-size: 0.85rem
            font-weight: bold
            text-align: justify
        :global(.icognito)
            display: block
            margin-inline-end: .75rem
            font-size: 6rem
    .oauth 
        display: flex
        justify-content: center
        .auth_btn
            background-color: $text-color
            border: none
            width: 20rem
            display: flex
            justify-content: center
            align-items: center
            border-radius: 48px
            padding: 1rem 2rem
            color: $background-color
            font-weight: bold
            font-size: 1.25rem
            vertical-align: middle
            p
                margin: 0
                margin-inline-start: .5rem
            &:hover
                background-color: $hover-color
            &:disabled
                pointer-events: none
                cursor: none
                background-color: $hover-color
    .sep 
        color: $hover-color
        margin-block: .25rem .5rem
</style>