import { createServerClient } from "@supabase/ssr"
import { type Handle, redirect } from "@sveltejs/kit"
import { sequence } from "@sveltejs/kit/hooks"

import {
	PUBLIC_SUPABASE_URL,
	PUBLIC_SUPABASE_KEY,
} from "$env/static/public"

const supabase: Handle = async ({ event, resolve }) => {

	event.locals.supabase = createServerClient(
		PUBLIC_SUPABASE_URL,
		PUBLIC_SUPABASE_KEY,
		{
			cookies: {
				getAll: () => event.cookies.getAll(),
				setAll: (cookiesToSet) => {
					cookiesToSet.forEach(({ name, value, options }) => {
						event.cookies.set(name, value, {
							...options,
							path: "/",
						})
					})
				},
			},
		}
	)

	event.locals.safeGetSession = async () => {
		const {
			data: { session },
		} = await event.locals.supabase.auth.getSession()
		if (!session) {
			return { session: null, user: null }
		}

		const {
			data,
			error,
        }: any = await event.locals.supabase.from("users").select("*").eq("id", session.user.id)
		if (error) {
			return { session: null, user: null }
		}

		return { session, user: data[0] }
	}

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === "content-range" || name === "x-supabase-api-version"
		},
	})
}

const authGuard: Handle = async ({ event, resolve }) => {
	const { session, user } = await event.locals.safeGetSession()
	event.locals.session = session
	event.locals.user = user

	if (!event.locals.session && event.url.pathname.startsWith("/app")) {
		redirect(303, "/auth/login")
	}

    if (event.locals.session && (event.url.pathname === "/auth/login" || event.url.pathname === "/auth/signup" || event.url.pathname === "/"  )) {
		redirect(303, "/app")
	}

	return resolve(event)
}

export const handle: Handle = sequence(supabase, authGuard)
