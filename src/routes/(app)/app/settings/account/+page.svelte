<script lang="ts">
	import { enhance } from "$app/forms"
	import { goto } from "$app/navigation"
	import Cropper from "cropperjs"
    import 'cropperjs/dist/cropper.css'
	import type { ActionData } from "./$types"

    export let data
    export let form: ActionData
    $:({ user } = data)

    let editMode = false
    let isLoading = false
    let cropElement: HTMLImageElement
    
    const updateUser = async () => {
        await fetch("/app/api/updateUser",{ method: "GET" })
    }

    $: if (form?.success) {
        editMode = false
        isLoading = false
    }

    const changeAvatar = (input: any) => {
        const file = input.target?.files
        // const reader = new FileReader()
        // reader.onload = () => {
        //     cropElement.src = reader.result as string
        // }
        // reader.readAsDataURL(file[0])
        
        const cropper = new Cropper(cropElement, {
            aspectRatio: 1,
            cropBoxMovable: false,
            cropBoxResizable: false,
            toggleDragModeOnDblclick: false,
            dragMode: 'move',
            rotatable: true,
            viewMode: 1,
        })
    }
</script>

<!-- style:display={fileUrl.length > 1 ? "contents": "none"} 
<div class="absolute top-0 right-0 w-svw h-full block max-w-full px-8">
    <img id="image" src="/images/chefchaouen.webp" bind:this={cropElement} alt="Your New Avatar" />
</div> -->

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
                    <input autofocus name="name" style:display={isLoading? "none": "inline"} class="bg-transparent w-1/2 text-end font-bold" type="text" value={user?.user_metadata.name}>
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
                    <span class="font-bold">{user?.user_metadata.name}</span>
                    <button on:click={() => editMode = true} class="secondaryBtn ms-2 !size-9 !text-lg">
                        <span class="icon-[solar--pen-linear]"></span>
                    </button>
                </div>
            {/if}
        </li>
        <li class="flex items-center justify-between">
            <span>Msharfin ID</span>
            <span class="font-bold">{user?.user_metadata.slug}</span>
        </li>
        <li class="flex items-center justify-between">
            <span>Avatar</span>
            <div class="flex items-center">
                <label class="secondaryBtn me-2 !size-9 !text-lg cursor-pointer">
                    <span class="icon-[solar--camera-add-outline]"></span>
                    <input on:change={(e) => changeAvatar(e)} accept="image/jpeg,image/jpg,image/png" hidden type="file" name="pfp">
                </label>
                <img src={user?.user_metadata.avatar_url} alt="Your Avatar" class="size-9 border-[.5px] rounded-full border-turquoisieGray" >
            </div>
        </li>
        <button on:click={() => updateUser()} class="hoverEffect rounded-full py-1 mt-4 w-full bg-brightAzure text-funBlue dark:bg-darkAzure dark:hover:bg-hoverDarkAzure hover:bg-hoverBrightAzure">
            Sync Profile for legacy users
        </button>
    </ul>
</div>

<style>

ul {
    & li {
        @apply h-9;
    }
}

</style>