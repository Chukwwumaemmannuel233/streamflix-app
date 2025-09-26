"use client"
import { motion, AnimatePresence } from "framer-motion"
import { X, Play, Star, Calendar, Clock, Users } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { VideoType } from "@/lib/types"

interface VideoModalProps {
  video: VideoType | null
  isOpen: boolean
  onClose: () => void
}

export function VideoModal({ video, isOpen, onClose }: VideoModalProps) {
  if (!video) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl bg-background rounded-xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>

            <div className="grid md:grid-cols-2 gap-0">
              {/* Video Thumbnail/Player */}
              <div className="relative aspect-video md:aspect-auto">
                <Image src={video.thumbnail || "/placeholder.svg"} alt={video.title} fill className="object-cover" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer"
                  >
                    <Play className="h-8 w-8 text-white fill-white ml-1" />
                  </motion.div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <h2 className="text-2xl font-bold leading-tight">{video.title}</h2>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="text-sm font-medium">{video.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{video.year}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{video.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{video.views.toLocaleString()} views</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {video.categories?.map((category) => (
                      <Badge key={category} variant="secondary" className="text-xs">
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold">Description</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{video.description}</p>
                </div>

                {/* Studio Info */}
                {video.studio && (
                  <div className="space-y-3">
                    <h3 className="font-semibold">Studio</h3>
                    <div className="flex items-center gap-3">
                      <img
                        src={video.studio.logo || "/placeholder.svg"}
                        alt={video.studio.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <p className="font-medium text-sm">{video.studio.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {video.studio.subscribers?.toLocaleString()} subscribers
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="pt-4 space-y-3">
                  <Button className="w-full bg-red-600 hover:bg-red-700" size="lg">
                    <Play className="mr-2 h-4 w-4 fill-current" />
                    Get Started
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent" size="lg">
                    Add to My List
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
