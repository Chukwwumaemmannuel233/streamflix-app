"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Heart, Share2, ThumbsUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { VideoPlayer } from "@/components/video-player"
import { VideoCard } from "@/components/video-card"
import { mockVideos, mockComments } from "@/lib/data"
import { CommentSection } from "@/components/comment-section"
import { Skeleton } from "@/components/ui/skeleton"

export default function WatchPage({ params }: { params: { id: string } }) {
  const [isLoading, setIsLoading] = useState(true)
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  // Find the current video
  const currentVideo = mockVideos.find((video) => video.id === params.id) || mockVideos[0]

  // Get recommended videos (excluding current video)
  const recommendedVideos = mockVideos
    .filter((video) => video.id !== params.id)
    .filter((video) => video.categories.some((category) => currentVideo.categories.includes(category)))
    .slice(0, 5)

  useEffect(() => {
    // Reset states when video changes
    setIsLoading(true)
    setIsLiked(false)
    setIsSaved(false)

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [params.id])

  return (
    <div className="min-h-screen bg-background pb-10">
      <div className="container py-6">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
              {isLoading ? (
                <div className="flex h-full items-center justify-center">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                </div>
              ) : (
                <VideoPlayer videoId={currentVideo.id} videoUrl={currentVideo.videoUrl} />
              )}
            </div>

            <div className="mt-4">
              {isLoading ? (
                <div className="space-y-3">
                  <Skeleton className="h-8 w-3/4" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
              ) : (
                <>
                  <h1 className="text-2xl font-bold">{currentVideo.title}</h1>

                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{currentVideo.views.toLocaleString()} views</span>
                      <span>•</span>
                      <span>2 weeks ago</span>
                    </div>

                    <div className="flex gap-2">
                      <Button variant={isLiked ? "default" : "ghost"} size="sm" onClick={() => setIsLiked(!isLiked)}>
                        <ThumbsUp className={`mr-2 h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
                        Like
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share2 className="mr-2 h-4 w-4" />
                        Share
                      </Button>
                      <Button variant={isSaved ? "default" : "ghost"} size="sm" onClick={() => setIsSaved(!isSaved)}>
                        <Heart className={`mr-2 h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
                        {isSaved ? "Saved" : "Save"}
                      </Button>
                    </div>
                  </div>
                </>
              )}

              <div className="mt-4 rounded-lg bg-muted p-4">
                {isLoading ? (
                  <div className="flex gap-3">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-4 w-1/3" />
                      <Skeleton className="h-3 w-1/4" />
                    </div>
                    <Skeleton className="h-9 w-24" />
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-3">
                      <Image
                        src={currentVideo.creator.avatar || "/placeholder.svg"}
                        alt={currentVideo.creator.name}
                        width={48}
                        height={48}
                        className="rounded-full"
                      />
                      <div>
                        <h3 className="font-medium">{currentVideo.creator.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {currentVideo.creator.subscribers.toLocaleString()} subscribers
                        </p>
                      </div>
                      <Button className="ml-auto">Subscribe</Button>
                    </div>

                    <div className="mt-4">
                      <p>{currentVideo.description}</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            <CommentSection isLoading={isLoading} comments={mockComments} />
          </div>

          <div>
            <h2 className="mb-4 text-xl font-semibold">Up Next</h2>
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((id) => (
                  <div key={id} className="flex gap-3">
                    <Skeleton className="h-24 w-40 rounded-lg" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-3 w-2/3" />
                      <Skeleton className="h-3 w-1/3" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {recommendedVideos.map((video) => (
                  <div key={video.id} className="flex gap-3">
                    <VideoCard video={video} showInfo={false} className="w-40 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium line-clamp-2">{video.title}</h3>
                      <p className="text-sm text-muted-foreground">{video.creator.name}</p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <span>{video.views.toLocaleString()} views</span>
                        <span>•</span>
                        <span>3 weeks ago</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
