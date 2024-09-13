import { writable } from "svelte/store"

export const postPayload: any = writable([])
export const likePayload: any = writable([])

export const cachePosts: any = writable([])