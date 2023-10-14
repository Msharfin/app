<script lang="ts">
  import DesktopAppNav from "$lib/components/DesktopAppNav.svelte"
  import MobileBottomAppNav from "$lib/components/MobileBottomAppNav.svelte"
  import MobileTopAppNav from "$lib/components/MobileTopAppNav.svelte"
</script>

<DesktopAppNav />
<MobileTopAppNav />

<slot />

<MobileBottomAppNav />


