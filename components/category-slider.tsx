"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { categories } from "@/lib/data"
import { cn } from "@/lib/utils"

export function CategorySlider() {
  const [scrollPosition, setScrollPosition] = useState(0)

  const handleScroll = (direction: "left" | "right") => {
    const container = document.getElementById("category-slider")
    if (!container) return

    const scrollAmount = 200
    const newPosition =
      direction === "left" ? Math.max(0, scrollPosition - scrollAmount) : scrollPosition + scrollAmount

    container.scrollTo({
      left: newPosition,
      behavior: "smooth",
    })

    setScrollPosition(newPosition)
  }

  return (
    <div className="relative mb-8">
      <div
        id="category-slider"
        className="flex gap-2 overflow-x-auto scrollbar-hide py-2 px-1"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {categories.map((category) => (
          <Button key={category.id} variant="outline" className="flex-shrink-0 rounded-full" asChild>
            <Link href={`/categories/${category.id}`}>{category.name}</Link>
          </Button>
        ))}
      </div>

      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "absolute left-0 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm",
          scrollPosition <= 0 && "hidden",
        )}
        onClick={() => handleScroll("left")}
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
        onClick={() => handleScroll("right")}
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  )
}
