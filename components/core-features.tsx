"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Activity, MessageSquare, ArrowRight, Lock } from "lucide-react"
import SpotlightCard from "@/components/ui/SpotlightCard"

export function CoreFeaturesSection() {
  const features = [
    {
      icon: <Activity className="w-8 h-8" />,
      title: "Remote Vital Monitoring",
      description: "Real-time tracking of vitals (HR, RR, BP, SpO₂) across wards with live dashboard access.",
      color: "from-red-500 to-red-600",
      details: [
        "24x7 Continuous Monitoring",
        "Multi-parameter Tracking",
        "Live Dashboard Access",
        "Real-time Data Sync",
      ],
      upcoming: false,
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Intelligent Alert System",
      description: "AI-driven alerts with personalized thresholds that reduce false positives and notify relevant staff instantly.",
      color: "from-amber-500 to-orange-500",
      details: ["Custom Thresholds", "Smart Notifications", "Priority Routing", "Instant Delivery"],
      upcoming: false,
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Data Security & Compliance",
      description: "NDHM-ready, with full patient consent tracking and legal audit logs.",
      color: "from-rose-500 to-pink-500",
      details: ["Legal Compliance", "Audit Logs", "Consent Management", "Encryption Standards"],
      upcoming: false,
    },
  ]  

  return (
    <section id="key-features" className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-medium text-gray-900 dark:text-white mb-4">
            Core Capabilities That Power Smart Wards
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
          We engineer AI-native systems that integrate with any clinical setting while delivering real-time intelligence, critical alerts, and airtight data compliance, without changing existing workflows.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
                <SpotlightCard
                  className="
                    relative h-full rounded-2xl overflow-hidden
                    bg-gradient-to-br 
                    from-white via-slate-50 to-blue-50 
                    dark:from-slate-900 dark:via-slate-800 dark:to-blue-950
                    shadow-[0_4px_25px_rgba(0,0,0,0.06)]
                    hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)]
                    transition-all duration-300 group
                    border-0 ring-1 ring-slate-200/60 dark:ring-slate-700/40
                  "
                  spotlightColor="rgba(0, 229, 255, 0.2)"
                >
                  {feature.upcoming && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-200/40 to-teal-200/40 dark:from-blue-500/30 dark:to-teal-500/30 backdrop-blur-sm text-blue-700 dark:text-blue-100 text-xs font-medium px-2 py-1 rounded-full">
                      Coming Soon
                    </div>
                  )}

                  {/* Icon bubble */}
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform duration-300`}
                  >
                    {feature.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {feature.description}
                  </p>

                  {/* Details */}
                  <div className="space-y-2">
                    {feature.details.map((detail, i) => (
                      <div
                        key={i}
                        className="flex items-center text-xs text-gray-700 dark:text-gray-300"
                      >
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                        {detail}
                      </div>
                    ))}
                  </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <motion.a
            href="/solutions#features"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium 
              bg-gradient-to-r from-indigo-600 to-blue-600 text-white 
              hover:from-indigo-700 hover:to-blue-700 
              dark:from-indigo-500 dark:to-blue-500 
              dark:hover:from-indigo-600 dark:hover:to-blue-600 
              shadow-md dark:shadow-none transition-all duration-200"
          >
            View All Features
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        </div>
      </div>
    </section>
  )
}
