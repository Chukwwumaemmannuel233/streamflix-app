"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Building2,
  Check,
  Clapperboard,
  Download,
  Film,
  Monitor,
  Play,
  Shield,
  Smartphone,
  Sparkles,
  Star,
  Tv,
  Users,
  Zap,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { VideoModal } from "@/components/video-modal"
import { mockVideos } from "@/lib/data"
import type { VideoType } from "@/lib/types"

const fadeInUp = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, ease: "easeOut" },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.09,
    },
  },
}

const heroStats = [
  { value: "12K+", label: "titles ready" },
  { value: "4K", label: "ultra HD" },
  { value: "5", label: "profiles" },
]

const creatorFeatures = [
  "Publish premium films, series, and shorts",
  "Track audience, revenue, and retention",
  "Reach viewers across every screen",
]

const viewerFeatures = [
  "Personal picks for every profile",
  "Downloads for travel and low data moments",
  "Watchlists, trailers, and instant resume",
]

const featureCards = [
  {
    icon: Zap,
    title: "Instant Playback",
    text: "Fast starts, smooth previews, and a player built for binge nights.",
  },
  {
    icon: Shield,
    title: "Protected Profiles",
    text: "Separate spaces, parental controls, and safer viewing for families.",
  },
  {
    icon: Download,
    title: "Offline Mode",
    text: "Download favorites before flights, commutes, and unstable networks.",
  },
  {
    icon: BarChart3,
    title: "Studio Analytics",
    text: "Creators can measure performance from launch day to long tail.",
  },
]

const devices = [
  { icon: Tv, label: "TV", detail: "Living room ready" },
  { icon: Monitor, label: "Web", detail: "Browser playback" },
  { icon: Smartphone, label: "Mobile", detail: "iOS and Android" },
]

const posterAngles = [
  "-rotate-6 translate-y-8",
  "rotate-3 -translate-y-4",
  "-rotate-2 translate-y-2",
  "rotate-6 -translate-y-8",
  "-rotate-3 translate-y-10",
  "rotate-2 -translate-y-2",
]

export function LandingExperience() {
  const [selectedVideo, setSelectedVideo] = useState<VideoType | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const heroLift = useTransform(scrollYProgress, [0, 0.45], [0, -80])
  const heroFade = useTransform(scrollYProgress, [0, 0.35], [1, 0.45])
  const trendingMovies = mockVideos.slice(0, 8)
  const heroMovies = mockVideos.slice(0, 6)

  const openVideo = (video: VideoType) => {
    setSelectedVideo(video)
    setIsModalOpen(true)
  }

  const closeVideo = () => {
    setSelectedVideo(null)
    setIsModalOpen(false)
  }

  return (
    <div className="min-h-screen overflow-hidden bg-[#050505] text-white">
      <section className="relative overflow-hidden px-4 pb-14 pt-24 sm:px-6 sm:pb-16 sm:pt-28 lg:min-h-[calc(100vh-1px)] lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(239,68,68,0.28),transparent_32%),radial-gradient(circle_at_78%_24%,rgba(20,184,166,0.18),transparent_30%),linear-gradient(180deg,#050505_0%,#0b0b10_58%,#050505_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#050505] to-transparent" />
        <motion.div
          aria-hidden="true"
          className="absolute left-1/2 top-24 hidden h-[620px] w-[920px] -translate-x-1/2 rounded-full border border-white/10 lg:block"
          style={{ y: heroLift, opacity: heroFade, transformStyle: "preserve-3d" }}
          animate={{ rotateX: [58, 64, 58], rotateZ: [0, 8, 0] }}
          transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />

        <div className="container relative z-10 mx-auto grid max-w-7xl items-center gap-10 lg:min-h-[calc(100vh-11rem)] lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
          <motion.div variants={staggerContainer} initial="initial" animate="animate" className="max-w-3xl">
            <motion.div
              variants={fadeInUp}
              className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-white/15 bg-white/8 px-3 py-2 text-xs text-zinc-200 shadow-2xl backdrop-blur-md sm:mb-6 sm:px-4 sm:text-sm"
            >
              <Sparkles className="h-4 w-4 text-teal-300" />
              <span className="truncate">Cinematic streaming for viewers and studios</span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="max-w-4xl text-4xl font-black leading-[0.98] tracking-normal text-white sm:text-5xl md:text-6xl lg:text-7xl"
            >
              StreamFlix brings the cinema home.
            </motion.h1>

            <motion.p variants={fadeInUp} className="mt-5 max-w-2xl text-sm leading-6 text-zinc-300 sm:mt-6 sm:text-lg sm:leading-7">
              Discover premium movies, studio originals, and creator-led series in one immersive platform built for
              fast watching, beautiful previews, and effortless publishing.
            </motion.p>

            <motion.div variants={fadeInUp} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                className="h-12 w-full bg-red-600 px-6 text-base font-semibold text-white shadow-[0_18px_60px_rgba(220,38,38,0.32)] hover:bg-red-500 sm:w-auto"
                asChild
              >
                <Link href="/sign-up?type=viewer">
                  <Play className="h-5 w-5 fill-current" />
                  Start watching
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 w-full border-white/20 bg-white/8 px-6 text-base font-semibold text-white backdrop-blur-md hover:bg-white/14 hover:text-white sm:w-auto"
                asChild
              >
                <Link href="/studio/studio-signup">
                  <Building2 className="h-5 w-5" />
                  Launch a studio
                </Link>
              </Button>
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-8 grid max-w-xl grid-cols-3 gap-2 sm:gap-3">
              {heroStats.map((stat) => (
                <div key={stat.label} className="border-l border-white/15 pl-3 sm:pl-4">
                  <div className="text-xl font-black text-white sm:text-2xl">{stat.value}</div>
                  <div className="mt-1 text-[10px] uppercase tracking-[0.14em] text-zinc-500 sm:text-xs sm:tracking-[0.2em]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="relative mx-auto h-[370px] w-full max-w-[640px] sm:h-[470px]"
            style={{ perspective: "1400px" }}
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          >
            <motion.div
              className="absolute inset-x-1 top-0 h-[290px] rounded-2xl border border-white/15 bg-zinc-950/70 p-2 shadow-[0_40px_120px_rgba(0,0,0,0.65)] backdrop-blur-xl sm:inset-x-10 sm:h-[390px] sm:rounded-[2rem] sm:p-4"
              style={{ transformStyle: "preserve-3d" }}
              animate={{ rotateY: [-8, 7, -8], rotateX: [7, 2, 7] }}
              transition={{ duration: 9, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
              <div className="relative h-full overflow-hidden rounded-xl bg-zinc-900 sm:rounded-[1.4rem]">
                <img
                  src={mockVideos[0]?.thumbnail || "/placeholder.jpg"}
                  alt={mockVideos[0]?.title || "Featured StreamFlix title"}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5">
                  <div className="mb-2 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-teal-200 sm:mb-3 sm:text-xs sm:tracking-[0.2em]">
                    <BadgeCheck className="h-4 w-4" />
                    Featured premiere
                  </div>
                  <h2 className="line-clamp-2 text-xl font-black text-white sm:text-3xl">{mockVideos[0]?.title}</h2>
                  <div className="mt-4 flex items-center gap-3">
                    <Button size="sm" className="bg-white text-black hover:bg-zinc-200" onClick={() => openVideo(mockVideos[0])}>
                      <Play className="h-4 w-4 fill-current" />
                      Preview
                    </Button>
                    <span className="text-sm text-zinc-300">{mockVideos[0]?.duration}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="absolute bottom-2 left-0 right-0 grid grid-cols-3 gap-2 sm:bottom-4 sm:grid-cols-6 sm:gap-3">
              {heroMovies.map((movie, index) => (
                <motion.button
                  key={movie.id}
                  type="button"
                  className={`group relative aspect-[2/3] overflow-hidden rounded-xl border border-white/15 bg-zinc-900 shadow-2xl ${posterAngles[index]}`}
                  style={{ transformStyle: "preserve-3d" }}
                  animate={{ y: [0, index % 2 === 0 ? -14 : 14, 0], rotateY: [0, index % 2 === 0 ? 10 : -10, 0] }}
                  transition={{
                    duration: 5 + index * 0.45,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  whileHover={{ y: -18, scale: 1.06, rotateY: 0, zIndex: 20 }}
                  onClick={() => openVideo(movie)}
                  aria-label={`Preview ${movie.title}`}
                >
                  <img src={movie.thumbnail || "/placeholder.jpg"} alt="" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/25" />
                  <Play className="absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 fill-white text-white opacity-0 transition-opacity group-hover:opacity-100" />
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative bg-[#050505] px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-300 sm:text-sm sm:tracking-[0.22em]">
                Trending now
              </p>
              <h2 className="mt-2 text-2xl font-black text-white sm:text-4xl">Tap into tonight's lineup</h2>
            </div>
            <Button variant="ghost" className="w-fit text-zinc-300 hover:bg-white/10 hover:text-white" asChild>
              <Link href="/home">
                Browse library
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <motion.div
            className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
          >
            {trendingMovies.map((movie, index) => (
              <motion.button
                key={movie.id}
                type="button"
                variants={fadeInUp}
                whileHover={{ y: -8 }}
                onClick={() => openVideo(movie)}
                className="group overflow-hidden rounded-lg border border-white/10 bg-zinc-900/80 text-left shadow-2xl"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={movie.thumbnail || "/placeholder.svg?height=420&width=300&text=Movie"}
                    alt={movie.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
                  <div className="absolute left-2 top-2 rounded-md bg-white px-2 py-1 text-[10px] font-black text-black sm:left-3 sm:top-3 sm:text-xs">
                    #{index + 1}
                  </div>
                  <div className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3">
                    <h3 className="line-clamp-1 text-sm font-bold text-white sm:text-base">{movie.title}</h3>
                    <p className="mt-1 line-clamp-1 text-[11px] text-zinc-300 sm:text-xs">
                      {movie.year} - {movie.duration} - {movie.rating}
                    </p>
                  </div>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="bg-[#0a0a0f] px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="container mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          <AudiencePanel
            icon={Users}
            label="For viewers"
            title="A personal theater for every profile."
            text="Build watchlists, jump back into previews, download episodes, and keep every viewer's taste separate."
            features={viewerFeatures}
            href="/sign-up?type=viewer"
            action="Create viewer account"
            accent="teal"
          />
          <AudiencePanel
            icon={Clapperboard}
            label="For studios"
            title="A polished home for creators and catalogs."
            text="Upload premieres, manage your studio presence, and understand how each release performs."
            features={creatorFeatures}
            href="/studio/studio-signup"
            action="Apply as studio"
            accent="red"
          />
        </div>
      </section>

      <section className="relative bg-[#050505] px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-12 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-300 sm:text-sm sm:tracking-[0.22em]">
              Built for motion
            </p>
            <h2 className="mt-2 text-2xl font-black text-white sm:text-4xl">Modern streaming that feels alive.</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            {featureCards.map((feature) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55 }}
                whileHover={{ y: -8, rotateX: 4 }}
                className="rounded-lg border border-white/10 bg-white/[0.045] p-5 shadow-2xl backdrop-blur sm:p-6"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-white text-black">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-white">{feature.title}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-400">{feature.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-[#0a0a0f] px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="container mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-300 sm:text-sm sm:tracking-[0.22em]">
              Watch everywhere
            </p>
            <h2 className="mt-2 text-2xl font-black text-white sm:text-4xl">One account. Every screen.</h2>
            <p className="mt-5 max-w-xl text-sm leading-6 text-zinc-400 sm:text-base">
              Move from a phone trailer to a living-room premiere without losing your place. The interface stays clean,
              fast, and familiar across devices.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {devices.map((device) => (
                <div key={device.label} className="rounded-lg border border-white/10 bg-white/[0.045] p-4">
                  <device.icon className="h-6 w-6 text-teal-300" />
                  <h3 className="mt-3 font-bold text-white">{device.label}</h3>
                  <p className="mt-1 text-sm text-zinc-500">{device.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            className="relative h-[330px] sm:h-[430px]"
            initial={{ opacity: 0, x: 36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.75 }}
          >
            <motion.div
              className="absolute left-0 top-6 h-56 w-[82%] rounded-2xl border border-white/15 bg-zinc-950 p-2 shadow-[0_36px_100px_rgba(0,0,0,0.7)] sm:top-8 sm:h-72 sm:rounded-[1.6rem] sm:p-3"
              animate={{ rotateY: [-7, 4, -7], y: [0, -10, 0] }}
              transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="relative h-full overflow-hidden rounded-xl sm:rounded-[1.1rem]">
                <img src={mockVideos[3]?.thumbnail || "/placeholder.jpg"} alt="" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/10" />
                <Film className="absolute bottom-5 left-5 h-8 w-8 text-white" />
              </div>
            </motion.div>
            <motion.div
              className="absolute bottom-3 right-3 h-52 w-28 rounded-[1.4rem] border border-white/15 bg-zinc-950 p-1.5 shadow-[0_28px_80px_rgba(0,0,0,0.7)] sm:bottom-4 sm:right-4 sm:h-64 sm:w-36 sm:rounded-[1.8rem] sm:p-2"
              animate={{ rotateZ: [4, -3, 4], y: [0, 12, 0] }}
              transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
              <div className="relative h-full overflow-hidden rounded-[1rem] sm:rounded-[1.25rem]">
                <img src={mockVideos[5]?.thumbnail || "/placeholder.jpg"} alt="" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-transparent" />
                <Play className="absolute bottom-4 left-4 h-7 w-7 fill-white text-white" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#050505] px-4 py-14 text-white sm:px-6 sm:py-20 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_28%,rgba(20,184,166,0.18),transparent_28%),radial-gradient(circle_at_86%_30%,rgba(239,68,68,0.18),transparent_26%),linear-gradient(180deg,#050505_0%,#0d0d12_100%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <div className="container relative z-10 mx-auto max-w-7xl">
          <div className="grid items-center gap-8 rounded-lg border border-white/10 bg-white/[0.045] p-4 shadow-[0_40px_120px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:gap-10 sm:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:p-10">
            <div>
              <div className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-2 text-xs text-zinc-300 sm:px-4 sm:text-sm">
                <Star className="h-4 w-4 fill-red-400 text-red-400" />
                <span className="truncate">Your next watch starts here</span>
              </div>
              <h2 className="max-w-2xl text-2xl font-black leading-tight text-white sm:text-5xl">
                Pick your side of the StreamFlix experience.
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-6 text-zinc-400 sm:text-base">
                Viewers get an immersive library built for discovery. Studios get a premium stage for launches,
                analytics, and audience growth.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <motion.div
                whileHover={{ y: -6 }}
                className="rounded-lg border border-teal-400/20 bg-teal-400/[0.07] p-4 sm:p-5"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-teal-300 text-black">
                  <Users className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-white">Watch tonight</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-400 md:min-h-12">
                  Start a viewer profile and jump into premieres, trailers, and saved picks.
                </p>
                <Button className="mt-6 h-11 w-full bg-white font-bold text-black hover:bg-zinc-200" asChild>
                  <Link href="/sign-up?type=viewer">Start free trial</Link>
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ y: -6 }}
                className="rounded-lg border border-red-400/20 bg-red-500/[0.07] p-4 sm:p-5"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-red-500 text-white">
                  <Building2 className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-white">Launch your catalog</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-400 md:min-h-12">
                  Bring films, series, and studio releases into a more cinematic storefront.
                </p>
                <Button
                  className="mt-6 h-11 w-full border border-white/20 bg-white/[0.08] font-bold text-white hover:bg-white/14"
                  asChild
                >
                  <Link href="/studio/studio-signup">Join as studio</Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <VideoModal video={selectedVideo} isOpen={isModalOpen} onClose={closeVideo} />
    </div>
  )
}

type AudiencePanelProps = {
  icon: typeof Users
  label: string
  title: string
  text: string
  features: string[]
  href: string
  action: string
  accent: "red" | "teal"
}

function AudiencePanel({ icon: Icon, label, title, text, features, href, action, accent }: AudiencePanelProps) {
  const panelAccentClasses =
    accent === "red"
      ? "from-red-600/20 border-red-500/30 text-red-200"
      : "from-teal-500/20 border-teal-400/30 text-teal-200"
  const iconAccentClasses = accent === "red" ? "bg-red-500" : "bg-teal-400"

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.65 }}
      whileHover={{ y: -8, rotateX: 3 }}
      className={`rounded-lg border bg-gradient-to-br ${panelAccentClasses} to-white/[0.035] p-5 shadow-2xl backdrop-blur sm:p-7`}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="mb-6 flex items-center justify-between gap-4 sm:mb-8">
        <div className="flex items-center gap-3">
          <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${iconAccentClasses} text-black`}>
            <Icon className="h-6 w-6" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-[0.16em] sm:text-sm sm:tracking-[0.22em]">{label}</span>
        </div>
        <ArrowRight className="h-5 w-5 opacity-70" />
      </div>

      <h2 className="max-w-lg text-2xl font-black leading-tight text-white sm:text-3xl">{title}</h2>
      <p className="mt-4 max-w-xl text-sm leading-6 text-zinc-300">{text}</p>

      <ul className="mt-7 space-y-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm text-zinc-300">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-white" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <Button className="mt-8 h-11 w-full bg-white font-bold text-black hover:bg-zinc-200" asChild>
        <Link href={href}>{action}</Link>
      </Button>
    </motion.div>
  )
}
