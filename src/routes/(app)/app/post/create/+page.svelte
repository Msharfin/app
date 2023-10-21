<script>

  import Icon from "@iconify/svelte"
  import { i } from "@inlang/sdk-js"

</script>

<section>
    <h1>{i("titles.create")}</h1>
    <form method="post">
        <textarea name="content" id="post_content" cols="100" rows="10" spellcheck="true" autofocus required autocomplete="username" placeholder="{i("create.place")}"></textarea>
        <button><span class="ico"><Icon icon="ic:twotone-send" /></span> <p>{i("create.post")}</p></button>
    </form>
</section>

<style lang="sass">
section
    user-select: none
    display: flex
    margin-block-start: 1.5rem
    margin-inline: 1rem
    flex-direction: column
    flex: 1
    h1
        font-size: 3rem
        font-weight: bolder
        margin-block: .5rem 1.5rem
    form 
        textarea
            max-width: 100%
            min-width: 100%
            border-radius: 24px
            max-height: 10rem
            min-height: 3.5rem
            color: $text-color
            border: none
            transition: all .25s ease 
            background-color: $container-color
            font-size: 1.25rem
            padding: 1rem
            margin-block-end: .5rem
            &:hover
                background-color: $hover-container-color   
        button
            width: 100%
            display: flex
            border-radius: 24px
            align-items: center
            justify-content: center
            border: none
            font-size: 1.25rem
            margin-block-start: .5rem
            background-color: $text-color
            color: $background-color
            font-weight: bold
            &:hover
                background-color: $hover-color
            .ico
                margin-inline-end: .25rem
</style>