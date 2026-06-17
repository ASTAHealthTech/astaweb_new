"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import SpotlightCard from "@/components/ui/SpotlightCard"
import { Activity, MessageSquare, Shield, Users, Database, BarChart3, Camera, Cloud, TrendingUp, Lock } from "lucide-react"

export function RemoteMonitoringFeaturesSection() {
  const features = [
    {
      icon: <Activity className="w-8 h-8" />,
      title: "Remote Vital Monitoring",
      description: "Real-time monitoring of patient vitals (HR, RR, BP, SpO₂, etc.) with live dashboard access",
      color: "from-red-500 to-red-600",
      details: [
        "24x7 Continuous Monitoring",
        "Multi-parameter Tracking",
        "Live Dashboard Access",
        "Real-time Data Sync",
      ],
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Intelligent Alert System",
      description:
        "Personalized threshold management with AI-driven alerts that reduce false positives and improve response times.",
      color: "from-amber-500 to-orange-500",
      details: ["Custom thresholds", "Smart notifications", "Priority routing", "Instant delivery"],
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Data Security & Legal Protection",
      description:
        "Indian Digital Health compliance, with real-time audit logs and patient consent management.",
      color: "from-rose-500 to-pink-500",
      details: ["HIPAA-aligned encryption", "Legal compliance", "Audit logs", "Consent management"],
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "NDHM Integration",
      description: "Fetch patient records using Aadhaar/ABHA ID via NDHM-compliant APIs for unified health data access",
      color: "from-teal-500 to-teal-600",
      details: ["ABHA ID Integration", "NDHM Compliance", "Unified Health Records", "API-based Access"],
      upcoming: true,
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Vital Graphs During Admission",
      description:
        "Graphical representation of all vitals during the admission period for better diagnosis and treatment",
      color: "from-orange-500 to-orange-600",
      details: ["Trend Analysis", "Historical Data", "Visual Insights", "Treatment Planning"],
      upcoming: true,
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Biofeedback & Insights",
      description:
        "Longitudinal patient data with graphical biofeedback dashboards to track trends and anomalies for informed decision-making.",
      color: "from-indigo-500 to-purple-500",
      details: ["Graphical dashboards", "Trend analysis", "Anomaly detection", "Informed decisions"],
      upcoming: true,
    },
  ]

  return (
    <section id="features" className="py-20 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Software as a Medical Device (SAMD) Capabilities
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
          Our breakthrough AI and computer vision platform powers a new generation of Smart Wards—intelligent, scalable, and ready for the future of clinical care. We build AI-native systems that layer seamlessly into clinical environments, delivering real-time intelligence, automation, and visibility without disrupting existing workflows.
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
              {/*<Card className="relative h-full bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-800 dark:to-blue-900 border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-6">*/}
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
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-200/20 to-teal-200/20 backdrop-blur-sm border border-blue-300/30 text-blue-700 dark:text-blue-50 text-xs font-medium px-2 py-1 rounded-full">
                      Coming Soon
                    </div>
                  )}
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{feature.description}</p>

                  <div className="space-y-2">
                    {feature.details.map((detail, i) => (
                      <div key={i} className="flex items-center text-xs text-gray-600 dark:text-gray-300">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                        {detail}
                      </div>
                    ))}
                  </div>
                </SpotlightCard>
                {/*</CardContent>
              </Card>*/}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
