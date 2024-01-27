import type { Session } from '@supabase/supabase-js'

export const load = (async ({ params, locals: { supabase, getSession }}) => {
  const session: Session | null = await getSession()
  const { data: user }: any = await supabase
    .from("users")
    .select("*")
    .eq("slug", params.slug)
  
  const { data: posts }: any = await supabase.from("posts").select("*").eq("id", user[0].id)

  for (let i = 0; i < posts?.length; i++) {
    const { data: profile }: any = await supabase
      .from("users")
      .select("id, name, slug, avatar_url, titles, status, is_verified, asterisk_user")
      .eq("id", posts[i].author)

    profile[0].titles = profile[0].titles !== null ? profile[0].titles : []

    const { data: likes } = await supabase.from("likes")
      .select("id, user_id, liked_id")
      .eq("liked_id", posts[i].id)

    const { data: comments } = await supabase
      .from("comments")
      .select("*")
      .eq("commented_id", posts[i].id)

    posts[i].likes = likes !== undefined ? likes : 0
    posts[i].comments_count = comments ? comments?.length : 0

    posts[i].author_data = profile[0]
  }

  const { data: comments }: any = await supabase.from("comments").select("*").eq("id", user[0].id)

  for (let i = 0; i < comments?.length; i++) {
    const { data: profile }: any = await supabase
      .from("users")
      .select("id, name, slug, avatar_url, titles, status, is_verified, asterisk_user")
      .eq("id", comments[i].author)

    profile[0].titles = profile[0].titles !== null ? profile[0].titles : []

    const { data: likes } = await supabase.from("likes")
      .select("id, user_id, liked_id")
      .eq("liked_id", comments[i].id)

    const { data: commentsOfComment } = await supabase
      .from("comments")
      .select("*")
      .eq("commented_id", comments[i].id)

    comments[i].likes = likes !== undefined ? likes : 0
    comments[i].comments_count = commentsOfComment ? commentsOfComment?.length : 0

    comments[i].author_data = profile[0]
  }

  
  return { profileInfo: user[0], hisPosts: posts.length > 0 ? posts: [], hisComments: comments.length > 0 ? comments: []}
}) 
