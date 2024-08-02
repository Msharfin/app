// place files you want to import through the `$lib` alias in this folder.

import { writable } from "svelte/store"

export const version = "0.1.5 (Mogador)"


export const postPayload: any = writable(null)
export const likePayload: any = writable(null)

export const supabaseClient = writable({})


// let supabase: SupabaseClient = supaClient
// const postListener = supabase.channel('posts')
// .on(
//     'postgres_changes',
//     { event: '*', schema: 'public', table: 'posts' },
//     (payload: any) => {
//     if (payload.eventType === "INSERT") {
//         toast(i("app.refresh"), refreshToast)
//     } else {
//         console.log(payload)
//     }
// }).subscribe()