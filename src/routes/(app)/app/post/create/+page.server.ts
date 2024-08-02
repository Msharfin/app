import { redirect } from "@sveltejs/kit"
import type { Actions } from "./$types"
import { brandLogos } from "$lib/formatPost"
import sharp from "sharp"
import { decode } from "base64-arraybuffer"

export const actions = {
	default: async ({ request, locals: { supabase, getSession } }) => {
		const getContent = await request.formData()
		const content: any = getContent.get("content")
		const media: any = getContent.getAll("media")

		let mediaPath: Array<object> = []

		if (media && media[0].type !== "application/octet-stream") {
			let folderName: number = 0

			for (let n = 0; ; n++) {
				const { data } = await supabase.storage
					.from("images")
					.list(n.toString())
				if (data?.length === 300) {
					folderName = n++
					break
				} else {
					break
				}
			}

			for (let m = 0; m < media.length; m++) {
                const ImgBuffer: any = await media[m].arrayBuffer()
                    
                const compressedImg = await sharp(ImgBuffer)
                    .resize(720, 720, {
                        kernel: sharp.kernel.nearest,
                        fit: "contain",
                        background: { r: 255, g: 255, b: 255, alpha: 0 }
                    })
                    .withMetadata()
                    .jpeg()
                    .toBuffer()
                
                const { data, error } = await supabase.storage
					.from("images")
					.upload(
						`${folderName}/${Date.now() + Math.floor(Math.random() + 12)}.jpeg`,
						decode(compressedImg.toString("base64")),
						{
                            cacheControl: "3600",
                            contentType: "image/jpeg"
						},
					)

				if (data && !error) {
					mediaPath = [
						...mediaPath,
						{
							mediaFilePath: data.path,
							mediaURL: supabase.storage
								.from("images")
								.getPublicUrl(data.path).data.publicUrl,
						},
					]
				}
			}
		}

		const insertContent: any = await supabase.from("posts").insert([
			{
				content: brandLogos(content),
				is_spread: false,
				media: mediaPath.length === 0 ? null : mediaPath,
			},
		])

		redirect(301, `/app`)
	},
} satisfies Actions
