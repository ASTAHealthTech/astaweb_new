"use client"

import { motion } from "framer-motion"
import { PlayCircle } from "lucide-react"

export function FramedVideoSection() {
  return (
    <section className="relative py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:to-blue-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-medium text-gray-900 dark:text-white mb-4">
            Real-time Clinical AI in Action
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Watch how our platform transforms standard ward footage into live clinical insights with no extra hardware.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative mx-auto max-w-5xl rounded-xl overflow-hidden shadow-2xl ring-1 ring-slate-200 dark:ring-slate-700"
        >
          <div className="aspect-w-16 aspect-h-9">
            <video
              src="/vid.mp4"
              controls
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
