import { json, error } from "@sveltejs/kit"

export const POST = async ({ request, locals: { supabase, getSession } }) => {
	const post = await request.json()
	const {
		user: { id },
	}: any = await getSession()

	const deletePost: any = await supabase
		.from("posts")
		.delete()
		.eq("id", post.id)
		.eq("author", id)

	const deleteLikes = await supabase
		.from("likes")
		.delete()
		.eq("liked_id", post.id)

	const deleteComments = await supabase
		.from("comments")
		.delete()
        .eq("commented_id", post.id)
    
    if (post.media) {
        for (let l = 0; l < (post.media).length; l++) {
            const deleteFiles = await supabase
            .storage
            .from("images")
            .remove([post.media[l].mediaFilePath])
        }
    }

	if (deletePost.error || deleteLikes.error) {
		error(400, deletePost.error + deleteLikes.error)
	}
	return json({ status: "success" })
}
