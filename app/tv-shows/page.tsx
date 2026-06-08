"use client"

import { useMemo, useState } from "react"

import { FilterChips, LibraryHero, VideoSection, ViewerShell, libraryIcons } from "@/components/viewer-library"
import { mockVideos } from "@/lib/data"

const filters = ["All", "Drama", "Comedy", "Documentary", "Animation", "Trending", "Standard"]

export default function TVShowsPage() {
  const [activeFilter, setActiveFilter] = useState("All")

  const shows = useMemo(
    () =>
      mockVideos.filter((video) =>
        video.categories.some((category) => ["drama", "comedy", "documentary", "animation", "trending", "romance"].includes(category)),
      ),
    [],
  )

  const filteredShows = shows.filter((video) => {
    if (activeFilter === "All") return true
    if (activeFilter === "Standard") return video.access !== "premium"
    return video.categories.includes(activeFilter.toLowerCase())
  })

  const featured = shows.find((video) => video.categories.includes("trending")) || shows[0]

  return (
    <ViewerShell>
      <LibraryHero
        title="Series and shows built for easy watching"
        eyebrow="TV shows"
        description="Find binge-friendly stories, factual series, comedy specials, and episodic favorites without the clutter."
        featured={featured}
        icon={libraryIcons.tv}
        primaryHref={featured ? `/watch/${featured.id}` : undefined}
        stats={[`${shows.length} shows`, "Fresh episodes", "Viewer-first layout"]}
      />

      <div className="container pt-8">
        <FilterChips items={filters} active={activeFilter} onChange={setActiveFilter} />
      </div>

      <VideoSection
        title={activeFilter === "All" ? "All TV Shows" : `${activeFilter} Shows`}
        description="Designed to scan quickly on desktop and feel natural on mobile."
        videos={filteredShows}
      />

      <VideoSection
        title="Continue With These"
        description="Series-style picks based on drama, comedy, documentary, and trending rails."
        videos={shows.slice(0, 5)}
      />
    </ViewerShell>
  )
}
