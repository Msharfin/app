import { HCAPTCHA_SECRET_KEY } from "$env/static/private"
import { json } from "@sveltejs/kit"

export const validateCaptcha = async (captcha: FormDataEntryValue | null) => {
    const tokenVerify = await fetch("https://hcaptcha.com/siteverify", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `secret=${HCAPTCHA_SECRET_KEY}&response=${captcha}`,
    })
    
    if (!tokenVerify.ok) {
        return json({ error: "could not verify captcha" })
    }
    
    const verifyJson = await tokenVerify.json()
    if (!verifyJson.success) {
        return json({ error: "invalid captcha" })
    }

    return json({success: true})
}