<script lang="ts">
  import { enhance } from "$app/forms"
  import Post from "$lib/components/Post.svelte"
  import Icon from "@iconify/svelte"
  import * as m from "$lang/messages"

  export let form: any
  export let data
  let { session, supabase } = data

  const postListener = supabase
    .channel("posts")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "posts" },
      (payload: any) => {
        if (payload.eventType === "DELETE") {
          if (
            form.searchData.find((p: any) => p.id === payload.old.id) &&
            form.searchData.find((p: any) => p.id === payload.old.id).author ===
              session?.user.id
          ) {
            form.searchData.splice(
              form.searchData.indexOf(
                form.searchData.find((p: any) => p.id === payload.old.id)
              ),
              1
            )
          }
          form.searchData = form.searchData
        }
      }
    )
    .subscribe()

  const likeListener = supabase
    .channel("likes")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "likes" },
      (payload: any) => {
        if (form?.searchData) {
          if (payload.eventType === "INSERT") {
            const getLikedPost: any = form.searchData.find(
              (p: any) => p.id === payload.new.liked_id
            )
            form.searchData.forEach((p: any) => {
              if (p.id === getLikedPost.id) {
                getLikedPost.likes.push(payload.new)
              }
            })
          } else {
            form.searchData.forEach((p: any) => {
              const getRemovedLike: any = p.likes.find(
                (p: any) => p.id === payload.old.id
              )
              if (getRemovedLike) {
                p.likes.splice(p.likes.indexOf(getRemovedLike), 1)
              }
            })
          }
          form.searchData = form.searchData
        }
      }
    )
    .subscribe()
</script>

<svelte:head>
  <title>Search | Msharfin</title>
</svelte:head>

<section class="app-page">
  <h1>Search</h1>
  <form
    use:enhance={() => {
      return ({ update }) => update({ reset: false })
    }}
    method="post"
  >
    <input name="search" placeholder="Search here..." type="text" />
    <button
      ><span class="ico"><Icon icon="solar:magnifer-line-duotone" /></span
      ></button
    >
  </form>
  <div class="results">
    {#if form?.searchData}
      <div class="posts">
        {#each form?.searchData as post}
          <Post {post} {session} />
        {:else}
          <div class="error-pg">
            <img src="/images/error.png" alt="" />
            <h2>So empty...</h2>
            <p>We found nothing :(</p>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</section>

<style lang="sass">
section
    @include page
    h1
        @include title
        font-size: 3rem
        font-weight: bolder
        margin-block: .5rem
    form
        display: flex
        align-items: center
        background-color: $white-1
        border-radius: 24px
        input
            font-size: 1.25rem
            color: $black-0
            width: 100%
            border-start-start-radius: 24px
            border-end-start-radius: 24px
            padding: .5rem 1rem
            background: none
            border: none
            height: 3rem
        button
            @include secondaryBtn
            width: 3rem
            height: 3rem
            border-radius: 24px
            font-size: 1.25rem
            padding: .5rem
            display: flex
            align-items: center
            justify-content: center
            &:hover
                background-color: $gray-0
    .post
        cursor: default
        width: 100%
        padding-block-start: 1rem
        border-radius: 0
        &:not(:last-child)
            border-bottom: solid $white-1 1px
        .user-profile
            display: flex
            align-items: center
            padding-block: .25rem
            padding-inline-end: .75rem
            border-radius:24px
            .avatar-wrap
                position: relative
                .online
                    width: 12px
                    height: 12px
                    position: absolute
                    background-color: green
                    border-radius: 50%
                    bottom: 0
                    inset-inline-end: 0
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
                    margin-inline-start: .5rem
                    border: 1px $black-0 solid
                    padding: .15rem .3rem
                    border-radius: 12px
                h4, h5
                    text-align: start
                    font-size: .85rem
                    margin: 0
                h5
                    color: $gray-2
                    margin-block-start: .1rem
            &:hover
                background-color: $white-1
        .date
            text-align: start
            font-weight: 500
            color: $gray-2
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
            margin-block-end: .75rem
            height: 50px
            list-style-type: none
            align-items: center
            justify-content: space-between
    .post:focus
        background-color: $white-1
        .post-container .read-more
            background: linear-gradient(to top, $white-1 0%, transparent 100%)

</style>
