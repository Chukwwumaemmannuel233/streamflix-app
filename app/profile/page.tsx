import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VideoCard } from "@/components/video-card"
import { mockVideos } from "@/lib/data"
import { Edit, Settings } from "lucide-react"

export default function ProfilePage() {
  // For demo purposes, we'll just use some of the mock videos
  const watchHistory = mockVideos.slice(0, 4)
  const likedVideos = mockVideos.slice(4, 8)

  return (
    <div className="min-h-screen bg-background pb-10">
      <div className="container py-6">
        <div className="mb-8 flex flex-col items-center justify-center gap-4 md:flex-row md:justify-start">
          <div className="relative">
            <Image
              src="/placeholder.svg?height=128&width=128"
              alt="Profile picture"
              width={128}
              height={128}
              className="rounded-full"
            />
            <Button variant="secondary" size="icon" className="absolute bottom-0 right-0 rounded-full">
              <Edit className="h-4 w-4" />
            </Button>
          </div>

          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold">Username</h1>
            <p className="text-muted-foreground">user@example.com</p>
            <p className="text-sm text-muted-foreground">Member since January 2023</p>

            <div className="mt-4 flex justify-center gap-4 md:justify-start">
              <Button>Edit Profile</Button>
              <Button variant="outline">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="history" className="mt-6">
          <TabsList className="mb-6 grid w-full grid-cols-3">
            <TabsTrigger value="history">Watch History</TabsTrigger>
            <TabsTrigger value="liked">Liked Videos</TabsTrigger>
            <TabsTrigger value="playlists">Playlists</TabsTrigger>
          </TabsList>

          <TabsContent value="history" className="mt-0">
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {watchHistory.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="liked" className="mt-0">
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {likedVideos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="playlists" className="mt-0">
            <div className="flex h-40 items-center justify-center rounded-lg border border-dashed">
              <div className="text-center">
                <p className="text-muted-foreground">You haven't created any playlists yet</p>
                <Button className="mt-4">Create Playlist</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
