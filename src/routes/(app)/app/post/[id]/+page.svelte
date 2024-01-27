<script lang="ts">
	import { goto } from "$app/navigation"
	import { likePayload, postPayload } from "$lib"
	import Navbar from "$lib/components/Navbar.svelte"
	import Post from "$lib/components/Post.svelte"
	import TextPrompt from "$lib/components/TextPrompt.svelte"

	export let data
	let { getPost, session } = data

	$: if ($postPayload && getPost) {
		if ($postPayload.eventType === "DELETE") {
			goto("/app")
		}
		postPayload.set(null)
	}

	$: if ($likePayload && getPost) {
		if ($likePayload.eventType === "INSERT") {
			const getLikedComment: any = getPost.comments.find(
				(p: any) => p.id === $likePayload.new.liked_id
			)
			if (getLikedComment) {
				getPost.comments.forEach((p: any) => {
					if (p.id === getLikedComment.id) {
						getLikedComment.likes.push($likePayload.new)
					}
				})
			} else if (getPost.id === $likePayload.new.liked_id) {
			    getPost.likes.push($likePayload.new)
            }
		} else {
            const getRemovedLike: any = getPost.likes.find(
                (l: any) => l.id === $likePayload.old.id
            )
            if (getRemovedLike) {
                getPost.likes.splice(getPost.likes.indexOf(getRemovedLike), 1)
            }
			getPost.comments.forEach((c: any) => {
				const getRemovedLike: any = c.likes.find(
					(l: any) => l.id === $likePayload.old.id
				)
				if (getRemovedLike) {
					c.likes.splice(c.likes.indexOf(getRemovedLike), 1)
				}
			})
		}
		getPost = getPost
		likePayload.set(null)
	}
</script>

<section class="app-page">
	<Navbar route="/app" title="Post" />
	<Post post={getPost} {session} clickable={false} />
	<div class="prompt">
		<!-- <img src={userProfile.avatar_url} alt="" /> -->
		<div class="wrap">
			<TextPrompt style="compact" />
		</div>
	</div>
	<div class="comments-wrap">
		{#each getPost.comments as comment}
			<Post post={comment} {session} type="comment" />
		{:else}
			<div class="error-pg">
				<img src="/images/error.png" alt="" />
				<h2>So empty...</h2>
				<p>There are no comments at the moment</p>
			</div>
		{/each}
	</div>
</section>

<style lang="sass">

section
    @include page
    h2, h4, h5
        margin-block: 0px
    h2
        font-weight: bolder
        margin-block: .5rem
    button
        background: none
        border: none
    .comments-wrap
        width: 100%
    .prompt
        margin-block: 0.75rem .5rem
        display: flex
        align-items: center
        justify-content: space-between
        // img
        //     width: 3rem
        //     height: 3rem
        //     border-radius: 50%
        //     margin-inline-end: 1rem
        .wrap
            width: 100%
</style>
