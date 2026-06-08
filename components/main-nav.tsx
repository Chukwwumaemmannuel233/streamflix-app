"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Flame, Grid2X2, Heart, Home, MonitorPlay, Tv } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface MainNavProps {
  isMobile?: boolean
}

export function MainNav({ isMobile = false }: MainNavProps) {
  const pathname = usePathname()

  const routes = [
    {
      href: "/home",
      label: "Home",
      desktopLabel: "Home",
      icon: Home,
      active: pathname === "/home" || pathname === "/user-dashboard",
    },
    {
      href: "/movies",
      label: "Movies",
      desktopLabel: "Movies",
      icon: MonitorPlay,
      active: pathname === "/movies",
    },
    {
      href: "/tv-shows",
      label: "TV Shows",
      desktopLabel: "TV Shows",
      icon: Tv,
      active: pathname === "/tv-shows",
    },
    {
      href: "/categories",
      label: "Categories",
      desktopLabel: "Categories",
      icon: Grid2X2,
      active: pathname === "/categories",
    },
    {
      href: "/my-list",
      label: "My List",
      desktopLabel: "My List",
      icon: Heart,
      active: pathname === "/my-list",
    },
    {
      href: "/new",
      label: "New & Popular",
      desktopLabel: "New",
      icon: Flame,
      active: pathname === "/new",
    },
  ]

  if (isMobile) {
    return (
      <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10">
        <div className="flex flex-col space-y-3">
          {routes.map((route) => (
            <Button
              key={route.href}
              variant={route.active ? "default" : "ghost"}
              className={cn(
                "h-11 justify-start gap-3",
                route.active
                  ? "bg-red-600 text-white hover:bg-red-500"
                  : "text-zinc-300 hover:bg-white/10 hover:text-white",
              )}
              asChild
            >
              <Link href={route.href}>
                <route.icon className="h-4 w-4" />
                {route.label}
              </Link>
            </Button>
          ))}
        </div>
      </ScrollArea>
    )
  }

  return (
    <nav className="flex items-center gap-0.5 text-sm font-medium">
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "inline-flex items-center rounded-full px-3 py-2 transition-colors 2xl:px-4",
            route.active ? "bg-white/10 text-white" : "text-zinc-400 hover:bg-white/5 hover:text-white",
          )}
        >
          {route.desktopLabel}
        </Link>
      ))}
    </nav>
  )
}
