import { json, error } from "@sveltejs/kit"

export const POST = async ({ request, locals: { supabase, getSession } }) => {
  const { content_id } = await request.json()
  const {
    user: { id },
  }: any = await getSession()

  const deleteLike = await supabase
    .from("likes")
    .delete()
    .eq("liked_id", content_id)
    .eq("user_id", id)

  if (deleteLike.error) {
    error(400, deleteLike.error.message);
  }
  return json({ status: "success" })
}
