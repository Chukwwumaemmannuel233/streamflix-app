"use client"

import type React from "react"

import { usePathname } from "next/navigation"

interface ConditionalFooterProps {
  children: React.ReactNode
}

export function ConditionalFooter({ children }: ConditionalFooterProps) {
  const pathname = usePathname()

  // Only show footer on landing page
  if (pathname === "/") {
    return <>{children}</>
  }

  return null
}
