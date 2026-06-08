"use client"

import { useEffect, useMemo, useState } from "react"
import { Search } from "lucide-react"

import { EmptyState, LibraryHero, VideoSection, ViewerShell } from "@/components/viewer-library"
import { mockVideos } from "@/lib/data"
import type { VideoType } from "@/lib/types"

export default function SearchPage() {
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [results, setResults] = useState<VideoType[]>([])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setQuery(params.get("q") || "")
  }, [])

  useEffect(() => {
    setIsLoading(true)
    const timer = window.setTimeout(() => {
      const normalizedQuery = query.trim().toLowerCase()

      if (!normalizedQuery) {
        setResults([])
        setIsLoading(false)
        return
      }

      setResults(
        mockVideos.filter(
          (video) =>
            video.title.toLowerCase().includes(normalizedQuery) ||
            video.description.toLowerCase().includes(normalizedQuery) ||
            video.creator.name.toLowerCase().includes(normalizedQuery) ||
            video.categories.some((category) => category.includes(normalizedQuery)),
        ),
      )
      setIsLoading(false)
    }, 450)

    return () => window.clearTimeout(timer)
  }, [query])

  const suggested = useMemo(() => mockVideos.filter((video) => video.categories.includes("trending")).slice(0, 5), [])
  const featured = results[0] || suggested[0] || mockVideos[0]

  return (
    <ViewerShell>
      <LibraryHero
        title={query ? `Search: ${query}` : "Search the viewer library"}
        eyebrow="Search"
        description="Find movies, series, studios, categories, and premium titles quickly across the StreamFlix catalog."
        featured={featured}
        icon={Search}
        primaryHref={featured ? `/watch/${featured.id}` : "/home"}
        primaryLabel={query && results.length ? "Play top result" : "Browse home"}
        stats={[isLoading ? "Searching" : `${results.length} results`, "Fast filters", "Mobile friendly"]}
      />

      {isLoading ? (
        <VideoSection title="Searching" description="Checking title, studio, description, and category matches." videos={[]} emptyText="Searching the catalog..." />
      ) : query && results.length > 0 ? (
        <VideoSection title="Results" description={`Showing matches for "${query}".`} videos={results} />
      ) : query ? (
        <EmptyState
          title="No results found"
          description="Try a studio name, genre, movie title, or a shorter keyword."
          actionHref="/categories"
          actionLabel="Browse categories"
        />
      ) : (
        <VideoSection title="Popular Searches" description="Start with trending titles while you search." videos={suggested} />
      )}
    </ViewerShell>
  )
}
