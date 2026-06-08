"use client"

import type React from "react"

import Link from "next/link"
import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, BadgeCheck, Check, Film, Mail, Play, Sparkles, Users } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { mockVideos } from "@/lib/data"

const launchHighlights = [
  "Premium films, series, and creator-led releases in one cinematic platform",
  "A smooth streaming experience for audiences across every screen",
  "Professional catalog, release, and revenue tools for studios and production teams",
]

export default function WaitlistPage() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const featured = mockVideos.slice(0, 7)
  const heroVideo = mockVideos[0]

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    setIsSubmitted(true)
    toast.success("You're on the waitlist", {
      description: "We'll send early access updates to your email.",
    })
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#050505] text-white">
      <section className="relative min-h-screen overflow-hidden px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(220,38,38,0.30),transparent_30%),radial-gradient(circle_at_82%_18%,rgba(20,184,166,0.16),transparent_28%),linear-gradient(180deg,#050505_0%,#08080c_55%,#050505_100%)]" />
        <div className="absolute inset-0 hidden opacity-20 lg:grid lg:grid-cols-7 lg:gap-3 lg:p-3">
          {featured.map((video, index) => (
            <motion.div
              key={video.id}
              className="min-h-80 overflow-hidden rounded-lg border border-white/10 bg-zinc-900"
              animate={{ y: [0, index % 2 === 0 ? -26 : 26, 0] }}
              transition={{ duration: 8 + index * 0.35, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
              <img src={video.thumbnail || "/placeholder.svg"} alt="" className="h-full w-full object-cover" />
            </motion.div>
          ))}
        </div>
        <div className="absolute inset-0 bg-black/68" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#050505] to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-7xl flex-col sm:min-h-[calc(100vh-3rem)]">
          <header className="flex h-11 items-center justify-between sm:h-14">
            <Link href="/waitlist" className="flex items-center gap-2.5">
              <img src="/logo.png" alt="StreamFlix" className="h-7 w-7 rounded-md sm:h-9 sm:w-9" />
              <span className="text-base font-black text-white sm:text-xl">StreamFlix</span>
            </Link>
            <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-300 sm:flex">
              <Sparkles className="h-3.5 w-3.5 text-red-300" />
              Early access
            </div>
          </header>

          <div className="grid flex-1 items-center gap-8 py-8 sm:py-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10 lg:py-12">
            <motion.section initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }} className="max-w-3xl">
              <div className="mb-4 inline-flex max-w-full items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-200 backdrop-blur sm:mb-5 sm:py-2 sm:text-xs sm:tracking-[0.16em]">
                <BadgeCheck className="h-4 w-4 text-red-300" />
                Launching soon
              </div>

              <h1 className="max-w-3xl text-3xl font-black leading-[1.02] sm:text-5xl lg:text-6xl">
                Premium streaming and studio releases, all in one place.
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-300 sm:mt-5 sm:text-lg sm:leading-7">
                StreamFlix brings audiences closer to new films, series, originals, and studio-backed stories while giving production teams a polished home for their catalogs.
              </p>

              <div className="mt-6 grid max-w-2xl gap-3 sm:mt-8">
                {launchHighlights.map((highlight) => (
                  <div key={highlight} className="flex items-center gap-3 text-sm text-zinc-300">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-black">
                      <Check className="h-4 w-4" />
                    </span>
                    {highlight}
                  </div>
                ))}
              </div>

              <div className="mt-6 grid max-w-xl grid-cols-3 gap-2 sm:mt-8 sm:gap-3">
                {[
                  { icon: Play, label: "Watch" },
                  { icon: Film, label: "Release" },
                  { icon: Users, label: "Connect" },
                ].map((item) => (
                  <div key={item.label} className="rounded-lg border border-white/10 bg-white/[0.05] p-3 backdrop-blur sm:p-4">
                    <item.icon className="h-4 w-4 text-red-300 sm:h-5 sm:w-5" />
                    <p className="mt-3 text-xs font-bold text-zinc-200 sm:mt-4 sm:text-sm">{item.label}</p>
                  </div>
                ))}
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="mx-auto w-full max-w-[560px]"
            >
              <div className="relative mb-4 overflow-hidden rounded-lg border border-white/10 bg-zinc-950 shadow-[0_34px_110px_rgba(0,0,0,0.6)]">
                <div className="relative aspect-video">
                  <img src={heroVideo?.thumbnail || "/placeholder.svg"} alt={heroVideo?.title || "Featured StreamFlix title"} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-red-600 px-3 py-1 text-xs font-bold">
                      <Play className="h-3.5 w-3.5 fill-current" />
                      First look
                    </div>
                    <h2 className="line-clamp-1 text-2xl font-black">{heroVideo?.title}</h2>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-white/10 bg-black/72 p-5 shadow-[0_30px_100px_rgba(0,0,0,0.58)] backdrop-blur-xl sm:p-7">
                <div className="mb-6">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-red-600">
                    <Mail className="h-5 w-5" />
                  </div>
                  <h2 className="text-2xl font-black sm:text-3xl">Join the waitlist</h2>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">
                    Get launch updates, early access invites, and first access when StreamFlix opens.
                  </p>
                </div>

                {isSubmitted ? (
                  <div className="rounded-lg border border-teal-400/25 bg-teal-400/[0.08] p-5">
                    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-teal-300 text-black">
                      <Check className="h-5 w-5" />
                    </div>
                    <h3 className="text-xl font-black text-white">You're on the list.</h3>
                    <p className="mt-2 text-sm leading-6 text-zinc-300">
                      Early access updates will be sent to {email}. StreamFlix will open in phases as launch access becomes available.
                    </p>
                    <Button className="mt-5 bg-white font-bold text-black hover:bg-zinc-200" onClick={() => setIsSubmitted(false)}>
                      Add another email
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-zinc-200">
                        Email address
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                          required
                          placeholder="you@example.com"
                          className="h-12 border-white/10 bg-white/[0.08] pl-10 text-white placeholder:text-zinc-500 focus-visible:ring-red-500"
                        />
                      </div>
                    </div>

                    <Button type="submit" className="h-12 w-full bg-red-600 text-base font-bold text-white hover:bg-red-500">
                      Request early access
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </form>
                )}

                <p className="mt-5 text-center text-xs leading-5 text-zinc-500">
                  No spam. Launch updates, access invites, and important StreamFlix announcements only.
                </p>
              </div>
            </motion.section>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#050505] px-4 py-8 sm:px-6 lg:px-8">
        <div className="container flex flex-col gap-3 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>StreamFlix early access is opening soon.</p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-2">
              <Users className="h-4 w-4" />
              Early access
            </span>
            <span className="inline-flex items-center gap-2">
              <Film className="h-4 w-4" />
              Launch updates
            </span>
          </div>
        </div>
      </section>
    </main>
  )
}
