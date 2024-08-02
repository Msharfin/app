import { validateCaptcha } from "$lib/hcaptchaValidation"
import { fail, redirect, type Actions } from "@sveltejs/kit"

export const actions = {
	default: async ({ request, locals: { supabase } }) => {
		const promptData = await request.formData()
		const email: any = promptData.get("email")
		const password: any = promptData.get("password")
		const name: any = promptData.get("name")
        const slug: any = promptData.get("slug")
		const captcha: any = promptData.get("h-captcha-response")

        const isApproved = await supabase.from("approvedTesters").select("*").eq("email", email)

        if (isApproved.data?.length === 0) {
            return fail(410, { error: "You're not approved!" })
        } 

		const captchaCheck = await validateCaptcha(captcha)
		const captchaValidity: any = captchaCheck.json()

		if (captchaValidity.error) {
			return fail(401, { error: captchaValidity.error })
        }
            
		const { data, error } = await supabase.auth.signUp({
			email,
			password,
            options: {
                emailRedirectTo: "/auth/callback",
                captchaToken: captcha,
				data: {
					name,
				},
			},
        })

		if (error) {
			return fail(404, { error: error.message })
		}

		const createNewUserColumn = await supabase
			.from("users")
			.insert([{ id: data.user?.id, name, slug }])
            .select()
        
        if (createNewUserColumn.error) {
            return fail(404, { error: createNewUserColumn.error.message })
        }         
        return { success: true }
	},
} satisfies Actions
