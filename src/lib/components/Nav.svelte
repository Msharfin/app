<script lang="ts">
	// Status : √ Refactored as of v0.1.3 HF 4

	import Icon from "@iconify/svelte"
	import * as m from "$lang/messages"
	import Theme from "./Theme.svelte"
	import { goto } from "$app/navigation"
	import type { Session } from "@supabase/supabase-js"
	import IconButtonSecondary from "./UI/Buttons/IconButtonSecondary.svelte"

	export let session: Session | null
	export let userProfile: any

	let y = 0
	let startScroll = false

	$: if (y > 30) {
		startScroll = true
	} else {
		startScroll = false
	}
</script>

<svelte:window bind:scrollY={y} />

<header class:nav={startScroll}>
	<Theme />
	<a title={m.alt_logo({ brand: m.main_features_title_1() })} href="/"
		><img
			class="logo"
			src="/images/logo.png"
			alt={m.alt_logo({ brand: m.main_features_title_1() })}
		/></a
	>
	{#if !session}
		<IconButtonSecondary buttonTitle={m.nav_alt_auth()} onClickAction={() => goto("/login")} iconIdentifier="solar:login-2-bold-duotone"/>
	{:else}
		<button
			class="avatar"
			title={m.nav_alt_enter_app()}
			on:click={() => goto("/app")}
		>
			<img
				src={userProfile.avatar_url
					? userProfile.avatar_url
					: "/images/no_pfp.png"}
				alt="Your avatar"
			/>
		</button>
	{/if}
</header>

<style lang="sass">
.nav
	z-index: 3
	backdrop-filter: blur(15px)
	background-color: hsl(from $white-0 h s l / 75%)
	transition: all 0.1s ease

header
	position: sticky
	top: 0
	display: flex
	align-items: center
	justify-content: space-between
	padding: 2rem 10rem
	transition: all 0.1s ease
	.logo
		vertical-align: bottom
		width: 2.5rem

button
	@include button
	&
		@include secondaryBtn($color: $black-0)
	&
		font-size: 1.75rem
		padding: .5rem
		border-radius: 50%

.avatar
	height: 2rem
	width: 2rem		
	display: flex
	align-items: center
	justify-content: center
	padding: 1.375rem
	img
		height: 1.5rem
		width: 1.5rem	
		transform: scale(1.45)
		border-radius: 50%

@media screen and (max-width: 789px)
	header
		padding: 2rem 2rem
		.logo
			width: 2.5rem
</style>
