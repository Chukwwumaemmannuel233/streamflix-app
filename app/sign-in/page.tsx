"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Eye, EyeOff, Film, Mail, Play, ShieldCheck, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { mockVideos } from "@/lib/data"
import { createTrialAccount, getStoredAccount, saveStoredAccount } from "@/lib/access"
import type { VideoType } from "@/lib/types"

export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const backdropMovies = mockVideos.slice(0, 6)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      if (!getStoredAccount()) {
        saveStoredAccount(createTrialAccount(email, "viewer"))
      }
      setIsLoading(false)
      router.push("/home")
    }, 900)
  }

  const handleDemoAccess = () => {
    setIsLoading(true)
    setTimeout(() => {
      if (!getStoredAccount()) {
        saveStoredAccount(createTrialAccount("demo@streamflix.local", "viewer"))
      }
      setIsLoading(false)
      router.push("/home")
    }, 600)
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050505] px-4 py-10 text-white sm:px-6 lg:px-8">
      <AuthBackdrop movies={backdropMovies} />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-6xl items-center">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[1fr_440px]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="hidden max-w-2xl lg:block"
          >
            <Link href="/" className="mb-8 inline-flex items-center gap-3">
              <img src="/logo.png" alt="StreamFlix" className="h-11 w-11 rounded-lg" />
              <span className="text-2xl font-black text-white">StreamFlix</span>
            </Link>

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-zinc-300 backdrop-blur">
              <Sparkles className="h-4 w-4 text-teal-300" />
              One tap back to your watchlist
            </div>
            <h1 className="text-6xl font-black leading-[0.95] text-white">
              Pick up exactly where the story paused.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-zinc-300">
              Sign in quickly and return to premieres, saved titles, new releases, and every profile on your account.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="mx-auto w-full max-w-[440px]"
          >
            <div className="mb-6 flex items-center justify-center lg:hidden">
              <Link href="/" className="inline-flex items-center gap-3">
                <img src="/logo.png" alt="StreamFlix" className="h-10 w-10 rounded-lg" />
                <span className="text-xl font-black text-white">StreamFlix</span>
              </Link>
            </div>

            <div className="rounded-lg border border-white/10 bg-black/65 p-5 shadow-[0_30px_90px_rgba(0,0,0,0.55)] backdrop-blur-xl sm:p-7">
              <div className="mb-7">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-red-600 text-white">
                  <Play className="h-5 w-5 fill-current" />
                </div>
                <h2 className="text-3xl font-black text-white">Welcome back</h2>
                <p className="mt-2 text-sm leading-6 text-zinc-400">Email, password, done. No long process.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-zinc-200">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-12 border-white/10 bg-white/[0.08] pl-10 text-white placeholder:text-zinc-500 focus-visible:ring-red-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-4">
                    <Label htmlFor="password" className="text-zinc-200">
                      Password
                    </Label>
                    <Link href="/forgot-password" className="text-sm font-medium text-red-300 hover:text-red-200">
                      Forgot?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      placeholder="Enter password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="h-12 border-white/10 bg-white/[0.08] pr-12 text-white placeholder:text-zinc-500 focus-visible:ring-red-500"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-12 w-12 text-zinc-400 hover:bg-transparent hover:text-white"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox id="remember" className="border-white/30 data-[state=checked]:bg-red-600" />
                  <Label htmlFor="remember" className="text-sm text-zinc-400">
                    Keep me signed in
                  </Label>
                </div>

                <Button type="submit" disabled={isLoading} className="h-12 w-full bg-red-600 text-base font-bold text-white hover:bg-red-500">
                  {isLoading ? "Opening..." : "Sign in"}
                </Button>
              </form>

              <Button
                type="button"
                variant="outline"
                onClick={handleDemoAccess}
                disabled={isLoading}
                className="mt-3 h-12 w-full border-white/15 bg-white/[0.06] font-semibold text-white hover:bg-white/12 hover:text-white"
              >
                <Film className="h-4 w-4" />
                Continue with demo access
              </Button>

              <div className="mt-6 flex items-start gap-2 rounded-lg border border-teal-400/15 bg-teal-400/[0.06] p-3 text-sm leading-6 text-zinc-300">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-teal-300" />
                Your profiles, watch history, and downloads stay synced across devices.
              </div>
            </div>

            <p className="mt-5 text-center text-sm text-zinc-400">
              New to StreamFlix?{" "}
              <Link href="/sign-up" className="font-semibold text-white hover:text-red-200">
                Create an account
              </Link>
            </p>
            <p className="mt-3 text-center text-sm text-zinc-500">
              Studio or production owner?{" "}
              <Link href="/studio" className="font-semibold text-white hover:text-red-200">
                Use Studio Portal
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

function AuthBackdrop({ movies }: { movies: VideoType[] }) {
  return (
    <div aria-hidden="true" className="absolute inset-0">
      <div className="absolute inset-0 grid grid-cols-2 gap-2 opacity-30 sm:grid-cols-3 lg:grid-cols-6">
        {movies.map((movie, index) => (
          <motion.div
            key={movie.id}
            className="min-h-52 overflow-hidden rounded-lg border border-white/10 bg-zinc-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: index % 2 === 0 ? -10 : 10 }}
            transition={{ duration: 2.4, delay: index * 0.08, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          >
            <img src={movie.thumbnail || "/placeholder.jpg"} alt="" className="h-full w-full object-cover" />
          </motion.div>
        ))}
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(239,68,68,0.26),transparent_28%),radial-gradient(circle_at_82%_24%,rgba(20,184,166,0.18),transparent_28%),linear-gradient(90deg,#050505_0%,rgba(5,5,5,0.82)_44%,rgba(5,5,5,0.92)_100%)]" />
      <div className="absolute inset-0 bg-black/45" />
    </div>
  )
}
