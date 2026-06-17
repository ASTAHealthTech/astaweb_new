"use client"

import { motion, useAnimation, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Lock, ArrowRight, Activity, Shield, Zap, Eye, Brain, Monitor, Bell, Play } from "lucide-react"
import { useEffect, useState } from "react"
import { VideoModal } from "@/components/video-modal"

export function HeroSection1() {
  const [currentWord, setCurrentWord] = useState(0)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [vitalsData, setVitalsData] = useState({
    heartRate: 72,
    respiration: 16,
    bloodPressure: "120/80",
    temperature: 98.6,
    oxygenSat: 98,
  })

  const controls = useAnimation()

  const steps = [
    { id: 1, title: "Computer Vision Capture", icon: Eye, color: "from-blue-500 to-cyan-500" },
    { id: 2, title: "Real-time AI Processing", icon: Brain, color: "from-purple-500 to-pink-500" },
    { id: 3, title: "Intelligent Dashboard", icon: Monitor, color: "from-green-500 to-teal-500" },
    { id: 4, title: "Smart Alert System", icon: Bell, color: "from-orange-500 to-red-500" },
  ]

  const words = ["smart wards", "AI-powered environments", "intelligent spaces", "autonomous care units"];


  // Rotate animated headline words every 4s
  useEffect(() => {
    const wordInterval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length)
    }, 4000)

    return () => clearInterval(wordInterval)
  }, [words.length])

  // Step animation + vitals update every 6s
  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % 4)

      setVitalsData(() => ({
        heartRate: 70 + Math.floor(Math.random() * 10),
        respiration: 14 + Math.floor(Math.random() * 6),
        bloodPressure: Math.random() > 0.8 ? "125/85" : "120/80",
        temperature: 98.2 + Math.random() * 0.8,
        oxygenSat: 96 + Math.floor(Math.random() * 4),
      }))
    }, 6000)

    return () => clearInterval(stepInterval)
  }, [])

  const handleWatchDemo = () => {
    setIsVideoModalOpen(true)
  }

  return (
    <>
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >

            {/* Company Badge */}

           <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm border border-blue-200/30 rounded-full shadow-sm dark:bg-blue-900/80"
            >
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 animate-pulse" />
            <span className="text-sm font-medium text-slate-700 dark:text-white">World's First Device-Agnostic AI Platform</span>
            </motion.div>
            <br /><br />

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="text-gray-900 dark:text-white">Turning ordinary hospital wards into </span>
              <motion.span
                key={currentWord}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent"
              >
                {words[currentWord]}
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl"
            >
              No extra hardware. No new monitors. Just advanced computer vision + real-time AI to monitor vitals, predict alerts, and improve care.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white px-8 py-4 text-lg"
                onClick={() => {
                  window.location.href = "/contact"
                }}
              >
                Request Demo
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            {/*<Button size="lg" variant="outline" className="px-8 py-4 text-lg" onClick={handleWatchDemo}>
                <Play className="mr-2 w-5 h-5" />
                Watch Video
              </Button>*/}
            </motion.div>

            {/* Key Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-6 mt-12 justify-center lg:justify-start"
            >
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <Lock className="w-5 h-5 text-yellow-500 mr-2" />
              IPR Protected
            </div>
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Shield className="w-5 h-5 text-green-500 mr-2" />
                  HIPAA Compliant
              </div>
             <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Activity className="w-5 h-5 text-blue-500 mr-2" />
                AI-Powered
              </div>
            </motion.div>
          </motion.div>
          
        {/* Right Content - Dynamic AI Workflow Animation */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="relative"
        >
          {/* Main Animation Container */}
          <div className="relative bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 overflow-hidden dark:bg-blue-900/20 dark:to-teal-900/20">
            {/* Workflow Steps Indicator */}
            <div className="flex justify-between mb-8">
              {steps.map((step, index) => (
                <motion.div
                  key={step.id}
                  animate={{
                    scale: currentStep === index ? 1.1 : 1,
                    opacity: currentStep === index ? 1 : 0.6,
                  }}
                  className="flex flex-col items-center space-y-2"
                >
                  <div
                    className={`w-12 h-12 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center shadow-lg`}
                  >
                    <step.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-xs font-medium text-center max-w-20">
                    {step.title.split(" ").slice(0, 2).join(" ")}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* AnimatePresence for smooth transitions */}
            <AnimatePresence mode="wait">
              {currentStep === 0 && (
                <motion.div
                  key="step-0"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  {/* Step 1 Content */}
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-2 dark:text-white">Computer Vision Capture</h3>
                    <p className="text-sm text-slate-600 dark:text-gray-300">AI cameras capturing patient data</p>
                  </div>
                  {/* Camera Feed Simulation */}
                  <div className="relative bg-slate-900 rounded-xl h-48 flex items-center justify-center overflow-hidden">
                      {/* Patient Silhouette */}
                      <motion.div
                        animate={{
                          scale: [1, 1.02, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                        }}
                        className="w-24 h-40 bg-gradient-to-b from-blue-300 to-blue-500 rounded-full opacity-70"
                      />

                      {/* AI Scanning Grid */}
                      <motion.div
                        animate={{ opacity: [0.3, 0.8, 0.3] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        className="absolute inset-0 bg-[linear-gradient(90deg,transparent_49%,rgba(59,130,246,0.3)_50%,transparent_51%)] bg-[length:20px_20px]"
                      />

                      {/* Scanning Line */}
                      <motion.div
                        animate={{ y: [-100, 100] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                      />

                      {/* Detection Points */}
                      <motion.div
                        animate={{
                          scale: [0, 1.2, 0],
                          opacity: [0, 1, 0],
                        }}
                        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                        className="absolute top-12 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-red-400 rounded-full"
                      />
                      <motion.div
                        animate={{
                          scale: [0, 1.2, 0],
                          opacity: [0, 1, 0],
                        }}
                        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
                        className="absolute top-20 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-400 rounded-full"
                      />

                      {/* Live Indicator */}
                      <div className="absolute top-4 right-4 flex items-center space-x-2 bg-black/50 px-3 py-1 rounded-full">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        <span className="text-white text-xs font-medium">LIVE</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: AI Processing */}
                {currentStep === 1 && (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                  >
                    {/* Step 2 Content */}
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold text-slate-900 mb-2 dark:text-white">Real-time AI Processing</h3>
                      <p className="text-sm text-slate-600 dark:text-gray-300">Machine learning models extracting vital signs</p>
                    </div>
                    {/* AI Processing Visualization */}
                    <div className="relative bg-gradient-to-br from-purple-900 to-pink-900 rounded-xl h-48 flex items-center justify-center overflow-hidden">
                      {/* Neural Network Visualization */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        {[...Array(3)].map((_, layer) => (
                          <div key={layer} className="flex flex-col space-y-4 mx-8">
                            {[...Array(4)].map((_, node) => (
                              <motion.div
                                key={node}
                                animate={{
                                  scale: [1, 1.3, 1],
                                  opacity: [0.5, 1, 0.5],
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Number.POSITIVE_INFINITY,
                                  delay: layer * 0.3 + node * 0.1,
                                }}
                                className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
                              />
                            ))}
                          </div>
                        ))}
                      </div>

                      {/* Processing Waves */}
                      <motion.div
                        animate={{
                          scale: [1, 2, 1],
                          opacity: [0, 0.3, 0],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Number.POSITIVE_INFINITY,
                        }}
                        className="absolute inset-0 border-2 border-purple-400 rounded-xl"
                      />

                      {/* AI Brain Icon */}
                      <motion.div
                        animate={{
                          rotate: [0, 360],
                        }}
                        transition={{
                          duration: 8,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "linear",
                        }}
                        className="relative z-10"
                      >
                        <Brain className="w-12 h-12 text-purple-300" />
                      </motion.div>

                      {/* Processing Status */}
                      <div className="absolute bottom-4 left-4 right-4 bg-black/50 rounded-lg p-2">
                        <div className="text-purple-300 text-xs font-medium mb-1">Processing Status</div>
                        <motion.div
                          animate={{ width: ["0%", "100%", "0%"] }}
                          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                          className="h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Dashboard */}
                {currentStep === 2 && (
                  <motion.div
                    key="step-2"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                  >
                    {/* Step 3 Content */}
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold text-slate-900 mb-2 dark:text-white">Intelligent Dashboard</h3>
                      <p className="text-sm text-slate-600 dark:text-gray-300">Real-time vitals display</p>
                    </div>
                    {/* Dashboard Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        {
                          label: "Heart Rate",
                          value: vitalsData.heartRate,
                          unit: "BPM",
                          color: "text-red-500 dark:text-red-400",
                          bg: "bg-red-50 dark:bg-red-900/20",
                        },
                        {
                          label: "Respiration",
                          value: vitalsData.respiration,
                          unit: "/min",
                          color: "text-blue-500 dark:text-blue-400",
                          bg: "bg-blue-50 dark:bg-blue-900/20",
                        },
                        {
                          label: "Blood Pressure",
                          value: vitalsData.bloodPressure,
                          unit: "mmHg",
                          color: "text-green-500 dark:text-green-400",
                          bg: "bg-green-50 dark:bg-green-900/20",
                        },
                        {
                          label: "O2 Saturation",
                          value: vitalsData.oxygenSat,
                          unit: "%",
                          color: "text-purple-500 dark:text-purple-400",
                          bg: "bg-purple-50 dark:bg-purple-900/20",
                        },
                      ].map((vital, index) => (
                        <motion.div
                          key={vital.label}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className={`${vital.bg} rounded-lg p-4 border border-white/50`}
                        >
                          <div className="text-xs text-slate-600 mb-1 dark:text-gray-200">{vital.label}</div>
                          <div className={`text-2xl font-bold ${vital.color} mb-1`}>
                            <motion.span
                              key={vital.value}
                              initial={{ scale: 1.2 }}
                              animate={{ scale: 1 }}
                              transition={{ duration: 0.3 }}
                            >
                              {vital.value}
                            </motion.span>
                            <span className="text-xs text-slate-500 ml-1 dark:text-gray-400">{vital.unit}</span>
                          </div>
                          <motion.div
                            animate={{ width: ["0%", "100%"] }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                            className={`h-1 ${vital.color.replace("text-", "bg-")} rounded-full opacity-30`}
                          />
                        </motion.div>
                      ))}
                    </div>

                    {/* Status Indicator */}
                    <div className="text-center">
                      <motion.div
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        className="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium shadow-sm dark:bg-green-900/20 dark:text-green-400"
                      >
                        <Activity className="w-4 h-4 mr-2" />
                        All Vitals Normal
                      </motion.div>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Alert System */}
                {currentStep === 3 && (
                  <motion.div
                    key="step-3"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                  >
                    {/* Step 4 Content */}
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold text-slate-900 mb-2 dark:text-white">Smart Alert System</h3>
                      <p className="text-sm text-slate-600 dark:text-gray-300">AI-driven notifications to healthcare providers</p>
                    </div>
                    {/* Alert Notifications */}
                    <div className="space-y-4">
                      <motion.div
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3 dark:bg-green-900/20 dark:border-green-700"
                      >
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center dark:bg-green-600">
                          <Bell className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                            <div className="font-medium text-green-800 dark:text-green-400">Normal Status</div>
                            <div className="text-sm text-green-600 dark:text-green-500">All patients stable - No alerts</div>
                        </div>
                        <div className="text-xs text-green-500">2 min ago</div>
                      </motion.div>

                      <motion.div
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-center space-x-3 dark:bg-amber-900/20 dark:border-amber-700"
                      >
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                          className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center dark:bg-amber-600">
                          <Zap className="w-4 h-4 text-white" />
                        </motion.div>
                        <div className="flex-1">
                            <div className="font-medium text-amber-800 dark:text-amber-400">Attention Required</div>
                            <div className="text-sm text-amber-600 dark:text-amber-500">Patient vitals trending upward</div>
                        </div>
                        <div className="text-xs text-amber-500">5 min ago</div>
                      </motion.div>

                      <motion.div
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center space-x-3 dark:bg-blue-900/20 dark:border-blue-700"
                      >
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center dark:bg-blue-600">
                          <Brain className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                            <div className="font-medium text-blue-800 dark:text-blue-300">AI Recommendation</div>
                            <div className="text-sm text-blue-600 dark:text-blue-500">Consider routine check in 30 minutes</div>
                        </div>
                        <div className="text-xs text-blue-500">8 min ago</div>
                      </motion.div>
                    </div>

                    {/* Alert Stats */}
                    <div className="grid grid-cols-3 gap-4 pt-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">24</div>
                        <div className="text-xs text-slate-500 dark:text-gray-300">Patients Monitored</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">98.5%</div>
                        <div className="text-xs text-slate-500 dark:text-gray-300">AI Accuracy</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">0</div>
                        <div className="text-xs text-slate-500 dark:text-gray-300">Critical Alerts</div>
                      </div>
                    </div>
                  </motion.div>
                )}
            </AnimatePresence>

                {/* Demo Disclaimer */}
                <br />
                <div className="absolute bottom-3 right-4 text-xs">
                  *Demo Data
                </div>
              </div>
            </motion.div>
            </div>
      </div>

      {/* Hero Section Bottom Border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent"></div>
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
