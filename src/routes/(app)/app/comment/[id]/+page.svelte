<script lang="ts">
	import { goto } from "$app/navigation"
	import { likePayload, postPayload } from "$lib"
	import Navbar from "$lib/components/Navbar.svelte"
	import Post from "$lib/components/Post.svelte"
	import TextPrompt from "$lib/components/TextPrompt.svelte"

	export let data
	let { getComment, session } = data
	$: ({ getComment, session } = data)

	$: if ($postPayload && getComment) {
		if ($postPayload.eventType === "DELETE") {
			goto("/app")
		}
		postPayload.set(null)
	}

	$: if ($likePayload && getComment) {
		if ($likePayload.eventType === "INSERT") {
			const getLikedComment: any = getComment.comments.find(
				(p: any) => p.id === $likePayload.new.liked_id
			)
			if (getLikedComment) {
				getComment.comments.forEach((p: any) => {
					if (p.id === getLikedComment.id) {
						getLikedComment.likes.push($likePayload.new)
					}
				})
			} else if (getComment.id === $likePayload.new.liked_id) {
			    getComment.likes.push($likePayload.new)
            }
		} else {
            const getRemovedLike: any = getComment.likes.find(
                (l: any) => l.id === $likePayload.old.id
            )
            if (getRemovedLike) {
                getComment.likes.splice(getComment.likes.indexOf(getRemovedLike), 1)
            }
			getComment.comments.forEach((c: any) => {
				const getRemovedLike: any = c.likes.find(
					(l: any) => l.id === $likePayload.old.id
				)
				if (getRemovedLike) {
					c.likes.splice(c.likes.indexOf(getRemovedLike), 1)
				}
			})
		}
		getComment = getComment
		likePayload.set(null)
	}
</script>

<section class="app-page">
	<Navbar route="/app/comment/{getComment.commented_id}" title="Comment" />
	<Post post={getComment} {session} clickable={false} type="comment" />
	<div class="prompt">
		<!-- <img src={userProfile.avatar_url} alt="" /> -->
		<div class="wrap">
			<TextPrompt style="compact" />
		</div>
	</div>
	<div class="comments-wrap">
		{#each getComment.comments as comment}
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
