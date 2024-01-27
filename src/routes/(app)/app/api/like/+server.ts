import { json, error } from "@sveltejs/kit"

export const POST = async ({ request, locals: { supabase, getSession } }) => {
  const { content_id } = await request.json()
  const {
    user: { id },
  }: any = await getSession()

  const addLike = await supabase
    .from("likes")
    .insert([{ liked_id: content_id, user_id: id, content_type: "post" }])
  if (addLike.error) {
    error(400, addLike.error.message);
  }
  return json({ status: "success" })
}
