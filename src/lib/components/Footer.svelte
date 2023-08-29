<script>
    import Language from "$lib/components/Language.svelte"
	import Theme from "$lib/components/Theme.svelte"
    import {i} from "@inlang/sdk-js"

    export const version = "0.0.4"
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
		justify-content: flex-start
	h3
		color: $text-secondary-color
		font-size: 1rem
		font-weight: 400

.wrapper
	color: $text-secondary-color
	display: flex
	align-items: center
	margin: 0 0 0 auto
	&:lang(ar)
		margin: 0 auto 0 0	

	div 
		display: flex
		align-items: center
		&:last-child
			margin: 0 0 0 .5rem
			&:lang(ar)
				margin: 0 .5rem 0 0

@media screen and (max-width: 1024px)
	footer
		padding: 1rem 2rem

</style>