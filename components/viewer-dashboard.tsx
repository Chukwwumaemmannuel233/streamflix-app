"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowRight,
  BadgeCheck,
  Clock3,
  Crown,
  Download,
  Flame,
  Heart,
  Play,
  Plus,
  Sparkles,
  Star,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { CategorySlider } from "@/components/category-slider"
import { PageLoading } from "@/components/page-loading"
import { mockVideos, categories } from "@/lib/data"
import { getAccessStatus, type AccessStatus } from "@/lib/access"
import type { VideoType } from "@/lib/types"

const fadeIn = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55 },
}

const progressValues = [68, 35, 82, 18]
const matchScores = [97, 93, 88, 86, 82, 79]

export function ViewerDashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [accessStatus, setAccessStatus] = useState<AccessStatus>({
    hasAccount: false,
    isPaid: false,
    isTrialActive: false,
    trialDaysLeft: 0,
  })

  useEffect(() => {
    setAccessStatus(getAccessStatus())
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  const featuredVideo = mockVideos[0]
  const continueWatching = mockVideos.slice(1, 5)
  const premiumPicks = mockVideos.filter((video) => video.access === "premium").slice(0, 6)
  const standardPicks = mockVideos.filter((video) => video.access !== "premium").slice(0, 6)
  const trendingVideos = mockVideos.slice(0, 8)

  const videosByCategory = useMemo(
    () =>
      categories
        .map((category) => ({
          ...category,
          videos: mockVideos.filter((video) => video.categories.includes(category.id)).slice(0, 8),
        }))
        .filter((category) => category.videos.length > 0)
        .slice(0, 5),
    [],
  )

  if (isLoading) {
    return <PageLoading title="Preparing your dashboard..." />
  }

  return (
    <div className="min-h-screen overflow-hidden bg-[#050505] pb-12 text-white">
      <DashboardHero video={featuredVideo} accessStatus={accessStatus} />

      <main className="container mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <TrialStatus accessStatus={accessStatus} />

        <motion.div {...fadeIn} className="mb-8">
          <CategorySlider />
        </motion.div>

        <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <ContinueWatching videos={continueWatching} />
          <DashboardPanel accessStatus={accessStatus} />
        </section>

        <ContentRail
          eyebrow="Trending"
          title="Everyone is watching"
          icon={Flame}
          videos={trendingVideos}
          accessStatus={accessStatus}
          variant="poster"
        />

        <ContentRail
          eyebrow="Premium"
          title="Unlock-worthy premieres"
          icon={Crown}
          videos={premiumPicks}
          accessStatus={accessStatus}
          variant="wide"
        />

        <ContentRail
          eyebrow="Included"
          title="Available in your trial"
          icon={BadgeCheck}
          videos={standardPicks}
          accessStatus={accessStatus}
          variant="wide"
        />

        {videosByCategory.map((category) => (
          <ContentRail
            key={category.id}
            eyebrow={category.name}
            title={`More in ${category.name}`}
            icon={Sparkles}
            videos={category.videos}
            accessStatus={accessStatus}
            href={`/categories/${category.id}`}
            variant="wide"
          />
        ))}
      </main>
    </div>
  )
}

function DashboardHero({ video, accessStatus }: { video: VideoType; accessStatus: AccessStatus }) {
  const href = getVideoHref(video, accessStatus)

  return (
    <section className="relative min-h-[560px] overflow-hidden sm:min-h-[640px]">
      <Image src={video.thumbnail || "/placeholder.svg"} alt={video.title} fill priority className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-black/35" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/65 to-transparent" />

      <div className="container relative z-10 mx-auto flex min-h-[560px] max-w-7xl items-end px-4 pb-10 pt-24 sm:min-h-[640px] sm:px-6 lg:px-8">
        <motion.div {...fadeIn} className="max-w-3xl">
          <div className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-white/10 bg-white/[0.08] px-3 py-2 text-xs text-zinc-200 backdrop-blur sm:px-4 sm:text-sm">
            <Sparkles className="h-4 w-4 text-teal-300" />
            <span className="truncate">Tonight's featured premiere</span>
          </div>
          <h1 className="text-4xl font-black leading-[0.98] sm:text-6xl lg:text-7xl">{video.title}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-zinc-300">
            <span>{video.year}</span>
            <span>-</span>
            <span>{video.duration}</span>
            <span>-</span>
            <span>{video.rating}</span>
            {video.access === "premium" && (
              <span className="inline-flex items-center gap-1 rounded-full bg-red-600 px-2.5 py-1 text-xs font-bold text-white">
                <Crown className="h-3 w-3" />
                Premium
              </span>
            )}
          </div>
          <p className="mt-5 max-w-2xl text-sm leading-6 text-zinc-300 sm:text-base sm:leading-7">{video.description}</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button className="h-12 w-full bg-white text-base font-bold text-black hover:bg-zinc-200 sm:w-auto" asChild>
              <Link href={href}>
                <Play className="h-5 w-5 fill-current" />
                {video.access === "premium" && !accessStatus.isPaid ? "Unlock to watch" : "Play now"}
              </Link>
            </Button>
            <Button
              variant="outline"
              className="h-12 w-full border-white/20 bg-white/[0.08] text-base font-bold text-white hover:bg-white/14 hover:text-white sm:w-auto"
            >
              <Plus className="h-5 w-5" />
              My List
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function TrialStatus({ accessStatus }: { accessStatus: AccessStatus }) {
  if (accessStatus.isPaid) {
    return (
      <motion.div {...fadeIn} className="mb-6 rounded-lg border border-teal-400/20 bg-teal-400/[0.06] p-4">
        <div className="flex items-center gap-3">
          <BadgeCheck className="h-5 w-5 text-teal-300" />
          <p className="text-sm text-zinc-200">Premium is active. All titles are unlocked on this dashboard.</p>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      {...fadeIn}
      className="mb-6 flex flex-col gap-4 rounded-lg border border-white/10 bg-white/[0.045] p-4 shadow-2xl backdrop-blur sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-red-600">
          <Crown className="h-5 w-5" />
        </div>
        <div>
          <h2 className="font-bold">
            {accessStatus.isTrialActive
              ? `${accessStatus.trialDaysLeft} free trial day${accessStatus.trialDaysLeft === 1 ? "" : "s"} left`
              : "Your trial needs a plan"}
          </h2>
          <p className="mt-1 text-sm leading-6 text-zinc-400">
            Standard titles stay open during the 7-day trial. Premium titles unlock whenever you choose a plan.
          </p>
        </div>
      </div>
      <Button className="w-full bg-red-600 font-bold hover:bg-red-500 sm:w-auto" asChild>
        <Link href="/payment">View plans</Link>
      </Button>
    </motion.div>
  )
}

function ContinueWatching({ videos }: { videos: VideoType[] }) {
  return (
    <motion.section {...fadeIn} className="rounded-lg border border-white/10 bg-white/[0.045] p-4 shadow-2xl backdrop-blur">
      <SectionHeader eyebrow="Resume" title="Continue watching" icon={Clock3} />
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {videos.map((video, index) => (
          <Link
            key={video.id}
            href={`/watch/${video.id}`}
            className="group grid grid-cols-[112px_1fr] gap-3 rounded-lg border border-white/10 bg-black/25 p-2 transition hover:bg-white/[0.07]"
          >
            <div className="relative aspect-video overflow-hidden rounded-md">
              <Image src={video.thumbnail || "/placeholder.svg"} alt={video.title} fill className="object-cover" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition group-hover:opacity-100">
                <Play className="h-6 w-6 fill-white text-white" />
              </div>
            </div>
            <div className="min-w-0">
              <h3 className="line-clamp-1 text-sm font-bold">{video.title}</h3>
              <p className="mt-1 text-xs text-zinc-500">{video.duration} left</p>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-red-600" style={{ width: `${progressValues[index]}%` }} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </motion.section>
  )
}

function DashboardPanel({ accessStatus }: { accessStatus: AccessStatus }) {
  const panelStats = [
    { label: "Saved", value: "18", icon: Heart },
    { label: "Downloads", value: "6", icon: Download },
    { label: "Match", value: "97%", icon: Star },
  ]

  return (
    <motion.aside {...fadeIn} className="rounded-lg border border-white/10 bg-white/[0.045] p-4 shadow-2xl backdrop-blur">
      <SectionHeader eyebrow="Profile" title="Your watch hub" icon={Sparkles} />
      <div className="mt-5 grid grid-cols-3 gap-2">
        {panelStats.map((stat) => (
          <div key={stat.label} className="rounded-lg border border-white/10 bg-black/25 p-3">
            <stat.icon className="h-4 w-4 text-teal-300" />
            <div className="mt-3 text-xl font-black">{stat.value}</div>
            <div className="text-xs text-zinc-500">{stat.label}</div>
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-lg border border-white/10 bg-black/25 p-4">
        <p className="text-sm font-bold">Next best action</p>
        <p className="mt-2 text-sm leading-6 text-zinc-400">
          {accessStatus.isPaid
            ? "Explore premium premieres and keep building your list."
            : "Use the trial for standard titles, then upgrade when a premium premiere catches your eye."}
        </p>
        <Button className="mt-4 w-full bg-white font-bold text-black hover:bg-zinc-200" asChild>
          <Link href={accessStatus.isPaid ? "/my-list" : "/payment"}>
            {accessStatus.isPaid ? "Open My List" : "See plan options"}
          </Link>
        </Button>
      </div>
    </motion.aside>
  )
}

function ContentRail({
  eyebrow,
  title,
  icon: Icon,
  videos,
  accessStatus,
  href,
  variant,
}: {
  eyebrow: string
  title: string
  icon: typeof Sparkles
  videos: VideoType[]
  accessStatus: AccessStatus
  href?: string
  variant: "wide" | "poster"
}) {
  return (
    <motion.section {...fadeIn} className="mt-10">
      <div className="mb-4 flex items-end justify-between gap-4">
        <SectionHeader eyebrow={eyebrow} title={title} icon={Icon} />
        {href && (
          <Button variant="ghost" className="hidden text-zinc-300 hover:bg-white/10 hover:text-white sm:inline-flex" asChild>
            <Link href={href}>
              See all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        )}
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {videos.map((video, index) => (
          <DashboardVideoTile
            key={video.id}
            video={video}
            index={index}
            accessStatus={accessStatus}
            variant={variant}
          />
        ))}
      </div>
    </motion.section>
  )
}

function DashboardVideoTile({
  video,
  index,
  accessStatus,
  variant,
}: {
  video: VideoType
  index: number
  accessStatus: AccessStatus
  variant: "wide" | "poster"
}) {
  const href = getVideoHref(video, accessStatus)

  return (
    <Link
      href={href}
      className={variant === "poster" ? "group w-[150px] shrink-0 sm:w-[190px]" : "group w-[230px] shrink-0 sm:w-[280px]"}
    >
      <div
        className={
          variant === "poster"
            ? "relative aspect-[2/3] overflow-hidden rounded-lg border border-white/10 bg-zinc-900"
            : "relative aspect-video overflow-hidden rounded-lg border border-white/10 bg-zinc-900"
        }
      >
        <Image src={video.thumbnail || "/placeholder.svg"} alt={video.title} fill className="object-cover transition duration-500 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center bg-black/25 opacity-0 transition group-hover:opacity-100">
          <Play className="h-9 w-9 fill-white text-white" />
        </div>
        {variant === "poster" && (
          <div className="absolute left-2 top-2 rounded-md bg-white px-2 py-1 text-xs font-black text-black">#{index + 1}</div>
        )}
        {video.access === "premium" && (
          <div className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-md bg-red-600 px-2 py-1 text-[10px] font-bold uppercase text-white">
            <Crown className="h-3 w-3" />
            Premium
          </div>
        )}
        <div className="absolute bottom-2 left-2 right-2">
          <div className="line-clamp-1 text-sm font-bold text-white">{video.title}</div>
          <div className="mt-1 text-xs text-zinc-300">
            {matchScores[index % matchScores.length]}% match - {video.year}
          </div>
        </div>
      </div>
    </Link>
  )
}

function SectionHeader({ eyebrow, title, icon: Icon }: { eyebrow: string; title: string; icon: typeof Sparkles }) {
  return (
    <div>
      <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-red-300">
        <Icon className="h-4 w-4" />
        {eyebrow}
      </p>
      <h2 className="mt-1 text-xl font-black text-white sm:text-2xl">{title}</h2>
    </div>
  )
}

function getVideoHref(video: VideoType, accessStatus: AccessStatus) {
  if (video.access === "premium" && !accessStatus.isPaid) {
    return `/payment?reason=premium&returnTo=${encodeURIComponent(`/watch/${video.id}`)}`
  }

  return `/watch/${video.id}`
}
