"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Eye, Brain, Monitor, Bell, Activity, Zap } from "lucide-react"
import { useEffect, useState } from "react"

export default function HeroAnimation() {
  const steps = [
    { id: 1, title: "Computer Vision Capture", icon: Eye, color: "from-blue-500 to-cyan-500" },
    { id: 2, title: "Real-time AI Processing", icon: Brain, color: "from-purple-500 to-pink-500" },
    { id: 3, title: "Intelligent Dashboard", icon: Monitor, color: "from-green-500 to-teal-500" },
    { id: 4, title: "Smart Alert System", icon: Bell, color: "from-orange-500 to-red-500" },
  ]

  const [currentStep, setCurrentStep] = useState(0)
  const [vitalsData, setVitalsData] = useState({
    heartRate: 72,
    respiration: 16,
    bloodPressure: "120/80",
    temperature: 98.6,
    oxygenSat: 98,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % 4)
      setVitalsData(() => ({
        heartRate: 70 + Math.floor(Math.random() * 10),
        respiration: 14 + Math.floor(Math.random() * 6),
        bloodPressure: Math.random() > 0.8 ? "125/85" : "120/80",
        temperature: 98.2 + Math.random() * 0.8,
        oxygenSat: 96 + Math.floor(Math.random() * 4),
      }))
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 0.4 }}
      className="relative"
    >
      <div className="relative bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 overflow-hidden dark:bg-blue-900/20 dark:to-teal-900/20">
        {/* Steps Header */}
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
              <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center shadow-lg`}>
                <step.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-xs font-medium text-center max-w-20">
                {step.title.split(" ").slice(0, 2).join(" ")}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Steps Animation */}
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
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2 dark:text-white">Computer Vision Capture</h3>
                <p className="text-sm text-slate-600 dark:text-gray-300">AI cameras capturing patient data</p>
              </div>
              <div className="relative bg-slate-900 rounded-xl h-48 flex items-center justify-center overflow-hidden">
                <motion.div
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-24 h-40 bg-gradient-to-b from-blue-300 to-blue-500 rounded-full opacity-70"
                />
                <motion.div
                  animate={{ opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-[linear-gradient(90deg,transparent_49%,rgba(59,130,246,0.3)_50%,transparent_51%)] bg-[length:20px_20px]"
                />
                <motion.div
                  animate={{ y: [-100, 100] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                />
                <motion.div
                  animate={{ scale: [0, 1.2, 0], opacity: [0, 1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute top-12 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-red-400 rounded-full"
                />
                <div className="absolute top-4 right-4 flex items-center space-x-2 bg-black/50 px-3 py-1 rounded-full">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-white text-xs font-medium">LIVE</span>
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2 dark:text-white">Real-time AI Processing</h3>
                <p className="text-sm text-slate-600 dark:text-gray-300">Machine learning models extracting vital signs</p>
              </div>
              <div className="relative bg-gradient-to-br from-purple-900 to-pink-900 rounded-xl h-48 flex items-center justify-center overflow-hidden">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="relative z-10"
                >
                  <Brain className="w-12 h-12 text-purple-300" />
                </motion.div>
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2 dark:text-white">Intelligent Dashboard</h3>
                <p className="text-sm text-slate-600 dark:text-gray-300">Real-time vitals display</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Heart Rate", value: vitalsData.heartRate, unit: "BPM", color: "text-red-500" },
                  { label: "Respiration", value: vitalsData.respiration, unit: "/min", color: "text-blue-500" },
                  { label: "Blood Pressure", value: vitalsData.bloodPressure, unit: "mmHg", color: "text-green-500" },
                  { label: "O2 Saturation", value: vitalsData.oxygenSat, unit: "%", color: "text-purple-500" },
                ].map((vital) => (
                  <div key={vital.label} className="bg-white/50 dark:bg-slate-900/30 p-4 rounded-lg shadow border border-white/20">
                    <div className="text-xs text-slate-600 dark:text-gray-300">{vital.label}</div>
                    <div className={`text-2xl font-bold ${vital.color}`}>
                      {vital.value}
                      <span className="text-xs ml-1">{vital.unit}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2 dark:text-white">Smart Alert System</h3>
                <p className="text-sm text-slate-600 dark:text-gray-300">AI-driven notifications to healthcare providers</p>
              </div>
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex items-center justify-center bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-700"
              >
                <Bell className="w-6 h-6 text-green-500 mr-3" />
                <span className="font-medium text-green-600 dark:text-green-300">All Systems Normal</span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute bottom-3 right-4 text-xs">*Demo Data</div>
      </div>
    </motion.div>
  )
}
