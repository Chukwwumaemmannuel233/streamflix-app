"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { VideoCard } from "@/components/video-card"
import { CategorySlider } from "@/components/category-slider"
import { FeaturedVideo } from "@/components/featured-video"
import { mockVideos, categories } from "@/lib/data"
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

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <PageLoading title="Loading your content..." />
  }

  // Get featured video (first video in the list)
  const featuredVideo = mockVideos[0]

  // Group videos by category
  const videosByCategory = categories.map((category) => {
    return {
      ...category,
      videos: mockVideos.filter((video) => video.categories.includes(category.id)).slice(0, 10),
    }
  })

  return (
    <div className="min-h-screen bg-background pb-10">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
        <FeaturedVideo video={featuredVideo} />
      </motion.div>

      <div className="container py-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <CategorySlider />
        </motion.div>

        {videosByCategory.map(
          (category, index) =>
            category.videos.length > 0 && (
              <motion.section
                key={category.id}
                className="mb-10"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">{category.name}</h2>
                  <Button variant="link" asChild>
                    <Link href={`/categories/${category.id}`}>See all</Link>
                  </Button>
                </div>

                <motion.div
                  className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
                  variants={staggerContainer}
                  initial="initial"
                  animate="animate"
                >
                  {category.videos.map((video) => (
                    <motion.div key={video.id} variants={fadeInUp} whileHover={{ y: -5 }}>
                      <VideoCard video={video} />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.section>
            ),
        )}
      </div>
    </div>
  )
}
