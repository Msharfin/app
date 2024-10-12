import type { PageServerLoad } from "./$types"

export const load = (async ({ url, locals: { supabase } }) => {
    const term = url.searchParams.get("term")

    if (term) {
        async function findTerm() {
            const { data, error }: any = await supabase
            .from("posts")
            .select()
            .textSearch("content", term as string)
        
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

                data[i].likes = likes !== undefined ? likes : []
                data[i].comments_count = comments ? comments?.length : 0

                data[i].author_data = profile[0]
            }

            if (!error) {
                return { searchResult: data, notFound: true }
            } else {
                return { searchResult: data, notFound: false }
            }
        }

        return findTerm()
        
    }
}) satisfies PageServerLoad