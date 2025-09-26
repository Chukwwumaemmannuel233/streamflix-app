"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Search } from "lucide-react"

import { VideoCard } from "@/components/video-card"
import { mockVideos } from "@/lib/data"
import type { VideoType } from "@/lib/types"
import { PageLoading } from "@/components/page-loading"

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [isLoading, setIsLoading] = useState(true)
  const [results, setResults] = useState<VideoType[]>([])

  useEffect(() => {
    setIsLoading(true)

    const timer = setTimeout(() => {
      if (query) {
        const filteredVideos = mockVideos.filter(
          (video) =>
            video.title.toLowerCase().includes(query.toLowerCase()) ||
            video.description.toLowerCase().includes(query.toLowerCase()),
        )
        setResults(filteredVideos)
      } else {
        setResults([])
      }
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [query])

  if (isLoading) {
    return <PageLoading title="Searching..." />
  }

  return (
    <div className="min-h-screen bg-background pb-10">
      <div className="container py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <h1 className="text-3xl font-bold">Search Results</h1>
          {query && (
            <p className="mt-2 text-muted-foreground">
              Results for: <span className="font-medium text-foreground">"{query}"</span>
            </p>
          )}
        </motion.div>

        {results.length > 0 ? (
          <motion.div
            className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {results.map((video) => (
              <motion.div key={video.id} variants={fadeInUp} whileHover={{ y: -5 }}>
                <VideoCard video={video} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="flex h-[50vh] flex-col items-center justify-center text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Search className="h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-2">No results found</h2>
            <p className="text-muted-foreground">Try different keywords or check for typos</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
