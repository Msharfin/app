import { validateCaptcha } from "$lib/hcaptchaValidation"
import { fail, redirect, type Actions } from "@sveltejs/kit"

export const actions = {
    default: async ({ request, locals: { supabase } }) => {
		const promptData = await request.formData()
		const email: any = promptData.get("email")
		const password: any = promptData.get("password")
		const captcha: any = promptData.get("h-captcha-response")

        const captchaCheck = await validateCaptcha(captcha)
        const captchaValidity: any = captchaCheck.json()

		if (captchaValidity.error) {
			return fail(401, { error:captchaValidity.error })
		}
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
	},
} satisfies Actions
