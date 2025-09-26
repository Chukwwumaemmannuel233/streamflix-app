"use client"

import { useState, useEffect } from "react"
import { Bell, Check, Clock, Film, Info, MessageSquare, ThumbsUp } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"

// Mock notification data
const mockNotifications = [
  {
    id: "1",
    type: "new-content",
    title: "New Release: The Last Journey",
    message: "The highly anticipated sequel is now available to stream.",
    time: "2 hours ago",
    read: false,
    link: "/watch/featured",
  },
  {
    id: "2",
    type: "like",
    title: "Your comment received 5 likes",
    message: "Your comment on 'Cosmic Odyssey' is getting attention.",
    time: "Yesterday",
    read: true,
    link: "/watch/1",
  },
  {
    id: "3",
    type: "reply",
    title: "New reply to your comment",
    message: "Someone replied to your comment on 'The Hidden Truth'.",
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
    type: "new-content",
    title: "New in your watchlist",
    message: "A new episode of 'Digital Frontier' has been added.",
    time: "4 days ago",
    read: true,
    link: "/watch/7",
  },
]

export default function NotificationsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [notifications, setNotifications] = useState(mockNotifications)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({
        ...notification,
        read: true,
      })),
    )
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "new-content":
        return <Film className="h-5 w-5" />
      case "like":
        return <ThumbsUp className="h-5 w-5" />
      case "reply":
        return <MessageSquare className="h-5 w-5" />
      case "system":
        return <Info className="h-5 w-5" />
      default:
        return <Bell className="h-5 w-5" />
    }
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="min-h-screen bg-background pb-10">
      <div className="container py-6">
        <div className="flex items-center justify-between">
          <PageHeader
            title="Notifications"
            description={`You have ${unreadCount} unread notification${unreadCount !== 1 ? "s" : ""}`}
          />

          <Button variant="outline" onClick={markAllAsRead} disabled={unreadCount === 0 || isLoading}>
            <Check className="mr-2 h-4 w-4" />
            Mark all as read
          </Button>
        </div>

        <Tabs defaultValue="all" className="mt-6">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4].map((id) => (
                  <div key={id} className="flex gap-4 rounded-lg border p-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-5 w-2/3" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-1/4" />
                    </div>
                  </div>
                ))}
              </div>
            ) : notifications.length > 0 ? (
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <Link
                    key={notification.id}
                    href={notification.link}
                    className={`flex gap-4 rounded-lg border p-4 transition-colors hover:bg-accent ${
                      !notification.read ? "bg-accent/50" : ""
                    }`}
                  >
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full ${
                        !notification.read ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-medium ${!notification.read ? "font-semibold" : ""}`}>
                        {notification.title}
                      </h3>
                      <p className="text-muted-foreground">{notification.message}</p>
                      <div className="mt-1 flex items-center text-xs text-muted-foreground">
                        <Clock className="mr-1 h-3 w-3" />
                        {notification.time}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="flex h-[50vh] flex-col items-center justify-center text-center">
                <Bell className="h-16 w-16 text-muted-foreground" />
                <h2 className="mt-4 text-2xl font-semibold">No notifications</h2>
                <p className="mt-2 text-muted-foreground">You're all caught up! Check back later for updates.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="unread" className="mt-0">
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2].map((id) => (
                  <div key={id} className="flex gap-4 rounded-lg border p-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-5 w-2/3" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-1/4" />
                    </div>
                  </div>
                ))}
              </div>
            ) : notifications.filter((n) => !n.read).length > 0 ? (
              <div className="space-y-4">
                {notifications
                  .filter((notification) => !notification.read)
                  .map((notification) => (
                    <Link
                      key={notification.id}
                      href={notification.link}
                      className="flex gap-4 rounded-lg border bg-accent/50 p-4 transition-colors hover:bg-accent"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{notification.title}</h3>
                        <p className="text-muted-foreground">{notification.message}</p>
                        <div className="mt-1 flex items-center text-xs text-muted-foreground">
                          <Clock className="mr-1 h-3 w-3" />
                          {notification.time}
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            ) : (
              <div className="flex h-[50vh] flex-col items-center justify-center text-center">
                <Check className="h-16 w-16 text-muted-foreground" />
                <h2 className="mt-4 text-2xl font-semibold">All caught up!</h2>
                <p className="mt-2 text-muted-foreground">You have no unread notifications.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
