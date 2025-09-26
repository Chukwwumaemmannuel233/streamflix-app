"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
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
      active: pathname === "/home",
    },
    {
      href: "/movies",
      label: "Movies",
      active: pathname === "/movies",
    },
    {
      href: "/tv-shows",
      label: "TV Shows",
      active: pathname === "/tv-shows",
    },
    {
      href: "/categories",
      label: "Categories",
      active: pathname === "/categories",
    },
    {
      href: "/my-list",
      label: "My List",
      active: pathname === "/my-list",
    },
    {
      href: "/new",
      label: "New & Popular",
      active: pathname === "/new",
    },
  ]

  if (isMobile) {
    return (
      <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10">
        <div className="flex flex-col space-y-3">
          {routes.map((route) => (
            <Button key={route.href} variant={route.active ? "default" : "ghost"} className="justify-start" asChild>
              <Link href={route.href}>{route.label}</Link>
            </Button>
          ))}
        </div>
      </ScrollArea>
    )
  }

  return (
    <nav className="flex items-center space-x-6 text-sm font-medium">
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "transition-colors hover:text-foreground",
            route.active ? "text-foreground" : "text-muted-foreground",
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  )
}
