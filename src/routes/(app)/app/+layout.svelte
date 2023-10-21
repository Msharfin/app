<script lang="ts">
  import DesktopAppNav from "$lib/components/DesktopAppNav.svelte"
  import MobileBottomAppNav from "$lib/components/MobileBottomAppNav.svelte"
  import MobileTopAppNav from "$lib/components/MobileTopAppNav.svelte"

  export let data
  let { session: {user:{ user_metadata }} }: any = data
</script>

<DesktopAppNav />
<MobileTopAppNav />

<slot />

<MobileBottomAppNav profile={JSON.parse(JSON.stringify(user_metadata))} />


