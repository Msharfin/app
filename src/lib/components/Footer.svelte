<script>
    import Language from "$lib/components/Language.svelte"
	import Theme from "$lib/components/Theme.svelte"
    import {i} from "@inlang/sdk-js"
	import { page } from "$app/stores";

    export const version = "0.0.5"
</script>

<footer>
	<div class="upper">
	<h3>v{version}</h3>
	<section class="wrapper">
		<div>{i("footer.lang")}: <Language /></div>
		|
		<div><Theme /></div>
	</section>
	</div>
	{#if $page.url.pathname === "/"}
	<div class="lower">
		<div>
			<a target="_blank" rel="noopener noreferrer" href="https://bbusddswtqskejsgbacj.supabase.co/storage/v1/object/public/Resources%20portal/TERMS%20OF%20USE.pdf" class="link">{i("footer.tos")}</a>
			&#0149;
			<a target="_blank" rel="noopener noreferrer" href="https://bbusddswtqskejsgbacj.supabase.co/storage/v1/object/public/Resources%20portal/PRIVACY%20POLICY.pdf" class="link">{i("footer.policy")}</a>
		</div>
	</div>		
	{/if}

</footer>

<style lang="sass">
footer
	padding-inline: 10rem
	.upper, .lower
		padding-block: .75rem
.upper
	display: flex
	flex-direction: row
	justify-content: flex-end
	align-items: center
	&:lang(ar)
		direction: rtl
	h3
		color: $text-secondary-color
		font-size: 1rem
		font-weight: 400

.lower
	display: flex
	align-items: center
	border-top: 1px $text-secondary-color solid
	justify-content: center
	color: $text-secondary-color
	a
		color: $text-secondary-color
		text-decoration: none
		&:hover
			filter: brightness(0.5)
		&:last-child
			margin-inline-start: 1rem	
		&:first-child
			margin-inline-end: 1rem	
.wrapper
	color: $text-secondary-color
	display: flex
	align-items: center
	margin-inline-start: auto
	div 
		display: flex
		align-items: center
		&:last-child
			margin-inline-start: .5rem
		&:first-child
			margin-inline-end: .5rem

@media screen and (max-width: 1024px)
	footer
		padding: 1rem 2rem

</style>