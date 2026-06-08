"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Link from "next/link"
import { toast } from "sonner"
import {
  Bell,
  CalendarClock,
  ChevronRight,
  Download,
  LockKeyhole,
  MonitorPlay,
  ShieldCheck,
  SlidersHorizontal,
  UserRound,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { getAccessStatus, getPlanById, getStoredAccount, type AccessStatus, type StoredAccount } from "@/lib/access"

export default function SettingsPage() {
  const [account, setAccount] = useState<StoredAccount | null>(null)
  const [accessStatus, setAccessStatus] = useState<AccessStatus>({
    hasAccount: false,
    isPaid: false,
    isTrialActive: false,
    trialDaysLeft: 0,
  })

  const [autoplay, setAutoplay] = useState(true)
  const [wifiDownloads, setWifiDownloads] = useState(true)
  const [newReleaseAlerts, setNewReleaseAlerts] = useState(true)
  const [billingAlerts, setBillingAlerts] = useState(true)
  const [profileVisible, setProfileVisible] = useState(false)
  const [isSavingProfile, setIsSavingProfile] = useState(false)

  useEffect(() => {
    setAccount(getStoredAccount())
    setAccessStatus(getAccessStatus())
  }, [])

  const activePlan = getPlanById(accessStatus.plan)

  const saveProfileSettings = () => {
    setIsSavingProfile(true)
    setTimeout(() => {
      setIsSavingProfile(false)
      toast.success("Settings saved", {
        description: "Your profile preferences were updated for this session.",
      })
    }, 600)
  }

  const showPreferenceToast = (label: string, enabled: boolean) => {
    toast(enabled ? "Preference enabled" : "Preference disabled", {
      description: `${label} is now ${enabled ? "on" : "off"}.`,
    })
  }

  return (
    <div className="min-h-screen bg-[#050505] pb-12 text-white">
      <div className="container mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <section className="relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.045] p-5 shadow-[0_30px_100px_rgba(0,0,0,0.45)] sm:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_12%,rgba(239,68,68,0.16),transparent_30%),radial-gradient(circle_at_88%_15%,rgba(20,184,166,0.12),transparent_28%)]" />
          <div className="relative">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-xs font-semibold text-zinc-300">
              <SlidersHorizontal className="h-3.5 w-3.5 text-teal-300" />
              Viewer controls
            </div>
            <h1 className="text-4xl font-black sm:text-5xl">Settings</h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-400">
              Manage your profile, playback, notifications, privacy, and billing preferences from one place.
            </p>
          </div>
        </section>

        <div className="mt-6 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          <SettingsPanel icon={UserRound} title="Profile settings" description="Update your viewer identity and contact details.">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="displayName">Display name</Label>
                <Input id="displayName" defaultValue="Username" className="border-white/10 bg-black/25 text-white" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={account?.email || "viewer@streamflix.local"} readOnly className="border-white/10 bg-black/25 text-zinc-400" />
              </div>
            </div>
            <Button className="mt-4 bg-red-600 hover:bg-red-500" disabled={isSavingProfile} onClick={saveProfileSettings}>
              {isSavingProfile ? "Saving..." : "Save profile"}
            </Button>
          </SettingsPanel>

          <SettingsPanel icon={CalendarClock} title="Plan & billing" description="Current subscription and billing status.">
            <div className="rounded-lg border border-white/10 bg-black/25 p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-zinc-500">Current plan</p>
                  <h3 className="mt-1 text-2xl font-black">
                    {accessStatus.isPaid ? activePlan?.name || "Premium" : "Free trial"}
                  </h3>
                  <p className="mt-1 text-sm text-zinc-400">
                    {accessStatus.isPaid
                      ? `Next billing: ${accessStatus.nextBillingAt?.toLocaleDateString() || "scheduled soon"}`
                      : accessStatus.isTrialActive
                        ? `${accessStatus.trialDaysLeft} trial day${accessStatus.trialDaysLeft === 1 ? "" : "s"} left`
                        : "Trial ended"}
                  </p>
                </div>
                <Button className="bg-white font-bold text-black hover:bg-zinc-200" asChild>
                  <Link href="/payment">
                    Manage plan
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </SettingsPanel>

          <SettingsPanel icon={MonitorPlay} title="Playback" description="Control how videos behave on this device.">
            <SettingRow label="Autoplay next title" description="Start the next episode or recommendation automatically.">
              <Switch
                checked={autoplay}
                onCheckedChange={(checked) => {
                  setAutoplay(checked)
                  showPreferenceToast("Autoplay next title", checked)
                }}
              />
            </SettingRow>
            <div className="mt-4 grid gap-2">
              <Label>Default streaming quality</Label>
              <Select defaultValue="auto">
                <SelectTrigger className="border-white/10 bg-black/25 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">Auto</SelectItem>
                  <SelectItem value="hd">HD</SelectItem>
                  <SelectItem value="4k">4K Ultra HD</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </SettingsPanel>

          <SettingsPanel icon={Download} title="Downloads" description="Choose how offline downloads are handled.">
            <SettingRow label="Wi-Fi only downloads" description="Avoid mobile data when saving titles offline.">
              <Switch
                checked={wifiDownloads}
                onCheckedChange={(checked) => {
                  setWifiDownloads(checked)
                  showPreferenceToast("Wi-Fi only downloads", checked)
                }}
              />
            </SettingRow>
            <div className="mt-4 grid gap-2">
              <Label>Download quality</Label>
              <Select defaultValue="high">
                <SelectTrigger className="border-white/10 bg-black/25 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="best">Best available</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </SettingsPanel>

          <SettingsPanel icon={Bell} title="Notifications" description="Decide what StreamFlix should tell you about.">
            <SettingRow label="New release alerts" description="Notify me when saved studios publish something new.">
              <Switch
                checked={newReleaseAlerts}
                onCheckedChange={(checked) => {
                  setNewReleaseAlerts(checked)
                  showPreferenceToast("New release alerts", checked)
                }}
              />
            </SettingRow>
            <SettingRow label="Billing and trial reminders" description="Get reminders before renewal or trial end dates.">
              <Switch
                checked={billingAlerts}
                onCheckedChange={(checked) => {
                  setBillingAlerts(checked)
                  showPreferenceToast("Billing and trial reminders", checked)
                }}
              />
            </SettingRow>
          </SettingsPanel>

          <SettingsPanel icon={LockKeyhole} title="Privacy & security" description="Control visibility and account safety.">
            <SettingRow label="Public viewer profile" description="Allow other viewers to see your public profile and lists.">
              <Switch
                checked={profileVisible}
                onCheckedChange={(checked) => {
                  setProfileVisible(checked)
                  showPreferenceToast("Public viewer profile", checked)
                }}
              />
            </SettingRow>
            <div className="mt-4 rounded-lg border border-teal-400/20 bg-teal-400/[0.06] p-3 text-sm leading-6 text-zinc-300">
              <ShieldCheck className="mb-2 h-4 w-4 text-teal-300" />
              Password and two-factor controls can connect here when authentication is added.
            </div>
          </SettingsPanel>
        </div>
      </div>
    </div>
  )
}

function SettingsPanel({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: typeof SlidersHorizontal
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <section className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
      <div className="mb-5 flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-600">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-xl font-black">{title}</h2>
          <p className="mt-1 text-sm leading-6 text-zinc-400">{description}</p>
        </div>
      </div>
      {children}
    </section>
  )
}

function SettingRow({
  label,
  description,
  children,
}: {
  label: string
  description: string
  children: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/10 py-4 last:border-b-0">
      <div>
        <p className="font-semibold">{label}</p>
        <p className="mt-1 text-sm leading-6 text-zinc-400">{description}</p>
      </div>
      {children}
    </div>
  )
}
