import type { Actions } from "./$types"
import { fail, redirect } from "@sveltejs/kit"
import { TURNSTILE_SECRET } from "$env/static/private"
import { validateToken } from "$lib/captcha"

export const actions = {
    logIn: async ({ request, locals: { supabase }}) => {
        const promptData = await request.formData()
		const email = promptData.get("email") as string
		const password = promptData.get("pass") as string
		const captcha = promptData.get("cf-turnstile-response") as string

        // This causes Supabase to think the token is already used
        //
        // const { success } = await validateToken(captcha, TURNSTILE_SECRET)

        // if (!success) {
        //     return fail(400, { error: "Invalid Captcha!"})
        // }
        const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
            options: {
                captchaToken: captcha,
			},
        })
        
        if (error) {
            return fail(404, { error: error.message })
		}
		
        redirect(301, "/app")
    }

} satisfies Actions