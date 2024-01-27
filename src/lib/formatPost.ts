
export function brandLogos(post: string) {
    // https://stackoverflow.com/questions/6323417/regex-to-extract-all-matches-from-string-using-regexp-exec#6323598
    const findLogos = post.match(/:(.*?):/g)
    if (findLogos) {
        findLogos.forEach((logo: string) => {
            post = post.replace(logo,`<img src="https://raw.githubusercontent.com/brand-icons/brands/66a515d0afc1bdf9cd308a9ae8d85e1bd23a4d97/icons/color/${logo.substring(1, logo.length-1)}.svg" styles="user-select: none;" width="15" height="15" >`)
        })
    }
    return post
}