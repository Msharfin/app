import { PUBLIC_SUPABASE_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public'
import type { LayoutLoad } from './$types'
import { createBrowserClient, isBrowser, parse } from '@supabase/ssr'

export const load: LayoutLoad = async ({ fetch, data, depends }) => {
  depends('supabase:auth')

  const supabase = createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY, {
    global: {
      fetch,
    },
    cookies: {
      get(key) {
        if (!isBrowser()) {
          return JSON.stringify(data.session)
        }

        const cookie = parse(document.cookie)
        return cookie[key]
      },
    },
  })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  let user: any
  if (session) {
    user = await supabase.from("users").select("*").eq("id", session?.user.id)
  }
  
  return {
    supabase, session, userProfile: session ? user.data[0]: {}
  }
}

