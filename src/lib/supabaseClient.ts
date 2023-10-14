// import { createClient } from '@supabase/supabase-js'
// import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY } from "$env/static/public"
// import { browser } from '$app/environment'

// export const supabase = createClient(
//   `https://${PUBLIC_SUPABASE_URL}.supabase.co`,
//   PUBLIC_SUPABASE_KEY
// )

// export async function getSession() {
//   if (browser) {
//     const { data:{session}, error} = await supabase.auth.getSession()

//     if (error !== null) { return JSON.parse(JSON.stringify(error)) }
//     else { return JSON.parse(JSON.stringify(session)) }
//   }
// }