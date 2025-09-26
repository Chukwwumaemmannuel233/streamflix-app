import Link from "next/link"
import { ChevronLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { VideoCard } from "@/components/video-card"
import { mockVideos, categories } from "@/lib/data"

export default function CategoryPage({ params }: { params: { id: string } }) {
  // Find the category
  const category = categories.find((cat) => cat.id === params.id) || { id: params.id, name: "Category" }

  // Get videos for this category
  const categoryVideos = mockVideos.filter((video) => video.categories.includes(category.id))

  return (
    <div className="min-h-screen bg-background pb-10">
      <div className="container py-6">
        <div className="mb-6 flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/">
              <ChevronLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">{category.name}</h1>
        </div>

        {categoryVideos.length > 0 ? (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {categoryVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        ) : (
          <div className="flex h-[50vh] flex-col items-center justify-center text-center">
            <h2 className="text-2xl font-semibold">No videos found</h2>
            <p className="mt-2 text-muted-foreground">We couldn't find any videos in this category.</p>
            <Button className="mt-4" asChild>
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
