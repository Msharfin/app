<script lang="ts">
	import { goto } from "$app/navigation"
	import { likePayload, postPayload } from "$lib/stores"
	import type { User } from "@supabase/supabase-js"
	import { DateTime } from "luxon"

	export let post: any
	export let postsList: any
	export let user: User | null

	let hasJustLiked = false

	const dataTime = DateTime.fromISO(post.creation_date)
	$: hasLiked = post.likes.find((item: any) => item.user_id === user?.id)
		? true
		: false

	const hasInteracted = async () => {
		if (hasLiked) {
			const unregisterLike = await fetch("/app/api/like", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					id: post.id,
					action: "dislike",
				}),
			}).catch((error: any) => {
				alert(error.message)
			})
		} else {
			const registerLike = await fetch("/app/api/like", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					id: post.id,
					action: "like",
				}),
			}).catch((error: any) => {
				alert(error.message)
			})
		}
	}

	$: if ($postPayload) {
		if ($postPayload.eventType === "DELETE") {
			if (post.id === $postPayload.old.id && post.author === user?.id) {
				postsList.splice(
					postsList.indexOf(
						postsList.find(
							(p: any) => p.id === $postPayload.old.id,
						),
					),
					1,
				)
			}
			post = post
		}
		postPayload.set(null)
	}

    likePayload.subscribe((val: any) => {
        if (val) {
            if (val.eventType === "INSERT") {
                if (post.id === val.new.liked_id && !post.likes.find((item: any) => item.user_id === user?.id)) {
                    post.likes.push(val.new)
                    hasJustLiked = true
                }
            }
            // Don't set it to else
            else if (val.eventType === "DELETE") {
                if (
                    post.likes.find((item: any) => item.id === val.old.id)
                ) {
                    post.likes.splice(
                        post.likes.indexOf(
                            post.likes.find(
                                (item: any) => item.id === val.old.id,
                            ),
                        ),
                        1,
                    )
                }
            }
            post.likes = post.likes
            likePayload.set(null)     
        }
    })
</script>

<div class="flex w-full mb-5 last-of-type:mb-0 cursor-default" role="button" tabindex="0" on:keydown={(e) => e.key === "Enter" ? goto(`/app/post/${post.id}`): null } on:click={() => goto(`/app/post/${post.id}`)}>
	<div class="w-fit me-2.5">
        <button on:click|stopPropagation={() => goto(`/app/profile/${post.author_data.slug}`)}>
            <img
                src={post.author_data.avatar_url ? post.author_data.avatar_url: "/images/no_pfp.png"}
                class="rounded-full size-10"
                alt="Profile"
            />          
        </button>

		<div class="flex items-center justify-between text-lg mt-1">
			{#if post.author_data.is_verified}
				<span class="text-funBlue icon-[solar--verified-check-outline]"
				></span>
			{/if}
			{#if post.author_data.asterisk_user}
				<span
					class="text-funBlue icon-[solar--chat-round-money-bold-duotone]"
				></span>
			{/if}
		</div>
	</div>
	<div class="flex-1 flex flex-col">
		<!-- Post info -->

		<div class="flex justify-between items-start mb-2.5">
			<div class="flex flex-col leading-[1.125rem] text-[.95rem]">
				<span>{post.author_data.name}</span>
				<span class="font-bold text-funBlue"
					>{post.author_data.slug}</span
				>
			</div>
			<span class="text-turquoisieGray">{dataTime.toRelative()}</span>
		</div>

		<!-- Contents -->

		<p class="text-base">
			{post.content}
		</p>

        <!-- Media content -->

        {#if post.media}
            <div class="hoverEffect font-sans relative w-full h-max max-h-[24rem] flex pt-6 pb-4 select-none" title="Photo Album">
                {#if post.media.length === 3}
                    <!-- svelte-ignore a11y-missing-attribute -->
                    <img class="rounded-xl absolute rotate-3 brightness-0" src={post.media[2].mediaURL} />
                    <!-- svelte-ignore a11y-missing-attribute -->
                    <img class="rounded-xl absolute brightness-50" src={post.media[1].mediaURL} />
                    <!-- svelte-ignore a11y-missing-attribute -->
                    <img class="rounded-xl -rotate-3" src={post.media[0].mediaURL} />
                {:else if post.media.length === 2}
                    <!-- svelte-ignore a11y-missing-attribute -->
                    <img class="rounded-xl -rotate-3 absolute brightness-50" src={post.media[1].mediaURL} />
                    <!-- svelte-ignore a11y-missing-attribute -->
                    <img class="rounded-xl" src={post.media[0].mediaURL} />
                {:else}
                    <!-- svelte-ignore a11y-missing-attribute -->
                    <img class="rounded-xl" src={post.media[0].mediaURL} />
                {/if}
            </div>
        {/if}

		<!-- Interactions -->

		<div class="interactions mt-2 flex items-center justify-between w-2/3">
			<button 
                class="hoverEffect"
				class:hasLiked
				on:click|stopPropagation={async () => await hasInteracted()}
			>
				{#if hasLiked}
					<span class:likeAnimation={hasJustLiked} class="icon-[solar--heart-bold]"></span>
				{:else}
					<span class="icon-[solar--heart-outline]"></span>
				{/if}
				<span class="ms-1.5">{post.likes.length}</span>
			</button>
			<button class="hoverEffect">
				<span class="icon-[solar--chat-round-outline] me-1.5"></span>
				<span>{post.comments_count}</span>
			</button>
			<button class="hoverEffect">
				<span class="icon-[solar--crown-star-outline] me-1.5"></span>
				<span>{post.spreads}</span>
			</button>
			<button class="hoverEffect">
				<span class="icon-[solar--settings-minimalistic-outline]"
				></span>
			</button>
		</div>
	</div>
</div>

<style>
@keyframes likePop {
    0% {
        transform: scale(0.75);
    }
    50% {
        transform: scale(1.35) rotate(360deg);
    }
    100% {
        transform: scale(1) rotate(360deg);
    }
}

.likeAnimation {
        animation: likePop 500ms normal
}

.interactions {
    & button {
        @apply flex text-[1.125rem] items-center justify-center text-turquoisieGray tabular-nums;
        & span:not(:first-child) {
            @apply text-[0.95rem];
        }
    }
    & .hasLiked {
        @apply text-rose-600;
    }
}
</style>
