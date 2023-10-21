<script lang="ts">
    import { goto } from '$app/navigation'
    import Icon from '@iconify/svelte'
    import { i } from '@inlang/sdk-js'

    export let data
    let { session, userProfile } = data
</script>

<svelte:head>
    <title>{i("titles.settings")} | Msharfin</title>
</svelte:head>

<section>
    <div class="profile-info">
        <div class="avatar">
        {#if userProfile?.avatar_url}
            <img src="{userProfile?.avatar_url}" alt="">
        {:else}
            <img src="" alt="">
        {/if}
        </div>

        <h2>{userProfile?.name}</h2>
        <h5>@{userProfile?.slug}</h5>
    </div>
    <button on:click={()=>goto("/app/settings")}><span class="ico"><Icon icon="ph:gear-duotone" /></span> <p> {i("titles.settings")}</p></button>
</section>

<style lang="sass">

section
    display: flex
    flex: 1
    flex-direction: column
    justify-content: center
    align-items: center
    margin-inline: 5rem
    .profile-info
        display: flex
        align-items: center
        flex-direction: column
        margin-block-end: 2rem
        .avatar
            padding: .5rem
            border-radius: 50%
            border: 5px solid $text-color
            display: flex
            justify-content: center
            align-items: center
            width: fit-content
            img
                border-radius: 50%
                width: 6rem   
                height: 6rem      
        h2, h5
            margin: 0
            margin-block-start: 0.5rem
            text-align:  center
        h5
            font-size: 1rem
            color: $text-secondary-color
    button
        color: $text-color
        display: flex
        justify-content: center
        align-items: center
        width: 100%
        border: none
        background: $container-color
        font-size: 1.25rem
        font-weight: bold
        border-radius: 24px
        &:hover
            background-color: $hover-container-color
        p 
            margin-inline-start: .5rem
</style>