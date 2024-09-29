<script lang="ts">
    import { createDialog, melt } from '@melt-ui/svelte'
    const {
      elements: { trigger, portalled, overlay, content, title, description, close },
      states: { open }
    } = createDialog()

    $: cropElement = ""

    const changeAvatar = (input: any) => {
        const file = input.target?.files

        const reader = new FileReader()
        reader.onload = () => {
            cropElement = reader.result as string
        }
        reader.readAsDataURL(file[0])        
    }

</script>


<label class="secondaryBtn me-2 !size-9 !text-lg cursor-pointer">
    <span class="icon-[solar--camera-add-outline]"></span>
    <input use:melt={$trigger} on:change={(e) => changeAvatar(e)} accept="image/jpeg,image/jpg,image/png" hidden type="file" name="pfp">
</label>

<!-- {#if $open} -->
    <div use:melt={$portalled} class="z-20">
        <div use:melt={$overlay} class="fixed bg-black/50 backdrop-blur-sm w-svw h-svh" />
        <div use:melt={$content} class="absolute p-1.5 w-full h-1/2 ">
            <button use:melt={$close}> Close Dialog </button>
        </div>
    </div>
<!-- {/if} -->