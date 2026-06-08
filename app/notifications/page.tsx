"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Bell, Check, Clock, Crown, Film, Info, Sparkles } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ViewerShell } from "@/components/viewer-library"
import { cn } from "@/lib/utils"

const mockNotifications = [
  {
    id: "1",
    type: "new-content",
    title: "New Release: The Last Journey",
    message: "A new premium release is ready to stream tonight.",
    time: "2 hours ago",
    read: false,
    link: "/watch/featured",
  },
  {
    id: "2",
    type: "premium",
    title: "Premium pick matched your taste",
    message: "Cosmic Odyssey is trending with sci-fi viewers this week.",
    time: "Yesterday",
    read: true,
    link: "/watch/1",
  },
  {
    id: "3",
    type: "new-content",
    title: "New studio upload",
    message: "Mystery Box Productions added a thriller to the catalog.",
    time: "2 days ago",
    read: false,
    link: "/watch/2",
  },
  {
    id: "4",
    type: "system",
    title: "Your subscription will renew soon",
    message: "Your premium subscription will automatically renew in 5 days.",
    time: "3 days ago",
    read: true,
    link: "/settings",
  },
  {
    id: "5",
    type: "list",
    title: "New in your list",
    message: "A saved title now has a fresh trailer and studio details.",
    time: "4 days ago",
    read: true,
    link: "/my-list",
  },
]

function getNotificationIcon(type: string) {
  switch (type) {
    case "new-content":
      return Film
    case "premium":
      return Crown
    case "list":
      return Sparkles
    case "system":
      return Info
    default:
      return Bell
  }
}

export default function NotificationsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [notifications, setNotifications] = useState(mockNotifications)

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 650)
    return () => window.clearTimeout(timer)
  }, [])

  const unreadCount = notifications.filter((notification) => !notification.read).length

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
    toast.success("Notifications updated", {
      description: "All viewer alerts were marked as read.",
    })
  }

  const NotificationList = ({ onlyUnread = false }: { onlyUnread?: boolean }) => {
    const list = onlyUnread ? notifications.filter((notification) => !notification.read) : notifications

    if (isLoading) {
      return (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((id) => (
            <div key={id} className="flex gap-4 rounded-lg border border-white/10 bg-white/[0.04] p-4">
              <Skeleton className="h-11 w-11 rounded-lg bg-white/10" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-2/3 bg-white/10" />
                <Skeleton className="h-4 w-full bg-white/10" />
                <Skeleton className="h-3 w-1/4 bg-white/10" />
              </div>
            </div>
          ))}
        </div>
      )
    }

    if (!list.length) {
      return (
        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-10 text-center">
          <Check className="mx-auto h-12 w-12 text-zinc-500" />
          <h2 className="mt-4 text-xl font-bold text-white">All caught up</h2>
          <p className="mt-2 text-sm text-zinc-400">No unread viewer alerts right now.</p>
        </div>
      )
    }

    return (
      <div className="space-y-3">
        {list.map((notification) => {
          const Icon = getNotificationIcon(notification.type)

          return (
            <Link
              key={notification.id}
              href={notification.link}
              className={cn(
                "group flex gap-4 rounded-lg border p-4 transition",
                notification.read
                  ? "border-white/10 bg-white/[0.04] hover:bg-white/[0.07]"
                  : "border-red-500/35 bg-red-500/10 hover:bg-red-500/15",
              )}
            >
              <div
                className={cn(
                  "flex h-11 w-11 shrink-0 items-center justify-center rounded-lg",
                  notification.read ? "bg-white/10 text-zinc-300" : "bg-red-600 text-white",
                )}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-bold text-white">{notification.title}</h3>
                  {!notification.read && <span className="h-2 w-2 rounded-full bg-red-400" />}
                </div>
                <p className="mt-1 text-sm leading-6 text-zinc-400">{notification.message}</p>
                <div className="mt-2 flex items-center text-xs text-zinc-500">
                  <Clock className="mr-1 h-3.5 w-3.5" />
                  {notification.time}
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    )
  }

  return (
    <ViewerShell>
      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(220,38,38,0.22),transparent_32%),#050505]">
        <div className="container flex min-h-[260px] flex-col justify-end gap-6 py-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-200">
              <Bell className="h-3.5 w-3.5 text-red-300" />
              Viewer alerts
            </div>
            <h1 className="text-4xl font-black text-white sm:text-5xl">Notifications</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400">
              Keep track of new releases, premium suggestions, subscription notices, and saved-title updates.
            </p>
          </div>

          <Button
            onClick={markAllAsRead}
            disabled={unreadCount === 0 || isLoading}
            className="w-full bg-red-600 text-white hover:bg-red-500 sm:w-auto"
          >
            <Check className="mr-2 h-4 w-4" />
            Mark all as read
          </Button>
        </div>
      </section>

      <section className="container py-8">
        <div className="mb-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
            <p className="text-sm text-zinc-500">Unread</p>
            <p className="mt-2 text-2xl font-black text-white">{unreadCount}</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
            <p className="text-sm text-zinc-500">Total</p>
            <p className="mt-2 text-2xl font-black text-white">{notifications.length}</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
            <p className="text-sm text-zinc-500">Priority</p>
            <p className="mt-2 text-2xl font-black text-white">Premium</p>
          </div>
        </div>

        <Tabs defaultValue="all">
          <TabsList className="mb-5 grid w-full grid-cols-2 bg-white/10 sm:w-[320px]">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-0">
            <NotificationList />
          </TabsContent>
          <TabsContent value="unread" className="mt-0">
            <NotificationList onlyUnread />
          </TabsContent>
        </Tabs>
      </section>
    </ViewerShell>
  )
}
