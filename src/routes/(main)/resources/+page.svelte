<script>
    import { i } from "@inlang/sdk-js"
</script>

<section>
    <p>
    {i("resources.home")}
    </p>
    <ul>
        <li><a class="link" href="/resources/tos">{i("footer.tos")}</a></li>
        <li><a class="link" href="/resources/privacy_policy">{i("footer.policy")}</a></li>
    </ul>
</section>

<style lang="sass">
section
    margin-inline: 10rem
    text-indent: 2rem
    text-align: justify
    font-size: 1.25rem
    a, li
        color: $text-secondary-color
    a:hover
        color: $container-color  

@media screen and (max-width: 789px)
    section
        margin-inline: 3rem
</style>