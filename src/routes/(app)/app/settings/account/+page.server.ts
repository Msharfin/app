import { fail } from "@sveltejs/kit"
import type { Actions } from "./$types"

export const actions = {
    updateUsername: async ({ request, locals: { supabase, user } }) => {
        const getNewUsername = await request.formData()
        const newName = getNewUsername.get("name") as string

        const { error } = await supabase.from("users").update({ name: newName }).eq("id", user?.id)

        if (error) {
            console.log(error)
            fail(400, { message: "Something went wrong!" })
        }

        await supabase.auth.updateUser({
            data: {
                name: newName
            }
        })
        return { success: true }
    }
} satisfies Actions