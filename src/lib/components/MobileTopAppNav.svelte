<script>
  import * as m from "$lang/messages"
</script>

<header class="header-mobile">
  <a href="/app"
    ><img
      class="logo"
      src="/images/logo.png"
      alt={m.alt_logo({ brand: m.main_features_title_1() })}
    />
  </a>
</header>

<style lang="sass">

.header-mobile
  z-index: 50
  position: sticky
  background: $white-0
  top: 0
  height: 4.5rem
  display: flex
  align-items: center
  justify-content: center
  .logo
    width: 2.5rem
</style>
