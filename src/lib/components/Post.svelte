<script lang="ts">
	import { goto } from "$app/navigation"
	import { DateTime } from "$lib/luxon.min"
	import Icon from "@iconify/svelte"
    import * as i from "$lang/messages"
	import type { Session } from "@supabase/supabase-js"
	import SvelteMarkdown from "svelte-markdown"
	import PostMenu from "./PostMenu.svelte"
	import { languageTag } from "$lang/runtime"

    export let post: any
    export let session: Session | null
    export let clickable = true
    export let type: string = "post"
</script>

<svelte:head>
    <title>{post.author_data.name} on Msharfin</title>
</svelte:head>

<button id={post.id} on:click={()=> type === "post"? clickable ? goto(`/app/post/${post.id}`) : null: clickable ? goto(`/app/comment/${post.id}`) : null}  class={"post" + (clickable ? " clickable": "")}>  
    <button on:click={(e)=> {
        e.stopPropagation()
        // goto(`/app/profile/${post.author_data.id !== session?.user.id ? post.author_data.slug: "me"}`)
        alert("Coming soon... 😅")}} class="user-profile">
        <div class="avatar-wrap">
            {#if post.author_data.asterisk_user}
                <div class="sub"><span class="grad ico"><Icon icon="fa:asterisk" /></span></div>
            {/if}
            {#if !post.author_data.avatar_url}
                <img src="/images/no_pfp.png" alt="{post.author_data.name}'s avatar.">
            {:else}
                <img src={post.author_data.avatar_url} alt="{post.author_data.name}'s avatar.">
            {/if}
            {#if post.author_data.status === "online"}
                <div class="online"></div>
            {/if}
        </div>
        <div class="user-info">
            <div class="username">
                <h4>{post.author_data.name}</h4>
                {#each post.author_data.titles as title}
                    <h4 class="titles" style={title.style ? title.style: null}>{title.name}</h4>
                {/each}
                {#if post.author_data.is_verified}
                <span class="ico"><Icon icon="pepicons-pop:checkmark-filled" /></span>
                {/if}            
            </div>
            <h5>@{post.author_data.slug}</h5>                           
        </div>
    </button>
    {#if post.content.length > 800}
        <div class="post-container">
            <p>{post.content.substring(0, 730)}</p>
            <div class="read-more"> <p>Read more</p> <Icon icon="ep:arrow-down-bold" /> </div>
        </div>
    {:else}
        <p dir="auto"><SvelteMarkdown source={post.content} /></p>
    {/if}
    <h5 class="date">{i.app_post_created({period:DateTime.fromISO(post.creation_date).setLocale(languageTag()).toRelativeCalendar(),time:DateTime.fromISO(post.creation_date).toLocaleString(DateTime.TIME_SIMPLE)})}</h5>
    <div class="interactions"><PostMenu {type} {post} user={session?.user} /></div>
</button>


<style lang="sass">
.post
    cursor: default
    padding-block-start: .5rem
    margin-block-start: .5rem
    width: 100%
    border-radius: 0
    &:not(:last-child)
        border-bottom: solid $container-color 1px
    .user-profile
        display: flex
        align-items: center
        padding-block: .25rem
        padding-inline-end: .75rem
        border-radius:24px
        .avatar-wrap
            position: relative
            display: flex
            align-items: center
            .online
                width: 12px
                height: 12px
                position: absolute
                background-color: green
                border-radius: 50%
                bottom: 0
                inset-inline-end: -.25rem
                border: $background-color 2px solid 
            .sub
                width: 12px
                height: 12px
                position: absolute
                border-radius: 50%
                display: flex
                align-items: center
                justify-content: center
                font-size: .5rem
                top: 0
                inset-inline-start: -.25rem
                background-color: $background-color
                .grad
                    color: red
                    animation: gradient 35s infinite

            img
                border-radius: 50%
                width: 2.125rem
                height: 2.125rem
        .user-info
            margin-inline-start: .5rem
            .username 
                display: flex
                align-items: center
            .titles
                font-size: 0.8rem
                margin-inline-start: .5rem
                border: 1px $text-color solid
                padding: .15rem .3rem
                border-radius: 12px
            span
                font-size: 1.25rem
                margin-inline-start: .25rem
            h4, h5
                text-align: start
                font-size: .85rem
                margin: 0
            h5
                color: $text-secondary-color
                direction: ltr
                &:lang(ar)
                    float: right
        &:hover
            background-color: $container-color
    .date
        text-align: start
        font-weight: 500
        color: $text-secondary-color
        font-size: 0.75rem
        margin: 0 0 .5rem 0
        padding-inline-start: .25rem
    p
        padding-inline-start: .25rem
        text-align: start
        word-wrap: break-word
        user-select: text
        font-size: 1.0625rem
    .post-container
        position: relative
        .read-more
            bottom: 0
            width: 100%
            height: 6rem
            background: linear-gradient(to top, $background-color 0%, transparent 150%)
            font-size: 1rem
            font-weight: bold
            display: flex
            align-items: center
            flex-direction: column
            justify-content: flex-end
            position: absolute
            z-index: 2
            p
                cursor: pointer
                margin-block-end: 0
    .interactions
        display: flex
        margin-block-end: .75rem
        height: 2.75rem
        list-style-type: none
        align-items: center
        justify-content: space-between
.clickable:focus
    background-color: $container-color
    border-radius: 12px
    .post-container .read-more
        background: linear-gradient(to top, $container-color 0%, transparent 100%)
</style>