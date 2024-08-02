<script lang="ts">
  export let data
  let { session, userProfile } = data
</script>

<svelte:head>
  <title>Profile de | Msharfin</title>
</svelte:head>

<section>
  <div class="profile-info">
    <div class="avatar">
      {#if userProfile?.avatar_url}
        <img src={userProfile?.avatar_url} alt="" />
      {:else}
        <img src="/images/no_pfp.png" alt="" />
      {/if}
    </div>

    <h2>{userProfile?.name}</h2>
    <h5>@{userProfile?.slug}</h5>
  </div>
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
            border: 5px solid $black-0
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
            color: $gray-2
    button
        color: $black-0
        display: flex
        justify-content: center
        align-items: center
        width: 100%
        border: none
        background: $white-1
        font-size: 1.25rem
        font-weight: bold
        border-radius: 24px
        &:hover
            background-color: $gray-0
        p 
            margin-inline-start: .5rem
</style>
