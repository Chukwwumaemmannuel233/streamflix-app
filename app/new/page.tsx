import { VideoCard } from "@/components/video-card"
import { mockVideos } from "@/lib/data"
import { PageHeader } from "@/components/page-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function NewAndPopularPage() {
  // Sort videos by views to get popular ones
  const popularVideos = [...mockVideos].sort((a, b) => b.views - a.views)

  // For demo purposes, we'll just use the same videos but pretend some are new
  const newVideos = mockVideos.slice(0, 6)

  // For demo purposes, we'll just use the same videos but pretend some are upcoming
  const upcomingVideos = mockVideos.slice(6, 10)

  return (
    <div className="min-h-screen bg-background pb-10">
      <div className="container py-6">
        <PageHeader title="New & Popular" description="Discover what's trending, new releases, and upcoming content." />

        <Tabs defaultValue="trending" className="mt-6">
          <TabsList className="mb-6 grid w-full grid-cols-3">
            <TabsTrigger value="trending">Trending Now</TabsTrigger>
            <TabsTrigger value="new">New Releases</TabsTrigger>
            <TabsTrigger value="upcoming">Coming Soon</TabsTrigger>
          </TabsList>

          <TabsContent value="trending" className="mt-0">
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {popularVideos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="new" className="mt-0">
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {newVideos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="upcoming" className="mt-0">
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {upcomingVideos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
