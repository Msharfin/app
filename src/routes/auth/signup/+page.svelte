<script lang="ts">
	import { PUBLIC_TURNSTILE_KEY } from "$env/static/public"
	import { scale } from "svelte/transition"
    import { theme } from "$lib/theme"
    import { Turnstile } from 'svelte-turnstile'
	import type { ActionData } from "./$types"

    export let form: ActionData

    let showPass: boolean = false
    let reset: () => void | undefined
    let isLoading: boolean = false
    let pass: string
    
    $: hasLength = (pass && pass.length >= 8 ) as boolean
    $: hasSpecialChar = /^(?=.*[!#$%&()*_./:;<=>?@~])/.test(pass)
    $: hasNumber = /^(?=.*[1-9])/.test(pass)
    $: hasCapitalCase = /^(?=.*[A-Z])/.test(pass)
    $: hasLowerCase = (pass && /^(?=.*[a-z])/.test(pass)) as boolean
    $: hasWeirdChars = /[^a-zA-Z\d!#$%&()*_./:;<=>?@~]/u.test(pass)


    $: matchesCriteria = hasCapitalCase && hasNumber && hasSpecialChar && hasLowerCase && hasLength && !hasWeirdChars ? true : false
    
    if (form?.error || form?.success) {
        // @ts-ignore
        reset?.()
    }
</script>

<section class="select-none flex flex-1 justify-center w-full">
    <div class="w-full mb-4 mx-8 md:w-[25%] pt-8">
        <h1 class="flex items-center font-bold text-5xl mb-5">
            <span class="icon-[solar--user-plus-rounded-outline] me-2 text-funBlue"></span>
            <span>Sign up</span>
        </h1>
        {#if form?.error}
            <span class="text-red-500 block w-full"><b class="text-red-500">Error - </b> {form?.error}</span>
        {/if}
        {#if form?.success}
            <span class="text-green-600 block w-full"><b class="text-green-600">Success - </b> Please check your email to continue the account setup!</span>
        {/if}
        <form on:submit={() => isLoading = true} action="?/logIn" method="post" class="flex flex-col w-full">
            <div class="input">
                <label for="email">E-mail address</label>
                <input required placeholder="ali@email.me" autocomplete="email" class="hoverEffect"  id="email" type="email">                
            </div>
            <div class="input mt-2">
                <label for="id">Username</label>
                <input required placeholder="Ali" autocomplete="name" class="hoverEffect"  id="name" type="text">                
            </div>
            <div class="input mt-2">
                <label for="id">Msharfin ID</label>
                <input required placeholder="ali.msh" autocomplete="nickname" class="hoverEffect"  id="id" type="text">                
            </div>
            <div class="input mt-2">
                <label for="pass">Password</label>
                <div class="flex items-center relative">
                    <input required bind:value={pass} placeholder="••••••••" autocomplete="current-password" class="hoverEffect" id="pass" {...{ type: showPass ? "text" : "password" }}>
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
            <div class="flex flex-col ms-6 text-sm my-2 text-turquoisieGray">
                <span class={`${hasLength ? "text-green-600" : null } flex items-center`}>
                    {#if hasLength}
                        <span 
                        in:scale={{ delay: 100, start: 1.5 }}
                        class="icon-[solar--check-circle-bold-duotone]"></span>
                    {:else}
                        <span 
                        in:scale={{ delay: 100, start: 1.5 }}
                        class="icon-[solar--close-circle-line-duotone]"></span>
                    {/if}
                    <span class="ms-1">At least 8 charcters long</span>
                </span>
                <span class={`${hasSpecialChar ? "text-green-600" : null } flex items-center`}>
                    {#if hasSpecialChar}
                        <span 
                        in:scale={{ delay: 100, start: 1.5 }}
                        class="icon-[solar--check-circle-bold-duotone]"></span>
                    {:else}
                        <span 
                        in:scale={{ delay: 100, start: 1.5 }}
                        class="icon-[solar--close-circle-line-duotone]"></span>
                    {/if}
                    <span class="ms-1">At least one special character (?, $, @...)</span>
                </span>
                <span class={`${hasNumber ? "text-green-600" : null } flex items-center`}>
                    {#if hasNumber}
                        <span 
                        in:scale={{ delay: 100, start: 1.5 }}
                        class="icon-[solar--check-circle-bold-duotone]"></span>
                    {:else}
                        <span 
                        in:scale={{ delay: 100, start: 1.5 }}
                        class="icon-[solar--close-circle-line-duotone]"></span>
                    {/if}
                    <span class="ms-1">At least one number</span>
                </span>
                <span class={`${hasCapitalCase ? "text-green-600" : null } flex items-center`}>
                    {#if hasCapitalCase}
                        <span 
                        in:scale={{ delay: 100, start: 1.5 }}
                        class="icon-[solar--check-circle-bold-duotone]"></span>
                    {:else}
                        <span                         
                        in:scale={{ delay: 100, start: 1.5 }}
                        class="icon-[solar--close-circle-line-duotone]"></span>
                    {/if}
                    <span class="ms-1">At least one capital letter</span>
                </span>
                <span class={`${hasLowerCase ? "text-green-600" : null } flex items-center`}>
                    {#if hasLowerCase}
                        <span 
                        in:scale={{ delay: 100, start: 1.5 }}
                        class="icon-[solar--check-circle-bold-duotone]"></span>
                    {:else}
                        <span 
                        in:scale={{ delay: 100, start: 1.5 }}
                        class="icon-[solar--close-circle-line-duotone]"></span>
                    {/if}
                    <span class="ms-1">At least one lower case letter</span>
                </span>
                <span class={`${ !hasWeirdChars ? "text-green-600" : null } flex items-center`}>
                    {#if !hasWeirdChars}
                        <span 
                        in:scale={{ delay: 100, start: 1.5 }}
                        class="icon-[solar--check-circle-bold-duotone]"></span>
                    {:else}
                        <span 
                        in:scale={{ delay: 100, start: 1.5 }}
                        class="icon-[solar--close-circle-line-duotone]"></span>
                    {/if}
                    <span class="ms-1">Has no non-alphanumeric characters</span>
                </span>              
            </div>
            <Turnstile bind:reset size="flexible" siteKey={PUBLIC_TURNSTILE_KEY} theme={$theme === "dark" ? "dark": "light"} />             
            <span class="text-sm mx-6 text-turquoisieGray">By clicking 'Create account' you agree to our <a class="underline text-funBlue hover:text-hoverFunBlue" href="/auth/reset">Privacy policy</a> and <a class="underline text-funBlue hover:text-hoverFunBlue" href="/auth/reset">Terms of service.</a></span>
            <button disabled={!matchesCriteria || isLoading} class="mainWideBtn mt-2 mb-4 h-12 text-xl flex items-center justify-center hoverEffect disabled:hover:scale-100 disabled:hover:bg-funBlue disabled:cursor-default">
                {#if isLoading}
                    <span class="icon-[svg-spinners--180-ring-with-bg] text-2xl text-white"></span>
                {:else}
                    Create account
                {/if}
            </button>        
            <span class="text-sm text-turquoisieGray self-center">Have an account? <a class="underline text-funBlue hover:text-hoverFunBlue" href="/auth/login">Log in!</a></span>
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