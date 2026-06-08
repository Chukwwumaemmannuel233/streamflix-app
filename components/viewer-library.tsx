"use client"

import Image from "next/image"
import Link from "next/link"
import type React from "react"
import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"
import { Crown, Film, Play, Search, Sparkles, Tv } from "lucide-react"

import { Button } from "@/components/ui/button"
import { VideoCard } from "@/components/video-card"
import type { VideoType } from "@/lib/types"
import { cn } from "@/lib/utils"

const fadeIn = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
}

interface ViewerShellProps {
  children: React.ReactNode
  className?: string
}

export function ViewerShell({ children, className }: ViewerShellProps) {
  return <main className={cn("min-h-screen bg-[#050505] pb-12 text-white", className)}>{children}</main>
}

interface LibraryHeroProps {
  title: string
  eyebrow: string
  description: string
  featured?: VideoType
  icon?: LucideIcon
  primaryHref?: string
  primaryLabel?: string
  stats?: string[]
}

export function LibraryHero({
  title,
  eyebrow,
  description,
  featured,
  icon: Icon = Sparkles,
  primaryHref,
  primaryLabel = "Start watching",
  stats = [],
}: LibraryHeroProps) {
  const image = featured?.thumbnail || "/placeholder.svg?height=720&width=1280&text=StreamFlix"

  return (
    <section className="relative overflow-hidden border-b border-white/10">
      <div className="absolute inset-0">
        <Image src={image} alt="" fill priority className="object-cover opacity-45" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_20%,rgba(255,255,255,0.18),transparent_24%),linear-gradient(90deg,#050505_0%,rgba(5,5,5,0.92)_36%,rgba(5,5,5,0.52)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#050505] to-transparent" />
      </div>

      <div className="container relative grid min-h-[360px] items-end gap-8 py-10 md:min-h-[430px] md:grid-cols-[1fr_340px] md:items-center md:py-14">
        <motion.div initial="initial" animate="animate" variants={fadeIn} transition={{ duration: 0.55 }} className="max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-200 backdrop-blur">
            <Icon className="h-3.5 w-3.5 text-red-300" />
            {eyebrow}
          </div>
          <h1 className="max-w-2xl text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">{title}</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-300 sm:text-lg">{description}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {primaryHref && (
              <Button className="h-11 bg-red-600 px-5 font-bold text-white hover:bg-red-500" asChild>
                <Link href={primaryHref}>
                  <Play className="mr-2 h-4 w-4 fill-current" />
                  {primaryLabel}
                </Link>
              </Button>
            )}
            {stats.map((stat) => (
              <span key={stat} className="rounded-full border border-white/10 bg-black/35 px-3 py-1 text-sm text-zinc-300">
                {stat}
              </span>
            ))}
          </div>
        </motion.div>

        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 28, rotateX: 8 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.65 }}
            className="hidden md:block"
          >
            <Link href={`/watch/${featured.id}`} className="group block">
              <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-white/15 bg-white/10 shadow-2xl shadow-black/40">
                <Image src={featured.thumbnail || "/placeholder.svg"} alt={featured.title} fill className="object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-zinc-200">
                    {featured.access === "premium" && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-red-600 px-2 py-1 text-white">
                        <Crown className="h-3 w-3" />
                        Premium
                      </span>
                    )}
                    <span>{featured.duration}</span>
                    <span>{featured.rating}</span>
                  </div>
                  <p className="line-clamp-1 text-lg font-bold text-white">{featured.title}</p>
                </div>
              </div>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  )
}

interface FilterChipsProps {
  items: string[]
  active: string
  onChange: (item: string) => void
}

export function FilterChips({ items, active, onChange }: FilterChipsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {items.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => onChange(item)}
          className={cn(
            "shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition",
            active === item
              ? "border-red-500 bg-red-600 text-white"
              : "border-white/10 bg-white/[0.06] text-zinc-300 hover:border-white/25 hover:bg-white/10",
          )}
        >
          {item}
        </button>
      ))}
    </div>
  )
}

interface VideoSectionProps {
  title: string
  description?: string
  videos: VideoType[]
  emptyText?: string
}

export function VideoSection({ title, description, videos, emptyText = "Nothing found here yet." }: VideoSectionProps) {
  return (
    <section className="container py-8">
      <div className="mb-5 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          {description && <p className="mt-1 text-sm text-zinc-400">{description}</p>}
        </div>
        <span className="text-sm text-zinc-500">{videos.length} titles</span>
      </div>

      {videos.length ? (
        <motion.div
          initial="initial"
          animate="animate"
          transition={{ staggerChildren: 0.06 }}
          className="grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
        >
          {videos.map((video) => (
            <motion.div key={video.id} variants={fadeIn} transition={{ duration: 0.35 }}>
              <VideoCard video={video} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-10 text-center text-zinc-400">{emptyText}</div>
      )}
    </section>
  )
}

export function EmptyState({ title, description, actionHref, actionLabel }: { title: string; description: string; actionHref?: string; actionLabel?: string }) {
  return (
    <div className="container py-16">
      <div className="mx-auto flex max-w-xl flex-col items-center rounded-lg border border-white/10 bg-white/[0.04] p-10 text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-red-300">
          <Search className="h-7 w-7" />
        </div>
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-zinc-400">{description}</p>
        {actionHref && actionLabel && (
          <Button className="mt-6 bg-red-600 text-white hover:bg-red-500" asChild>
            <Link href={actionHref}>{actionLabel}</Link>
          </Button>
        )}
      </div>
    </div>
  )
}

export const libraryIcons = {
  movies: Film,
  tv: Tv,
  search: Search,
  sparkles: Sparkles,
}
