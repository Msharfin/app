import type { PageServerLoad } from "../$types"
import { Octokit } from "octokit"
import { GITHUB_SECRET } from "$env/static/private"
import { compile } from "mdsvex"

export const load: PageServerLoad = async ({ params }) => {
    const requestedContent = params.name
    const octokit = new Octokit({ 
        auth: GITHUB_SECRET
    })

    const data = await octokit.request("GET /repos/Msharfin/docs/contents/legal/{path}.md", {
        path: requestedContent,
        headers: {
            "Accept": "application/vnd.github.raw+json",
            "X-Github-Api-Version": "2022-11-28"
        }
    })

    const pdfData: any = await octokit.request("GET /repos/Msharfin/docs/contents/legal/pdf/{path}.pdf", {
        path: requestedContent,
        headers: {
            "X-Github-Api-Version": "2022-11-28"
        }
    })
    
    const md = await compile(data.data)

    return { md, pdf: pdfData.data.download_url }
}