import type { Actions } from "./$types"
import { brandLogos } from "$lib/formatPost"

export const actions = {
	default: async ({ params, request, locals: { supabase } }) => {
		const getContent = await request.formData()
		const content: any = new String(getContent.get("content"))

		const insertContent = await supabase.from("comments").insert([
			{
				content: brandLogos(content),
				commented_id: params.id,
			},
		])
	},
} satisfies Actions

export const load = async ({ params, locals: { supabase } }) => {
    const { data: post }: any = await supabase
      .from("posts")
      .select("*")
      .eq("id", params.id)

    const { data: getUser }: any = await supabase
      .from("users")
      .select("*")
      .eq("id", post[0].author)

    const { data: getLikes } = await supabase
      .from("likes")
      .select("*")
      .eq("liked_id", params.id)

    const { data: getComments }: any = await supabase
      .from("comments")
      .select("*")
      .eq("commented_id", params.id)

    post[0].likes = getLikes !== undefined ? getLikes : 0
    post[0].comments = []
    post[0].comments_count = getComments ? getComments?.length : 0
    post[0].author_data = getUser[0]

    for (let i = 0; i < post[0].comments_count; i++) {
        const { data: user }: any = await supabase
          .from("users")
          .select("*")
          .eq("id", getComments[i].author)

        const { data: likes } = await supabase
          .from("likes")
          .select("*")
          .eq("liked_id", getComments[i].id)

        const { data: commentsOfComment }: any = await supabase
          .from("comments")
          .select("*")
          .eq("commented_id", getComments[i].id)

        const comment = {
          ...getComments[i],
          likes: likes !== undefined ? likes : 0,
          author_data: user[0],
          comments_count:
            commentsOfComment !== undefined ? commentsOfComment.length : 0,
        }

        post[0].comments.push(comment)
    }

    return { getPost: post[0] }
}
