<script>
  import { page } from '$app/stores';
</script>

<img src="/images/error_dark.png" alt="">
<h1>{$page.status}: {$page.error?.message} hi</h1>