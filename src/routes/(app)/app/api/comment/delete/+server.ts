import { json, error } from "@sveltejs/kit"

export const POST = async ({ request, locals: { supabase, getSession } }) => {
  const comment = await request.json()
  const {
    user: { id },
  }: any = await getSession()

  const deletePost: any = await supabase
    .from("comments")
    .delete()
    .eq("id", comment.id)
    .eq("author", id)
    
  const deleteLikes = await supabase
    .from("likes")
    .delete()
    .eq("liked_id", comment.id)
  
  const deleteComments = await supabase
    .from("comments")
    .delete()
    .eq("commented_id", comment.id)
    
  if (deletePost.error || deleteLikes.error) {
    error(400, deletePost.error);
  }
  return json({ status: "success" })
}
