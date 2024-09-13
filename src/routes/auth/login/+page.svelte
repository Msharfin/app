<script lang="ts">
	import { PUBLIC_TURNSTILE_KEY } from "$env/static/public"
	import { scale } from "svelte/transition"
    import { theme } from "$lib/theme"
    import { Turnstile } from 'svelte-turnstile'
	import type { ActionData } from "./$types"

    export let form: ActionData
    export let data
    $:( { supabase } = data )

    let showPass: boolean = false
    let reset: () => void | undefined
    let isLoading: boolean = false

    if (form?.error) {
        // @ts-ignore
        reset?.()
    }

    const oauthGoogleLogin = async () => {
        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${ window.location.origin }/auth/confirm`
            }
        })
    }
</script>

<section class="select-none flex flex-1 justify-center w-full">
    <div class="w-full mx-8 md:w-[25%] pt-8">
        <h1 class="flex items-center font-bold text-5xl">
            <span class="icon-[solar--login-outline] me-2 text-funBlue"></span>
            <span>Log in</span>
        </h1>
        <div class="mt-5">
            <button on:click={() => oauthGoogleLogin()} class= "hoverEffect py-2 w-full rounded-full text-lg flex items-center justify-center border-[1px] border-turquoisieGray text-turquoisieGray">
                <span class="icon-[logos--google-icon] me-3"></span>
                <span>Log in with <b>Google</b></span>
            </button>
        </div>
        <div class="text-center mt-2 text-turquoisieGray">
            - OR -
        </div>
        {#if form?.error}
            <span class="text-red-500 block w-full"><b class="text-red-600">Error - </b> {form?.error}</span>
        {/if}
        <form on:submit={() => isLoading = true} action="?/logIn" method="post" class="flex flex-col w-full">
            <div class="input">
                <label for="email">E-mail address</label>
                <input placeholder="ali@email.me" autocomplete="email" class="hoverEffect"  id="email" type="email">                
            </div>
            <div class="input mt-2">
                <label for="pass">Password</label>
                <div class="flex items-center relative">
                    <input placeholder="••••••••" autocomplete="current-password" class="hoverEffect" id="pass" type={showPass ? "text" : "password"}>
                    <button class="absolute end-0 text-funBlue dark:text-turquoisieGray text-xl p-2 pe-4 flex items-center justify-center" on:click|preventDefault={() => showPass = !showPass}>
                        {#if showPass}
                            <span 
                            in:scale={{ delay: 100, start: 1.5 }}
                            class="icon-[solar--eye-closed-linear]"></span>
                        {:else}
                            <span 
                            in:scale={{ delay: 100, start: 1.5 }}
                            class="icon-[solar--eye-bold]"></span>
                        {/if}
                    </button>                    
                </div>
            </div>
            <div class="mt-2">
                <Turnstile bind:reset size="flexible" siteKey={PUBLIC_TURNSTILE_KEY} theme={$theme === "dark" ? "dark": "light"} />             
            </div>
            <button disabled={isLoading} class="mainWideBtn mb-4 h-12 text-xl flex items-center justify-center hoverEffect disabled:cursor-default">
                {#if isLoading}
                    <span class="icon-[svg-spinners--180-ring-with-bg] text-2xl text-white"></span>
                {:else}
                    Log in
                {/if}
            </button>        
            <span class="text-sm text-turquoisieGray self-center">Forgot password? <a class="underline text-funBlue hover:text-hoverFunBlue" href="/auth/reset">Reset it here!</a></span>
            <span class="text-sm text-turquoisieGray self-center">New user? <a class="underline text-funBlue hover:text-hoverFunBlue" href="/auth/signup">Create an account!</a></span>
        </form>
    </div>
</section>

<style>

.input {
    & label {
        @apply text-sm ms-5;
    }
    & input {
        @apply bg-brightAzure dark:bg-brightGray rounded-full placeholder:text-funBlue dark:placeholder:text-turquoisieGray ps-6 text-dimGray dark:text-white h-12  w-full; 
    }
}

</style>