import type { VideoType } from "@/lib/types"

export const TRIAL_DAYS = 7
export const STREAMFLIX_ACCOUNT_KEY = "streamflix-account"

export type AccountType = "viewer" | "studio"
export type PlanType = "free-trial" | "premium" | "family"
export type BillingCycle = "monthly" | "yearly"

export type SubscriptionPlan = {
  id: Exclude<PlanType, "free-trial">
  name: string
  monthlyPrice: number
  yearlyPrice: number
  note: string
  audience: string
  devices: string
  quality: string
  features: string[]
  highlighted?: boolean
}

export type StoredAccount = {
  email: string
  type: AccountType
  plan: PlanType
  billingCycle?: BillingCycle
  trialStartedAt: string
  trialEndsAt: string
  paidStartedAt?: string
  nextBillingAt?: string
}

export type AccessStatus = {
  hasAccount: boolean
  isPaid: boolean
  isTrialActive: boolean
  trialDaysLeft: number
  plan?: PlanType
  billingCycle?: BillingCycle
  trialEndsAt?: Date
  nextBillingAt?: Date
}

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "premium",
    name: "Premium",
    monthlyPrice: 9.99,
    yearlyPrice: 99.99,
    note: "Best for most viewers",
    audience: "Personal streaming",
    devices: "4 devices",
    quality: "4K Ultra HD",
    highlighted: true,
    features: ["Unlock premium titles", "Download for offline watching", "No ads during playback", "Early access premieres"],
  },
  {
    id: "family",
    name: "Family",
    monthlyPrice: 14.99,
    yearlyPrice: 149.99,
    note: "For shared homes",
    audience: "Households",
    devices: "6 devices",
    quality: "4K Ultra HD",
    features: ["Everything in Premium", "5 viewer profiles", "Parental controls", "Family watchlists"],
  },
]

export function createTrialAccount(email: string, type: AccountType = "viewer"): StoredAccount {
  const trialStartedAt = new Date()
  const trialEndsAt = new Date(trialStartedAt)
  trialEndsAt.setDate(trialEndsAt.getDate() + TRIAL_DAYS)

  return {
    email,
    type,
    plan: "free-trial",
    billingCycle: "monthly",
    trialStartedAt: trialStartedAt.toISOString(),
    trialEndsAt: trialEndsAt.toISOString(),
  }
}

export function getStoredAccount(): StoredAccount | null {
  if (typeof window === "undefined") return null

  try {
    const rawAccount = window.localStorage.getItem(STREAMFLIX_ACCOUNT_KEY)
    return rawAccount ? (JSON.parse(rawAccount) as StoredAccount) : null
  } catch {
    return null
  }
}

export function saveStoredAccount(account: StoredAccount) {
  if (typeof window === "undefined") return
  window.localStorage.setItem(STREAMFLIX_ACCOUNT_KEY, JSON.stringify(account))
}

export function activatePaidPlan(plan: Exclude<PlanType, "free-trial"> = "premium", billingCycle: BillingCycle = "monthly") {
  const existingAccount = getStoredAccount()
  const account =
    existingAccount ||
    createTrialAccount("viewer@streamflix.local", "viewer")
  const paidStartedAt = new Date()
  const nextBillingAt = new Date(paidStartedAt)
  nextBillingAt.setMonth(nextBillingAt.getMonth() + (billingCycle === "yearly" ? 12 : 1))

  saveStoredAccount({
    ...account,
    plan,
    billingCycle,
    paidStartedAt: paidStartedAt.toISOString(),
    nextBillingAt: nextBillingAt.toISOString(),
  })
}

export function cancelPaidPlan() {
  const account = getStoredAccount()
  if (!account) return

  saveStoredAccount({
    ...account,
    plan: "free-trial",
    billingCycle: "monthly",
    paidStartedAt: undefined,
    nextBillingAt: undefined,
  })
}

export function getAccessStatus(account = getStoredAccount()): AccessStatus {
  if (!account) {
    return {
      hasAccount: false,
      isPaid: false,
      isTrialActive: false,
      trialDaysLeft: 0,
    }
  }

  const trialEndsAt = new Date(account.trialEndsAt)
  const isPaid = account.plan !== "free-trial"
  const millisecondsLeft = trialEndsAt.getTime() - Date.now()
  const trialDaysLeft = Math.max(0, Math.ceil(millisecondsLeft / 86400000))

  return {
    hasAccount: true,
    isPaid,
    isTrialActive: millisecondsLeft > 0,
    trialDaysLeft,
    plan: account.plan,
    billingCycle: account.billingCycle || "monthly",
    trialEndsAt,
    nextBillingAt: account.nextBillingAt ? new Date(account.nextBillingAt) : undefined,
  }
}

export function formatPlanPrice(plan: SubscriptionPlan, billingCycle: BillingCycle) {
  return `$${(billingCycle === "yearly" ? plan.yearlyPrice : plan.monthlyPrice).toFixed(2)}`
}

export function getPlanById(planId?: PlanType) {
  return subscriptionPlans.find((plan) => plan.id === planId)
}

export function canWatchVideo(video: VideoType, status = getAccessStatus()) {
  if (status.isPaid) return true
  if (!status.isTrialActive) return false

  return video.access !== "premium"
}

export function getWatchBlockReason(video: VideoType, status = getAccessStatus()) {
  if (canWatchVideo(video, status)) return null

  if (!status.hasAccount) {
    return {
      title: "Start your 7-day free trial",
      message: "Create a quick account to watch standard titles for 7 days. Premium titles can be unlocked whenever you choose a plan.",
      action: "Start free trial",
    }
  }

  if (!status.isTrialActive) {
    return {
      title: "Your 7-day free trial has ended",
      message: "Choose a plan to keep your library, history, and recommendations moving.",
      action: "Choose a plan",
    }
  }

  if (video.access === "premium") {
    return {
      title: "Premium title",
      message: "This title needs a paid plan, even during the free trial. Upgrade now and come right back.",
      action: "View plans",
    }
  }

  return {
    title: "Payment needed",
    message: "Choose a plan to continue watching.",
    action: "View plans",
  }
}
