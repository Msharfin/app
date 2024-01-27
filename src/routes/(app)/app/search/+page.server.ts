export const actions = {
    default: async ({ request, locals: { supabase }}) => {
        const searchedItem = (await request.formData()).get("search")
  
        const { data }: any = await supabase.from("posts").select("*").textSearch("content",`"${searchedItem}"`)
    
        for (let i = 0; i < data?.length; i++) {
          const { data: profile }: any = await supabase
            .from("users")
            .select("id, name, slug, avatar_url, titles, status")
            .eq("id", data[i].author)
    
          profile[0].titles = profile[0].titles !== null ? profile[0].titles : []
    
          const { data: likes } = await supabase.from("likes")
            .select("user_id, liked_id")
            .eq("liked_id", data[i].id)
    
          const { data: comments } = await supabase
            .from("comments")
            .select("*")
            .eq("commented_id", data[i].id)
    
          // https://stackoverflow.com/questions/6323417/regex-to-extract-all-matches-from-string-using-regexp-exec#6323598
          const findLogos = data[i].content.match(/:(.*?):/g)
          if (findLogos) {
            findLogos.forEach((logo: any) => {
              data[i].content = data[i].content.replace(logo,`<img src="https://raw.githubusercontent.com/brand-icons/brands/66a515d0afc1bdf9cd308a9ae8d85e1bd23a4d97/icons/color/${logo.substring(1, logo.length-1)}.svg" styles="user-select: none;" width="15" height="15" >`)
            })
          }
    
          data[i].likes = likes !== undefined ? likes : 0
          data[i].comments_count = comments !== undefined ? comments?.length : 0
          data[i].author_data = profile[0]
        }

      return { searchData: data }
    }
}