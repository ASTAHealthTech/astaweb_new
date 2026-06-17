"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import {
  MessageSquare,
  Clock,
  Phone,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Camera,
  FileImage,
  Video,
  Download,
} from "lucide-react"
import { useState, useEffect } from "react"

export function SMSAlertsSection() {
  const [alertDemo, setAlertDemo] = useState(0)
  const [responseTime, setResponseTime] = useState(0)
  const [documentationDemo, setDocumentationDemo] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setAlertDemo((prev) => (prev + 1) % 4)
      setDocumentationDemo((prev) => (prev + 1) % 3)
      if (alertDemo === 3) {
        setResponseTime(45) // 45 seconds response time
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [alertDemo])

  const alertSteps = [
    {
      title: "Vitals Threshold Breach",
      description: "Heart rate drops below 50 BPM",
      icon: <AlertTriangle className="w-6 h-6" />,
      color: "bg-red-500",
      status: "critical",
    },
    {
      title: "Cloud Processing",
      description: "AI validates the anomaly",
      icon: <MessageSquare className="w-6 h-6" />,
      color: "bg-blue-500",
      status: "processing",
    },
    {
      title: "SMS Alert Sent",
      description: "Doctor receives instant notification",
      icon: <Phone className="w-6 h-6" />,
      color: "bg-orange-500",
      status: "sent",
    },
    {
      title: "Response Confirmed",
      description: "Doctor acknowledges and responds",
      icon: <CheckCircle className="w-6 h-6" />,
      color: "bg-green-500",
      status: "completed",
    },
  ]

  const documentationSteps = [
    {
      title: "Automatic Photo Capture",
      description: "High-resolution patient monitoring photos",
      icon: <Camera className="w-6 h-6" />,
      color: "bg-purple-500",
      data: "2.4MP Images • Every 30 seconds",
    },
    {
      title: "Video Recording",
      description: "Continuous video documentation",
      icon: <Video className="w-6 h-6" />,
      color: "bg-indigo-500",
      data: "1080p HD • 24/7 Recording",
    },
    {
      title: "Secure Storage",
      description: "HIPAA-compliant cloud storage",
      icon: <FileImage className="w-6 h-6" />,
      color: "bg-teal-500",
      data: "Encrypted • 7-year retention",
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Real-Time SMS Alert System & Visual Documentation
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Instant notifications with comprehensive visual documentation ensure healthcare providers respond to
            critical situations within seconds
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          {/* SMS Alert Demo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-800 dark:to-blue-900 border-0 shadow-xl">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
                  Live Alert Demonstration
                </h3>

                {/* Alert Flow Visualization */}
                <div className="space-y-6">
                  {alertSteps.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0.3, scale: 0.95 }}
                      animate={{
                        opacity: index <= alertDemo ? 1 : 0.3,
                        scale: index === alertDemo ? 1.05 : 0.95,
                      }}
                      transition={{ duration: 0.5 }}
                      className={`flex items-center p-4 rounded-xl ${
                        index <= alertDemo ? "bg-white dark:bg-slate-700 shadow-lg" : "bg-gray-100 dark:bg-slate-800"
                      }`}
                    >
                      <div
                        className={`w-12 h-12 ${step.color} rounded-full flex items-center justify-center text-white mr-4 ${
                          index === alertDemo ? "animate-pulse" : ""
                        }`}
                      >
                        {step.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 dark:text-white">{step.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{step.description}</p>
                      </div>
                      {index < alertSteps.length - 1 && (
                        <ArrowRight className={`w-5 h-5 ${index < alertDemo ? "text-green-500" : "text-gray-400"}`} />
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Response Time Display */}
                {alertDemo === 3 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl text-center"
                  >
                    <Clock className="w-8 h-8 text-green-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-600 mb-1">{responseTime}s</div>
                    <div className="text-sm text-green-700 dark:text-green-300">Total Response Time</div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Visual Documentation Demo */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border-0 shadow-xl">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
                  Visual Documentation System
                </h3>

                <div className="space-y-6">
                  {documentationSteps.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0.3, scale: 0.95 }}
                      animate={{
                        opacity: index <= documentationDemo ? 1 : 0.3,
                        scale: index === documentationDemo ? 1.05 : 0.95,
                      }}
                      transition={{ duration: 0.5 }}
                      className={`p-4 rounded-xl ${
                        index <= documentationDemo
                          ? "bg-white dark:bg-slate-700 shadow-lg"
                          : "bg-gray-100 dark:bg-slate-800"
                      }`}
                    >
                      <div className="flex items-center mb-3">
                        <div
                          className={`w-10 h-10 ${step.color} rounded-lg flex items-center justify-center text-white mr-3 ${
                            index === documentationDemo ? "animate-pulse" : ""
                          }`}
                        >
                          {step.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 dark:text-white">{step.title}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{step.description}</p>
                        </div>
                      </div>
                      <div className="ml-13 text-xs text-blue-600 dark:text-blue-400 font-medium">{step.data}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Documentation Stats */}
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-slate-700 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-purple-600">50GB</div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">Daily Storage</div>
                  </div>
                  <div className="bg-white dark:bg-slate-700 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-indigo-600">99.9%</div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">Uptime</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Enhanced SMS Flow and Documentation Features */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* SMS Alert Flow */}
          <Card className="bg-white dark:bg-slate-800 border-0 shadow-xl">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">SMS Alert Flow</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
                    <span className="text-red-600 font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Critical Event Detected</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      AI algorithms identify anomalous vital signs patterns
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Instant Cloud Processing</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Secure cloud validates and prioritizes the alert
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                    <span className="text-orange-600 font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Multi-Channel Notification</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      SMS, app push, and dashboard alerts sent simultaneously
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                    <span className="text-green-600 font-bold text-sm">4</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Response Tracking</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      System tracks acknowledgment and response times
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Response Metrics */}
          <Card className="bg-gradient-to-r from-blue-600 to-teal-600 text-white border-0">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Response Time Metrics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm opacity-90">Average Alert Delivery</span>
                  <span className="text-xl font-bold">&lt;30s</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm opacity-90">Average Response Time</span>
                  <span className="text-xl font-bold">2min</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm opacity-90">Delivery Success Rate</span>
                  <span className="text-xl font-bold">99.9%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm opacity-90">Monitoring Coverage</span>
                  <span className="text-xl font-bold">24/7</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Visual Documentation Features */}
          <Card className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-0">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Documentation Features</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Camera className="w-4 h-4 mr-2" />
                  <span className="text-sm">Automated Photo Capture</span>
                </div>
                <div className="flex items-center">
                  <Video className="w-4 h-4 mr-2" />
                  <span className="text-sm">Continuous Video Recording</span>
                </div>
                <div className="flex items-center">
                  <FileImage className="w-4 h-4 mr-2" />
                  <span className="text-sm">Secure Cloud Storage</span>
                </div>
                <div className="flex items-center">
                  <Download className="w-4 h-4 mr-2" />
                  <span className="text-sm">Easy Export & Sharing</span>
                </div>
                <div className="mt-4 pt-4 border-t border-white/20">
                  <div className="text-xs opacity-75">Storage Capacity</div>
                  <div className="text-lg font-bold">Unlimited</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
