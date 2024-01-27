import { redirect } from '@sveltejs/kit'
import type { Actions } from './$types'
import { brandLogos } from '$lib/formatPost'

export const actions = {
	default: async ({ request, locals: {supabase}}) => {
    const getContent = await request.formData()
    const content: any = new String(getContent.get("content"))

    const insertContent = await supabase.from("posts").insert([{
      content: brandLogos(content),
      is_spread: false,
    }])
    redirect(301, "/app");
	},
} satisfies Actions