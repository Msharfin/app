<script lang="ts">
	import { afterNavigate, goto } from '$app/navigation'
	import { page } from '$app/stores'
	import Post from '$lib/components/Post.svelte'
	import { DateTime } from 'luxon'

    export let data
    $:({ reqUser, usersPost, user} = data )

    let tabIndex: number = 0

    let previousRoute: string = "/app"
    afterNavigate((route) => previousRoute = (route.from?.url.pathname !== $page.url.pathname ? route.from?.url.pathname: previousRoute) as string)
</script>

<div class="w-full flex flex-col items-center justify-center">
    <button
        on:click={() => goto(previousRoute)}
        class="flex font-medium items-center text-sm px-2 hoverEffect self-end rounded-full hover:bg-hoverBrightAzure hover:dark:bg-hoverDarkAzure bg-brightAzure dark:bg-darkAzure text-funBlue"
    >
        <span class="icon-[solar--arrow-left-linear] me-1"
        ></span>
        <span>Back</span>
    </button>
    <img src={reqUser.avatar_url ? reqUser.avatar_url: "/images/no_pfp.png" } class="border-[1px] size-20 border-turquoisieGray rounded-full" alt="Avatar of {reqUser.name}">
    <h1 class="mt-3 mb-0 text-xl">{reqUser.name}</h1>
    <span class="text-funBlue bg-brightAzure dark:bg-darkAzure px-2 rounded-full font-bold">{reqUser.slug}</span>
    <div class="w-full flex flex-wrap mt-5 text-sm font-medium text-turquoisieGray select-none">
        <span class="w-1/2 flex items-center">
            <span class="icon-[solar--login-linear] me-1"></span>
            <span>{DateTime.fromISO(reqUser.joined).toLocaleString(DateTime.DATE_FULL)}</span>
        </span>
        <span class="w-1/2 flex items-center" >
            <span class="icon-[solar--users-group-two-rounded-outline] me-1"></span>
            <span>{reqUser.followers || 0 } Followers</span>
        </span>
        <span class="w-1/2 flex items-center" >
            <span class="icon-[solar--map-point-linear] me-1"></span>
            <span>{reqUser.location}</span>
        </span>
        {#if reqUser.is_verified}
            <span class="w-1/2 flex items-center text-funBlue" >
                <span class="icon-[solar--verified-check-outline] me-1"></span>
                <span>Verified</span>
            </span>
        {/if}
    </div>
</div>

<form action="" class="flex w-full mt-3">
    <button class="w-5/6 font-bold bg-funBlue text-white rounded-xl py-1.5 flex items-center justify-center">
        <span class="icon-[solar--user-plus-rounded-outline] me-2"></span>
        <span>Follow</span>
    </button>
    <button class="ms-2 w-1/6 text-xl flex items-center justify-center bg-brightAzure dark:bg-darkAzure text-funBlue rounded-xl">
        <span class="icon-[solar--menu-dots-bold]"></span>
    </button>
</form>

<div class="mt-2 w-full border-[1px] px-1 border-brightAzure dark:border-brightGray flex items-center rounded-full font-medium text-base h-12">
    <button on:click={() => tabIndex = 0} class:selected={tabIndex === 0} class="hoverEffect h-10 w-1/2 me-2">Posts</button>
    <button on:click={() => tabIndex = 1} class:selected={tabIndex === 1} class="hoverEffect h-10 w-1/2">Comments</button>
</div>

<div class="mt-5">
    {#if tabIndex === 0}
            {#await usersPost}
                <div class="flex items-center justify-center mt-32">
                    <span
                        class="icon-[svg-spinners--180-ring-with-bg] text-4xl text-funBlue"
                    ></span>
                </div>
            {:then usersPost}
                {#each usersPost as post}
                    <Post {post} postsList={usersPost} {user} />
                {:else}
                    <div class="error-pg">
                        <img src="/images/error.png" alt="" />
                        <h2>So empty...</h2>
                        <p>There are no posts at the moment</p>
                    </div>
                {/each}
            {/await}
    {:else}
        <h1>Coming soon...</h1>
    {/if}
</div>

<style>

.selected {
    @apply bg-brightAzure dark:bg-darkAzure text-funBlue rounded-full;
}

</style>