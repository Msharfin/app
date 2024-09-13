import { error, json } from "@sveltejs/kit"
import type { RequestHandler } from "./$types"

export const POST: RequestHandler = async ({ request, locals: { supabase, user }}) => {
    const { id, action } = await request.json()
  
    if (action === "like") {
        const addLike = await supabase
            .from("likes")
            .insert([{ liked_id: id, user_id: user?.id, content_type: "post" }])
        
        if (addLike.error) {
            error(400, addLike.error.message)
        }             
    } else {
        const deleteLike = await supabase
            .from("likes")
            .delete()
            .eq("liked_id", id)
            .eq("user_id", user?.id)
        
        if (deleteLike.error) {
            error(400, deleteLike.error.message)
        }     
    }

    return json({ status: "success" })
  }
