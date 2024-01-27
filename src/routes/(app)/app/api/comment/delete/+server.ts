import { json, error } from "@sveltejs/kit"

export const POST = async ({ request, locals: { supabase, getSession } }) => {
  const { id, type } = await request.json()
  const {
    user: { userId },
  }: any = await getSession()

  const deletePost: any = await supabase
    .from(type === "post"? "posts": "comments")
    .delete()
    .eq("id", id)
    .eq("author", userId)
  
  const deleteLikes = await supabase
    .from("likes")
    .delete()
    .eq("liked_id", id)

  if (type === "post"){
    const deleteComments = await supabase
      .from("comments")
      .delete()
      .eq("commented_id", id)
  }

  if (deletePost.error || deleteLikes.error) {
    error(400, deletePost.error);
  }
  return json({ status: "success" })
}
