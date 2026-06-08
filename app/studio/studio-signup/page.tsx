"use client"

import type React from "react"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Building2,
  Check,
  Clapperboard,
  Eye,
  EyeOff,
  Film,
  Globe2,
  Mail,
  ShieldCheck,
  Upload,
  UserRound,
  WalletCards,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { mockVideos } from "@/lib/data"

type StudioForm = {
  companyName: string
  companyType: string
  country: string
  website: string
  description: string
  contactName: string
  contactEmail: string
  password: string
  confirmPassword: string
  catalogSize: string
  termsAccepted: boolean
  contentAccepted: boolean
}

const initialForm: StudioForm = {
  companyName: "",
  companyType: "",
  country: "",
  website: "",
  description: "",
  contactName: "",
  contactEmail: "",
  password: "",
  confirmPassword: "",
  catalogSize: "",
  termsAccepted: false,
  contentAccepted: false,
}

const steps = [
  { id: 1, title: "Account", description: "Secure access details" },
  { id: 2, title: "Studio", description: "Company and catalog" },
  { id: 3, title: "Review", description: "Confirm application" },
]

const studioBenefits = [
  { icon: Upload, title: "Unlimited submissions", text: "Prepare films, series, trailers, and release artwork." },
  { icon: WalletCards, title: "75% revenue share", text: "Transparent revenue reporting for approved studio titles." },
  { icon: BarChart3, title: "Release analytics", text: "Monitor audience signals, views, regions, and retention." },
]

export default function StudioSignUpPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<StudioForm>(initialForm)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const featured = mockVideos.find((video) => video.studio?.verified) || mockVideos[0]
  const progress = (step / steps.length) * 100

  const handleInputChange = (field: keyof StudioForm, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const goNext = (event: React.FormEvent) => {
    event.preventDefault()
    setStep((value) => Math.min(value + 1, steps.length))
  }

  const handleFinalSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    setIsLoading(true)
    window.setTimeout(() => {
      setIsLoading(false)
      router.push("/studio/studio-dashboard")
    }, 900)
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(220,38,38,0.24),transparent_30%),radial-gradient(circle_at_84%_18%,rgba(245,158,11,0.12),transparent_28%),linear-gradient(180deg,#050505_0%,#0b0b10_100%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-7xl items-center">
        <div className="grid w-full gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <aside className="hidden lg:block">
            <Link href="/studio" className="mb-8 inline-flex items-center gap-3">
              <img src="/logo.png" alt="StreamFlix Studio" className="h-11 w-11 rounded-lg" />
              <span className="text-2xl font-black text-white">StreamFlix Studio</span>
            </Link>

            <div className="relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.05] p-5 shadow-[0_36px_120px_rgba(0,0,0,0.55)] backdrop-blur">
              <div className="relative min-h-[310px] overflow-hidden rounded-lg bg-zinc-950">
                <img src={featured?.thumbnail || "/placeholder.svg"} alt="" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-red-600 px-3 py-1 text-xs font-bold">
                    <Film className="h-3.5 w-3.5" />
                    Studio release
                  </div>
                  <h1 className="text-4xl font-black leading-tight">Publish with a premium catalog experience.</h1>
                  <p className="mt-3 text-sm leading-6 text-zinc-300">
                    StreamFlix Studio gives production teams a focused place to launch titles, manage performance, and grow revenue.
                  </p>
                </div>
              </div>

              <div className="mt-4 grid gap-3">
                {studioBenefits.map((benefit) => (
                  <div key={benefit.title} className="flex gap-3 rounded-lg border border-white/10 bg-black/30 p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-600/20 text-red-200">
                      <benefit.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="font-bold">{benefit.title}</h2>
                      <p className="mt-1 text-sm leading-6 text-zinc-400">{benefit.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          <section className="mx-auto w-full max-w-2xl">
            <div className="mb-6 flex items-center justify-center lg:hidden">
              <Link href="/studio" className="inline-flex items-center gap-3">
                <img src="/logo.png" alt="StreamFlix Studio" className="h-10 w-10 rounded-lg" />
                <span className="text-xl font-black text-white">StreamFlix Studio</span>
              </Link>
            </div>

            <div className="rounded-lg border border-white/10 bg-black/70 p-5 shadow-[0_30px_100px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:p-7">
              <div className="mb-7">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-red-600">
                  <Clapperboard className="h-5 w-5" />
                </div>
                <h1 className="text-3xl font-black sm:text-4xl">Apply for studio access</h1>
                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  Create a studio profile, add catalog details, and prepare for review. Billing begins only after approval.
                </p>
              </div>

              <div className="mb-7">
                <div className="mb-3 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
                  <span>Step {step} of {steps.length}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-red-600 transition-all" style={{ width: `${progress}%` }} />
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {steps.map((item) => (
                    <div
                      key={item.id}
                      className={`rounded-lg border p-3 ${
                        step >= item.id ? "border-red-500/40 bg-red-600/10" : "border-white/10 bg-white/[0.04]"
                      }`}
                    >
                      <p className="text-sm font-bold text-white">{item.title}</p>
                      <p className="mt-1 hidden text-xs text-zinc-500 sm:block">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {step === 1 && (
                <form onSubmit={goNext} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="contactName" className="text-zinc-200">
                        Contact name
                      </Label>
                      <div className="relative">
                        <UserRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                        <Input
                          id="contactName"
                          value={formData.contactName}
                          onChange={(event) => handleInputChange("contactName", event.target.value)}
                          required
                          placeholder="Ava Johnson"
                          className="h-12 border-white/10 bg-white/[0.08] pl-10 text-white placeholder:text-zinc-500 focus-visible:ring-red-500"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactEmail" className="text-zinc-200">
                        Work email
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                        <Input
                          id="contactEmail"
                          type="email"
                          value={formData.contactEmail}
                          onChange={(event) => handleInputChange("contactEmail", event.target.value)}
                          required
                          placeholder="studio@example.com"
                          className="h-12 border-white/10 bg-white/[0.08] pl-10 text-white placeholder:text-zinc-500 focus-visible:ring-red-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <PasswordField
                      id="password"
                      label="Password"
                      placeholder="Create password"
                      value={formData.password}
                      visible={showPassword}
                      onToggle={() => setShowPassword((value) => !value)}
                      onChange={(value) => handleInputChange("password", value)}
                    />
                    <PasswordField
                      id="confirmPassword"
                      label="Confirm password"
                      placeholder="Confirm password"
                      value={formData.confirmPassword}
                      visible={showConfirmPassword}
                      onToggle={() => setShowConfirmPassword((value) => !value)}
                      onChange={(value) => handleInputChange("confirmPassword", value)}
                    />
                  </div>

                  <Button type="submit" className="h-12 w-full bg-red-600 text-base font-bold text-white hover:bg-red-500">
                    Continue
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </form>
              )}

              {step === 2 && (
                <form onSubmit={goNext} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="companyName" className="text-zinc-200">
                        Studio or company name
                      </Label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                        <Input
                          id="companyName"
                          value={formData.companyName}
                          onChange={(event) => handleInputChange("companyName", event.target.value)}
                          required
                          placeholder="Northline Pictures"
                          className="h-12 border-white/10 bg-white/[0.08] pl-10 text-white placeholder:text-zinc-500 focus-visible:ring-red-500"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-zinc-200">Company type</Label>
                      <Select value={formData.companyType} onValueChange={(value) => handleInputChange("companyType", value)}>
                        <SelectTrigger className="h-12 border-white/10 bg-white/[0.08] text-white focus:ring-red-500">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="production-company">Production Company</SelectItem>
                          <SelectItem value="film-studio">Film Studio</SelectItem>
                          <SelectItem value="tv-network">TV Network</SelectItem>
                          <SelectItem value="independent-creator">Independent Creator</SelectItem>
                          <SelectItem value="animation-studio">Animation Studio</SelectItem>
                          <SelectItem value="documentary-producer">Documentary Producer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label className="text-zinc-200">Country</Label>
                      <Select value={formData.country} onValueChange={(value) => handleInputChange("country", value)}>
                        <SelectTrigger className="h-12 border-white/10 bg-white/[0.08] text-white focus:ring-red-500">
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="us">United States</SelectItem>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                          <SelectItem value="ng">Nigeria</SelectItem>
                          <SelectItem value="ca">Canada</SelectItem>
                          <SelectItem value="za">South Africa</SelectItem>
                          <SelectItem value="gh">Ghana</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website" className="text-zinc-200">
                        Website
                      </Label>
                      <div className="relative">
                        <Globe2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                        <Input
                          id="website"
                          type="url"
                          value={formData.website}
                          onChange={(event) => handleInputChange("website", event.target.value)}
                          placeholder="https://studio.com"
                          className="h-12 border-white/10 bg-white/[0.08] pl-10 text-white placeholder:text-zinc-500 focus-visible:ring-red-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-zinc-200">Catalog size</Label>
                    <Select value={formData.catalogSize} onValueChange={(value) => handleInputChange("catalogSize", value)}>
                      <SelectTrigger className="h-12 border-white/10 bg-white/[0.08] text-white focus:ring-red-500">
                        <SelectValue placeholder="Select catalog size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-5">1-5 titles</SelectItem>
                        <SelectItem value="6-20">6-20 titles</SelectItem>
                        <SelectItem value="21-50">21-50 titles</SelectItem>
                        <SelectItem value="50-plus">50+ titles</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-zinc-200">
                      Studio description
                    </Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(event) => handleInputChange("description", event.target.value)}
                      required
                      placeholder="Describe the studio, catalog focus, release plans, and production background."
                      className="min-h-[120px] resize-none border-white/10 bg-white/[0.08] text-white placeholder:text-zinc-500 focus-visible:ring-red-500"
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button type="button" variant="outline" onClick={() => setStep(1)} className="h-12 flex-1 border-white/15 bg-white/[0.06] text-white hover:bg-white/12 hover:text-white">
                      <ArrowLeft className="h-4 w-4" />
                      Back
                    </Button>
                    <Button type="submit" className="h-12 flex-1 bg-red-600 font-bold text-white hover:bg-red-500">
                      Review
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </form>
              )}

              {step === 3 && (
                <form onSubmit={handleFinalSubmit} className="space-y-5">
                  <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                    <div className="mb-4 flex items-center gap-3">
                      <BadgeCheck className="h-5 w-5 text-red-300" />
                      <h2 className="font-bold">Application summary</h2>
                    </div>
                    <div className="grid gap-3 text-sm sm:grid-cols-2">
                      <SummaryItem label="Studio" value={formData.companyName || "Not provided"} />
                      <SummaryItem label="Contact" value={formData.contactName || "Not provided"} />
                      <SummaryItem label="Email" value={formData.contactEmail || "Not provided"} />
                      <SummaryItem label="Catalog" value={formData.catalogSize || "Not selected"} />
                    </div>
                  </div>

                  <div className="rounded-lg border border-teal-400/20 bg-teal-400/[0.06] p-4 text-sm leading-6 text-zinc-300">
                    <div className="mb-2 flex items-center gap-2 font-bold text-teal-200">
                      <ShieldCheck className="h-4 w-4" />
                      Billing starts after approval
                    </div>
                    Studio applications are reviewed before paid billing begins. Approved studios can choose monthly or yearly billing inside the studio workspace.
                  </div>

                  <div className="space-y-4">
                    <Agreement
                      id="terms"
                      checked={formData.termsAccepted}
                      onChange={(checked) => handleInputChange("termsAccepted", checked)}
                      label="I agree to the Studio Terms and Privacy Policy."
                      href="/studio/terms"
                    />
                    <Agreement
                      id="content"
                      checked={formData.contentAccepted}
                      onChange={(checked) => handleInputChange("contentAccepted", checked)}
                      label="I agree to follow the Content Guidelines and Revenue Sharing terms."
                      href="/studio/content-guidelines"
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button type="button" variant="outline" onClick={() => setStep(2)} className="h-12 flex-1 border-white/15 bg-white/[0.06] text-white hover:bg-white/12 hover:text-white">
                      <ArrowLeft className="h-4 w-4" />
                      Back
                    </Button>
                    <Button
                      type="submit"
                      disabled={isLoading || !formData.termsAccepted || !formData.contentAccepted}
                      className="h-12 flex-1 bg-red-600 font-bold text-white hover:bg-red-500"
                    >
                      {isLoading ? "Submitting..." : "Submit application"}
                    </Button>
                  </div>
                </form>
              )}

              <p className="mt-6 text-center text-sm text-zinc-400">
                Already approved?{" "}
                <Link href="/studio/sign-in" className="font-semibold text-white hover:text-red-200">
                  Sign in to studio
                </Link>
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}

function PasswordField({
  id,
  label,
  placeholder,
  value,
  visible,
  onToggle,
  onChange,
}: {
  id: string
  label: string
  placeholder: string
  value: string
  visible: boolean
  onToggle: () => void
  onChange: (value: string) => void
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-zinc-200">
        {label}
      </Label>
      <div className="relative">
        <Input
          id={id}
          type={visible ? "text" : "password"}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          required
          minLength={6}
          placeholder={placeholder}
          className="h-12 border-white/10 bg-white/[0.08] pr-12 text-white placeholder:text-zinc-500 focus-visible:ring-red-500"
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-0 top-0 h-12 w-12 text-zinc-400 hover:bg-transparent hover:text-white"
          onClick={onToggle}
        >
          {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          <span className="sr-only">{visible ? "Hide password" : "Show password"}</span>
        </Button>
      </div>
    </div>
  )
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-black/25 p-3">
      <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">{label}</p>
      <p className="mt-1 font-semibold text-white">{value}</p>
    </div>
  )
}

function Agreement({
  id,
  checked,
  onChange,
  label,
  href,
}: {
  id: string
  checked: boolean
  onChange: (checked: boolean) => void
  label: string
  href: string
}) {
  return (
    <div className="flex items-start gap-2">
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={(value) => onChange(value === true)}
        required
        className="mt-1 border-white/30 data-[state=checked]:bg-red-600"
      />
      <Label htmlFor={id} className="text-sm leading-6 text-zinc-400">
        {label}{" "}
        <Link href={href} className="font-semibold text-white hover:text-red-200">
          Read details
        </Link>
      </Label>
    </div>
  )
}
