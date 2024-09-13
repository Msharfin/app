import type { Actions } from "./$types"
import { fail } from "@sveltejs/kit"
import { TURNSTILE_SECRET } from "$env/static/private"
import { validateToken } from "$lib/captcha"

export const actions = {
    logIn: async ({ request, locals: { supabase }}) => {
        const promptData = await request.formData()
		const email = promptData.get("email") as string
        const password = promptData.get("pass") as string
        const name = promptData.get("name") as  string
        const slug = promptData.get("id") as string
		const captcha = promptData.get("cf-turnstile-response") as string

        // This causes Supabase to think the token is already used
        //
        // const { success } = await validateToken(captcha, TURNSTILE_SECRET)

        // if (!success) {
        //     return fail(400, { error: "Invalid Captcha!"})
        // }

		const { data, error } = await supabase.auth.signUp({
			email,
			password,
            options: {
                emailRedirectTo: "/auth/callback",
                captchaToken: captcha,
				data: {
					name,
                    slug
				},
			},
        })
        
		if (error) {
            return fail(400, { error: error.message })
		}
		
        const createNewUserColumn = await supabase
        .from("users")
        .insert([{ id: data.user?.id, name, slug }])
        .select()

        if (createNewUserColumn.error) {
            return fail(400, { error: createNewUserColumn.error.message })
        }         

        return { success: true }
    }

} satisfies Actions