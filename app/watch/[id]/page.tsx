"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { CheckCircle, Crown, Heart, Lock, Play, Share2, ThumbsUp } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { VideoCard } from "@/components/video-card"
import { VideoPlayer } from "@/components/video-player"
import { mockVideos } from "@/lib/data"
import { canWatchVideo, getAccessStatus, getWatchBlockReason, type AccessStatus } from "@/lib/access"

export default function WatchPage({ params }: { params: { id: string } }) {
  const [isLoading, setIsLoading] = useState(true)
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [accessStatus, setAccessStatus] = useState<AccessStatus>({
    hasAccount: false,
    isPaid: false,
    isTrialActive: false,
    trialDaysLeft: 0,
  })

  const currentVideo = mockVideos.find((video) => video.id === params.id) || mockVideos[0]
  const recommendedVideos = useMemo(
    () =>
      mockVideos
        .filter((video) => video.id !== currentVideo.id)
        .filter((video) => video.categories.some((category) => currentVideo.categories.includes(category)))
        .slice(0, 6),
    [currentVideo],
  )

  useEffect(() => {
    setIsLoading(true)
    setIsLiked(false)
    setIsSaved(false)
    setAccessStatus(getAccessStatus())

    const timer = window.setTimeout(() => setIsLoading(false), 650)
    return () => window.clearTimeout(timer)
  }, [params.id])

  const canWatch = canWatchVideo(currentVideo, accessStatus)
  const blockReason = getWatchBlockReason(currentVideo, accessStatus)
  const paymentHref = !accessStatus.hasAccount
    ? `/sign-up?returnTo=${encodeURIComponent(`/watch/${currentVideo.id}`)}`
    : `/payment?reason=${accessStatus.isTrialActive ? "premium" : "trial-ended"}&returnTo=${encodeURIComponent(
        `/watch/${currentVideo.id}`,
      )}`

  const handleLike = () => {
    setIsLiked((prev) => {
      toast.success(prev ? "Like removed" : "Liked", {
        description: prev ? "This title was removed from liked videos." : "This helps tune your viewer recommendations.",
      })
      return !prev
    })
  }

  const handleSave = () => {
    setIsSaved((prev) => {
      toast.success(prev ? "Removed from My List" : "Saved to My List", {
        description: prev ? "You can add it again anytime." : "Find it quickly from your viewer list.",
      })
      return !prev
    })
  }

  const handleShare = async () => {
    const url = window.location.href
    try {
      await navigator.clipboard.writeText(url)
      toast.success("Link copied", { description: "Share this watch page with someone." })
    } catch {
      toast.info("Share this link", { description: url })
    }
  }

  return (
    <main className="min-h-screen bg-[#050505] pb-12 text-white">
      <section className="border-b border-white/10 bg-black">
        <div className="container py-4 sm:py-6">
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
            <div>
              <div className="relative aspect-video overflow-hidden rounded-lg border border-white/10 bg-zinc-950 shadow-2xl shadow-black/50">
                {isLoading ? (
                  <div className="flex h-full items-center justify-center">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-red-600 border-t-transparent" />
                  </div>
                ) : canWatch ? (
                  <VideoPlayer videoId={currentVideo.id} videoUrl={currentVideo.videoUrl} />
                ) : (
                  <div className="absolute inset-0">
                    <Image
                      src={currentVideo.thumbnail || "/placeholder.svg"}
                      alt={currentVideo.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/78 p-4 text-white backdrop-blur-sm">
                      <div className="max-w-md text-center">
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-red-600">
                          {currentVideo.access === "premium" ? <Crown className="h-7 w-7" /> : <Lock className="h-7 w-7" />}
                        </div>
                        <h2 className="text-2xl font-black">{blockReason?.title}</h2>
                        <p className="mt-3 text-sm leading-6 text-zinc-300">{blockReason?.message}</p>
                        <Button className="mt-5 bg-red-600 font-bold text-white hover:bg-red-500" asChild>
                          <Link href={paymentHref}>{blockReason?.action}</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <section className="mt-5">
                {isLoading ? (
                  <div className="space-y-3">
                    <Skeleton className="h-8 w-3/4 bg-white/10" />
                    <Skeleton className="h-4 w-1/3 bg-white/10" />
                    <Skeleton className="h-20 w-full bg-white/10" />
                  </div>
                ) : (
                  <>
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div className="min-w-0">
                        <div className="mb-3 flex flex-wrap items-center gap-2">
                          {currentVideo.access === "premium" && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-red-600 px-2.5 py-1 text-xs font-bold text-white">
                              <Crown className="h-3.5 w-3.5" />
                              Premium
                            </span>
                          )}
                          <span className="rounded-full border border-white/10 bg-white/[0.06] px-2.5 py-1 text-xs font-semibold text-zinc-300">
                            {currentVideo.rating}
                          </span>
                          <span className="rounded-full border border-white/10 bg-white/[0.06] px-2.5 py-1 text-xs font-semibold text-zinc-300">
                            {currentVideo.year}
                          </span>
                          {!accessStatus.isPaid && accessStatus.isTrialActive && (
                            <span className="rounded-full border border-teal-400/30 bg-teal-400/10 px-2.5 py-1 text-xs font-semibold text-teal-200">
                              {accessStatus.trialDaysLeft} trial day{accessStatus.trialDaysLeft === 1 ? "" : "s"} left
                            </span>
                          )}
                        </div>
                        <h1 className="text-3xl font-black leading-tight text-white sm:text-4xl">{currentVideo.title}</h1>
                        <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-zinc-400">
                          <span>{currentVideo.views.toLocaleString()} views</span>
                          <span>-</span>
                          <span>{currentVideo.duration}</span>
                          <span>-</span>
                          <span>{currentVideo.creator.name}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Button onClick={handleLike} variant={isLiked ? "default" : "secondary"} className="bg-white/10 text-white hover:bg-white/15">
                          <ThumbsUp className={`mr-2 h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
                          Like
                        </Button>
                        <Button onClick={handleShare} variant="secondary" className="bg-white/10 text-white hover:bg-white/15">
                          <Share2 className="mr-2 h-4 w-4" />
                          Share
                        </Button>
                        <Button onClick={handleSave} variant={isSaved ? "default" : "secondary"} className="bg-white/10 text-white hover:bg-white/15">
                          <Heart className={`mr-2 h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
                          {isSaved ? "Saved" : "Save"}
                        </Button>
                      </div>
                    </div>

                    <div className="mt-5 rounded-lg border border-white/10 bg-white/[0.04] p-4 sm:p-5">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                        <Image
                          src={currentVideo.creator.avatar || "/placeholder.svg"}
                          alt={currentVideo.creator.name}
                          width={52}
                          height={52}
                          className="h-[52px] w-[52px] rounded-full border border-white/10 object-cover"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h2 className="font-bold text-white">{currentVideo.creator.name}</h2>
                            {currentVideo.studio?.verified && <CheckCircle className="h-4 w-4 fill-blue-500 text-blue-500" />}
                          </div>
                          <p className="mt-1 text-sm text-zinc-400">
                            {currentVideo.creator.subscribers.toLocaleString()} subscribers - {currentVideo.studio?.type || "Studio"}
                          </p>
                        </div>
                        <Button className="bg-red-600 font-bold text-white hover:bg-red-500">Subscribe</Button>
                      </div>

                      <p className="mt-5 text-sm leading-7 text-zinc-300">{currentVideo.description}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {currentVideo.categories.map((category) => (
                          <Link
                            key={category}
                            href={`/categories/${category}`}
                            className="rounded-full border border-white/10 bg-black/35 px-3 py-1 text-xs font-semibold capitalize text-zinc-300 transition hover:border-red-500/60 hover:text-white"
                          >
                            {category}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </section>
            </div>

            <aside className="xl:sticky xl:top-24 xl:self-start">
              <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white">Up Next</h2>
                  <Play className="h-5 w-5 text-red-300" />
                </div>

                {isLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3, 4].map((id) => (
                      <div key={id} className="flex gap-3">
                        <Skeleton className="h-20 w-32 rounded-lg bg-white/10" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-4 w-full bg-white/10" />
                          <Skeleton className="h-3 w-2/3 bg-white/10" />
                          <Skeleton className="h-3 w-1/3 bg-white/10" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recommendedVideos.map((video) => (
                      <Link key={video.id} href={`/watch/${video.id}`} className="group grid grid-cols-[128px_1fr] gap-3">
                        <VideoCard video={video} showInfo={false} className="w-full" />
                        <div className="min-w-0">
                          <h3 className="line-clamp-2 text-sm font-bold text-white group-hover:text-red-200">{video.title}</h3>
                          <p className="mt-1 line-clamp-1 text-xs text-zinc-500">{video.creator.name}</p>
                          <div className="mt-1 flex flex-wrap items-center gap-1 text-xs text-zinc-500">
                            <span>{video.views.toLocaleString()} views</span>
                            <span>-</span>
                            <span>{video.duration}</span>
                          </div>
                          {video.access === "premium" && (
                            <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-red-600/20 px-2 py-0.5 text-[11px] font-bold text-red-200">
                              <Crown className="h-3 w-3" />
                              Premium
                            </span>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  )
}
