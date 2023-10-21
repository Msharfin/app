import type { PageServerLoad } from "./$types"

export const load = (async ({locals:{supabase}}) => {
  let { data, error }: any = await supabase.from("posts").select("*")

  for (var i = 0; i < data?.length; i++) {
    const { data: profile }: any = await supabase
        .from("users")
        .select("id, name, slug, avatar_url")
        .eq("id", data[i].author)

    const { data: likes } = await supabase.from("likes")
    .select("user_id, liked_id")
    .eq("liked_id", data[i].id)

    const { data: comments } = await supabase.from("comments")
    .select("user_id, post_id, content")
    .eq("post_id", data[i].id)

    data[i].likes = likes !== undefined ? likes: 0
    data[i].comments = comments
    data[i].comments_count = comments !== undefined ? comments?.length : 0
    data[i].author_data = profile[0]
  }

  if (error) { return {error} }
  return {posts:data}
}) satisfies PageServerLoad
