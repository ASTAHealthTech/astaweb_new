"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Globe, DollarSign, Target } from "lucide-react"

export function MarketOpportunitySection() {
  const marketData = [
    {
      region: "India",
      size: "$2.74B",
      growth: "12.5%",
      description: "Patient monitoring market by 2027",
    },
    {
      region: "Global",
      size: "$45.8B",
      growth: "8.9%",
      description: "Healthcare IoT market opportunity",
    },
    {
      region: "Asia-Pacific",
      size: "$15.2B",
      growth: "15.3%",
      description: "Fastest growing region for health tech",
    },
  ]

  const segments = [
    {
      name: "ICU Monitoring",
      value: 35,
      color: "from-blue-500 to-blue-600",
    },
    {
      name: "Remote Patient Monitoring",
      value: 28,
      color: "from-teal-500 to-teal-600",
    },
    {
      name: "Emergency Care",
      value: 22,
      color: "from-purple-500 to-purple-600",
    },
    {
      name: "Chronic Disease Management",
      value: 15,
      color: "from-green-500 to-green-600",
    },
  ]

  return (
    <section id="market" className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Massive Market Opportunity
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            The healthcare monitoring market is experiencing unprecedented growth, driven by increasing demand for
            real-time patient care and AI-powered solutions
          </p>
        </motion.div>

        {/* Market Size Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {marketData.map((market, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-800 dark:to-blue-900 border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Globe className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{market.region}</h3>
                  <div className="text-3xl font-bold text-blue-600 mb-2">{market.size}</div>
                  <div className="text-green-600 font-medium mb-2">+{market.growth} CAGR</div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{market.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Market Segments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Market Segments & Opportunities
          </h3>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Target Market Breakdown</h4>
              <div className="space-y-4">
                {segments.map((segment, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded bg-gradient-to-r ${segment.color}`}></div>
                      <span className="text-gray-700 dark:text-gray-300">{segment.name}</span>
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-white">{segment.value}%</span>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-800 dark:to-blue-900 rounded-2xl p-8">
              <div className="relative h-64">
                {/* Simplified Chart Visualization */}
                <div className="absolute inset-0 flex items-end justify-center space-x-4">
                  {segments.map((segment, index) => (
                    <motion.div
                      key={index}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${segment.value * 2}%` }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                      viewport={{ once: true }}
                      className={`w-12 bg-gradient-to-t ${segment.color} rounded-t-lg`}
                    ></motion.div>
                  ))}
                </div>
              </div>
              <div className="text-center mt-6">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Projected Growth</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Healthcare monitoring market segments showing strong growth potential
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Key Drivers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-2xl p-8 text-white"
        >
          <h3 className="text-2xl font-bold text-center mb-8">Market Growth Drivers</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-90" />
              <h4 className="font-semibold mb-2">Aging Population</h4>
              <p className="text-sm opacity-90">Increasing elderly population requiring intensive care</p>
            </div>
            <div className="text-center">
              <DollarSign className="w-12 h-12 mx-auto mb-4 opacity-90" />
              <h4 className="font-semibold mb-2">Cost Pressures</h4>
              <p className="text-sm opacity-90">Need for efficient, cost-effective healthcare solutions</p>
            </div>
            <div className="text-center">
              <Target className="w-12 h-12 mx-auto mb-4 opacity-90" />
              <h4 className="font-semibold mb-2">Technology Adoption</h4>
              <p className="text-sm opacity-90">Rapid adoption of AI and IoT in healthcare</p>
            </div>
            <div className="text-center">
              <Globe className="w-12 h-12 mx-auto mb-4 opacity-90" />
              <h4 className="font-semibold mb-2">Global Expansion</h4>
              <p className="text-sm opacity-90">Expanding healthcare infrastructure worldwide</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
