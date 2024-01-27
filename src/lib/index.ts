// place files you want to import through the `$lib` alias in this folder.

import type { SupabaseClient } from "@supabase/supabase-js"
import { writable } from "svelte/store"
import { errorToast, successToast } from "./toastStyles"
import toast from "svelte-french-toast"
import { goto } from "$app/navigation"

export const version = "0.1.4"


export const postPayload: any = writable(null)
export const likePayload: any = writable(null)

const supabaseClient = writable({})
export let supaClient: any
supabaseClient.subscribe((client) => {
    supaClient = client
})

export function setSupaClient(client: SupabaseClient) {
    supabaseClient.set(client)
}

export async function signOut () {
    const { error } = await supaClient.auth.signOut()
    if (error) {
        toast.error(error.message,errorToast)
    } else {
        toast.success("Signed out successfully!", successToast)
        goto("/")
    }
}

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