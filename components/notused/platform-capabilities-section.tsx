"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Eye, Users, Database, Lock, Network, Brain } from "lucide-react"

export function PlatformCapabilitiesSection() {
  const capabilities = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI Anomaly Detection",
      description: "Advanced machine learning algorithms detect critical patterns in real-time",
      color: "from-purple-500 to-purple-600",
      features: ["Pattern Recognition", "Predictive Analytics", "False Positive Reduction"],
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Role-Based Access Control",
      description: "Granular permissions for doctors, nurses, and administrators",
      color: "from-blue-500 to-blue-600",
      features: ["Doctor Access", "Nurse Dashboard", "Admin Controls"],
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "NDHM API Integration",
      description: "Seamless integration with National Digital Health Mission",
      color: "from-green-500 to-green-600",
      features: ["ABHA Integration", "Health Records", "Interoperability"],
    },
  ]

  const securityFeatures = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "End-to-End Encryption",
      description: "AES-256 encryption for all patient data",
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "RBAC Security",
      description: "Role-based access with multi-factor authentication",
    },
    {
      icon: <Network className="w-6 h-6" />,
      title: "Organizational Segregation",
      description: "Complete data isolation between hospitals",
    },
  ]

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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Platform Capabilities</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Comprehensive healthcare technology platform with advanced security and seamless integrations
          </p>
        </motion.div>

        {/* Live Infographic Flow */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-12">Data Flow Architecture</h3>
          <div className="relative">
            <div className="flex items-center justify-between max-w-4xl mx-auto">
              {/* Sensor */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Eye className="w-10 h-10 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Smart Sensors</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">IoT Monitoring</p>
              </motion.div>

              {/* Animated Arrow */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="flex-1 mx-8"
              >
                <div className="relative">
                  <div className="h-1 bg-gradient-to-r from-blue-500 to-teal-500 rounded"></div>
                  <motion.div
                    animate={{ x: [0, 20, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-teal-500 rounded-full"
                  ></motion.div>
                </div>
              </motion.div>

              {/* Secure Cloud */}
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Shield className="w-10 h-10 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Secure Cloud</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">AI Processing</p>
              </motion.div>

              {/* Animated Arrow */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
                className="flex-1 mx-8"
              >
                <div className="relative">
                  <div className="h-1 bg-gradient-to-r from-teal-500 to-purple-500 rounded"></div>
                  <motion.div
                    animate={{ x: [0, 20, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-purple-500 rounded-full"
                  ></motion.div>
                </div>
              </motion.div>

              {/* Dashboard Access */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Dashboard Access</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Multi-Role UI</p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {capabilities.map((capability, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-800 dark:to-blue-900 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${capability.color} rounded-2xl flex items-center justify-center mb-4 text-white`}
                  >
                    {capability.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{capability.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{capability.description}</p>
                  <div className="space-y-2">
                    {capability.features.map((feature, i) => (
                      <div key={i} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Security Visualizations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-slate-900 to-blue-900 rounded-2xl p-8 text-white"
        >
          <h3 className="text-2xl font-bold text-center mb-8">Enterprise Security Features</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {securityFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl"
              >
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  {feature.icon}
                </div>
                <h4 className="font-semibold mb-2">{feature.title}</h4>
                <p className="text-sm opacity-90">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
