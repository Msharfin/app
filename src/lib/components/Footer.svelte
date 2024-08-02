<script>
  import Language from "$lib/components/Language.svelte"
  import * as m from "$lang/messages"
  import { page } from "$app/stores"
  import { version } from "$lib"
</script>

<footer>
  <div class="upper">
    <h3>v{version}</h3>
    <!-- <div><Language /></div> -->
  </div>
  {#if $page.url.pathname === "/"}
    <div class="lower">
      <div>
        <a href="/resources" class="link">{m.res_portal_title()}</a>
        &#0149;
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://msharfin.statuspage.io/"
          class="link">{m.title_site_status()}</a
        >
      </div>
    </div>
  {/if}
</footer>

<style lang="sass">
footer
	user-select: none
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
		color: $gray-2
		font-size: 1rem
		font-weight: 400
	div
		color: $gray-2
		display: flex
		align-items: center
		margin-inline-start: auto
.lower
	display: flex
	align-items: center
	border-top: 1px $gray-2 solid
	justify-content: center
	color: $gray-2
	a
		color: $gray-2
		text-decoration: none
		&:hover
			color: $blue-0
		&:last-child
			margin-inline-start: .5rem	
		&:first-child
			margin-inline-end: .5rem	

@media screen and (max-width: 1024px)
	footer
		padding: 1rem 2rem

</style>
