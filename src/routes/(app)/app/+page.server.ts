import type { PageServerLoad, Actions } from "./$types"
import { error } from "@sveltejs/kit"

export const load = (async ({ locals: { supabase } }) => {

    async function retrievePosts() {
        const { data }: any = await supabase
            .from("posts")
            .select("*")
            .eq("isHidden", false)

        for (let i = 0; i < data?.length; i++) {
            const { data: profile }: any = await supabase
                .from("users")
                .select(
                    "id, name, slug, avatar_url, titles, status, is_verified, asterisk_user",
                )
                .eq("id", data[i].author)

            profile[0].titles =
            profile[0].titles !== null ? profile[0].titles : []

            const { data: likes } = await supabase
                .from("likes")
                .select("id, user_id, liked_id")
                .eq("liked_id", data[i].id)

            const { data: comments } = await supabase
                .from("comments")
                .select("*")
                .eq("commented_id", data[i].id)

            data[i].likes = likes !== undefined ? likes : 0
            data[i].comments_count = comments ? comments?.length : 0

            data[i].author_data = profile[0]
        }
        return data
    }

	return {
		posts: retrievePosts(),
	}
}) satisfies PageServerLoad

export const actions = {
    like: async ({ request, locals: { supabase, user } }) => {        
        const { url: { searchParams: { id } } } = await request.json()
      
        const addLike = await supabase
            .from("likes")
            .insert([{ liked_id: id, user_id: user?.id, content_type: "post" }])
        
        if (addLike.error) {
            error(400, addLike.error.message);
        }
        return { success: true }
    }

} satisfies Actions
