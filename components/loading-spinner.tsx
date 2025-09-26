"use client"

import { motion } from "framer-motion"
import { Play } from "lucide-react"

export function LoadingSpinner() {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="text-center">
        <motion.div
          className="relative mb-8"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <div className="w-16 h-16 border-4 border-red-600/20 border-t-red-600 rounded-full"></div>
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
          >
            <Play className="h-6 w-6 text-red-600 fill-current" />
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <h2 className="text-2xl font-bold mb-2 text-white">StreamFlix</h2>
          <motion.p
            className="text-gray-400"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          >
            Loading your entertainment...
          </motion.p>
        </motion.div>
      </div>
    </div>
  )
}
