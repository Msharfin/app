<script>
    import Language from "$lib/components/Language.svelte"
	import Theme from "$lib/components/Theme.svelte"
    import {i} from "@inlang/sdk-js"

    export const version = "0.0.4.1"
</script>

<footer>
	<h3>v{version}</h3>
	<section class="wrapper">
		<div>{i("footer.lang")}: <Language /></div>
		<div><Theme /></div>
	</section>
</footer>

<style lang="sass">
footer
	display: flex
	flex-direction: row
	justify-content: flex-end
	padding: .5rem 10rem
	align-items: center
	&:lang(ar)
		direction: rtl
	h3
		color: $text-secondary-color
		font-size: 1rem
		font-weight: 400

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

@media screen and (max-width: 1024px)
	footer
		padding: 1rem 2rem

</style>