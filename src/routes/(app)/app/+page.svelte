<script lang="ts">
    import * as m from "$lang/messages"
	import { likePayload, postPayload } from '$lib'
    import Post from "$lib/components/Post.svelte"

    export let data
    let isLoaded = false    
    let {  posts, session }: any = data
    $: ({ supabase, session } = data)
    posts.then((data: Array<any>) => {
        posts = data
        isLoaded = true
    })

    $: if ($postPayload && isLoaded) {
        if ($postPayload.eventType === "DELETE") {
            if (posts.find((p : any) => p.id === ($postPayload.old).id) && posts.find((p : any) => p.id === ($postPayload.old).id).author === session?.user.id ) {
                posts.splice(posts.indexOf(posts.find((p : any) => p.id === ($postPayload.old).id)),1)
            }
            posts = posts
        }
        postPayload.set(null)
    }

    $: if ($likePayload && isLoaded) {
        if ($likePayload.eventType === "INSERT") {
            const getLikedPost: any = posts.find((p : any) => p.id === ($likePayload.new).liked_id)
            posts.forEach((p: any) => {if (p.id === getLikedPost.id) {getLikedPost.likes.push($likePayload.new)}})
        } else {
            posts.forEach((p:any) => {
                const getRemovedLike: any = p.likes.find((l : any) => l.id === ($likePayload.old).id)
                if (getRemovedLike) {
                    p.likes.splice(p.likes.indexOf(getRemovedLike),1)
                }
            })
        }
        posts = posts
        likePayload.set(null)
    }
</script>

<svelte:head>
    <title>{m.app_title_discover()} | Msharfin</title>
</svelte:head>

<section class="app-page">
    <h1>{m.app_title_discover()}</h1>

{#await posts}
    <div class="loading">
        <div class="placeholder">
            <div class="children user-info"></div>
            <div class="children content"></div>
        </div>
        <div class="placeholder">
            <div class="children user-info"></div>
            <div class="children content"></div>
            <div class="children content-1"></div>
        </div>
        <div class="placeholder">
            <div class="children user-info"></div>
            <div class="children content-1"></div>
        </div>        
    </div> 
{:then userPosts}
    {#each userPosts as post (post)}
        <Post {post} {session} />
    {:else}
        <div class="error-pg">
            <img src="/images/error.png" alt="">
            <h2>So empty...</h2>
            <p>There are no posts at the moment</p>
        </div>
    {/each}
{/await}
</section>


<style lang="sass">
@keyframes loading
    0%
        filter: unset
    50%
        filter: brightness(0.95)
    100%
        filter: unset

section
    @include page
    .loading
        .placeholder
            padding-block-start: .5rem
            .children
                animation: loading 3s infinite
                background-color: $container-color
                border-radius: 12px        
            .user-info
                width: 5rem
                height: 2rem
                margin-block-end: 1rem
            .content
                width: 100%
                height: 5rem
            .content-1
                width: 75%
                margin-block-start: 1rem
                height: 4rem                
            &:not(:last-child)
                padding-block-end: .5rem
                border-bottom: 1px solid $container-color
    h1
        font-size: 3rem
        @include title
        font-weight: bolder
        margin-block: .5rem
</style>