"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import {
  ArrowLeft,
  BadgeCheck,
  CalendarClock,
  Check,
  CreditCard,
  Crown,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  activatePaidPlan,
  formatPlanPrice,
  getAccessStatus,
  subscriptionPlans,
  type BillingCycle,
  type PlanType,
} from "@/lib/access"

export default function PaymentPage() {
  const router = useRouter()
  const [reason, setReason] = useState<string | null>(null)
  const [returnTo, setReturnTo] = useState("/home")
  const [selectedPlan, setSelectedPlan] = useState<Exclude<PlanType, "free-trial">>("premium")
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly")
  const [isLoading, setIsLoading] = useState(false)
  const accessStatus = getAccessStatus()

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    setReason(searchParams.get("reason"))
    setReturnTo(searchParams.get("returnTo") || "/home")
  }, [])

  const selectedPlanDetails = useMemo(
    () => subscriptionPlans.find((plan) => plan.id === selectedPlan) || subscriptionPlans[0],
    [selectedPlan],
  )

  const heading =
    reason === "trial-ended"
      ? "Keep your StreamFlix access"
      : reason === "premium"
        ? "Unlock premium streaming"
        : "Choose your StreamFlix plan"

  const message =
    reason === "trial-ended"
      ? "Your 7-day trial has done its job. Pick a plan to continue watching without losing your list."
      : reason === "premium"
        ? "This premiere is reserved for paid members. Upgrade now and we will bring you right back."
        : "Start simple, upgrade only when you need premium titles, downloads, or more screens."

  const billingLabel = billingCycle === "yearly" ? "year" : "month"
  const dueToday = formatPlanPrice(selectedPlanDetails, billingCycle)
  const yearlySavings = Math.round((selectedPlanDetails.monthlyPrice * 12 - selectedPlanDetails.yearlyPrice) * 100) / 100

  const handleActivatePlan = () => {
    setIsLoading(true)
    setTimeout(() => {
      activatePaidPlan(selectedPlan, billingCycle)
      setIsLoading(false)
      toast.success(`${selectedPlanDetails.name} activated`, {
        description: `Your ${billingCycle} plan is ready. Premium titles are now unlocked.`,
      })
      router.push(returnTo)
    }, 900)
  }

  return (
    <div className="min-h-screen bg-[#050505] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Link href={returnTo} className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-white">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>

        <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr]">
          <section className="relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.045] p-6 shadow-[0_30px_100px_rgba(0,0,0,0.45)] sm:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(239,68,68,0.18),transparent_30%),radial-gradient(circle_at_88%_20%,rgba(20,184,166,0.14),transparent_28%)]" />
            <div className="relative">
              <Link href="/home" className="mb-8 inline-flex items-center gap-3">
                <img src="/logo.png" alt="StreamFlix" className="h-11 w-11 rounded-lg" />
                <span className="text-2xl font-black">StreamFlix</span>
              </Link>

              <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-black/30 px-4 py-2 text-sm text-zinc-300">
                <Sparkles className="h-4 w-4 text-teal-300" />
                Payment only when it matters
              </div>
              <h1 className="max-w-2xl text-4xl font-black leading-tight sm:text-6xl">{heading}</h1>
              <p className="mt-5 max-w-xl text-sm leading-6 text-zinc-400 sm:text-base sm:leading-7">{message}</p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  { icon: Crown, label: "Premium titles" },
                  { icon: Zap, label: "4K playback" },
                  { icon: LockKeyhole, label: "Secure checkout" },
                ].map((item) => (
                  <div key={item.label} className="rounded-lg border border-white/10 bg-black/25 p-4">
                    <item.icon className="h-5 w-5 text-red-300" />
                    <p className="mt-3 text-sm font-semibold text-zinc-200">{item.label}</p>
                  </div>
                ))}
              </div>

              {accessStatus.isTrialActive && !accessStatus.isPaid && (
                <div className="mt-6 rounded-lg border border-teal-400/20 bg-teal-400/[0.06] p-4 text-sm leading-6 text-teal-100">
                  You still have {accessStatus.trialDaysLeft} free trial day{accessStatus.trialDaysLeft === 1 ? "" : "s"} left for standard titles.
                  Premium titles unlock immediately after upgrade.
                </div>
              )}
            </div>
          </section>

          <section className="rounded-lg border border-white/10 bg-white/[0.045] p-4 shadow-[0_30px_90px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:p-6">
            <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-red-600">
                  <CreditCard className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-2xl font-black">Plans & billing</h2>
                  <p className="text-sm text-zinc-400">Upgrade now, manage later.</p>
                </div>
              </div>

              <div className="grid grid-cols-2 rounded-lg border border-white/10 bg-black/30 p-1">
                {(["monthly", "yearly"] as BillingCycle[]).map((cycle) => (
                  <button
                    key={cycle}
                    type="button"
                    onClick={() => setBillingCycle(cycle)}
                    className={`rounded-md px-4 py-2 text-sm font-bold capitalize transition ${
                      billingCycle === cycle ? "bg-white text-black" : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    {cycle}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              {subscriptionPlans.map((plan) => (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`relative rounded-lg border p-4 text-left transition ${
                    selectedPlan === plan.id
                      ? "border-red-400 bg-red-500/[0.09]"
                      : "border-white/10 bg-black/25 hover:border-white/25"
                  }`}
                >
                  {plan.highlighted && (
                    <span className="absolute right-3 top-3 rounded-full bg-red-600 px-2 py-1 text-[10px] font-black uppercase text-white">
                      Popular
                    </span>
                  )}
                  <h3 className="pr-20 text-xl font-black">{plan.name}</h3>
                  <p className="mt-1 text-sm text-zinc-400">{plan.note}</p>
                  <div className="mt-5">
                    <span className="text-3xl font-black">{formatPlanPrice(plan, billingCycle)}</span>
                    <span className="text-sm text-zinc-500">/{billingLabel}</span>
                  </div>
                  {billingCycle === "yearly" && (
                    <p className="mt-1 text-xs font-semibold text-teal-300">
                      Save ${yearlySavings.toFixed(2)} each year
                    </p>
                  )}
                  <div className="mt-5 grid gap-2">
                    {[plan.quality, plan.devices, ...plan.features].map((feature) => (
                      <div key={feature} className="flex items-start gap-2 text-sm leading-5 text-zinc-300">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal-300" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-5 rounded-lg border border-white/10 bg-black/30 p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-bold">Order summary</p>
                  <p className="mt-1 text-sm text-zinc-400">
                    {selectedPlanDetails.name} plan, billed {billingCycle}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-black">{dueToday}</p>
                  <p className="text-xs text-zinc-500">due today</p>
                </div>
              </div>
              <div className="mt-4 grid gap-2 text-sm text-zinc-400">
                <div className="flex items-center justify-between">
                  <span>Premium unlock</span>
                  <span>Immediate</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Next billing cycle</span>
                  <span>{billingCycle === "yearly" ? "12 months" : "1 month"}</span>
                </div>
              </div>
            </div>

            <Button
              onClick={handleActivatePlan}
              disabled={isLoading}
              className="mt-5 h-12 w-full bg-red-600 text-base font-bold text-white hover:bg-red-500"
            >
              <CreditCard className="h-4 w-4" />
              {isLoading ? "Activating..." : `Activate ${selectedPlanDetails.name}`}
            </Button>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="flex items-start gap-2 rounded-lg border border-white/10 bg-black/25 p-3 text-sm leading-6 text-zinc-400">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-teal-300" />
                Demo checkout for now. Production can connect to Stripe, Paystack, or Flutterwave.
              </div>
              <div className="flex items-start gap-2 rounded-lg border border-white/10 bg-black/25 p-3 text-sm leading-6 text-zinc-400">
                <CalendarClock className="mt-0.5 h-4 w-4 shrink-0 text-red-300" />
                You can change or cancel from your profile billing area.
              </div>
            </div>

            <Link href={returnTo} className="mt-4 flex items-center justify-center gap-2 text-sm font-semibold text-zinc-300 hover:text-white">
              <BadgeCheck className="h-4 w-4" />
              Not now
            </Link>
          </section>
        </div>
      </div>
    </div>
  )
}
