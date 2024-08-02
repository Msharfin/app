import type { SupabaseClient } from "@supabase/supabase-js"
import { supabaseClient } from "$lib/index"
import { errorToast, successToast } from "./toastStyles"
import toast from "svelte-french-toast"
import { goto } from "$app/navigation"

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