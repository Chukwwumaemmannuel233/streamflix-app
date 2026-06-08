"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { BadgeCheck, Building2, Check, Eye, EyeOff, Mail, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { mockVideos } from "@/lib/data"
import { createTrialAccount, saveStoredAccount } from "@/lib/access"
import type { VideoType } from "@/lib/types"

export default function SignUpPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [returnTo, setReturnTo] = useState<string | null>(null)
  const router = useRouter()
  const backdropMovies = mockVideos.slice(1, 7)

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    setReturnTo(searchParams.get("returnTo"))
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      saveStoredAccount(createTrialAccount(email, "viewer"))
      setIsLoading(false)
      router.push(returnTo || "/home")
    }, 900)
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050505] px-4 py-10 text-white sm:px-6 lg:px-8">
      <AuthBackdrop movies={backdropMovies} />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-6xl items-center">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[1fr_460px]">
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
              Simple signup, premium streaming
            </div>
            <h1 className="text-6xl font-black leading-[0.95] text-white">
              Start watching without a long checkout.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-zinc-300">
              Create a viewer account with email and password, then start streaming instantly.
            </p>

            <div className="mt-8 grid max-w-xl gap-3">
              {["No card required today", "7-day free trial", "Works across every screen"].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-zinc-300">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-black">
                    <Check className="h-4 w-4" />
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="mx-auto w-full max-w-[460px]"
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
                  <BadgeCheck className="h-5 w-5" />
                </div>
                <h2 className="text-3xl font-black text-white">Create account</h2>
                <p className="mt-2 text-sm leading-6 text-zinc-400">Start with the essentials and personalize your profile anytime.</p>
              </div>

              <div className="mb-5 flex items-start gap-3 rounded-lg border border-white/10 bg-white/[0.04] p-3 text-sm leading-6 text-zinc-300">
                <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-red-300" />
                <span>
                  Studio or production company?{" "}
                  <Link href="/studio" className="font-semibold text-white hover:text-red-200">
                    Go to Studio Portal
                  </Link>
                  .
                </span>
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
                  <Label htmlFor="password" className="text-zinc-200">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      placeholder="Create password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
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

                <div className="flex items-start gap-2">
                  <Checkbox
                    id="terms"
                    checked={acceptedTerms}
                    onCheckedChange={(checked) => setAcceptedTerms(checked === true)}
                    required
                    className="mt-1 border-white/30 data-[state=checked]:bg-red-600"
                  />
                  <Label htmlFor="terms" className="text-sm leading-6 text-zinc-400">
                    I agree to the{" "}
                    <Link href="/terms" className="font-medium text-white hover:text-red-200">
                      Terms
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="font-medium text-white hover:text-red-200">
                      Privacy Policy
                    </Link>
                    .
                  </Label>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading || !acceptedTerms}
                  className="h-12 w-full bg-red-600 text-base font-bold text-white hover:bg-red-500"
                >
                  {isLoading ? "Creating..." : "Start watching"}
                </Button>
              </form>

              <div className="mt-6 rounded-lg border border-teal-400/15 bg-teal-400/[0.06] p-3 text-sm leading-6 text-zinc-300">
                Your free trial starts immediately. Premium billing is handled only when a plan is selected.
              </div>
            </div>

            <p className="mt-5 text-center text-sm text-zinc-400">
              Already have an account?{" "}
              <Link href="/sign-in" className="font-semibold text-white hover:text-red-200">
                Sign in
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
