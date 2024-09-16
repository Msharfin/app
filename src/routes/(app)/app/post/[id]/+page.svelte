<script lang="ts">
	import { afterNavigate, goto } from '$app/navigation'
	import { page } from '$app/stores'
	import Post from '$lib/components/Post.svelte'

	export let data
    $:({ post, user } = data)

    let previousRoute: string = "/app"
    afterNavigate((route) => previousRoute = (route.from?.url.pathname !== $page.url.pathname ? route.from?.url.pathname: previousRoute) as string)
</script>

<div class="pb-3 mt-3 flex items-center justify-between">
    <h1 class="text-2xl font-bold">Post</h1>
    <button
        on:click={() => goto(previousRoute)}
        class="flex font-medium items-center text-sm px-2 hoverEffect justify-center rounded-full hover:bg-hoverBrightAzure hover:dark:bg-hoverDarkAzure bg-brightAzure dark:bg-darkAzure text-funBlue"
    >
        <span class="icon-[solar--arrow-left-linear] me-1"></span>
        <span>Back</span>
    </button>
</div>

{#await post}
    <div class="flex items-center justify-center mt-32">
        <span
            class="icon-[svg-spinners--180-ring-with-bg] text-4xl text-funBlue"
        ></span>
    </div>
{:then post}
    <Post {post} {user} postsList={[post]}/>
    <div class="mt-2 flex items-center justify-between">
        <h1 class="text-xl font-bold">Comments</h1>
        <h2 class="text-turquoisieGray">{post.comments_count}</h2>
    </div>
    <div class="mt-4">
        {#each post.comments as comment}
            <Post post={comment} {user} postsList={post.comments}/>
        {/each}
    </div>
{/await}
