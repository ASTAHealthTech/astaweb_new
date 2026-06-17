"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Activity, Heart, Thermometer, Droplets, Settings, TrendingUp } from "lucide-react"
import { useState, useEffect } from "react"

export function RemoteVitalMonitoringSection() {
  const [vitals, setVitals] = useState({
    hr: 72,
    rr: 16,
    bp: { systolic: 120, diastolic: 80 },
    spo2: 98,
    temp: 98.6,
  })

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setVitals((prev) => ({
        hr: prev.hr + (Math.random() - 0.5) * 4,
        rr: prev.rr + (Math.random() - 0.5) * 2,
        bp: {
          systolic: prev.bp.systolic + (Math.random() - 0.5) * 6,
          diastolic: prev.bp.diastolic + (Math.random() - 0.5) * 4,
        },
        spo2: Math.max(95, Math.min(100, prev.spo2 + (Math.random() - 0.5) * 2)),
        temp: prev.temp + (Math.random() - 0.5) * 0.4,
      }))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const vitalCards = [
    {
      icon: <Heart className="w-6 h-6" />,
      label: "Heart Rate",
      value: Math.round(vitals.hr),
      unit: "BPM",
      color: "text-red-500",
      bgColor: "bg-red-50 dark:bg-red-900/20",
      normal: vitals.hr >= 60 && vitals.hr <= 100,
    },
    {
      icon: <Activity className="w-6 h-6" />,
      label: "Respiratory Rate",
      value: Math.round(vitals.rr),
      unit: "/min",
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      normal: vitals.rr >= 12 && vitals.rr <= 20,
    },
    {
      icon: <Droplets className="w-6 h-6" />,
      label: "Blood Pressure",
      value: `${Math.round(vitals.bp.systolic)}/${Math.round(vitals.bp.diastolic)}`,
      unit: "mmHg",
      color: "text-purple-500",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      normal: vitals.bp.systolic < 140 && vitals.bp.diastolic < 90,
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      label: "SpO₂",
      value: Math.round(vitals.spo2),
      unit: "%",
      color: "text-green-500",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      normal: vitals.spo2 >= 95,
    },
    {
      icon: <Thermometer className="w-6 h-6" />,
      label: "Temperature",
      value: vitals.temp.toFixed(1),
      unit: "°F",
      color: "text-orange-500",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      normal: vitals.temp >= 97.0 && vitals.temp <= 99.5,
    },
  ]

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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Remote Vital Monitoring Module
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Real-time monitoring of critical patient vitals with intelligent alerting and comprehensive data
            visualization
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Real-time Vitals Stream */}
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
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Live Vital Signs - Patient ID: ICU-001
                    </h3>
                    <div className="flex items-center text-green-500">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                      <span className="text-sm font-medium">LIVE</span>
                    </div>
                  </div>

                  {/* Vitals Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    {vitalCards.map((vital, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className={`p-4 rounded-xl ${vital.bgColor} border-2 ${
                          vital.normal ? "border-green-200 dark:border-green-800" : "border-red-200 dark:border-red-800"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className={vital.color}>{vital.icon}</div>
                          <div
                            className={`w-2 h-2 rounded-full ${vital.normal ? "bg-green-500" : "bg-red-500 animate-pulse"}`}
                          ></div>
                        </div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                          {vital.value}
                          <span className="text-sm font-normal text-gray-500 ml-1">{vital.unit}</span>
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-300">{vital.label}</div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Graph Visualization */}
                  <div className="bg-slate-900 rounded-xl p-4">
                    <h4 className="text-white font-medium mb-4">Heart Rate Trend (Last 24 Hours)</h4>
                    <div className="relative h-32 bg-slate-800 rounded-lg overflow-hidden">
                      {/* Simulated ECG-like graph */}
                      <svg className="w-full h-full" viewBox="0 0 400 100">
                        <motion.path
                          d="M0,50 Q100,30 200,50 T400,50"
                          stroke="#ef4444"
                          strokeWidth="2"
                          fill="none"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        />
                        <motion.path
                          d="M0,60 Q150,40 300,60 T400,60"
                          stroke="#3b82f6"
                          strokeWidth="1"
                          fill="none"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY }}
                        />
                      </svg>
                      <div className="absolute bottom-2 left-2 text-xs text-gray-400">Real-time waveform</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Alert Configuration */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white dark:bg-slate-800 border-0 shadow-xl">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Settings className="w-5 h-5 text-blue-500 mr-2" />
                    <h4 className="font-semibold text-gray-900 dark:text-white">Alert Configuration</h4>
                  </div>

                  <div className="space-y-4">
                    <div className="p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Heart Rate</span>
                        <span className="text-xs text-gray-500">60-100 BPM</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                        <div className="bg-red-500 h-2 rounded-full" style={{ width: "70%" }}></div>
                      </div>
                    </div>

                    <div className="p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">SpO₂</span>
                        <span className="text-xs text-gray-500">&gt;95%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: "90%" }}></div>
                      </div>
                    </div>

                    <div className="p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Blood Pressure</span>
                        <span className="text-xs text-gray-500">&lt;140/90</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: "80%" }}></div>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full mt-4" variant="outline">
                    Customize Thresholds
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Patient Admission Graph */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white dark:bg-slate-800 border-0 shadow-xl">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Admission Timeline</h4>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                      <span className="text-gray-600 dark:text-gray-300">Admitted: 2 hours ago</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                      <span className="text-gray-600 dark:text-gray-300">Monitoring started: 1.5 hours ago</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                      <span className="text-gray-600 dark:text-gray-300">Last alert: 30 min ago</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                      <span className="text-gray-600 dark:text-gray-300">Medication given: 15 min ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
