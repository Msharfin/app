<script lang="ts">
	import { goto } from "$app/navigation"
	import { DateTime } from "$lib/luxon.min"
	import Icon from "@iconify/svelte"
	import * as m from "$lang/messages"
	import type { Session } from "@supabase/supabase-js"
	import SvelteMarkdown from "svelte-markdown"
	import PostMenu from "./PostMenu.svelte"
	import { languageTag } from "$lang/runtime"
	import { browser } from "$app/environment"
	import ImageCarousel from "./ImageCarousel.svelte"

	export let post: any
	export let session: Session | null
	export let clickable = true
	export let type: string = "post"
</script>

<div
	id={post.id}
	tabindex="0"
	role="button"
	on:keydown={() =>
		type === "post"
			? clickable
				? goto(`/app/post/${post.id}`)
				: null
			: clickable
				? goto(`/app/comment/${post.id}`)
				: null}
	on:click={() =>
		type === "post"
			? clickable
				? goto(`/app/post/${post.id}`)
				: null
			: clickable
				? goto(`/app/comment/${post.id}`)
				: null}
	class={"post" + (clickable ? " clickable" : "")}
>
	<button
		on:click|stopPropagation={() => {
			// goto(`/app/profile/${post.author_data.id !== session?.user.id ? post.author_data.slug: "me"}`)
			alert("Coming soon... 😅")
		}}
		class="user-profile"
	>
		<div class="avatar-wrap">
			{#if !post.author_data.avatar_url}
				<img
					src="/images/no_pfp.png"
					alt="{post.author_data.name}'s avatar."
				/>
			{:else}
				<img
					src={post.author_data.avatar_url}
					alt="{post.author_data.name}'s avatar."
				/>
			{/if}
			{#if post.author_data.status === "online"}
				<div class="online"></div>
			{/if}
		</div>
		<div class="user-info">
			<div class="username">
				<h4>{post.author_data.name}</h4>
				{#if post.author_data.is_verified}
					<span class="verified ico"
						><Icon icon="pepicons-pop:checkmark-filled" /></span
					>
				{/if}
				{#each post.author_data.titles as title}
					<h4 class="titles" style={title.style ? title.style : null}>
						{title.name}
					</h4>
				{/each}
			</div>
			<h5>@{post.author_data.slug}</h5>
		</div>
	</button>
	{#if post.content.length > 800}
		<div class="post-container">
			<p dir="auto" class="content">{post.content.substring(0, 730)}</p>
			<div class="read-more">
				<p>Read more</p>
				<Icon icon="ep:arrow-down-bold" />
			</div>
		</div>
	{:else}
		<p dir="auto" class="content">
			<SvelteMarkdown source={post.content} />
		</p>
	{/if}
	{#if post.media && browser}
		<ImageCarousel imgs={post.media} />
	{/if}

	<h5 class="info">
		{m.app_post_created({ period: DateTime.fromISO(post.creation_date)
			.setLocale(languageTag())
			.toRelativeCalendar()}) } 

		&#0149;

		{DateTime.fromISO(post.creation_date)
			.setLocale(languageTag() === "ar" ? "ar-MA": languageTag())
			.toLocaleString(DateTime.DATETIME_MED)}
	</h5>

	<div class="interactions">
		<PostMenu {type} {post} user={session?.user} />
	</div>
</div>

<style lang="sass">
.post
    cursor: default
    padding-block-start: .25rem
    padding-inline: .25rem
    margin-block-start: .5rem
    width: 100%
    .user-profile
        display: flex
        align-items: center
        padding-block: .25rem
        padding-inline: .25rem .75rem
        border-radius: 24px
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
                border: $white-0 2px solid 

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
                margin-inline-start: .25rem
                border: 1px $black-0 solid
                padding: .15rem .3rem
                border-radius: 12px
            span
                font-size: 1.25rem
                margin-inline-start: .25rem
            .verified
                color: $blue-0
            h4, h5
                text-align: start
                margin: 0
            h4
                font-size: .95rem
                font-weight: 700
            h5
                font-size: .75rem
                font-weight: 600
                color: $gray-2
                direction: ltr
                &:lang(ar)
                    float: right
        &:hover
            background-color: $white-1
    .info
        text-align: start
        font-weight: 600
        color: $gray-2
        font-size: 0.75rem
        margin: 0 
        padding-inline-start: .25rem
    .content
        text-align: start
        word-wrap: break-word
        user-select: text
        font-size: 1rem
        margin-block: .5rem
        margin-inline-start: .25rem
    .post-container
        position: relative
        .read-more
            bottom: 0
            width: 100%
            height: 6rem
            background: linear-gradient(to top, $white-0 0%, transparent 150%)
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
        height: 2.75rem
        align-items: center
        justify-content: flex-start
    &:not(:last-child)
        border-bottom: solid $white-1 1px
.clickable:focus
    background-color: $white-1
    border-radius: 20px
    .post-container .read-more
        background: linear-gradient(to top, $white-1 0%, transparent 100%)
</style>
