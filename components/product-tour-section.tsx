"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, Monitor, BarChart3, Settings, Bell } from "lucide-react"
import { useState } from "react"
import { VideoModal } from "@/components/video-modal"

export function ProductTourSection() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)

  const handleWatchDemo = () => {
    setIsVideoModalOpen(true)
  }

  return (
    <>
    <section id="product" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Experience Our Product</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Take a guided tour through our comprehensive smart monitoring dashboard and see how we're revolutionizing
            critical care
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white"
            onClick={handleWatchDemo}
          >
            <Play className="mr-2 w-5 h-5" />
            Watch Product Demo
          </Button>
        </motion.div>

        {/* Interactive Product Tour - Mobile Responsive */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Tabs defaultValue="dashboard" className="w-full">
              {/* Mobile-friendly Tab List */}
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-6 lg:mb-8 h-auto">
                <TabsTrigger
                  value="dashboard"
                  className="flex flex-col lg:flex-row items-center gap-1 lg:gap-2 p-2 lg:p-3 text-xs lg:text-sm"
                >
                  <Monitor className="w-3 h-3 lg:w-4 lg:h-4" />
                  <span className="hidden sm:inline">Dashboard</span>
                  <span className="sm:hidden">Dash</span>
                </TabsTrigger>
                <TabsTrigger
                  value="alerts"
                  className="flex flex-col lg:flex-row items-center gap-1 lg:gap-2 p-2 lg:p-3 text-xs lg:text-sm"
                >
                  <Bell className="w-3 h-3 lg:w-4 lg:h-4" />
                  Alerts
                </TabsTrigger>
                <TabsTrigger
                  value="reports"
                  className="flex flex-col lg:flex-row items-center gap-1 lg:gap-2 p-2 lg:p-3 text-xs lg:text-sm"
                >
                  <BarChart3 className="w-3 h-3 lg:w-4 lg:h-4" />
                  Reports
                </TabsTrigger>
                <TabsTrigger
                  value="settings"
                  className="flex flex-col lg:flex-row items-center gap-1 lg:gap-2 p-2 lg:p-3 text-xs lg:text-sm"
                >
                  <Settings className="w-3 h-3 lg:w-4 lg:h-4" />
                  Customization
                </TabsTrigger>
              </TabsList>

            <TabsContent value="dashboard">
              <Card className="bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-800 dark:to-blue-900 border-0">
                <CardContent className="p-8">
                  <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Dashboard */}
                    <div className="lg:col-span-2">
                      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <div className="flex items-center justify-between mb-6">
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Overview</h3>
                          <div className="flex items-center text-green-500">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                            Live
                          </div>
                        </div>

                        {/* Patient Grid */}
                        <div className="grid grid-cols-3 lg:grid-cols-3 gap-2 lg:gap-4 mb-4 lg:mb-6">
                            {Array.from({ length: 9 }, (_, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className={`p-2 lg:p-4 rounded-lg border-2 ${
                                  i === 2
                                    ? "border-yellow-300 bg-yellow-50 dark:border-yellow-700 dark:bg-yellow-900/20"
                                    :
                                  i === 4
                                    ? "border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-900/20"
                                    : "border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-700/20"
                                }`}
                              >
                                <div className="flex items-center justify-between mb-1 lg:mb-2">
                                  <span className="text-xs lg:text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Bed {i + 1}
                                  </span>
                                  <div
                                    className={`w-2 h-2 lg:w-3 lg:h-3 rounded-full ${
                                      i === 2 ? "bg-yellow-500 animate-pulse" :
                                      i === 4 ? "bg-red-500 animate-pulse" : "bg-green-500"
                                    }`}
                                  ></div>
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                  HR: {65 + i * 3}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                  SpO2: {95 + i}%
                                </div>
                              </motion.div>
                          ))}
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-3 gap-4">
                          <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                            <div className="text-2xl font-bold text-green-600">7</div>
                            <div className="text-xs text-green-700 dark:text-green-300">Stable</div>
                          </div>
                          <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                            <div className="text-2xl font-bold text-yellow-600">1</div>
                            <div className="text-xs text-yellow-700 dark:text-yellow-300">Monitoring</div>
                          </div>
                          <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                            <div className="text-2xl font-bold text-red-600">1</div>
                            <div className="text-xs text-red-700 dark:text-red-300">Critical</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                      {/* Recent Alerts */}
                      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Recent Alerts</h4>
                        <div className="space-y-3">
                          <div className="flex items-start space-x-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                            <div className="w-2 h-2 bg-red-500 rounded-full mt-2 animate-pulse"></div>
                            <div>
                              <div className="text-sm font-medium text-red-700 dark:text-red-300">Critical - Bed 5</div>
                              <div className="text-xs text-red-600 dark:text-red-400">Irregular heartbeat detected</div>
                              <div className="text-xs text-gray-500 mt-1">2 min ago</div>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                            <div>
                              <div className="text-sm font-medium text-yellow-700 dark:text-yellow-300">
                                Warning - Bed 3
                              </div>
                              <div className="text-xs text-yellow-600 dark:text-yellow-400">SpO2 levels dropping</div>
                              <div className="text-xs text-gray-500 mt-1">5 min ago</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* System Status */}
                      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-4">System Status</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600 dark:text-gray-300">Uptime</span>
                            <span className="text-sm font-medium text-green-600">99.9%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600 dark:text-gray-300">Active Cameras</span>
                            <span className="text-sm font-medium text-blue-600">24/24</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600 dark:text-gray-300">Response Time</span>
                            <span className="text-sm font-medium text-teal-600">&lt; 1s</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="alerts">
              <Card className="bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-800 dark:to-blue-900 border-0">
                <CardContent className="p-8">
                  <div className="text-center">
                    <Bell className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      Intelligent Alert System
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      AI-powered alerts that reduce false positives by 80% while ensuring no critical events are missed.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports">
              <Card className="bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-800 dark:to-blue-900 border-0">
                <CardContent className="p-8">
                  <div className="text-center">
                    <BarChart3 className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      Comprehensive Analytics
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Detailed reports and analytics to help improve patient outcomes and optimize Hospital Ward operations.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card className="bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-800 dark:to-blue-900 border-0">
                <CardContent className="p-8">
                  <div className="text-center">
                    <Settings className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      Customizable Configuration
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Flexible settings to adapt the system to your hospital's specific protocols and requirements.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </section>

    {/* Video Modal */}
    <VideoModal
      isOpen={isVideoModalOpen}
      onClose={() => setIsVideoModalOpen(false)}
      videoSrc="/demo-video.mp4"
      title="ASTA Health Tech - Product Tour Demo"
    />
    </>
  )
}
