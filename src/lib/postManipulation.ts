import linkifyStr from "linkify-string"
import "linkify-plugin-mention"

export function parseMentions(content: string) {
	return linkifyStr(content, {
		formatHref: {
			mention: (href: string) => "/app/profile" + href,
		},
	})
}

export function findHashtags(content: string) {
	let newContent = content

    const hashtags = content.match(/(?<=#)[^\s]+/g)
    
	hashtags?.forEach((h: string) => {
		newContent = newContent.replace(`#${h}`, "")
    })

	return {
		newContent,
        hashtags: hashtags ? (hashtags as Array<string>) : undefined,
	}
}
