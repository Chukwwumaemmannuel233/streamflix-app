"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { BookmarkX, Crown, Grid2X2, Heart, Play, Search, SlidersHorizontal, Trash2, type LucideIcon } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { VideoCard } from "@/components/video-card"
import { mockVideos } from "@/lib/data"
import type { VideoType } from "@/lib/types"

const savedSeed = [mockVideos[0], mockVideos[2], mockVideos[4], mockVideos[5], mockVideos[7], mockVideos[9]].filter(Boolean)

export default function MyListPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [savedVideos, setSavedVideos] = useState<VideoType[]>([])
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState<"all" | "premium" | "standard">("all")

  useEffect(() => {
    const timer = setTimeout(() => {
      setSavedVideos(savedSeed)
      setIsLoading(false)
    }, 700)

    return () => clearTimeout(timer)
  }, [])

  const filteredVideos = useMemo(() => {
    return savedVideos.filter((video) => {
      const matchesQuery = video.title.toLowerCase().includes(query.toLowerCase())
      const matchesFilter =
        filter === "all" ||
        (filter === "premium" && video.access === "premium") ||
        (filter === "standard" && video.access !== "premium")

      return matchesQuery && matchesFilter
    })
  }, [savedVideos, query, filter])

  const removeVideo = (videoId: string) => {
    const removedVideo = savedVideos.find((video) => video.id === videoId)
    setSavedVideos((videos) => videos.filter((video) => video.id !== videoId))

    if (removedVideo) {
      toast("Removed from My List", {
        description: `${removedVideo.title} was removed from your saved titles.`,
        action: {
          label: "Undo",
          onClick: () => setSavedVideos((videos) => [removedVideo, ...videos]),
        },
      })
    }
  }

  return (
    <div className="min-h-screen bg-[#050505] pb-12 text-white">
      <div className="container mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <section className="relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.045] p-5 shadow-[0_30px_100px_rgba(0,0,0,0.45)] sm:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(239,68,68,0.17),transparent_30%),radial-gradient(circle_at_85%_12%,rgba(20,184,166,0.13),transparent_28%)]" />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-xs font-semibold text-zinc-300">
                <Heart className="h-3.5 w-3.5 fill-red-400 text-red-400" />
                Saved for later
              </div>
              <h1 className="text-4xl font-black leading-tight sm:text-6xl">My List</h1>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base">
                Keep your next watch close. Filter premium picks, standard trial titles, and anything you saved from the library.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:min-w-[420px]">
              <Stat label="Saved titles" value={savedVideos.length.toString()} icon={Grid2X2} />
              <Stat label="Premium" value={savedVideos.filter((video) => video.access === "premium").length.toString()} icon={Crown} />
              <Stat label="Ready now" value={savedVideos.filter((video) => video.access !== "premium").length.toString()} icon={Play} />
            </div>
          </div>
        </section>

        <div className="mt-6 flex flex-col gap-3 rounded-lg border border-white/10 bg-white/[0.045] p-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search your list..."
              className="h-11 border-white/10 bg-black/25 pl-9 text-white placeholder:text-zinc-500 focus-visible:ring-red-500"
            />
          </div>

          <div className="grid grid-cols-3 gap-2 sm:w-auto">
            {[
              { id: "all", label: "All" },
              { id: "premium", label: "Premium" },
              { id: "standard", label: "Standard" },
            ].map((item) => (
              <Button
                key={item.id}
                type="button"
                variant="ghost"
                onClick={() => setFilter(item.id as typeof filter)}
                className={`h-11 rounded-md px-3 font-bold ${
                  filter === item.id ? "bg-white text-black hover:bg-zinc-200" : "text-zinc-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="mt-6">
          {isLoading ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {[1, 2, 3, 4, 5, 6].map((id) => (
                <div key={id} className="space-y-3">
                  <Skeleton className="aspect-video w-full rounded-lg bg-white/10" />
                  <Skeleton className="h-4 w-full bg-white/10" />
                  <Skeleton className="h-3 w-2/3 bg-white/10" />
                </div>
              ))}
            </div>
          ) : filteredVideos.length > 0 ? (
            <motion.div
              className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35 }}
            >
              {filteredVideos.map((video) => (
                <div key={video.id} className="group relative">
                  <VideoCard video={video} />
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    onClick={() => removeVideo(video.id)}
                    className="absolute right-2 top-2 h-8 w-8 rounded-full bg-black/60 text-white opacity-0 backdrop-blur transition hover:bg-red-600 group-hover:opacity-100"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Remove {video.title}</span>
                  </Button>
                </div>
              ))}
            </motion.div>
          ) : (
            <div className="flex min-h-[45vh] flex-col items-center justify-center rounded-lg border border-dashed border-white/15 bg-white/[0.035] p-6 text-center">
              <BookmarkX className="h-16 w-16 text-zinc-600" />
              <h2 className="mt-4 text-2xl font-black">Nothing saved here</h2>
              <p className="mt-2 max-w-md text-sm leading-6 text-zinc-400">
                Try another filter or browse the library to add titles to your list.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Button className="bg-red-600 hover:bg-red-500" asChild>
                  <Link href="/home">
                    <Play className="h-4 w-4" />
                    Browse Home
                  </Link>
                </Button>
                <Button variant="outline" className="border-white/15 bg-transparent text-white hover:bg-white/10 hover:text-white" asChild>
                  <Link href="/categories">
                    <SlidersHorizontal className="h-4 w-4" />
                    Explore Categories
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function Stat({ label, value, icon: Icon }: { label: string; value: string; icon: LucideIcon }) {
  return (
    <div className="rounded-lg border border-white/10 bg-black/25 p-4">
      <Icon className="h-5 w-5 text-teal-300" />
      <div className="mt-3 text-2xl font-black">{value}</div>
      <div className="text-xs text-zinc-500">{label}</div>
    </div>
  )
}
