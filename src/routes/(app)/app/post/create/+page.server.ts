import { redirect } from '@sveltejs/kit'
import type { Actions } from './$types'

export const actions = {
	default: async ({ request, locals: {supabase}}) => {
    const getContent = await request.formData()
    const content = getContent.get("content")

    const insertContent = await supabase.from("posts").insert([{
      content,
      is_spread: false,
    }])
    throw redirect(301, "/app")
	},
} satisfies Actions