"use client"

import { useEffect, useMemo, useState } from "react"

import { FilterChips, LibraryHero, VideoSection, ViewerShell, libraryIcons } from "@/components/viewer-library"
import { mockVideos } from "@/lib/data"

const filters = ["All", "Action", "Drama", "Sci-Fi", "Thriller", "Adventure", "Premium"]

export default function MoviesPage() {
  const [activeFilter, setActiveFilter] = useState("All")
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setIsReady(true), 500)
    return () => window.clearTimeout(timer)
  }, [])

  const movies = useMemo(
    () =>
      mockVideos.filter((video) =>
        video.categories.some((category) => ["action", "drama", "sci-fi", "thriller", "adventure", "fantasy"].includes(category)),
      ),
    [],
  )

  const filteredMovies = movies.filter((video) => {
    if (activeFilter === "All") return true
    if (activeFilter === "Premium") return video.access === "premium"
    return video.categories.includes(activeFilter.toLowerCase())
  })

  const featured = movies.find((video) => video.access === "premium") || movies[0]

  return (
    <ViewerShell>
      <LibraryHero
        title="Movies that feel made for tonight"
        eyebrow="Movie library"
        description="Browse premium premieres, studio releases, and sharp independent films in one calm, cinematic space."
        featured={featured}
        icon={libraryIcons.movies}
        primaryHref={featured ? `/watch/${featured.id}` : undefined}
        stats={[`${movies.length} movies`, "Premium picks", "Mobile ready"]}
      />

      <div className="container pt-8">
        <FilterChips items={filters} active={activeFilter} onChange={setActiveFilter} />
      </div>

      <VideoSection
        title={activeFilter === "All" ? "All Movies" : `${activeFilter} Movies`}
        description={isReady ? "Curated from your viewer catalog with clear premium labels." : "Loading a polished catalog view."}
        videos={filteredMovies}
      />

      <VideoSection
        title="Studio Picks"
        description="High-signal releases from verified studios and production companies."
        videos={movies.filter((video) => video.studio?.verified).slice(0, 5)}
      />
    </ViewerShell>
  )
}
