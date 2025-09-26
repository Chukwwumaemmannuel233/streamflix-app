import Link from "next/link"
import Image from "next/image"
import { Play, Info } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { VideoType } from "@/lib/types"

interface FeaturedVideoProps {
  video: VideoType
}

export function FeaturedVideo({ video }: FeaturedVideoProps) {
  return (
    <div className="relative h-[50vh] md:h-[70vh] w-full overflow-hidden">
      <Image src={video.thumbnail || "/placeholder.svg"} alt={video.title} fill className="object-cover" priority />
      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent" />
      <div className="absolute bottom-0 left-0 p-6 md:p-10 max-w-3xl">
        <h1 className="mb-2 text-3xl md:text-5xl font-bold text-white">{video.title}</h1>
        <div className="flex gap-2 items-center mb-4 text-sm text-white/80">
          <span>{video.year}</span>
          <span className="w-1 h-1 rounded-full bg-white/80"></span>
          <span>{video.duration}</span>
          <span className="w-1 h-1 rounded-full bg-white/80"></span>
          <span>{video.rating}</span>
        </div>
        <p className="mb-6 text-white/90 line-clamp-3 md:line-clamp-4 max-w-xl">{video.description}</p>
        <div className="flex gap-3">
          <Button asChild size="lg" className="gap-2">
            <Link href={`/watch/${video.id}`}>
              <Play className="h-5 w-5 fill-current" /> Play
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="gap-2">
            <Info className="h-5 w-5" /> More Info
          </Button>
        </div>
      </div>
    </div>
  )
}
