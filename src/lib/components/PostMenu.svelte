<script lang="ts">
	import Icon from "@iconify/svelte"
	import toast from "svelte-french-toast"
	import { fade, fly } from "svelte/transition"
	import { errorToast, successToast } from "$lib/toastStyles"
	import * as m from "$lang/messages"
	import { goto } from "$app/navigation"
	import { page } from "$app/stores"
	import { browser } from "$app/environment"
	import { createDialog, melt } from "@melt-ui/svelte"
	import IconButtonSecondary from "./UI/Buttons/IconButtonSecondary.svelte"

	export let post: any
	export let user: any
	export let type = "post"

	let isLiking = false

	const {
		elements: { trigger, portalled, overlay, content, title, close },
		states: { open },
	} = createDialog()

	async function deletePost(postId: string) {
		const confirmDelete = confirm(
			"Are you sure you want to delete the post?",
		)
		if (confirmDelete) {
			if (type === "post") {
				const req = await fetch("/app/api/post/delete", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						...post
					}),
				})
					.then(() => {
						toast.success("Deleted successfully!", successToast)
					})
					.catch((error) => {
						console.error("Error deleting post:", error)
						toast.error(
							"Failed to delete post. Please try again.",
							errorToast,
						)
					})
			} else {
				const req = await fetch("/app/api/comment/delete", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						id: postId,
					}),
				})
					.then(() => {
						toast.success("Deleted successfully!", successToast)
					})
					.catch(() => {
						return toast.error("An error has occured!", errorToast)
					})
				if (browser) {
					location.reload()
				}
			}
		}
	}

	async function dislike(postId: string) {
		const req = await fetch("/app/api/dislike", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				content_id: postId,
			}),
		}).catch(() => {
			return toast.error("An error has occured!", errorToast)
		})
	}

	async function like(postId: string) {
		isLiking = true
		const req = await fetch("/app/api/like", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				content_id: postId,
			}),
		}).catch(() => {
			return toast.error("An error has occured!", errorToast)
		})
		setTimeout(() => (isLiking = false), 5000)
	}

	$: hasLiked =
		post.likes.find((i: any) => i.user_id === user?.id) !== undefined
			? true
			: false
</script>

<!-- Likes -->
<button
    title={m.app_post_btn_like()}
    on:click|stopPropagation={() => {
        if (hasLiked) {
            dislike(post.id)
        } else {
            like(post.id)
        }
    }}
>
    {#if hasLiked}
        <span
            class:like={isLiking}
            in:fly={{ y: 10, duration: 100 }}
            class="ico love"><Icon icon="solar:like-bold" /></span
        >
        <span class="love count" class:like={isLiking}
            >{post.likes.length}</span
        >
    {:else}
        <span class="ico"
            ><Icon icon="solar:like-outline" /></span
        >
        <span class="count">{post.likes.length}</span>
    {/if}
</button>

<!-- Comments -->
<button
    in:fly={{ x: 50, duration: 300 }}
    title={m.app_post_btn_comments()}
    on:click|stopPropagation={() => {
        $page.url.pathname.includes("/post")
            ? (location.hash = "post_content")
            : goto(`/app/post/${post.id}#post_content`)
    }}
>
    <span class="ico"><Icon icon="solar:chat-round-line-bold" /></span>
    <span class="count">{post.comments_count}</span>
</button>

<!-- Spreads -->
<!-- {#if !post.is_spread}
    <button
        in:fly={{ x: 50, duration: 300 }}
        on:click|stopPropagation={() => {
            alert("Coming soon...")
        }}
    >
        <span class="ico"
            ><Icon icon="fluent:channel-share-48-filled" /></span
        >
        <span class="count">{post.spreads}</span>
    </button>
{/if} -->

<!-- More options menu -->
<div class="other">
    <button
        in:fly={{ x: 50, duration: 300 }}
        on:click|stopPropagation={() => {
            navigator.share({
                title: "Msharfin",
                url: `${window.location.origin}/app/profile/${post.id}`,
                text: `@${post.author_data.slug} posted in Msharfin: "${post.content}"`,
            })
        }}
    >
        <span class="ico"><Icon icon="solar:square-share-line-linear" /></span>
    </button>
    <button on:click|stopPropagation use:melt={$trigger}>
        <span class="ico"><Icon icon="tabler:dots" /></span>
    </button>
</div>

{#if $open}
	<div class="menu" use:melt={$portalled}>
		<div class="overlay" in:fade={{ duration: 100 }} use:melt={$overlay} />
		<div in:fly={{ y: 300, duration: 200, delay: 100 }}  class="content" use:melt={$content}>
			<div class="top">
				<h2 use:melt={$title}>{m.app_post_menu_more()}</h2>
                <div use:melt={$close}>
                    <IconButtonSecondary iconIdentifier="iconoir:cancel" onClickAction={() => null} />
                </div>
			</div>
			{#if user?.id === post.author}
				<button
					class="more danger"
					on:click={() => {
						deletePost(post.id)
					}}
				>
					<span class="ico"
						><Icon
							icon="solar:trash-bin-trash-bold-duotone"
						/></span
					>
					<p>{m.app_post_btn_delete()}</p>
				</button>
			{:else}
				<button
					class="more"
					on:click={() => {
						alert("Coming soon...")
					}}
				>
					<span class="ico"
						><Icon icon="solar:flag-bold-duotone" /></span
					>
					<p>Report</p>
				</button>
			{/if}
		</div>
	</div>
{/if}

<style lang="sass">
@keyframes scale
    0%
        transform: scale(0.75)
    50%
        transform: scale(1.35) rotate(360deg)
    100%
        transform: scale(1) rotate(360deg)
    

button
    display: flex
    align-items: center
    justify-content: center
    font-size: 1.25rem
    background: none
    border: none
    margin-inline-end: .25rem
    border-radius: 36px
    padding: .25rem .5rem
    color: $gray-2
    &:hover
        background-color: $white-1
.love
    color: $blue-1
.like
    animation: scale .5s normal
.count
    font-size: .85rem
    margin-inline: .25rem
    font-variant-numeric: tabular-nums

.other
    display: flex
    align-items: center
    color: $gray-2
    margin-inline-start: auto
    button
        border-radius: 50%
        padding: .25rem

.menu
    position: fixed
    display: flex
    align-items: center
    justify-content: center
    .overlay
        width: 100vw
        height: 100svh
        background: linear-gradient(180deg, $white-0 25%, transparent 100%)
        backdrop-filter: blur(15px)
    .content
        position: fixed
        background-color: $white-0
        border: 0.85px $gray-0 solid
        border-radius: 18px
        padding: 1rem
        width: 24rem
        .top
            display: flex
            align-items: center
            justify-content: space-between
            margin-block-end: .75rem
            h2
                margin: 0
                font-size: 1.5rem 
        .more
            display: flex
            align-items: center
            justify-content: start
            font-size: 1.25rem
            width: 100%
            border-radius: 12px
            padding: 0.75rem 0.75rem 
            p
                margin-block: 0
                margin-inline-start: .5rem        
            &:hover
                background-color: $white-1
        .danger
            background-color: hsla(0, 100% , 75%, 0.25)  
            .ico, p
                color: red
            &:hover
                background-color: hsla(0, 100% , 60%, 0.25)  


</style>
