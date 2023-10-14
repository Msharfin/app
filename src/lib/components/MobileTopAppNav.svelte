<script>
  import { i } from "@inlang/sdk-js"
</script>


<header class="header-mobile">
    <a class="logo" href="/app"><img src="/images/logo.png" alt={i("nav.logo_alt")}></a>
</header>


<style lang="sass">

.header-mobile
  z-index: 999
  position: sticky
  background-color: $background-color
  top: 0
  padding-block: .5rem
  height: 4.5rem
  display: flex
  align-items: center
  justify-content: center
  .logo img
    width: 2.75rem
</style>