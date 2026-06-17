"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Camera, AlertTriangle, Clock, Eye, Download, Filter } from "lucide-react"
import { useState, useEffect } from "react"

export function AnomalyLoggingSection() {
  const [currentLog, setCurrentLog] = useState(0)
  const [isRecording, setIsRecording] = useState(false)

  const anomalyLogs = [
    {
      id: "AL-001",
      timestamp: "2024-01-15 14:32:15",
      type: "Critical",
      description: "Heart rate dropped below 45 BPM",
      vitals: { hr: 42, bp: "110/70", spo2: 96, temp: 98.2 },
      response: "Immediate intervention",
      status: "resolved",
    },
    {
      id: "AL-002",
      timestamp: "2024-01-15 12:18:42",
      type: "Warning",
      description: "SpO2 levels declining trend",
      vitals: { hr: 78, bp: "125/82", spo2: 92, temp: 99.1 },
      response: "Oxygen therapy initiated",
      status: "monitoring",
    },
    {
      id: "AL-003",
      timestamp: "2024-01-15 09:45:33",
      type: "Alert",
      description: "Blood pressure spike detected",
      vitals: { hr: 95, bp: "165/95", spo2: 98, temp: 98.8 },
      response: "Medication adjusted",
      status: "resolved",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLog((prev) => (prev + 1) % anomalyLogs.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const triggerDemo = () => {
    setIsRecording(true)
    setTimeout(() => setIsRecording(false), 3000)
  }

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Anomaly Logging System</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Comprehensive logging of critical events with automated camera capture and detailed audit trails for
            complete incident documentation
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Live Demo */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white dark:bg-slate-800 border-0 shadow-xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Live Anomaly Detection Demo</h3>
                    <Button onClick={triggerDemo} className="bg-red-600 hover:bg-red-700">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Trigger Demo
                    </Button>
                  </div>

                  {/* Camera Feed Simulation */}
                  <div
                    className="relative bg-slate-900 rounded-xl overflow-hidden mb-6"
                    style={{ aspectRatio: "16/9" }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      {isRecording ? (
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="text-center"
                        >
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                            className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4"
                          >
                            <Camera className="w-8 h-8 text-white" />
                          </motion.div>
                          <p className="text-white font-medium">Recording Anomaly Event</p>
                          <p className="text-red-400 text-sm">Critical vitals detected</p>
                        </motion.div>
                      ) : (
                        <div className="text-center">
                          <Eye className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-400">ICU Camera Feed</p>
                          <p className="text-gray-500 text-sm">Bed 3 - Patient Monitoring</p>
                        </div>
                      )}
                    </div>

                    {/* Recording Indicator */}
                    {isRecording && (
                      <div className="absolute top-4 right-4 flex items-center bg-red-600 text-white px-3 py-1 rounded-full">
                        <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                        <span className="text-sm font-medium">REC</span>
                      </div>
                    )}

                    {/* Timestamp */}
                    <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded text-sm">
                      {new Date().toLocaleString()}
                    </div>
                  </div>

                  {/* Vitals Snapshot */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div
                      className={`p-3 rounded-lg text-center ${isRecording ? "bg-red-50 dark:bg-red-900/20 border-2 border-red-300" : "bg-gray-50 dark:bg-slate-700"}`}
                    >
                      <div
                        className={`text-2xl font-bold ${isRecording ? "text-red-600" : "text-gray-900 dark:text-white"}`}
                      >
                        {isRecording ? "42" : "72"}
                      </div>
                      <div className="text-xs text-gray-500">Heart Rate</div>
                    </div>
                    <div className="p-3 bg-gray-50 dark:bg-slate-700 rounded-lg text-center">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">120/80</div>
                      <div className="text-xs text-gray-500">Blood Pressure</div>
                    </div>
                    <div className="p-3 bg-gray-50 dark:bg-slate-700 rounded-lg text-center">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">96%</div>
                      <div className="text-xs text-gray-500">SpO2</div>
                    </div>
                    <div className="p-3 bg-gray-50 dark:bg-slate-700 rounded-lg text-center">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">98.6°F</div>
                      <div className="text-xs text-gray-500">Temperature</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Audit Logs */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Card className="bg-white dark:bg-slate-800 border-0 shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Recent Anomaly Logs</h4>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>

                <div className="space-y-3">
                  {anomalyLogs.map((log, index) => (
                    <motion.div
                      key={log.id}
                      initial={{ opacity: 0.6 }}
                      animate={{ opacity: index === currentLog ? 1 : 0.6 }}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        index === currentLog
                          ? "border-blue-300 bg-blue-50 dark:bg-blue-900/20"
                          : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-slate-700"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            log.type === "Critical"
                              ? "bg-red-100 text-red-700"
                              : log.type === "Warning"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {log.type}
                        </span>
                        <span className="text-xs text-gray-500">{log.id}</span>
                      </div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">{log.description}</p>
                      <div className="flex items-center text-xs text-gray-500 mb-2">
                        <Clock className="w-3 h-3 mr-1" />
                        {log.timestamp}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-300">Response: {log.response}</div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-4">Audit Trail Features</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center">
                    <Camera className="w-4 h-4 mr-2" />
                    <span>Automatic camera capture</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>Precise timestamp logging</span>
                  </div>
                  <div className="flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    <span>Severity classification</span>
                  </div>
                  <div className="flex items-center">
                    <Download className="w-4 h-4 mr-2" />
                    <span>Exportable reports</span>
                  </div>
                </div>
                <Button variant="secondary" size="sm" className="w-full mt-4">
                  <Download className="w-4 h-4 mr-2" />
                  Export Logs
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Timeline Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <Card className="bg-white dark:bg-slate-800 border-0 shadow-xl">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
                Breach Timeline Visualization
              </h3>

              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-300 dark:bg-gray-600"></div>

                <div className="space-y-8">
                  {anomalyLogs.map((log, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.2 }}
                      viewport={{ once: true }}
                      className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                    >
                      <div className={`w-5/12 ${index % 2 === 0 ? "text-right pr-8" : "text-left pl-8"}`}>
                        <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-lg">
                          <h4 className="font-medium text-gray-900 dark:text-white mb-1">{log.description}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{log.response}</p>
                          <span className="text-xs text-gray-500">{log.timestamp}</span>
                        </div>
                      </div>

                      <div className="relative z-10">
                        <div
                          className={`w-4 h-4 rounded-full border-4 border-white dark:border-slate-800 ${
                            log.type === "Critical"
                              ? "bg-red-500"
                              : log.type === "Warning"
                                ? "bg-yellow-500"
                                : "bg-blue-500"
                          }`}
                        ></div>
                      </div>

                      <div className="w-5/12"></div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
