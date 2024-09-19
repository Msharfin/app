import type { PageServerLoad } from "./$types"
import { Octokit } from "octokit"
import { GITHUB_SECRET } from "$env/static/private"
import { compile } from "mdsvex"

export const load: PageServerLoad = (async () => {
    const octokit = new Octokit({ 
        auth: GITHUB_SECRET
    })

    const data = await octokit.request("GET /repos/Msharfin/docs/contents/blog", {
        headers: {
            "Accept": "application/vnd.github.raw+json",
            "X-Github-Api-Version": "2022-11-28"
        }
    })

    let blogList = []

    for (let i = 0; i < data.data.length; i++) {
        const articleData = await octokit.request("GET /repos/Msharfin/docs/contents/blog/{path}", {
            path: data.data[i].name,
            headers: {
                "Accept": "application/vnd.github.raw+json",
                "X-Github-Api-Version": "2022-11-28"
            }
        })
        
        console.log(articleData)

        const md = await compile(articleData.data)
        blogList.push({ ...md, name: data.data[i].name.replace(/\.[^/.]+$/, "") })
    }

    return { list: blogList }
})  