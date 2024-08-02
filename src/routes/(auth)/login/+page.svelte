<script lang="ts">
	// @ts-ignore
	import HCaptcha from "svelte-hcaptcha"
	import Icon from "@iconify/svelte"
	import * as m from "$lang/messages"
	import toast from "svelte-french-toast"
	import { errorToast } from "$lib/toastStyles"
	import { PUBLIC_HCAPTCHA_SITE_KEY } from "$env/static/public"
	import { goto } from "$app/navigation"
	import { theme } from "$lib/theme.js"
	import type { ActionData } from "./$types.js"

	export let data
	export let form: ActionData

	let { supabase } = data
	$: ({ supabase } = data)

	let loading = false
	let oauthLoading = false
	let captchaBtn: any
	let show = false
	let pass: any

	if (form?.error) {
		loading = false
		captchaBtn.reset()
		toast.error(form?.error, errorToast)
	}

	function showPass() {
		if (show === true) {
			pass.type = "password"
			show = false
		} else {
			pass.type = "text"
			show = true
		}
	}

	async function googleLogin() {
		oauthLoading = true
		const { error } = await supabase.auth.signInWithOAuth({
			provider: "google",
            options: {
                redirectTo: '/app'
            }
		})
		if (error) {
			toast.error(error.message, errorToast)
			loading = false
		}
	}
</script>

<svelte:head>
	<title>Msharfin | {m.auth_login_title()}</title>
</svelte:head>

<section>
	<form method="POST" on:submit={() => loading = true}
        >
		<h2>
			<span class="title-ico"
				><Icon icon="solar:login-2-bold-duotone" /></span
			>
			{m.auth_login_title()}
		</h2>
		<div class="email_auth">
			<label for="email">{m.auth_email()}</label>
			<input
				required
				id="email"
				type="email"
				name="email"
				autocomplete="email"
				placeholder="example@msharf.in"
			/>
			<label for="pass">{m.auth_password()}</label>
			<div class="pass">
				<input
					bind:this={pass}
					required
					maxlength="12"
					id="pass"
					placeholder="••••••••"
					autocomplete="current-password"
					type="password"
					name="password"
				/>
				{#if show === true}
					<button
						title={m.auth_hide_pass()}
						on:click|preventDefault={() => showPass()}
						><Icon
							class="show-pass ico"
							icon="solar:eye-closed-bold"
						/></button
					>
				{:else}
					<button
						title={m.auth_show_pass()}
						on:click|preventDefault={() => showPass()}
						><Icon
							class="show-pass ico"
							icon="solar:eye-bold"
						/></button
					>
				{/if}
			</div>
			<div class="captcha">
				{#if $theme === "light"}
					<HCaptcha
						bind:this={captchaBtn}
						sitekey={PUBLIC_HCAPTCHA_SITE_KEY}
						theme="light"
					/>
				{:else}
					<HCaptcha
						bind:this={captchaBtn}
						sitekey={PUBLIC_HCAPTCHA_SITE_KEY}
						theme="dark"
					/>
				{/if}
			</div>
			<button
				disabled={loading}
				class="confirm"
			>
				{#if loading}
					<Icon icon="eos-icons:loading" class="loading-ico" />
				{:else}
					{m.auth_confirm()}
				{/if}
			</button>
		</div>
	</form>
	<div class="sep">– {m.auth_seperator()} –</div>
	<div class="oauth">
		<button disabled={oauthLoading} class="auth_btn" on:click={googleLogin}>
			{#if oauthLoading}
				<Icon icon="eos-icons:loading" class="loading-ico" />
			{:else}
				<Icon icon="logos:google-icon" />
				<p>{m.auth_google_oauth()}</p>
			{/if}
		</button>
		<button class="auth_btn" on:click={() => goto("/signup")}>
			<Icon icon="solar:add-circle-line-duotone" />
			<p>Create an account</p>
		</button>
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
        text-align: start
        font-size: 3.25rem
        margin-bottom: 1rem
        .title-ico
            color: $blue-0
    .email_auth
        display: flex
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
            background: $white-1
            border: none
            color: $black-0
            font-size: 1rem
            padding: 1rem 2rem
            font-family: "Inter", sans-serif
            border-radius: 48px            
        .pass
            display: flex
            padding: 0
            align-items: center
            button
                display: flex
                align-items: center
                justify-content: center
                font-size: 1.75rem
                width: 2rem
                height: 2rem
                margin: .5rem
                border-radius: 50%
                color: $gray-3
                &:hover
                    background-color: $gray-0
            input
                padding: 1rem 2rem
                max-width: 85%
                border: none
                font-size: 1rem
                background: none
                color: $black-0
                border-radius: 48px
        .confirm
            background-color: $blue-0
            border: none
            display: flex
            justify-content: center
            align-items: center
            border-radius: 48px
            padding: 1rem 2rem
            color: white
            width: 100%
            margin-block-start: .25rem
            font-weight: 500
            font-size: 1.25rem
            :global(.loading-ico)
                font-size: 1.5rem
                display: block
            @include title
            &:hover
                background-color: $blue-1

    .oauth
        .auth_btn
            border: 1px $gray-3 solid
            width: 20rem
            display: flex
            justify-content: center
            align-items: center
            border-radius: 48px
            padding: 1rem 2rem
            color: $gray-3
            font-size: 1.25rem
            vertical-align: middle
            p
                margin: 0
                margin-inline-start: .5rem
                @include title
            &:hover
                background-color: $white-1
            &:not(:first-child)
                margin-top: .5rem

    .sep 
        color: $gray-3
        margin-block: .5rem
</style>
