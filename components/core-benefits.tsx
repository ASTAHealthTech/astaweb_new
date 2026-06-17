"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import {
  DollarSign,
  Brain,
  Bell,
  Lock,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export function CoreBenefits() {

  const coreBenefits = [
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: "No CAPEX. Predictable OPEX.",
      description: "Subscription-based model ensures zero upfront investment",
      color: "from-green-500 to-emerald-600",
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Smart Monitoring Without Clinical Risk",
      description: "Real-time, high-fidelity data that supports clinicians",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: "Instant Alerts to the Right People",
      description: "Real-time notifications with 30-60 seconds of video context",
      color: "from-orange-500 to-red-600",
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Your Data. Your Control.",
      description: "All data resides securely on your servers with full sovereignty",
      color: "from-teal-500 to-teal-600",
    },
  ]

  return (
    <section className="py-20 bg-white dark:bg-slate-900 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-medium text-gray-900 dark:text-white mb-4">
            Discover the Advantage
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            These four core benefits are what make us the most practical, powerful way to upgrade any hospital ward
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreBenefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card className="relative h-full rounded-2xl overflow-hidden
                  bg-gradient-to-br 
                  from-white via-slate-50 to-blue-50 
                  dark:from-slate-950/80 dark:via-slate-900/70 dark:to-slate-800/60
                  backdrop-blur-xl
                  shadow-[0_4px_25px_rgba(0,0,0,0.06)]
                  hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)]
                  transition-all duration-300 group
                  border-0 ring-1 ring-slate-200/60 dark:ring-slate-700/40">
                <CardContent className="p-6">
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${benefit.color} rounded-xl flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform duration-300`}
                  >
                    {benefit.icon}
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {benefit.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* View All Benefits CTA */}
        <div className="mt-12 flex justify-center">
          <motion.a
            href="/benefits"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium 
              bg-gradient-to-r from-blue-600 to-indigo-600 text-white 
              hover:from-blue-700 hover:to-indigo-700 
              dark:from-blue-500 dark:to-indigo-500 
              dark:hover:from-blue-600 dark:hover:to-indigo-600 
              shadow-md dark:shadow-none transition-all duration-200"
          >
            View All Benefits
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to See ASTA in Action?</h3>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              Schedule a personalized demo and see how our AI-powered hospital ward monitoring can transform your critical care
              operations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary"
                onClick={() => {
                  window.location.href = "/contact"
                }}
              >
                Request Demo
              </Button>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
