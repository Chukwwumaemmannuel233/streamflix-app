"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Building2,
  CalendarClock,
  Check,
  Clapperboard,
  Film,
  LineChart,
  Play,
  Upload,
  WalletCards,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { mockVideos } from "@/lib/data"

const studioFeatures = [
  { icon: Upload, title: "Guided uploads", text: "Add films, series, trailers, posters, ratings, and release details in one streamlined flow." },
  { icon: BarChart3, title: "Performance insights", text: "Track views, retention, revenue, regions, and content momentum from a clear command center." },
  { icon: WalletCards, title: "Revenue clarity", text: "Keep payout, plan, and revenue-sharing information visible and easy to understand." },
  { icon: CalendarClock, title: "Release planning", text: "Schedule premieres, coming-soon drops, and catalog updates with confidence." },
]

const steps = [
  "Studio profile",
  "Company details",
  "First release",
  "Analytics and revenue",
]

export function StudioLanding() {
  const hostedTitles = mockVideos.filter((video) => video.studio?.verified).slice(0, 4)
  const featuredTitle = hostedTitles[0] || mockVideos[0]

  return (
    <main className="min-h-screen overflow-hidden bg-[#050505] text-white">
      <section className="relative min-h-screen overflow-hidden px-4 pb-16 pt-24 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_14%,rgba(220,38,38,0.24),transparent_30%),radial-gradient(circle_at_18%_30%,rgba(245,158,11,0.14),transparent_26%),linear-gradient(180deg,#050505_0%,#0b0b0e_60%,#050505_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#050505] to-transparent" />

        <div className="container relative z-10 grid min-h-[calc(100vh-7rem)] items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }} className="max-w-3xl">
            <div className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-200 backdrop-blur">
              <Building2 className="h-4 w-4 text-red-300" />
              Studio portal
            </div>

            <h1 className="text-4xl font-black leading-[0.98] sm:text-6xl lg:text-7xl">A premium home for studios and production companies.</h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-300 sm:text-lg">
              Manage catalogs, launch releases, monitor revenue, and present every title with the polish it deserves.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="h-12 bg-red-600 px-6 font-bold text-white hover:bg-red-500" asChild>
                <Link href="/studio/sign-up">
                  <Clapperboard className="h-5 w-5" />
                  Join as studio
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-12 border-white/20 bg-white/10 px-6 font-bold text-white hover:bg-white/15 hover:text-white" asChild>
                <Link href="/studio/sign-in">Studio sign in</Link>
              </Button>
            </div>

            <div className="mt-8 grid max-w-xl grid-cols-3 gap-3">
              {[
                ["75%", "revenue share"],
                ["14 days", "studio trial"],
                ["24/7", "release access"],
              ].map(([value, label]) => (
                <div key={label} className="border-l border-white/15 pl-4">
                  <p className="text-2xl font-black">{value}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-zinc-500">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.75 }}
            className="relative mx-auto h-[520px] w-full max-w-[680px]"
            style={{ perspective: "1400px" }}
          >
            <motion.div
              className="absolute inset-x-0 top-0 rounded-lg border border-white/15 bg-[#0b0b10]/95 p-4 shadow-[0_44px_140px_rgba(0,0,0,0.75)]"
              animate={{ rotateY: [-6, 5, -6], rotateX: [6, 2, 6], y: [0, -10, 0] }}
              transition={{ duration: 9, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Studio overview</p>
                  <h2 className="mt-1 text-2xl font-black">Release Command</h2>
                </div>
                <BadgeCheck className="h-7 w-7 fill-blue-500 text-blue-500" />
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  ["42", "catalog titles"],
                  ["1.8M", "monthly views"],
                  ["$18.4K", "revenue"],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-lg border border-white/10 bg-white/[0.05] p-4">
                    <p className="text-2xl font-black">{value}</p>
                    <p className="mt-1 text-xs text-zinc-500">{label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-lg border border-white/10 bg-black/30 p-4">
                <div className="mb-4 flex items-center justify-between">
                  <p className="font-bold">Upcoming release</p>
                  <span className="rounded-full bg-red-600/20 px-2 py-1 text-xs font-bold text-red-200">Review ready</span>
                </div>
                <div className="grid grid-cols-[92px_1fr] gap-3">
                  <div className="relative aspect-video overflow-hidden rounded-lg bg-zinc-900">
                    <img src={featuredTitle?.thumbnail || "/placeholder.svg"} alt="" className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <h3 className="line-clamp-1 font-bold">{featuredTitle?.title}</h3>
                    <p className="mt-1 text-sm text-zinc-500">{featuredTitle?.studio?.name} - scheduled launch</p>
                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full w-[74%] rounded-full bg-red-500" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="absolute bottom-4 right-0 w-[82%] rounded-lg border border-white/15 bg-white/[0.06] p-4 backdrop-blur"
              animate={{ y: [0, 16, 0], rotateZ: [2, -2, 2] }}
              transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-600">
                  <LineChart className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-bold">Audience retention is up 18%</p>
                  <p className="text-sm text-zinc-500">Audience insights for every release.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#050505] px-4 py-16 sm:px-6 lg:px-8">
        <div className="container">
          <div className="mb-8 grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-red-300">Hosted on StreamFlix</p>
              <h2 className="mt-3 text-3xl font-black sm:text-5xl">Catalog presentation built for premium releases.</h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-zinc-400">
              Showcase films, series, and originals with rich artwork, title details, audience signals, and premium placement.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <motion.div
              className="relative min-h-[360px] overflow-hidden rounded-lg border border-white/10 bg-zinc-950"
              whileHover={{ y: -6 }}
            >
              <img src={featuredTitle?.thumbnail || "/placeholder.svg"} alt={featuredTitle?.title || "Hosted title"} className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/10" />
              <div className="relative z-10 flex min-h-[360px] max-w-xl flex-col justify-end p-6 sm:p-8">
                <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-red-600 px-3 py-1 text-xs font-bold">
                  <Play className="h-3.5 w-3.5 fill-current" />
                  Featured hosted title
                </div>
                <h3 className="text-3xl font-black sm:text-5xl">{featuredTitle?.title}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-300">{featuredTitle?.description}</p>
                <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold text-zinc-300">
                  <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1">{featuredTitle?.duration}</span>
                  <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1">{featuredTitle?.rating}</span>
                  <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1">{featuredTitle?.views.toLocaleString()} views</span>
                </div>
              </div>
            </motion.div>

            <div className="grid gap-4 sm:grid-cols-2">
              {hostedTitles.map((video, index) => (
                <motion.div
                  key={video.id}
                  className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.04]"
                  animate={{ y: [0, index % 2 === 0 ? -8 : 8, 0] }}
                  transition={{ duration: 6 + index * 0.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                >
                  <div className="relative aspect-video">
                    <img src={video.thumbnail || "/placeholder.svg"} alt={video.title} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="line-clamp-1 font-bold">{video.title}</p>
                      <p className="mt-1 text-xs text-zinc-400">{video.studio?.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 text-xs text-zinc-400">
                    <span>{video.views.toLocaleString()} views</span>
                    <span>{video.access === "premium" ? "Premium" : "Standard"}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#09090d] px-4 py-14 sm:px-6 lg:px-8">
        <div className="container">
          <div className="mb-8 max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-red-300">Built for owners</p>
            <h2 className="mt-3 text-3xl font-black sm:text-5xl">Everything studios need to feel in control.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {studioFeatures.map((feature) => (
              <div key={feature.title} className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
                <feature.icon className="h-6 w-6 text-red-300" />
                <h3 className="mt-5 text-lg font-bold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-400">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="container grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-300">Simple onboarding</p>
            <h2 className="mt-3 text-3xl font-black sm:text-5xl">A clear path from setup to release.</h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-zinc-400">
              Studio onboarding keeps company setup, catalog preparation, release management, and revenue tracking easy to follow.
            </p>
          </div>
          <div className="grid gap-3">
            {steps.map((step, index) => (
              <div key={step} className="flex items-center gap-4 rounded-lg border border-white/10 bg-white/[0.04] p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-black">
                  {index + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-bold">{step}</p>
                  <p className="text-sm text-zinc-500">Built for a smooth studio launch.</p>
                </div>
                <Check className="h-5 w-5 text-teal-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="container rounded-lg border border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(220,38,38,0.22),transparent_32%),#0b0b10] p-6 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-red-600">
                <Film className="h-6 w-6" />
              </div>
              <h2 className="text-3xl font-black sm:text-5xl">Bring the next release to StreamFlix Studio.</h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-400">
                Publish titles, manage performance, and grow a catalog with tools designed for serious production teams.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Button className="h-12 bg-red-600 font-bold text-white hover:bg-red-500" asChild>
                <Link href="/studio/sign-up">
                  Join as studio
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" className="h-12 border-white/20 bg-white/10 font-bold text-white hover:bg-white/15 hover:text-white" asChild>
                <Link href="/">Go to viewer site</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
