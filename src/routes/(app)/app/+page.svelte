<script lang="ts">
	import { invalidateAll } from "$app/navigation"
	import Post from "$lib/components/Post.svelte"

	export let data
	$: ({ user, posts } = data)

	let shouldSpin: boolean = false

	const refreshFeed = () => {
		shouldSpin = true
		invalidateAll().then(() => (shouldSpin = false))
	}
</script>

<div class="md:ms-48 w-full flex md:w-1/3 justify-between items-end h-24 mb-4 select-none">
	<h1 class="font-extrabold text-5xl leading-[0.75]">Home</h1>
	<button
		on:click={() => refreshFeed()}
		class="flex font-medium items-center text-sm px-2 hoverEffect justify-center rounded-full hover:bg-hoverBrightAzure hover:dark:bg-hoverDarkAzure bg-brightAzure dark:bg-darkAzure text-funBlue"
	>
		<span class:spin={shouldSpin} class="icon-[solar--refresh-linear] me-1"
		></span>
		<span>Refresh</span>
	</button>
</div>

<div class="md:ms-48 mt-10 md:w-1/3">
	{#await posts}
		<div class="flex items-center justify-center mt-32">
			<span
				class="icon-[svg-spinners--180-ring-with-bg] text-4xl text-funBlue"
			></span>
		</div>
	{:then posts}
		{#each posts as post (post.id)}
			<Post {post} postsList={posts} {user} />
		{:else}
			<div class="error-pg">
				<img src="/images/error.png" alt="" />
				<h2>So empty...</h2>
				<p>There are no posts at the moment</p>
			</div>
		{/each}
	{/await}
</div>

<style>
	@keyframes spinAnimation {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	.spin {
		animation: spinAnimation 1s infinite;
	}
</style>
