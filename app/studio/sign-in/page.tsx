"use client"

import type React from "react"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { BarChart3, Building2, Eye, EyeOff, Lock, Mail, Play, ShieldCheck, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { mockVideos } from "@/lib/data"

export default function StudioSignInPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const featured = mockVideos.find((video) => video.studio?.verified) || mockVideos[0]

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    setIsLoading(true)
    window.setTimeout(() => {
      setIsLoading(false)
      router.push("/studio/studio-dashboard")
    }, 650)
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(220,38,38,0.26),transparent_30%),radial-gradient(circle_at_84%_18%,rgba(245,158,11,0.12),transparent_28%),linear-gradient(180deg,#050505_0%,#0b0b10_100%)]" />
      <div className="absolute inset-0 opacity-20">
        <img src={featured?.thumbnail || "/placeholder.svg"} alt="" className="h-full w-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-6xl items-center">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[1fr_440px]">
          <section className="hidden max-w-2xl lg:block">
            <Link href="/studio" className="mb-8 inline-flex items-center gap-3">
              <img src="/logo.png" alt="StreamFlix Studio" className="h-11 w-11 rounded-lg" />
              <span className="text-2xl font-black text-white">StreamFlix Studio</span>
            </Link>

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-zinc-200 backdrop-blur">
              <Building2 className="h-4 w-4 text-red-300" />
              Studio workspace
            </div>
            <h1 className="text-6xl font-black leading-[0.95]">Catalog, releases, revenue, and analytics.</h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-zinc-300">
              Sign in to manage premium titles, prepare upcoming releases, review audience performance, and monitor studio earnings.
            </p>

            <div className="mt-8 grid max-w-xl grid-cols-3 gap-3">
              {[
                { icon: Upload, label: "Uploads" },
                { icon: BarChart3, label: "Analytics" },
                { icon: ShieldCheck, label: "Secure access" },
              ].map((item) => (
                <div key={item.label} className="rounded-lg border border-white/10 bg-white/[0.06] p-4 backdrop-blur">
                  <item.icon className="h-5 w-5 text-red-300" />
                  <p className="mt-4 text-sm font-semibold text-zinc-200">{item.label}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mx-auto w-full max-w-[440px]">
            <div className="mb-6 flex items-center justify-center lg:hidden">
              <Link href="/studio" className="inline-flex items-center gap-3">
                <img src="/logo.png" alt="StreamFlix Studio" className="h-10 w-10 rounded-lg" />
                <span className="text-xl font-black text-white">StreamFlix Studio</span>
              </Link>
            </div>

            <div className="rounded-lg border border-white/10 bg-black/70 p-5 shadow-[0_30px_100px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:p-7">
              <div className="mb-7">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-red-600">
                  <Lock className="h-5 w-5" />
                </div>
                <h2 className="text-3xl font-black">Studio sign in</h2>
                <p className="mt-2 text-sm leading-6 text-zinc-400">Open the workspace for catalog, releases, analytics, and revenue.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-zinc-200">
                    Work email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      required
                      placeholder="studio@example.com"
                      className="h-12 border-white/10 bg-white/[0.08] pl-10 text-white placeholder:text-zinc-500 focus-visible:ring-red-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-4">
                    <Label htmlFor="password" className="text-zinc-200">
                      Password
                    </Label>
                    <Link href="/studio" className="text-sm font-medium text-red-300 hover:text-red-200">
                      Need help?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      required
                      placeholder="Enter password"
                      className="h-12 border-white/10 bg-white/[0.08] pr-12 text-white placeholder:text-zinc-500 focus-visible:ring-red-500"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-12 w-12 text-zinc-400 hover:bg-transparent hover:text-white"
                      onClick={() => setShowPassword((value) => !value)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox id="remember" className="border-white/30 data-[state=checked]:bg-red-600" />
                  <Label htmlFor="remember" className="text-sm text-zinc-400">
                    Keep this studio signed in
                  </Label>
                </div>

                <Button type="submit" disabled={isLoading} className="h-12 w-full bg-red-600 text-base font-bold text-white hover:bg-red-500">
                  {isLoading ? "Opening studio..." : "Sign in to studio"}
                </Button>
              </form>

              <Button
                type="button"
                variant="outline"
                className="mt-3 h-12 w-full border-white/15 bg-white/[0.06] font-semibold text-white hover:bg-white/12 hover:text-white"
                onClick={() => router.push("/studio/studio-dashboard")}
              >
                <Play className="h-4 w-4 fill-current" />
                Open demo dashboard
              </Button>

              <p className="mt-6 text-center text-sm text-zinc-400">
                New studio?{" "}
                <Link href="/studio/sign-up" className="font-semibold text-white hover:text-red-200">
                  Apply for access
                </Link>
              </p>
              <p className="mt-3 text-center text-sm text-zinc-500">
                Watching content?{" "}
                <Link href="/sign-in" className="font-semibold text-white hover:text-red-200">
                  Viewer sign in
                </Link>
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
