"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Users, Building2, Clock, TrendingUp } from "lucide-react"

interface StatItemProps {
  icon: React.ReactNode
  value: number
  label: string
  suffix?: string
  delay?: number
}

function StatItem({ icon, value, label, suffix = "", delay = 0 }: StatItemProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      const increment = value / 100
      const counter = setInterval(() => {
        setCount((prev) => {
          if (prev < value) {
            return Math.min(prev + increment, value)
          }
          clearInterval(counter)
          return value
        })
      }, 20)
    }, delay)

    return () => clearTimeout(timer)
  }, [value, delay])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className="text-center"
    >
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-teal-600 rounded-2xl mb-4">
        {icon}
      </div>
      <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
        {Math.floor(count).toLocaleString()}
        {suffix}
      </div>
      <div className="text-gray-600 dark:text-gray-300 font-medium">{label}</div>
    </motion.div>
  )
}

export function StatsSection() {
  return (
    <section className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Trusted by Healthcare Leaders
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our AI-powered ICU monitoring system is making a real difference in hospitals across India and beyond
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <StatItem
            icon={<Users className="w-8 h-8 text-white" />}
            value={50000}
            label="Patients Monitored"
            suffix="+"
            delay={0.1}
          />
          <StatItem
            icon={<Building2 className="w-8 h-8 text-white" />}
            value={25}
            label="Hospitals Onboarded"
            suffix="+"
            delay={0.2}
          />
          <StatItem
            icon={<Clock className="w-8 h-8 text-white" />}
            value={99.9}
            label="Uptime Reliability"
            suffix="%"
            delay={0.3}
          />
          <StatItem
            icon={<TrendingUp className="w-8 h-8 text-white" />}
            value={40}
            label="Faster Response Time"
            suffix="%"
            delay={0.4}
          />
        </div>

        {/* Key Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 grid md:grid-cols-3 gap-8"
        >
          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/20 rounded-2xl">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Early Detection</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Detect critical events 15 minutes faster than traditional monitoring
            </p>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Reduced Mortality</h3>
            <p className="text-gray-600 dark:text-gray-300">
              25% reduction in ICU mortality rates with our AI monitoring
            </p>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Cost Savings</h3>
            <p className="text-gray-600 dark:text-gray-300">Average 30% reduction in ICU operational costs</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
