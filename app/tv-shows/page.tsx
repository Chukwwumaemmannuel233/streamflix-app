"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { VideoCard } from "@/components/video-card"
import { mockVideos } from "@/lib/data"
import { PageHeader } from "@/components/page-header"
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

export default function TVShowsPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <PageLoading title="Loading TV Shows..." />
  }

  const tvShows = mockVideos.filter(
    (video) =>
      video.categories.includes("comedy") ||
      video.categories.includes("drama") ||
      video.categories.includes("documentary"),
  )

  return (
    <div className="min-h-screen bg-background pb-10">
      <div className="container py-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <PageHeader title="TV Shows" description="Binge-worthy series for every mood" />
        </motion.div>

        <motion.section className="mb-10" variants={staggerContainer} initial="initial" animate="animate">
          <motion.h2 className="mb-6 text-2xl font-semibold" variants={fadeInUp}>
            Popular Shows
          </motion.h2>
          <motion.div
            className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
            variants={staggerContainer}
          >
            {tvShows.slice(0, 5).map((video) => (
              <motion.div key={video.id} variants={fadeInUp} whileHover={{ y: -5 }}>
                <VideoCard video={video} />
              </motion.div>
            ))}
          </motion.div>
        </motion.section>
      </div>
    </div>
  )
}
