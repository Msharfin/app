import { json, redirect } from "@sveltejs/kit"

export const POST = async ({request, locals:{supabase}}) => {
  const { post_id } = request.json()
  const { error } = await supabase.from("posts").delete().eq("id", post_id)
  console.log(error, request)
  if (error) {
    return json(error)
  }
  throw redirect(301, "/app")
}
