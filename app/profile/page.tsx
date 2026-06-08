"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { BadgeCheck, CalendarClock, Crown, Edit, Heart, Play, Settings, ShieldCheck, UserRound } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { VideoCard } from "@/components/video-card"
import { mockVideos } from "@/lib/data"
import { cancelPaidPlan, getAccessStatus, getPlanById, getStoredAccount, type AccessStatus, type StoredAccount } from "@/lib/access"

export default function ProfilePage() {
  const [account, setAccount] = useState<StoredAccount | null>(null)
  const [accessStatus, setAccessStatus] = useState<AccessStatus>({
    hasAccount: false,
    isPaid: false,
    isTrialActive: false,
    trialDaysLeft: 0,
  })
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [displayName, setDisplayName] = useState("Username")
  const [bio, setBio] = useState("Film lover. Weekend binge watcher. Always saving the next premiere.")

  useEffect(() => {
    setAccount(getStoredAccount())
    setAccessStatus(getAccessStatus())
  }, [])

  const watchHistory = mockVideos.slice(0, 4)
  const likedVideos = mockVideos.slice(4, 8)
  const activePlan = getPlanById(accessStatus.plan)
  const displayEmail = account?.email || "viewer@streamflix.local"
  const displayPlan = accessStatus.isPaid ? activePlan?.name || "Premium" : "7-day free trial"

  const handleCancelPlan = () => {
    cancelPaidPlan()
    setAccount(getStoredAccount())
    setAccessStatus(getAccessStatus())
    toast.success("Plan cancelled", {
      description: "Your demo plan was returned to trial mode.",
    })
  }

  const handleSaveProfile = () => {
    setIsEditOpen(false)
    toast.success("Profile updated", {
      description: "Your display name and bio were saved for this session.",
    })
  }

  return (
    <div className="min-h-screen bg-[#050505] pb-12 text-white">
      <div className="container mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <section className="relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.045] p-5 shadow-[0_30px_100px_rgba(0,0,0,0.45)] sm:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_15%,rgba(239,68,68,0.17),transparent_30%),radial-gradient(circle_at_88%_18%,rgba(20,184,166,0.13),transparent_28%)]" />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="relative mx-auto sm:mx-0">
                <Image
                  src="/placeholder-user.jpg"
                  alt="Profile picture"
                  width={112}
                  height={112}
                  className="h-28 w-28 rounded-full border border-white/15 object-cover"
                />
                <Button
                  size="icon"
                  className="absolute bottom-0 right-0 h-9 w-9 rounded-full bg-red-600 hover:bg-red-500"
                  onClick={() => setIsEditOpen(true)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </div>

              <div className="text-center sm:text-left">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-xs font-semibold text-zinc-300">
                  <UserRound className="h-3.5 w-3.5 text-teal-300" />
                  Viewer profile
                </div>
                <h1 className="text-3xl font-black sm:text-4xl">{displayName}</h1>
                <p className="mt-2 text-sm text-zinc-400">{displayEmail}</p>
                <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-400">{bio}</p>
                <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
                  <span className="inline-flex items-center gap-1 rounded-full bg-red-600 px-2.5 py-1 text-xs font-bold text-white">
                    <Crown className="h-3 w-3" />
                    {displayPlan}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.06] px-2.5 py-1 text-xs font-semibold text-zinc-300">
                    <BadgeCheck className="h-3 w-3 text-teal-300" />
                    Member since 2026
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <Button className="bg-white font-bold text-black hover:bg-zinc-200" onClick={() => setIsEditOpen(true)}>
                <Edit className="h-4 w-4" />
                Edit Profile
              </Button>
              <Button
                variant="outline"
                className="border-white/15 bg-white/[0.06] font-bold text-white hover:bg-white/12 hover:text-white"
                asChild
              >
                <Link href="/settings">
                  <Settings className="h-4 w-4" />
                  Settings
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <SubscriptionCard accessStatus={accessStatus} onCancelPlan={handleCancelPlan} />
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: "Watch hours", value: "127", icon: Play },
              { label: "Saved titles", value: "18", icon: Heart },
              { label: "Secure profile", value: "On", icon: ShieldCheck },
            ].map((stat) => (
              <div key={stat.label} className="rounded-lg border border-white/10 bg-white/[0.045] p-4">
                <stat.icon className="h-5 w-5 text-teal-300" />
                <div className="mt-4 text-2xl font-black">{stat.value}</div>
                <div className="text-sm text-zinc-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        <Tabs defaultValue="history" className="mt-8">
          <TabsList className="mb-6 grid w-full grid-cols-3 border border-white/10 bg-white/[0.045]">
            <TabsTrigger value="history">Watch History</TabsTrigger>
            <TabsTrigger value="liked">Liked</TabsTrigger>
            <TabsTrigger value="playlists">Playlists</TabsTrigger>
          </TabsList>

          <TabsContent value="history" className="mt-0">
            <VideoGrid videos={watchHistory} />
          </TabsContent>

          <TabsContent value="liked" className="mt-0">
            <VideoGrid videos={likedVideos} />
          </TabsContent>

          <TabsContent value="playlists" className="mt-0">
            <div className="flex min-h-48 items-center justify-center rounded-lg border border-dashed border-white/15 bg-white/[0.035] p-6">
              <div className="text-center">
                <Heart className="mx-auto h-10 w-10 text-zinc-500" />
                <p className="mt-4 text-zinc-400">You have not created any playlists yet.</p>
                <Button className="mt-4 bg-red-600 hover:bg-red-500">Create Playlist</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="border-white/10 bg-[#08080b] text-white sm:max-w-xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black">Edit profile</DialogTitle>
            <DialogDescription>Update the viewer details people see on this account.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="displayName">Display name</Label>
              <Input
                id="displayName"
                value={displayName}
                onChange={(event) => setDisplayName(event.target.value)}
                className="border-white/10 bg-white/[0.06] text-white"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" value={displayEmail} disabled className="border-white/10 bg-white/[0.04] text-zinc-400" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={bio}
                onChange={(event) => setBio(event.target.value)}
                className="min-h-28 border-white/10 bg-white/[0.06] text-white"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" className="border-white/15 bg-transparent text-white hover:bg-white/10" onClick={() => setIsEditOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-500" onClick={handleSaveProfile}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function SubscriptionCard({
  accessStatus,
  onCancelPlan,
}: {
  accessStatus: AccessStatus
  onCancelPlan: () => void
}) {
  const activePlan = getPlanById(accessStatus.plan)

  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-xs font-semibold text-zinc-300">
            <CalendarClock className="h-3.5 w-3.5 text-red-300" />
            Subscription
          </div>
          <h2 className="text-2xl font-black">
            {accessStatus.isPaid ? `${activePlan?.name || "Premium"} active` : "Free trial"}
          </h2>
          <p className="mt-2 text-sm leading-6 text-zinc-400">
            {accessStatus.isPaid
              ? `Your next billing date is ${
                  accessStatus.nextBillingAt?.toLocaleDateString() || "scheduled soon"
                }.`
              : accessStatus.isTrialActive
                ? `${accessStatus.trialDaysLeft} trial day${accessStatus.trialDaysLeft === 1 ? "" : "s"} left. Premium titles unlock with a plan.`
                : "Your trial has ended. Choose a plan to keep watching."}
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:min-w-40">
          <Button className="bg-red-600 font-bold hover:bg-red-500" asChild>
            <Link href="/payment">{accessStatus.isPaid ? "Change Plan" : "View Plans"}</Link>
          </Button>
          {accessStatus.isPaid && (
            <Button
              variant="outline"
              className="border-white/15 bg-transparent text-white hover:bg-white/10 hover:text-white"
              onClick={onCancelPlan}
            >
              Cancel demo plan
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

function VideoGrid({ videos }: { videos: typeof mockVideos }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  )
}
