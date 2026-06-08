"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Crown, Play, CheckCircle } from "lucide-react"

import type { VideoType } from "@/lib/types"
import { cn } from "@/lib/utils"

interface VideoCardProps {
  video: VideoType
  className?: string
  showInfo?: boolean
  showStudio?: boolean
}

export function VideoCard({ video, className, showInfo = true, showStudio = true }: VideoCardProps) {
  return (
    <Link href={`/watch/${video.id}`} className={cn("group block", className)}>
      <motion.div
        className="relative overflow-hidden rounded-lg aspect-video"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <Image
          src={video.thumbnail || "/placeholder.svg"}
          alt={video.title}
          width={300}
          height={169}
          className="w-full h-full object-cover transition-transform duration-300"
        />
        <motion.div
          className="absolute inset-0 flex items-center justify-center opacity-0 bg-black/50"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div initial={{ scale: 0 }} whileHover={{ scale: 1 }} transition={{ duration: 0.3 }}>
            <Play className="h-8 w-8 sm:h-12 sm:w-12 text-white fill-white" />
          </motion.div>
        </motion.div>
        {video.access === "premium" && (
          <div className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-md bg-red-600 px-2 py-1 text-[10px] font-bold uppercase text-white shadow-lg">
            <Crown className="h-3 w-3" />
            Premium
          </div>
        )}
      </motion.div>

      {showInfo && (
        <motion.div
          className="mt-2 space-y-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="font-medium line-clamp-1 text-sm sm:text-base">{video.title}</h3>

          {/* Studio Information */}
          {showStudio && video.studio && (
            <div className="flex items-center gap-2">
              <img
                src={video.studio.logo || "/placeholder.svg"}
                alt={video.studio.name}
                className="w-4 h-4 sm:w-5 sm:h-5 rounded-full"
              />
              <span className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1">
                {video.studio.name}
                {video.studio.verified && <CheckCircle className="h-3 w-3 text-blue-500 fill-current" />}
              </span>
            </div>
          )}

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>{video.views.toLocaleString()} views</span>
            <span>-</span>
            <span>{video.year}</span>
            <span>-</span>
            <span>{video.duration}</span>
          </div>
        </motion.div>
      )}
    </Link>
  )
}
