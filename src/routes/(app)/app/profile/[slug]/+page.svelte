
<script lang="ts">
    import Post from "$lib/components/Post.svelte"

    export let data
    let { profileInfo, hisPosts, hisComments, session } = data
</script>

<section>
    <div class="main-info">
        <button style="background-image: url({profileInfo.avatar_url})" title="{profileInfo.name}'s Avatar"></button>
        <div class="username">
            <h4>{profileInfo.name}</h4>
            <h5>@{profileInfo.slug}</h5>
        </div>
    </div>
    <div>
        <h1>Posts</h1>
        {#each hisPosts as hisPost}
            <Post post={hisPost} {session} />
        {/each}
    </div>
    <div>
        <h1>Comments</h1>
        {#each hisComments as hisComment}
            <Post post={hisComment} {session} type="comment" />
        {/each}
    </div>
</section>


<style lang="sass">
section
    @include page
    h4, h5
        margin: 0
    .main-info
        display: flex
        align-items: center
        button
            padding: 0
            border: none
            width: 5rem
            background-repeat: round
            height: 5rem
            border-radius: 50%            
            &:hover
                cursor: pointer
        .username
            margin-inline-start: 1rem
            font-size: 2rem
            h5
                font-size: 1.5rem
                font-weight: normal
                color: $text-secondary-color
</style>