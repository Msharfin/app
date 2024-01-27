/* This file was created by inlang.
It is needed in order to circumvent a current limitation of SvelteKit. See https://github.com/inlang/inlang/issues/647
You can remove this comment and modify the file as you like. We just need to make sure it exists.
Please do not delete it (inlang will recreate it if needed). */

import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY } from '$env/static/public'
import { createServerClient } from '@supabase/ssr'
import type { Handle } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY, {
    cookies: {
      get: (key) => event.cookies.get(key),
      set: (key, value, options) => {
        event.cookies.set(key, value, options)
      },
      remove: (key, options) => {
        event.cookies.delete(key, options)
      },
    },
  })


  event.locals.getSession = async () => {
    const {
      data: { session },
    } = await event.locals.supabase.auth.getSession()
    return session
  }

  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      return name === 'content-range'
    },
  })
}