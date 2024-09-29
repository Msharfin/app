import {
	createBrowserClient,
	createServerClient,
	isBrowser,
} from "@supabase/ssr"
import { PUBLIC_SUPABASE_KEY, PUBLIC_SUPABASE_URL } from "$env/static/public"
import type { LayoutLoad } from "./$types"

export const load: LayoutLoad = async ({ data, depends, fetch }) => {
	depends("supabase:auth")

	const supabase = isBrowser()
		? createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY, {
				global: {
					fetch,
				},
			})
		: createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY, {
				global: {
					fetch,
				},
				cookies: {
					getAll() {
						return data.cookies
					},
				},
			})

	const {
		data: { session },
	} = await supabase.auth.getSession()

	const user: any = await supabase.from("users").select("*").eq("id", session?.user.id)

	return { session, supabase, user: session ? user.data[0] : null }
}
