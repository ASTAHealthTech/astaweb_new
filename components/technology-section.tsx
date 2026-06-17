"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye } from "lucide-react"
import {
  MonitorIcon as Sensors,
  Cloud,
  Monitor,
  Brain,
  Shield,
  ArrowRight,
  Activity,
  Bell,
  Database,
} from "lucide-react"

export function TechnologySection() {
  const flowSteps = [
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Computer Vision AI Cameras",
      description: "Advanced AI-powered cameras capture patient vitals through computer vision",
      color: "from-blue-500 to-blue-600",
      detail: "Non-contact vital monitoring",
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Intelligent Processing",
      description: "Real-time AI analysis processes visual data and extracts vital signs",
      color: "from-purple-500 to-purple-600",
      detail: "Machine learning algorithms",
    },
    {
      icon: <Monitor className="w-8 h-8" />,
      title: "Smart Dashboard",
      description: "Processed data displayed on intuitive dashboards for medical professionals",
      color: "from-teal-500 to-teal-600",
      detail: "Role-based access control",
    },
    {
      icon: <Bell className="w-8 h-8" />,
      title: "Instant Alerts",
      description: "Automated alerts sent to doctors and authorized medical staff",
      color: "from-green-500 to-green-600",
      detail: "Real-time notifications",
    },
  ]

  const features = [
    {
      icon: <Activity className="w-5 h-5" />,
      title: "Real-time Monitoring",
      description: "Continuous patient surveillance with sub-second response times",
    },
    {
      icon: <Bell className="w-5 h-5" />,
      title: "Intelligent Alerts",
      description: "AI-powered notifications that reduce false positives by 90%",
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Regulatory Compliance",
      description: "HIPAA, and international healthcare standards compliant",
    },
    {
      icon: <Database className="w-5 h-5" />,
      title: "Seamless Integration",
      description: "Works with existing hospital infrastructure and EMR systems",
    },
  ]

  return (
    <section
      id="technology"
      className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our cutting-edge platform combines multi-parameter cameras, cloud computing, and AI to deliver unparalleled smart
            monitoring capabilities
          </p>
        </motion.div>

        {/* Technology Flow */}
        <div className="mb-20">
          <div className="grid md:grid-cols-4 gap-8">
            {flowSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <Card className="text-center p-6 h-full bg-white dark:bg-slate-800 border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-0">
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${step.color} rounded-2xl mb-4 text-white`}
                    >
                      {step.icon}
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{step.title}</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{step.description}</p>
                  </CardContent>
                </Card>

                {/* Arrow */}
                {index < flowSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-6 h-6 text-gray-400" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Technology Details */}
        <Tabs defaultValue="platform" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="platform">
              Smart Ward
            </TabsTrigger>
            <TabsTrigger value="security">
              Security
            </TabsTrigger>
            <TabsTrigger value="scalability">
              Scalability
            </TabsTrigger>
          </TabsList>

          <TabsContent value="platform" className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid md:grid-cols-2 gap-8 items-center"
            >
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">AI-Native Smart Ward Platform</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Our Software as a Medical Service platform combines cloud-native microservices architecture with
                  advanced AI algorithms trained on diverse healthcare datasets for clinical-grade accuracy.
                </p>

                <div className="space-y-4">
                  {features.map((capability, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                        {capability.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">{capability.title}</h4>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">{capability.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/20 rounded-2xl p-8">
                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm mb-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Live Platform Status</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-300">System Status</span>
                      <span className="text-green-600 font-medium text-sm">Operational</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-300">AI Confidence</span>
                      <span className="text-blue-600 font-medium text-sm">98.5%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-300">Response Time</span>
                      <span className="text-teal-600 font-medium text-sm">&lt;100ms</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-300">Uptime</span>
                      <span className="text-purple-600 font-medium text-sm">99.9%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-4">AI Engine Performance</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-300">Model Accuracy</span>
                      <span className="text-green-600 font-medium text-sm">99.2%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-300">False Positives</span>
                      <span className="text-blue-600 font-medium text-sm">&lt;2%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-300">Processing Speed</span>
                      <span className="text-teal-600 font-medium text-sm">Real-time</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-300">Learning Rate</span>
                      <span className="text-purple-600 font-medium text-sm">Continuous</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* AI Engine Details Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-8"
            >
              <div className="text-center mb-8">
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Advanced AI Engine Capabilities</h4>
                <p className="text-slate-600 dark:text-gray-300 max-w-2xl mx-auto">
                  Our proprietary AI algorithms continuously learn from real-world clinical environments to improve
                  accuracy and reduce false positives.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 mx-auto dark:bg-blue-900/30">
                    <Brain className="w-6 h-6 text-blue-600" />
                  </div>
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Deep Learning Models</h5>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Advanced neural networks trained on millions of medical data points
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-4 mx-auto dark:bg-teal-900/30">
                    <Activity className="w-6 h-6 text-teal-600" />
                  </div>
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Real-time Processing</h5>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Sub-second analysis and prediction with clinical-grade accuracy
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 mx-auto dark:bg-purple-900/30">
                    <Shield className="w-6 h-6 text-purple-600" />
                  </div>
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Adaptive Learning</h5>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Continuously improves from new data while maintaining privacy
                  </p>
                </div>
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Enterprise Security</h3>
              <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Bank-level security with end-to-end encryption, HIPAA compliance, and multi-factor authentication.
              </p>
            </motion.div>
          </TabsContent>

          <TabsContent value="scalability" className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Multi-Center Architecture</h3>
              <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Designed to scale from single ward units to multi-hospital networks with centralized management and
                reporting.
              </p>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
