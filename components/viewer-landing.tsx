"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Crown, Download, Film, Play, Search, Shield, Sparkles, Tv } from "lucide-react"

import { Button } from "@/components/ui/button"
import { mockVideos } from "@/lib/data"

const fadeIn = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
}

const viewerFeatures = [
  { icon: Search, title: "Fast discovery", text: "Find movies, shows, categories, and studio releases in seconds." },
  { icon: Crown, title: "Premium access", text: "Explore exclusive premieres and featured titles with clear access details." },
  { icon: Download, title: "Every screen", text: "Enjoy a smooth viewing experience across mobile, tablet, and desktop." },
  { icon: Shield, title: "Simple profiles", text: "Create an account quickly and keep watchlists, history, and picks in sync." },
]

export function ViewerLanding() {
  const heroVideo = mockVideos[0]
  const featured = mockVideos.slice(0, 6)
  const posterWall = mockVideos.slice(0, 10)
  const trending = [...mockVideos].sort((a, b) => b.views - a.views).slice(0, 8)

  return (
    <main className="min-h-screen overflow-hidden bg-[#050505] text-white">
      <section className="relative min-h-screen overflow-hidden px-4 pb-16 pt-24 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_16%,rgba(220,38,38,0.28),transparent_32%),radial-gradient(circle_at_84%_20%,rgba(20,184,166,0.16),transparent_30%),linear-gradient(180deg,#050505_0%,#09090d_56%,#050505_100%)]" />
        <div className="absolute inset-0 hidden opacity-20 lg:grid lg:grid-cols-5 lg:gap-3 lg:p-3">
          {posterWall.map((video, index) => (
            <motion.div
              key={video.id}
              className="min-h-72 overflow-hidden rounded-lg border border-white/10 bg-zinc-900"
              animate={{ y: [0, index % 2 === 0 ? -28 : 28, 0] }}
              transition={{ duration: 8 + index * 0.35, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
              <img src={video.thumbnail || "/placeholder.svg"} alt="" className="h-full w-full object-cover" />
            </motion.div>
          ))}
        </div>
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#050505] to-transparent" />

        <div className="container relative z-10 grid min-h-[calc(100vh-7rem)] items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div initial="initial" animate="animate" transition={{ staggerChildren: 0.08 }} className="max-w-3xl">
            <motion.div
              variants={fadeIn}
              transition={{ duration: 0.55 }}
              className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-200 backdrop-blur"
            >
              <Sparkles className="h-4 w-4 text-red-300" />
              Premium streaming
            </motion.div>

            <motion.h1 variants={fadeIn} transition={{ duration: 0.6 }} className="text-4xl font-black leading-[0.98] sm:text-6xl lg:text-7xl">
              Watch premium stories without the noise.
            </motion.h1>
            <motion.p variants={fadeIn} transition={{ duration: 0.6 }} className="mt-5 max-w-2xl text-base leading-7 text-zinc-300 sm:text-lg">
              Discover new releases, premium films, series, and creator-led stories in a streaming experience built for effortless watching.
            </motion.p>

            <motion.div variants={fadeIn} transition={{ duration: 0.6 }} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="h-12 bg-red-600 px-6 font-bold text-white hover:bg-red-500" asChild>
                <Link href="/sign-up">
                  <Play className="h-5 w-5 fill-current" />
                  Start free trial
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-12 border-white/20 bg-white/10 px-6 font-bold text-white hover:bg-white/15 hover:text-white" asChild>
                <Link href="/sign-in">Sign in</Link>
              </Button>
            </motion.div>

            <motion.div variants={fadeIn} transition={{ duration: 0.6 }} className="mt-8 flex flex-wrap gap-3 text-sm text-zinc-400">
              <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1">7-day trial</span>
              <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1">Premium movies</span>
              <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1">Mobile friendly</span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.75 }}
            className="relative mx-auto h-[430px] w-full max-w-[680px] sm:h-[560px]"
            style={{ perspective: "1400px" }}
          >
            <motion.div
              className="absolute inset-x-0 top-3 overflow-hidden rounded-lg border border-white/15 bg-zinc-950 shadow-[0_40px_140px_rgba(0,0,0,0.7)]"
              animate={{ rotateY: [-7, 5, -7], rotateX: [6, 2, 6], y: [0, -12, 0] }}
              transition={{ duration: 9, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="relative aspect-video">
                <img src={heroVideo?.thumbnail || "/placeholder.svg"} alt={heroVideo?.title || "Featured movie"} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-red-600 px-3 py-1 text-xs font-bold">
                    <Crown className="h-3.5 w-3.5" />
                    Premium premiere
                  </div>
                  <h2 className="line-clamp-1 text-2xl font-black sm:text-4xl">{heroVideo?.title}</h2>
                </div>
              </div>
            </motion.div>

            <div className="absolute bottom-4 grid w-full grid-cols-3 gap-3 sm:grid-cols-6">
              {featured.map((video, index) => (
                <motion.div
                  key={video.id}
                  className="aspect-[2/3] overflow-hidden rounded-lg border border-white/15 bg-zinc-900 shadow-2xl"
                  animate={{ y: [0, index % 2 === 0 ? -16 : 12, 0], rotateZ: [0, index % 2 === 0 ? -3 : 3, 0] }}
                  transition={{ duration: 5 + index * 0.35, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                >
                  <img src={video.thumbnail || "/placeholder.svg"} alt="" className="h-full w-full object-cover" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#050505] px-4 py-14 sm:px-6 lg:px-8">
        <div className="container">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-red-300">Trending now</p>
              <h2 className="mt-2 text-3xl font-black sm:text-5xl">Tonight's most watched titles.</h2>
            </div>
            <Button variant="ghost" className="w-fit text-zinc-300 hover:bg-white/10 hover:text-white" asChild>
              <Link href="/movies">
                Browse movies
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8">
            {trending.map((video, index) => (
              <motion.div
                key={video.id}
                className="group overflow-hidden rounded-lg border border-white/10 bg-zinc-900"
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.04 }}
                whileHover={{ y: -8 }}
              >
                <Link href={`/watch/${video.id}`} className="block">
                  <div className="relative aspect-[2/3]">
                    <img src={video.thumbnail || "/placeholder.svg"} alt={video.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                    <div className="absolute left-2 top-2 rounded-md bg-white px-2 py-1 text-[10px] font-black text-black">#{index + 1}</div>
                    <div className="absolute bottom-2 left-2 right-2">
                      <p className="line-clamp-1 text-sm font-bold">{video.title}</p>
                      <p className="mt-1 text-[11px] text-zinc-400">{video.duration}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#09090d] px-4 py-14 sm:px-6 lg:px-8">
        <div className="container grid gap-4 md:grid-cols-4">
          {viewerFeatures.map((feature) => (
            <div key={feature.title} className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
              <feature.icon className="h-6 w-6 text-red-300" />
              <h2 className="mt-5 text-lg font-bold">{feature.title}</h2>
              <p className="mt-2 text-sm leading-6 text-zinc-400">{feature.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="container grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-300">Stream anywhere</p>
            <h2 className="mt-3 text-3xl font-black sm:text-5xl">Movies, series, and premieres in one place.</h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-zinc-400">
              Move from a trailer to a full feature, build a watchlist, and return to every story exactly where it paused.
            </p>
            <Button className="mt-7 bg-white font-bold text-black hover:bg-zinc-200" asChild>
              <Link href="/home">
                Browse viewer home
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {[Tv, Film, Play].map((Icon, index) => (
              <motion.div
                key={index}
                className="relative min-h-48 overflow-hidden rounded-lg border border-white/10 bg-white/[0.04] p-5"
                animate={{ y: [0, index === 1 ? -12 : 10, 0] }}
                transition={{ duration: 6 + index, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              >
                <img src={mockVideos[index + 2]?.thumbnail || "/placeholder.svg"} alt="" className="absolute inset-0 h-full w-full object-cover opacity-35" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />
                <div className="relative z-10">
                <Icon className="h-7 w-7 text-teal-300" />
                <p className="mt-24 text-sm font-semibold text-zinc-200">{mockVideos[index + 2]?.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
