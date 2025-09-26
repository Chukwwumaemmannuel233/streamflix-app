"use client"

import { motion } from "framer-motion"
import { Skeleton } from "@/components/ui/skeleton"

interface PageLoadingProps {
  title?: string
}

export function PageLoading({ title = "Loading..." }: PageLoadingProps) {
  return (
    <div className="min-h-screen bg-background pb-10">
      <div className="container py-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex items-center gap-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="w-6 h-6 border-2 border-primary/20 border-t-primary rounded-full"
            />
            <h1 className="text-2xl font-bold">{title}</h1>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="space-y-3"
              >
                <Skeleton className="aspect-video w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
