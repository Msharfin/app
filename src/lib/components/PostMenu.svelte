<script lang="ts">
	import Icon from "@iconify/svelte"
	import toast from "svelte-french-toast"
	import { fly } from "svelte/transition"
	import { errorToast, successToast } from "$lib/toastStyles"
	import * as m from "$lang/messages"
	import { goto } from "$app/navigation"
	import { page } from "$app/stores"
	import { browser } from "$app/environment"

	let showMore = false

	export let post: any
	export let user: any
	export let type = "post"

	let isLiking = false

	async function deletePost(postId: string) {
		const confirmDelete = confirm("Are you sure you want to delete the post?")
		if (confirmDelete) {
			if (type === "post") {				
				const req = await fetch("/app/api/post/delete", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						id: postId,
						type
					}),
				})
					.then((status) => {
						toast.success("Deleted successfully!", successToast)
					})
					.catch((error) => {
						return toast.error("An error has occured!", errorToast)
					})
			} else {
				const req = await fetch("/app/api/comment/delete", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						id: postId,
						type
					}),
				})
					.then((status) => {
						toast.success("Deleted successfully!", successToast)
					})
					.catch((error) => {
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
		}).catch((error) => {
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
		}).catch((error) => {
			return toast.error("An error has occured!", errorToast)
		})
		setTimeout(() => (isLiking = false), 5000)
	}

	$: hasLiked =
		post.likes.find((i: any) => i.user_id === user?.id) !== undefined
			? true
			: false
</script>

{#if showMore}
	<!-- Delete -->
	{#if user?.id === post.author}
		<li in:fly={{ x: 50, duration: 100 }}>
			<button
				class="more danger"
				on:click={(e) => {
					e.stopPropagation()
					deletePost(post.id)
				}}
			>
				<span class="ico"
					><Icon icon="solar:trash-bin-trash-bold-duotone" /></span
				>
				<p>{m.app_post_btn_delete()}</p>
			</button>
		</li>
	{:else}
		<li in:fly={{ x: 50, duration: 100 }}>
			<button
				class="more"
				on:click|stopPropagation={() => {
					alert("Coming soon...")
				}}
			>
				<span class="ico"><Icon icon="solar:flag-bold-duotone" /></span>
				<p>Report</p>
			</button>
		</li>
	{/if}
	<!-- Share -->
	<li in:fly={{ x: 50, duration: 100 }}>
		<button
			class="more"
			on:click|stopPropagation={() => {
				navigator.share({
					title: "Msharfin",
					url: `${window.location.origin}/app/profile/${post.id}`,
					text: `@${post.author_data.slug} posted in Msharfin: "${post.content}"`,
				})
			}}
		>
			<span class="ico"><Icon icon="solar:share-bold-duotone" /></span>
			<p>{m.app_post_btn_share()}</p>
		</button>
	</li>
{:else}
	<!-- Likes -->
	<li in:fly={{ x: 50, duration: 300 }}>
		<button
			title="{m.app_post_btn_like()}"
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
					in:fly={{ y: 50, duration: 400 }}
					class="ico love"><Icon icon="ph:heart-fill" /></span
				>
			{:else}
				<span in:fly={{ y: 50, duration: 400 }} class="ico"
					><Icon icon="solar:heart-broken-bold" /></span
				>
			{/if}
		</button>
		<p class:love={hasLiked}>{post.likes.length}</p>
	</li>

	<!-- Comments -->
	<li in:fly={{ x: 50, duration: 300 }}>
		<button
			title="{m.app_post_btn_comments()}"
			on:click|trusted|stopPropagation={() => {				
				$page.url.pathname.includes("/post")? location.hash = "post_content" : goto(`/app/post/${post.id}#post_content`)
			}}
		>
			<span class="ico"><Icon icon="solar:chat-line-bold" /></span>
		</button>
		&#0149;
		<a href={`/app/post/${post.id}#comments`}>{post.comments_count}</a>
	</li>

	<!-- Spreads -->
	{#if !post.is_spread}
		<li in:fly={{ x: 50, duration: 300 }}>
			<button
				on:click|stopPropagation={() => {
					alert("Coming soon...")
				}}
			>
				<span class="ico"><Icon icon="solar:share-circle-bold" /></span>
			</button>
			&#0149;
			<p>{post.spreads}</p>
		</li>
	{/if}
{/if}

<!-- More options menu -->
<div>
	|
	<li>
		<button
			on:click={(e) => {
				e.stopPropagation()
				showMore === true ? (showMore = false) : (showMore = true)
			}}
		>
			<span class="ico"><Icon icon="tabler:dots" /></span>
		</button>
	</li>
</div>

<style lang="sass">
@keyframes scale
    0%
        transform: scale(0.75)
    50%
        transform: scale(1.35) rotate(360deg)
    100%
        transform: scale(1) rotate(360deg)
    
li
    display: flex
    align-items: center
    justify-content: center
    color: $text-secondary-color
    button
        align-items: center
        display: flex
        font-size: 1.125rem
        background: none
        border: none
        margin-inline-end: .25rem
        border-radius: 50%
        padding: .25rem
        color: $text-secondary-color
        &:hover
            background-color: $container-color
    .love
        color: hsl(345, 100%, 50%)
    .like
        animation: scale .5s normal
    .more
        border-radius: 12px
        padding: 0.5rem 1rem
        p
            margin-block: 0
    .danger
        .ico, p
            color: red
        &:hover
            background-color: hsla(0, 100% , 75%, 0.25)   
    a, p
        font-size: 1rem
        font-variant-numeric: tabular-nums
        margin-inline-start: .25rem
        color: $text-secondary-color
        text-decoration: none
div
    display: flex
    align-items: center
    color: $text-secondary-color
    button
        margin-inline-start: 1rem

</style>
