<script>
    import Icon from "@iconify/svelte"
    import toast from "svelte-french-toast"
    import { fly } from "svelte/transition"
    import { errorToast } from "$lib/toastStyles"
    import { supadb } from "$lib/supabaseClient"
    import { i } from "@inlang/sdk-js";=

    let showMore = false
    /**
   * @type {{ likes: any; author: any; id: any; content: any; comments_count: any; spreads: any; }}
   */
     export let post
    /**
   * @type {any}
   */
     export let user
     
    /**
   * @param {any} postId
   * @param {any} userId
   */
    async function deletePost(postId, userId) {
        // const req = await fetch("/api/post/delete", {
        //     method: "POST",
        //     headers: {
        //     "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({
        //         post_id: postId,
        //         user_id: userId,
        //     }),
        // }).catch((error)=>{
        //     console.log(error)
        //     if (error?.json() !== undefined) {
        //         return toast.error("An error has occured", errorToast)
        //     }
        // })
        const deletePost = await supadb.from("posts").delete().eq("id", postId).eq("author", userId)
        if (deletePost.error !== null) {
             return toast.error("An error has occured", errorToast)
        }
    }

    /**
   * @param {any} postId
   * @param {any} userId
   */
    async function dislike(postId, userId) {
        const deleteLike = await supadb.from("likes").delete().eq("liked_id", postId)
        if (deleteLike.error !== null) {
            return deleteLike.error
        }
    }
    /**
   * @param {any} postId
   * @param {any} userId
   */
    async function like(postId, userId) {
        const addLike = await supadb.from("likes").insert([{liked_id: postId, user_id: userId, content_type: "post"}])
        if (addLike.error !== null) {
            return addLike.error
        }
    }
    $: postLikes = post.likes
    $: hasLiked = postLikes.find((/** @type {{ user_id: any; }} */ i) => i.user_id === user?.id)

    const likes = supadb.channel('likes')
    .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'likes' },
        (payload) => {
        if (payload.eventType === "INSERT") {
            postLikes = [...post.likes, payload.new]
        } else {
            post.likes.pop(payload.old)
            postLikes = [...post.likes]
        }
    }).subscribe()
</script>

{#if showMore}
    {#if user?.id === post.author}
        <li in:fly={{ x: 50, duration: 300 }}><button class="more danger" on:click={() => deletePost(post.id, user?.id)}><span class="ico"><Icon icon="icon-park-twotone:delete" /></span><p>{i("app.delete")}</p></button> </li>
    {/if}
    <li in:fly={{ x: 50, duration: 300 }}><button class="more" on:click={()=> navigator.share({title:"Msharfin", url:`${window.location.origin}/app/profile/${post.id}`, text: post.content})}> <span class="ico"><Icon icon="icon-park-twotone:share-one" /></span> <p>{i("app.share")}</p></button> </li>
{:else}
<li in:fly={{ x: 50, duration: 300 }}><button on:click={()=>
    {if (hasLiked){
        dislike(post.id, user.id)
    } else {
        like(post.id, user.id)
    }
}}> <span in:fly={{ y: 50, duration: 300 }} class="ico">
    {#if hasLiked}
    <Icon  icon="ph:heart-fill" />
    {:else}
    <Icon icon="ant-design:heart-twotone" />
    {/if}</span> </button> 
    <p>{postLikes.length}</p></li>
<li in:fly={{ x: 50, duration: 300 }}><button on:click={()=>alert("Coming soon...")}> <span class="ico"><Icon icon="iconamoon:comment-duotone" /></span> </button> &#0149; <a href="">{post.comments_count}</a></li>    
<li in:fly={{ x: 50, duration: 300 }}><button on:click={()=>alert("Coming soon...")}> <span class="ico"><Icon icon="carbon:network-4" /></span> </button> &#0149; <p>{post.spreads}</p></li>
{/if}
<div>
    |
    <li> <button on:click={()=> showMore === true ? showMore = false: showMore = true}><span class="ico"><Icon icon="tabler:dots" /></span></button></li>            
</div>

<style lang="sass">
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
        color: $text-secondary-color
        &:hover
            background-color: $container-color
    .more
        border-radius: 12px
        padding: 0.5rem 1rem
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

</style