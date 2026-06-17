"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import {
  Activity,
  Heart,
  Thermometer,
  Droplets,
  TrendingUp,
  AlertTriangle,
  MessageSquare,
  Camera,
  Phone,
  CheckCircle,
  Download,
  FileImage,
} from "lucide-react"
import { useState, useEffect } from "react"

export function LiveMonitoringDemoSection() {
  const [vitals, setVitals] = useState({
    hr: 72,
    rr: 16,
    bp: { systolic: 120, diastolic: 80 },
    spo2: 98,
    temp: 98.6,
  })

  const [currentAlert, setCurrentAlert] = useState(0)
  const [currentCapture, setCurrentCapture] = useState(0)

  // Mock SMS alerts data
  const mockAlerts = [
    {
      id: "SMS-001",
      time: "14:32:15",
      recipient: "Dr. Smith (Cardiology)",
      message: "CRITICAL: Patient Ward-3A HR dropped to 42 BPM. Immediate attention required.",
      status: "delivered",
      priority: "critical",
    },
    {
      id: "SMS-002",
      time: "14:32:18",
      recipient: "Nurse Station (Ward 3)",
      message: "ALERT: Bed 3A - Bradycardia detected. Please check patient immediately.",
      status: "delivered",
      priority: "high",
    },
    {
      id: "SMS-003",
      time: "14:32:22",
      recipient: "Dr. Johnson (On-call)",
      message: "BACKUP ALERT: Ward-3A requires immediate medical intervention.",
      status: "delivered",
      priority: "critical",
    },
    {
      id: "SMS-004",
      time: "14:33:05",
      recipient: "ICU Team",
      message: "INFO: Patient vitals stabilizing. Continue monitoring.",
      status: "delivered",
      priority: "normal",
    },
    {
      id: "SMS-005",
      time: "14:33:12",
      recipient: "Dr. Patel (Emergency)",
      message: "UPDATE: SpO2 levels improving. Treatment effective.",
      status: "delivered",
      priority: "normal",
    },
  ]

  // Mock visual documentation data
  const mockCaptures = [
    {
      id: "CAP-001",
      type: "Photo",
      timestamp: "2024-01-15 14:32:15",
      description: "Patient monitoring during bradycardia event - Ward 3A",
      vitals: "HR: 42 BPM, BP: 110/70, SpO2: 96%",
      size: "2.4MB",
    },
    {
      id: "CAP-002",
      type: "Video",
      timestamp: "2024-01-15 14:32:10",
      description: "30-second video clip of critical event - Ward 3A",
      duration: "00:30",
      size: "15.2MB",
    },
    {
      id: "CAP-003",
      type: "Vitals Snapshot",
      timestamp: "2024-01-15 14:32:20",
      description: "Complete vital signs data export - Ward 3A",
      format: "JSON",
      size: "0.8MB",
    },
    {
      id: "CAP-004",
      type: "Photo",
      timestamp: "2024-01-15 14:33:45",
      description: "Patient recovery monitoring - Ward 3A",
      vitals: "HR: 68 BPM, BP: 118/75, SpO2: 98%",
      size: "2.1MB",
    },
    {
      id: "CAP-005",
      type: "Report",
      timestamp: "2024-01-15 14:34:10",
      description: "Automated incident report generated",
      format: "PDF",
      size: "1.2MB",
    },
  ]

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setVitals((prev) => ({
        hr: Math.max(45, Math.min(120, prev.hr + (Math.random() - 0.5) * 4)),
        rr: Math.max(10, Math.min(25, prev.rr + (Math.random() - 0.5) * 2)),
        bp: {
          systolic: Math.max(90, Math.min(160, prev.bp.systolic + (Math.random() - 0.5) * 6)),
          diastolic: Math.max(60, Math.min(100, prev.bp.diastolic + (Math.random() - 0.5) * 4)),
        },
        spo2: Math.max(90, Math.min(100, prev.spo2 + (Math.random() - 0.5) * 2)),
        temp: Math.max(96, Math.min(102, prev.temp + (Math.random() - 0.5) * 0.4)),
      }))
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  // Continuous cycling through alerts and captures
  useEffect(() => {
    const alertInterval = setInterval(() => {
      setCurrentAlert((prev) => (prev + 1) % mockAlerts.length)
    }, 4000)

    const captureInterval = setInterval(() => {
      setCurrentCapture((prev) => (prev + 1) % mockCaptures.length)
    }, 4000)

    return () => {
      clearInterval(alertInterval)
      clearInterval(captureInterval)
    }
  }, [])

  const vitalCards = [
    {
      icon: <Heart className="w-6 h-6" />,
      label: "Heart Rate",
      value: Math.round(vitals.hr),
      unit: "BPM",
      color: "text-red-500",
      bgColor: "bg-red-50 dark:bg-red-900/20",
      critical: vitals.hr < 50 || vitals.hr > 120,
    },
    {
      icon: <Activity className="w-6 h-6" />,
      label: "Respiratory Rate",
      value: Math.round(vitals.rr),
      unit: "/min",
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      critical: vitals.rr < 10 || vitals.rr > 25,
    },
    {
      icon: <Droplets className="w-6 h-6" />,
      label: "Blood Pressure",
      value: `${Math.round(vitals.bp.systolic)}/${Math.round(vitals.bp.diastolic)}`,
      unit: "mmHg",
      color: "text-purple-500",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      critical: vitals.bp.systolic > 160 || vitals.bp.diastolic > 100,
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      label: "SpO₂",
      value: Math.round(vitals.spo2),
      unit: "%",
      color: "text-green-500",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      critical: vitals.spo2 < 92,
    },
    {
      icon: <Thermometer className="w-6 h-6" />,
      label: "Temperature",
      value: vitals.temp.toFixed(1),
      unit: "°F",
      color: "text-orange-500",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      critical: vitals.temp > 101.5 || vitals.temp < 96.0,
    },
  ]

  const currentAlertData = mockAlerts[currentAlert]
  const currentCaptureData = mockCaptures[currentCapture]

  return (
    <section id="patient-monitoring" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            How Our Smart Ward Monitoring Works
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-4">
            See how our AI-powered system continuously monitors patients, automatically detects anomalies, and instantly
            alerts healthcare providers while capturing visual documentation
          </p>
        </motion.div>

        {/* Main Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <Card className="bg-white dark:bg-slate-800 border-0 shadow-xl">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Smart Ward Dashboard</h3>
                  <p className="text-gray-600 dark:text-gray-300">General Ward 3A - Patient ID: GW-001</p>
                </div>
                <div className="flex items-center text-green-500">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  <span className="text-sm font-medium">LIVE MONITORING</span>
                </div>
              </div>

              {/* Vitals Grid */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
                {vitalCards.map((vital, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`p-6 rounded-xl ${vital.bgColor} border-2 ${
                      vital.critical
                        ? "border-red-300 dark:border-red-700 animate-pulse"
                        : "border-gray-200 dark:border-gray-700"
                    } text-center`}
                  >
                    <div className={`${vital.color} mb-3 flex justify-center`}>{vital.icon}</div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      {vital.value}
                      <span className="text-sm font-normal text-gray-500 ml-1">{vital.unit}</span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">{vital.label}</div>
                    <div
                      className={`w-3 h-3 rounded-full mx-auto mt-2 ${vital.critical ? "bg-red-500 animate-pulse" : "bg-green-500"}`}
                    ></div>
                  </motion.div>
                ))}
              </div>

              {/* Vital Trends Graph */}
              <div className="bg-slate-900 rounded-xl p-6">
                <h4 className="text-white font-medium mb-6">Real-time Vital Trends - Ward 3A</h4>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-slate-800 rounded-lg p-4">
                    <div className="text-white text-sm mb-3 flex items-center">
                      <Heart className="w-4 h-4 mr-2 text-red-400" />
                      Heart Rate
                    </div>
                    <div className="h-20 bg-slate-700 rounded relative overflow-hidden">
                      <motion.div
                        className="absolute bottom-0 left-0 bg-red-500 rounded-t"
                        style={{ width: "100%" }}
                        animate={{ height: `${(vitals.hr / 150) * 100}%` }}
                        transition={{ duration: 0.5 }}
                      />
                      <div className="absolute bottom-2 left-2 text-white text-xs">{Math.round(vitals.hr)} BPM</div>
                    </div>
                  </div>

                  <div className="bg-slate-800 rounded-lg p-4">
                    <div className="text-white text-sm mb-3 flex items-center">
                      <TrendingUp className="w-4 h-4 mr-2 text-green-400" />
                      SpO₂
                    </div>
                    <div className="h-20 bg-slate-700 rounded relative overflow-hidden">
                      <motion.div
                        className="absolute bottom-0 left-0 bg-green-500 rounded-t"
                        style={{ width: "100%" }}
                        animate={{ height: `${vitals.spo2}%` }}
                        transition={{ duration: 0.5 }}
                      />
                      <div className="absolute bottom-2 left-2 text-white text-xs">{Math.round(vitals.spo2)}%</div>
                    </div>
                  </div>

                  <div className="bg-slate-800 rounded-lg p-4">
                    <div className="text-white text-sm mb-3 flex items-center">
                      <Droplets className="w-4 h-4 mr-2 text-purple-400" />
                      Blood Pressure
                    </div>
                    <div className="h-20 bg-slate-700 rounded relative overflow-hidden">
                      <motion.div
                        className="absolute bottom-0 left-0 bg-purple-500 rounded-t"
                        style={{ width: "100%" }}
                        animate={{ height: `${(vitals.bp.systolic / 200) * 100}%` }}
                        transition={{ duration: 0.5 }}
                      />
                      <div className="absolute bottom-2 left-2 text-white text-xs">
                        {Math.round(vitals.bp.systolic)}/{Math.round(vitals.bp.diastolic)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Alert System Row */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Continuous SMS Alert Demo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="h-full border-0 shadow-xl bg-white dark:bg-slate-800">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <MessageSquare className="w-6 h-6 mr-3 text-blue-500" />
                  <h4 className="font-semibold text-gray-900 dark:text-white">Smart Alert System</h4>
                  <div className="ml-auto">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <div className="flex items-center text-blue-700 dark:text-blue-300 mb-3">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      <span className="font-medium">ALERT SYSTEM</span>
                    </div>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentAlert}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white dark:bg-slate-800 p-3 rounded border-l-4 border-blue-500"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center">
                            <Phone className="w-3 h-3 mr-1 text-green-500" />
                            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                              {currentAlertData.recipient}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500">{currentAlertData.time}</span>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">{currentAlertData.message}</p>
                        <div className="flex items-center justify-between">
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              currentAlertData.priority === "critical"
                                ? "bg-red-100 text-red-700"
                                : currentAlertData.priority === "high"
                                ? "bg-orange-100 text-orange-700"
                                : "bg-green-100 text-green-700"
                            }`}
                          >
                            {currentAlertData.priority.toUpperCase()}
                          </span>
                          <div className="flex items-center text-green-600">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            <span className="text-xs">Delivered</span>
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Continuous Camera Capture Demo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="h-full border-0 shadow-xl bg-white dark:bg-slate-800">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Camera className="w-6 h-6 mr-3 text-purple-500" />
                  <h4 className="font-semibold text-gray-900 dark:text-white">Visual Documentation</h4>
                  <div className="ml-auto">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                    <div className="flex items-center text-purple-700 dark:text-purple-300 mb-3">
                      <Camera className="w-4 h-4 mr-2 animate-pulse" />
                      <span className="font-medium">VISUAL CAPTURE</span>
                    </div>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentCapture}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white dark:bg-slate-800 p-3 rounded border border-purple-200 dark:border-purple-700"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            {currentCaptureData.type === "Photo" && <Camera className="w-3 h-3 mr-1 text-purple-500" />}
                            {currentCaptureData.type === "Video" && (
                              <FileImage className="w-3 h-3 mr-1 text-indigo-500" />
                            )}
                            {currentCaptureData.type === "Vitals Snapshot" && (
                              <Activity className="w-3 h-3 mr-1 text-green-500" />
                            )}
                            {currentCaptureData.type === "Report" && <FileImage className="w-3 h-3 mr-1 text-blue-500" />}
                            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                              {currentCaptureData.type}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500">{currentCaptureData.size}</span>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">{currentCaptureData.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">{currentCaptureData.timestamp}</span>
                          <div className="flex items-center text-green-600">
                            <Download className="w-3 h-3 mr-1" />
                            <span className="text-xs">Saved</span>
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* System Status */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="h-full bg-gradient-to-r from-green-600 to-teal-600 text-white border-0">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-6 text-lg">Hospital System Status</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Connected Wards</span>
                    <span className="font-medium bg-white/20 px-2 py-1 rounded text-sm">8/8</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Active Cameras</span>
                    <span className="font-medium bg-white/20 px-2 py-1 rounded text-sm">24/24</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Data Sync</span>
                    <span className="font-medium bg-white/20 px-2 py-1 rounded text-sm">Real-time</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Alert System</span>
                    <span className="font-medium bg-white/20 px-2 py-1 rounded text-sm">Operational</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Hospital Uptime</span>
                    <span className="font-medium bg-white/20 px-2 py-1 rounded text-sm">99.9%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Demo Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <div className="inline-flex items-center px-6 py-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 mr-3" />
            <div className="text-left">
              <p className="text-xs text-amber-700 dark:text-amber-300">
                All patient data, alerts, and captures shown above are simulated for demonstration purposes only. No
                real patient information is displayed.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
