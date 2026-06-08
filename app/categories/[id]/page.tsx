"use client"

import Link from "next/link"
import { ChevronLeft, Tag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { EmptyState, LibraryHero, VideoSection, ViewerShell } from "@/components/viewer-library"
import { categories, mockVideos } from "@/lib/data"

export default function CategoryPage({ params }: { params: { id: string } }) {
  const category = categories.find((cat) => cat.id === params.id) || { id: params.id, name: "Category" }
  const categoryVideos = mockVideos.filter((video) => video.categories.includes(category.id))
  const featured = categoryVideos[0] || mockVideos[0]

  return (
    <ViewerShell>
      <LibraryHero
        title={category.name}
        eyebrow="Category"
        description={`Explore ${category.name.toLowerCase()} titles across movies, shows, premium releases, and studio uploads.`}
        featured={featured}
        icon={Tag}
        primaryHref={featured ? `/watch/${featured.id}` : "/categories"}
        primaryLabel={categoryVideos.length ? "Watch featured" : "Browse categories"}
        stats={[`${categoryVideos.length} titles`, "Responsive grid", "Premium visible"]}
      />

      <div className="container pt-6">
        <Button variant="ghost" className="text-zinc-300 hover:bg-white/10 hover:text-white" asChild>
          <Link href="/categories">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Categories
          </Link>
        </Button>
      </div>

      {categoryVideos.length > 0 ? (
        <VideoSection
          title={`${category.name} Titles`}
          description="A clean, mobile-friendly grid for this category."
          videos={categoryVideos}
        />
      ) : (
        <EmptyState
          title="No videos found"
          description="This category is ready for future studio uploads, but it does not have any viewer titles yet."
          actionHref="/categories"
          actionLabel="Browse all categories"
        />
      )}
    </ViewerShell>
  )
}
