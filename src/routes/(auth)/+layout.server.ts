import type { LayoutServerLoad } from "./$types"
import { redirect } from "@sveltejs/kit"

export const load = (async ({ locals: { getSession } }) => {
	if ((await getSession()) !== null) {
		redirect(301, "/app")
	}
	return {}
}) satisfies LayoutServerLoad
