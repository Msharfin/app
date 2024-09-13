import { json } from "@sveltejs/kit"
import type { RequestHandler } from "./$types"

export const GET: RequestHandler = async ({ locals: { supabase, user } }) => {
    const getProfile: any = await supabase.from("users").select("*").eq("id", user?.id)
    const updateUser = await supabase.auth.updateUser(
        {
            data: {
                ...user?.user_metadata,
                ...getProfile.data[0],
                msharfin: null
            }

        }
    )
    return json({ success: true })
}
