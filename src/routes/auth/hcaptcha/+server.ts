import { json } from '@sveltejs/kit'
import { HCAPTCHA_SECRET_KEY } from '$env/static/private'

export async function POST({ request }: any) {
    const { captcha } = await request.json()
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
    return json({error: null})
}
