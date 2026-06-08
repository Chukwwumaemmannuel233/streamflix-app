"use client"

import { Flame, Sparkles } from "lucide-react"

import { LibraryHero, VideoSection, ViewerShell } from "@/components/viewer-library"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockVideos } from "@/lib/data"

export default function NewAndPopularPage() {
  const popularVideos = [...mockVideos].sort((a, b) => b.views - a.views)
  const newVideos = mockVideos.slice(0, 6)
  const upcomingVideos = mockVideos.slice(6, 10)
  const featured = popularVideos[0]

  return (
    <ViewerShell>
      <LibraryHero
        title="New, popular, and worth watching"
        eyebrow="Fresh picks"
        description="Track trending titles, new releases, and coming-soon studio uploads from one responsive viewer page."
        featured={featured}
        icon={Flame}
        primaryHref={featured ? `/watch/${featured.id}` : "/home"}
        primaryLabel="Watch trending"
        stats={["Trending now", "New releases", "Coming soon"]}
      />

      <section className="container py-8">
        <Tabs defaultValue="trending">
          <TabsList className="mb-6 grid w-full grid-cols-3 bg-white/10">
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="new">New</TabsTrigger>
            <TabsTrigger value="upcoming">Soon</TabsTrigger>
          </TabsList>

          <TabsContent value="trending" className="mt-0">
            <VideoSection
              title="Trending Now"
              description="Most watched titles across the viewer catalog."
              videos={popularVideos}
            />
          </TabsContent>

          <TabsContent value="new" className="mt-0">
            <VideoSection title="New Releases" description="Freshly surfaced movies and shows." videos={newVideos} />
          </TabsContent>

          <TabsContent value="upcoming" className="mt-0">
            <VideoSection
              title="Coming Soon"
              description="A preview rail for titles studios can schedule and promote."
              videos={upcomingVideos}
              emptyText="Upcoming titles will appear here."
            />
          </TabsContent>
        </Tabs>
      </section>

      <section className="container pb-8">
        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-600/15 text-red-300">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-bold text-white">Viewer note</h2>
              <p className="mt-1 text-sm leading-6 text-zinc-400">
                This page is ready for studio launch schedules, featured drops, trailers, and viewer notification hooks.
              </p>
            </div>
          </div>
        </div>
      </section>
    </ViewerShell>
  )
}
