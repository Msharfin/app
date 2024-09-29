<script lang="ts">
	import { enhance } from "$app/forms"
	import { goto } from "$app/navigation"
	import Cropper from "svelte-easy-crop"
	import type { ActionData } from "./$types"
	import AvatarCrop from "$lib/components/AvatarCrop.svelte"

    export let data
    export let form: ActionData
    $:({ user } = data)

    let editMode = false
    let isLoading = false

    $: if (form?.success) {
        editMode = false
        isLoading = false
    }
</script>

<!-- style:display={fileUrl.length > 1 ? "contents": "none"}  -->
<!-- {#if cropElement}
    <div class="z-20 relative w-svw h-svh">
        <Cropper crop={{ x:0, y:0 }} on:cropcomplete={e => console.log(e.detail)} image={cropElement} aspect={1}/>
    </div>
{/if} -->

<div class="w-full flex justify-between items-end h-24 mb-4 select-none">
	<h1 class="font-extrabold text-5xl leading-[0.75]">Account</h1>
	<button
		on:click={() => goto("/app/settings")}
		class="flex font-medium items-center text-sm px-2 hoverEffect justify-center rounded-full hover:bg-hoverBrightAzure hover:dark:bg-hoverDarkAzure bg-brightAzure dark:bg-darkAzure text-funBlue"
	>
		<span class="icon-[solar--arrow-left-linear] me-1"
		></span>
		<span>Settings</span>
	</button>
</div>

<div class="w-full">
    <p class="mt-1 mb-4 text-turquoisieGray">Manage your account and profile info.</p>
    <ul>
        <li class="flex items-center justify-between">
            <span>Username</span>
            {#if editMode}
                <form method="post" action="?/updateUsername" use:enhance on:submit={() => isLoading = true} class="flex ps-5 relative justify-end items-center">
                    <!-- svelte-ignore a11y-autofocus -->
                    <input autofocus name="name" style:display={isLoading? "none": "inline"} class="bg-transparent w-1/2 text-end font-bold" type="text" value={user.name}>
                    <button disabled={isLoading} class="secondaryBtn ms-2 !size-9 !text-lg">
                        {#if isLoading}
                            <span class="icon-[svg-spinners--180-ring-with-bg]"></span>
                        {:else}
                            <span class="icon-[uil--check]"></span>
                        {/if}
                    </button>
                </form>  
            {:else}
                <div class="flex items-center">
                    <span class="font-bold">{user.name}</span>
                    <button on:click={() => editMode = true} class="secondaryBtn ms-2 !size-9 !text-lg">
                        <span class="icon-[solar--pen-linear]"></span>
                    </button>
                </div>
            {/if}
        </li>
        <li class="flex items-center justify-between">
            <span>Msharfin ID</span>
            <span class="font-bold">{user.slug}</span>
        </li>
        <li class="flex items-center justify-between">
            <span>Avatar</span>
            <div class="flex items-center">
                <AvatarCrop />
                <img src={user.avatar_url} alt="Your Avatar" class="size-9 border-[.5px] rounded-full border-turquoisieGray" >
            </div>
        </li>
    </ul>
</div>

<style>

ul {
    & li {
        @apply h-9;
    }
}

</style>