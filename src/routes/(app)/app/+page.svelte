<script lang="ts">
    import { page } from '$app/stores'
    import PostMenu from '$lib/components/PostMenu.svelte'
    import { DateTime } from "$lib/luxon.min"
    import { refreshToast } from '$lib/toastStyles.js'
    import { i, language } from "@inlang/sdk-js"
    import toast from 'svelte-french-toast'
    import { fly } from 'svelte/transition'

    export let data
    let {posts, session, supabase } = data

    $: numPosts = posts.length
    $: userPosts =  posts

    const postListener = supabase.channel('posts')
    .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'posts' },
        (payload) => {
        if (payload.eventType === "INSERT") {
            if ($page.url.pathname !== "/app/create") {
                toast("New posts, refresh to see them!", refreshToast)
            }
        } else {
            posts.pop(payload.old)
            userPosts = [...posts]
        }
        numPosts = userPosts.length
    }).subscribe()
</script>

<svelte:head>
    <title>{i("titles.discover")} | Msharfin</title>
</svelte:head>

<section>
    <h1>{i("titles.discover")}</h1>

{#if numPosts !== 0}
        {#each userPosts as post}
            <button transition:fly={{ y: 100, duration: 200 }} class="post">  
                    <button on:click={()=> /* goto(`/app/profile/${post.author_data.slug}`) */ alert("Coming soon..")} class="user-profile">
                        {#if !post.author_data.avatar_url}
                            <img src="" alt="{post.author_data.name}'s avatar.">
                        {:else}
                            <img src={post.author_data.avatar_url} alt="{post.author_data.name}'s avatar.">
                        {/if}               
                        <div class="user-info">
                            <h4>{post.author_data.name}</h4>
                            <h5>@{post.author_data.slug}</h5>                           
                        </div>
                    </button>
                <p>{post.content}</p>
                <h5 class="date">{i("app.post-date.0")} {DateTime.fromISO(post.post_date).setLocale(language).toRelativeCalendar()} {i("app.post-date.1")} {DateTime.fromISO(post.post_date).toLocaleString(DateTime.TIME_SIMPLE)}</h5>
                <div class="interactions"><PostMenu {post} user={session?.user} /></div>
            </button>
        {/each}
{:else}
    <div class="error-pg">
        <img src="/images/error.png" alt="">
        <h2>So empty...</h2>
        <p>There are no posts at the moment</p>
    </div>
{/if}
</section>


<style lang="sass">

section
    display: flex
    flex-direction: column
    flex: 1
    margin-inline: 1rem
    margin-block-start: 1.5rem
    h1
        font-size: 3rem
        font-weight: bolder
        margin-block: .5rem
    button
        background: none
        border: none
    .post
        cursor: default
        &:not(:last-child)
            border-bottom: solid $container-color 1px
            margin-block-end: 1rem
        .user-profile
            display: flex
            align-items: center
            padding-block: .25rem
            border-radius:24px
            img
                border-radius: 50%
                width: 2.25rem
            .user-info
                margin-inline-start: .5rem
                h4, h5
                    text-align: start
                    font-size: .9rem
                    margin: 0
                h5
                    color: $text-secondary-color
                    margin-block-start: .1rem
            &:hover
                background-color: $container-color
        .date
            text-align: start
            font-weight: 500
            color: $text-secondary-color
            font-size: 0.9rem
            margin: 0 0 .5rem 0
            padding-inline-start: .25rem
        p
            padding-inline-start: .25rem
            text-align: start
            user-select: text
            font-size: 1.2rem
        .interactions
            display: flex
            margin-block-end: .75rem
            height: 50px
            list-style-type: none
            align-items: center
            justify-content: space-between
            li
                display: flex
                align-items: center
                color: $text-secondary-color
                button
                    align-items: center
                    display: flex
                    font-size: 1.25rem
                    background: none
                    border: none
                    margin-inline-end: .25rem
                    border-radius: 50%
                    padding: .25rem
                    &:hover
                        background-color: $container-color
                .more
                    border-radius: 12px
                    padding: 0.5rem 1rem
                    color: $text-secondary-color
                    p
                        margin-block: 0
                .danger
                    .ico, p
                        color: red
                    &:hover
                        background-color: hsla(0, 100% , 75%, 0.25)   
                a, p
                    font-size: 1rem
                    margin-inline-start: .25rem
                    color: $text-secondary-color
                    text-decoration: none
            div
                display: flex
                align-items: center
                button
                    margin-inline-start: 1rem
</style>