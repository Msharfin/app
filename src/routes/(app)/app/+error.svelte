<script lang="ts">
	import { page } from "$app/stores"
	import * as m from "$lang/messages"
	import type { LayoutData } from "./$types"

	export let data: LayoutData
	let { session, userProfile } = data
	$: ({ session, userProfile } = data)
</script>

<div class="error-pg">
	<img src="/images/error.png" alt={m.image_reading_alt()} />
	<h1>{$page.status}</h1>
	<h5>{$page.error?.message}</h5>
</div>

<svelte:head>
	<title>Oooops... | Msharfin</title>
</svelte:head>

<style lang="sass">
  
div
    display: flex
    align-items: center
    justify-content: center
    img
        width: 20rem
    h1, h5
        margin: 0
        padding: 0
    h1
        @include title
    &
        font-size: 5rem
    h5
        font-size: 1.25rem
        color: $gray-2

@media screen and (min-width: 790px)
    div
        margin-inline-start: 22rem
</style>
