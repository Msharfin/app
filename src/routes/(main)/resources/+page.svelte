<script>
    import { i } from "@inlang/sdk-js"
    import { goto } from "$app/navigation"
    import Icon from "@iconify/svelte"
</script>

<section>
    <p>
    {i("resources.home")}
    </p>
    <div>
        <button on:click={() => goto("/resources/tos")}><p>{i("footer.tos")}</p><span class="ico"><Icon icon="mingcute:paper-line" /></span></button>
        <button on:click={() => goto("/resources/privacy_policy")}><p>{i("footer.policy")}</p><span class="ico"><Icon icon="codicon:law" /></span></button>
    </div>
</section>

<style lang="sass">
section
    margin-inline: 10rem
    text-indent: 2rem
    text-align: justify
    font-size: 1.25rem
    div
        display: flex
        margin-block-start: 2rem
        align-items: center
        justify-content: space-evenly
        p
            margin: 0
            position: relative
            z-index: 1
        button
            width: 100%
            padding: 2rem 1.5rem
            font-size: 1.5rem
            position: relative
            font-weight: 800
            border: none
            border-radius: 24px
            margin-inline: 1rem 1rem
            background-color: $container-color 
        button:hover
            background-color: $hover-container-color 
            .ico
                transform: scale(1.2)
        .ico
            transition: .5s all ease
            position: absolute
            inset-inline-start: 20%
            inset-block-start: 0
            display: block       
            color: hsl(0, 0%, 50%)
            z-index: 0
            opacity: 0.4
            font-size: 5rem  

@media screen and (max-width: 789px)
    section
        margin-inline: 3rem
        div
            flex-direction: column
            button:last-child
                margin-top: 1rem
@media screen and (max-width: 400px)
    .ico
        inset-inline-start: 10%
</style>