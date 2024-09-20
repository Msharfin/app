import { writable } from "svelte/store"

export const postPayload: any = writable([])
export const likePayload: any = writable([])

export const cachePosts: any = writable([])

export const blogIcon: any = {
    "plans": "icon-[solar--flag-2-line-duotone]"
}