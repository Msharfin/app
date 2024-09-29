<script>
	import { goto } from '$app/navigation'
	import Switch from '$lib/components/Switch.svelte'
	import { changeTheme, theme } from '$lib/theme'

    export let data
    $:({ user, supabase, session } = data)

    const logOut = async () => {
        await supabase.auth.signOut()
        goto("/auth/login")
    }

</script>

<div class="md:w-1/3 md:ms-48 w-full flex items-end h-24 select-none">
    <h1 class="font-extrabold text-5xl leading-[0.75]">Settings</h1>
</div>

<div class="md:w-1/3 md:ms-48 mt-6 mb-4 py-2 rounded-full px-2 bg-brightAzure dark:bg-darkAzure flex items-center justify-between">
    <div class="flex items-center text-funBlue">
        {#if user.avatar_url}
            <img src={user.avatar_url} class="rounded-full size-10" alt="Profile Avatar">
        {:else}
            <span class="icon-[solar--user-line-duotone] text-3xl"></span>
        {/if}
        <div class="ms-2 leading-4">
            <h1 class="font-bold">{user.slug}</h1>
            <h2>{session?.user.email}</h2>
        </div>        
    </div>
    <button on:click={() => logOut()} class="flex items-center justify-center hoverEffect p-1 rounded-full hover:bg-hoverBrightAzure dark:hover:bg-hoverDarkAzure">
        <span class="icon-[solar--logout-line-duotone] text-funBlue text-3xl"></span>
    </button>
</div>

<div class="md:w-1/3 md:ms-48">
    <div class="border-turquoisieGray border-[.5px] rounded-xl p-5">
        <h1 class="flex items-center text-xl font-bold">
            <span class="icon-[solar--paint-roller-bold] text-funBlue me-2"></span>
            <span>Appearance</span>
        </h1>            
        <p class="mt-1 mb-4 text-turquoisieGray">Customize the look and feel of the app.</p>
        <ul>
            <li class="flex items-center justify-between">
                <span>Dark mode</span>
                <Switch checkAction={() => changeTheme()} checked={$theme === "dark"} />
            </li>
        </ul>
    </div>
    <button on:click={() => goto("/app/settings/account")} class="border-turquoisieGray border-[.5px] flex items-center justify-between rounded-xl p-5 mt-3 w-full">
        <h1 class="flex items-center text-xl font-bold">
            <span class="icon-[solar--user-circle-bold] text-funBlue me-2"></span>
            <span>Account & Profile</span>
        </h1>
        <span class="icon-[iconamoon--arrow-right-2-light] text-turquoisieGray text-2xl"></span>    
        <!-- <p class="mt-1 mb-4 text-turquoisieGray">Manage your account and profile info.</p>
        <ul>
            <li class="flex items-center justify-between">
                <span>Username</span>
                <div class="flex items-center">
                    <span class="font-bold">{user.name}</span>
                    <span class="secondaryBtn ms-2 !size-8 !text-base">
                        <span class="icon-[solar--pen-linear]"></span>
                    </span>
                </div>
            </li>
            <li class="flex items-center justify-between">
                <span>Msharfin ID</span>
                <span class="font-bold">{user.slug}</span>
            </li>
            <button on:click={() => updateUser()} class="hoverEffect rounded-full py-1 mt-4 w-full bg-brightAzure text-funBlue dark:bg-darkAzure dark:hover:bg-hoverDarkAzure hover:bg-hoverBrightAzure">
                Sync Profile for legacy users
            </button>
        </ul> -->
    </button>
</div>
