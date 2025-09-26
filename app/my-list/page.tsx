"use client"

import { useState, useEffect } from "react"
import { BookmarkX } from "lucide-react"

import { Button } from "@/components/ui/button"
import { VideoCard } from "@/components/video-card"
import { mockVideos } from "@/lib/data"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"

export default function MyListPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [savedVideos, setSavedVideos] = useState([])

  useEffect(() => {
    // Simulate API call to get saved videos
    const timer = setTimeout(() => {
      // For demo purposes, just show a few random videos
      const randomVideos = mockVideos.sort(() => 0.5 - Math.random()).slice(0, 3)

      setSavedVideos(randomVideos)
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-background pb-10">
      <div className="container py-6">
        <h1 className="mb-6 text-3xl font-bold">My List</h1>

        {isLoading ? (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {[1, 2, 3, 4, 5].map((id) => (
              <div key={id} className="space-y-2">
                <Skeleton className="aspect-video w-full rounded-lg" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-3 w-2/3" />
              </div>
            ))}
          </div>
        ) : savedVideos.length > 0 ? (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {savedVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        ) : (
          <div className="flex h-[50vh] flex-col items-center justify-center text-center">
            <BookmarkX className="h-16 w-16 text-muted-foreground" />
            <h2 className="mt-4 text-2xl font-semibold">Your list is empty</h2>
            <p className="mt-2 text-muted-foreground">Save videos to watch them later.</p>
            <Button className="mt-4" asChild>
              <Link href="/">Browse Videos</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
