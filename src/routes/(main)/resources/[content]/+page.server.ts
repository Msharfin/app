import { error } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"

export const load = (async ({params, locals: {supabase}}) => {
    const requestedContent = params.content
    const { data }: any = await supabase.from("resources").select("*").eq("url_slug", requestedContent)
    if (data?.length === 0) {
        error(404,"Not found");
    }

    const getMarkdown = await fetch(data[0].content)
        .then(response => response.text().then(
            async (content) => data[0].content = content
        ))

    return { resource: data[0]}
}) satisfies PageServerLoad