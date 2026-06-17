"use client"

import { motion, useAnimation } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Lock, ArrowRight, Activity, Shield } from "lucide-react"
import { useEffect, useState } from "react"
import { VideoModal } from "@/components/video-modal"
import HeroAnimation from "@/components/ui/HeroAnimation"

export function HeroSection0() {
  const [currentWord, setCurrentWord] = useState(0)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const controls = useAnimation()
  const words = [
    "smart wards",
    "AI-powered environments",
    "intelligent spaces",
    "autonomous care units",
  ]

  useEffect(() => {
    const wordInterval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length)
    }, 4000)
    return () => clearInterval(wordInterval)
  }, [words.length])

  const handleWatchDemo = () => {
    setIsVideoModalOpen(true)
  }

  return (
    <>
      <section className="relative flex flex-col items-center justify-center min-h-screen bg-white dark:bg-[#0b0c10] text-center overflow-hidden px-6">
        {/* Background Animation */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 dark:bg-blue-800 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-50 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-400 dark:bg-teal-800 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-purple-400 dark:bg-purple-800 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
          <div className="flex flex-col items-center justify-center text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm border border-blue-200/30 rounded-full shadow-sm dark:bg-white/10 border border-neutral-200/50 dark:border-white/10 mb-8 backdrop-blur-sm"
            >
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 animate-pulse" />
            <span className="text-sm font-medium text-slate-700 dark:text-white">World's 1st Device-Agnostic AI Platform</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl md:text-6xl font-light text-neutral-900 dark:text-white tracking-tight leading-tight"
            >
              Turning ordinary hospital wards into{" "}
              <motion.span
                key={currentWord}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
                className="font-normal text-neutral-800 dark:text-neutral-100 underline decoration-neutral-400/50 dark:decoration-neutral-300/50 underline-offset-4"
              >
                {words[currentWord]}
              </motion.span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mt-6 text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto"
            >
              No new monitors. Just advanced computer vision + real-time AI to monitor vitals, predict alerts, and improve care.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            >

              {/* Primary CTA */}
              <Button
                size="lg"
                className="bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 px-8 py-4 text-base rounded-full transition-all duration-300"
                onClick={() => (window.location.href = "/contact")}
              >
                Request Demo
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>

              {/* Secondary CTA – login to software */}
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-4 text-base rounded-full border-neutral-300 dark:border-neutral-600 bg-white/70 dark:bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-300"
                onClick={() => (window.location.href = "https://web.astahealthtech.net")}
              >
                Login to Software
              </Button>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-neutral-500 dark:text-neutral-400"
            >
              <div className="flex items-center">
                <Lock className="w-4 h-4 mr-2 text-neutral-400" /> IPR Protected
              </div>
              {/* <div className="flex items-center">
                <Shield className="w-4 h-4 mr-2 text-neutral-400" /> HIPAA Compliant
              </div> */}
              <div className="flex items-center">
                <Activity className="w-4 h-4 mr-2 text-neutral-400" /> AI-Powered
              </div>
            </motion.div>

            {/* Right Animation (kept for future use) */}
            {/* <HeroAnimation /> */}
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoSrc="/product-intro.mp4"
        title="ASTA Health Tech - Smart Hospital Ward Monitoring Demo"
      />
    </>
  )
}
