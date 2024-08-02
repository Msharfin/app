<script lang="ts">
	import Icon from "@iconify/svelte"
	import * as m from "$lang/messages"
	import { page } from "$app/stores"
	import { goto, invalidateAll } from "$app/navigation"
	import { fade, fly } from "svelte/transition"

	export let profile: any
	let expanded = false
</script>

{#if expanded}
	<div transition:fade={{ duration: 200 }} class="more-opt">
		<h1>Menu</h1>
		<div class="column-container">
			<div class="column">
				<button
					on:click={() => {
						expanded = false
						goto("/app")
					}}
					><span class="ico"
						><Icon icon="solar:home-2-bold-duotone" /></span
					>
					<p>Discover</p></button
				>
				<button
					on:click={() => {
						expanded = false
						goto("/app/search")
					}}
					><span class="ico"
						><Icon icon="solar:magnifer-bold-duotone" /></span
					>
					<p>Search</p></button
				>
				<button
					on:click={() => {
						expanded = false
						goto("/app/profile/me")
					}}
					><span class="ico"
						><img
							class="pfp"
							src={profile.avatar_url
								? profile.avatar_url
								: "/images/no_pfp.png"}
							alt="Your avatar"
						/></span
					>
					<p>Profile</p></button
				>
			</div>
			<div class="column">
				<button
					on:click={() => {
						expanded = false
						goto("/app/settings")
					}}
					><span class="ico"
						><Icon icon="solar:settings-bold-duotone" /></span
					>
					<p>Settings</p></button
				>
				<button
					class="create"
					on:click={() => {
						expanded = false
						goto("/app/post/create")
					}}
					><span class="ico"
						><img
							src="/images/create.png"
							alt={m.app_title_create()}
						/></span
					>
					<p>Create</p></button
				>
				<button
					on:click={() => {
						expanded = false
						alert("coming soon...")
					}}
					><span class="ico"
						><Icon icon="solar:bell-bold-duotone" /></span
					>
					<p>Notifications</p></button
				>
			</div>
		</div>
	</div>
{/if}

<footer in:fly={{ y: 200, duration: 500 }} class="mobile" class:expanded>
	<div class="main-btns">
		<button on:click={() => (expanded = !expanded)} class="expand">
			{#if expanded}
				<span in:fly={{ y: 50, duration: 300 }} class="ico"
					><Icon icon="iconoir:cancel" /></span
				>
			{:else}
				<span in:fly={{ y: 50, duration: 300 }} class="ico"
					><Icon icon="heroicons-solid:view-grid" /></span
				>
			{/if}
		</button>
		<div class="left">
			{#if !expanded}
				<button
				on:click={() => {
					expanded = false
					goto("/app/post/create")
				}}
				class="create"
				><img
						src="/images/create.png"
						alt={m.app_title_create()}
					/>
				</button
				>
				<button on:click={() => alert("coming soon...")}
					><span class="ico"><Icon icon="solar:bell-bold" /></span
					></button
				>
				<button
					on:focus={() => {
						expanded = !expanded
						goto("/app/profile/me")
					}}
					><img
						src={profile.avatar_url
							? profile.avatar_url
							: "/images/no_pfp.png"}
						alt="Your avatar"
					/></button
				>
			{/if}
		</div>
	</div>
</footer>

<style lang="sass">

.mobile 
	z-index: 6
	position: sticky
	bottom: 0px
	left: 0px
	height: 100%
	display: flex
	align-items: center
	flex-direction: column
	padding: .5rem 1rem
	backdrop-filter: blur(15px)
	background-color: hsl(from $white-0 h s l / 50%)    
	user-select: none
	.main-btns
		display: flex
		width: 100%
		align-items: center
		height: 4rem
		justify-content: space-between
		font-size: 3rem 
		.ico
			color: $blue-0
		button
			border-radius: 50%
			font-size: 3rem
			display: flex
			align-items: center
			justify-content: center
			padding: .5rem
			width: 3.5rem
			height: 3.5rem
			&:hover
				background-color: $gray-0
		img
			width: 3rem
			height: 3rem 
			&[alt="Your avatar"]
				border-radius: 50%

		.left
			display: flex
  
.expanded
	backdrop-filter: none
	border-color: transparent
	background: transparent

.more-opt
	z-index: 5
	position: fixed
	left: 0px
	bottom: 0
	height: 100vh
	width: 100%
	padding: 7rem 1.5rem 7rem
	background: linear-gradient(180deg, $white-0 25%, hsl(from $white-0 h s l / 25% ) 100%)
	backdrop-filter: blur(15px)
	h1
		font-size: 3rem
		font-weight: bolder
		margin-block: .5rem
		@include title
	.column-container
		display: flex
		justify-content: space-around
		.column
			width: 100%
			display: flex
			flex-direction: column    
			&:first-child
				margin-right: .5rem
		button
			height: 6rem
			color: $black-0
			text-align: start
			font-size: 1.625rem
			padding: .5rem
			border: 1px solid $gray-0 
			background-color: $white-0
			margin-block-end: .45rem
			span
				color: $blue-0
			p
				margin-block: 0.25rem
				font-weight: 300
			&:hover
				background-color: $white-1        
		img
			width: 1.75rem
		.pfp
			border-radius: 50%
		.create
			@include mainBtn
			&
				border-color: $blue-m1
</style>
