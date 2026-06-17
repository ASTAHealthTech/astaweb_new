"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, FileText, Download, User, Clock, Pill, Activity, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

export function PatientManagementSection() {
  const [currentModule, setCurrentModule] = useState(0)

  const modules = [
    {
      id: "appointments",
      title: "Appointment Management",
      icon: <Calendar className="w-6 h-6" />,
      color: "from-blue-500 to-blue-600",
      description: "Schedule and manage patient appointments with automated reminders",
    },
    {
      id: "prescriptions",
      title: "E-Prescriptions",
      icon: <Pill className="w-6 h-6" />,
      color: "from-green-500 to-green-600",
      description: "Digital prescription management with drug interaction checks",
    },
    {
      id: "discharge",
      title: "Discharge Summaries",
      icon: <FileText className="w-6 h-6" />,
      color: "from-purple-500 to-purple-600",
      description: "Comprehensive discharge documentation and care instructions",
    },
    {
      id: "history",
      title: "Patient History",
      icon: <Activity className="w-6 h-6" />,
      color: "from-orange-500 to-orange-600",
      description: "Complete medical history and treatment timeline",
    },
  ]

  const patientHistory = [
    {
      date: "2024-01-15",
      type: "Admission",
      description: "ICU admission for cardiac monitoring",
      status: "completed",
    },
    {
      date: "2024-01-14",
      type: "Prescription",
      description: "Prescribed cardiac medications",
      status: "active",
    },
    {
      date: "2024-01-13",
      type: "Lab Results",
      description: "Blood work and cardiac enzymes",
      status: "completed",
    },
    {
      date: "2024-01-12",
      type: "Consultation",
      description: "Cardiology consultation",
      status: "completed",
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
            Patient Management System
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Comprehensive patient care management with integrated workflows for appointments, prescriptions, and medical
            records
          </p>
        </motion.div>

        {/* Module Carousel */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">System Modules</h3>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentModule(Math.max(0, currentModule - 1))}
                disabled={currentModule === 0}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentModule(Math.min(modules.length - 1, currentModule + 1))}
                disabled={currentModule === modules.length - 1}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {modules.map((module, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`cursor-pointer transition-all duration-300 ${
                  index === currentModule ? "scale-105" : "hover:scale-102"
                }`}
                onClick={() => setCurrentModule(index)}
              >
                <Card
                  className={`h-full border-2 ${
                    index === currentModule
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                      : "border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800"
                  } shadow-lg hover:shadow-xl transition-all`}
                >
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${module.color} rounded-2xl flex items-center justify-center mx-auto mb-4 text-white`}
                    >
                      {module.icon}
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{module.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{module.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Module Details */}
        <motion.div
          key={currentModule}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Tabs value={modules[currentModule].id} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              {modules.map((module) => (
                <TabsTrigger key={module.id} value={module.id} className="text-xs">
                  {module.title}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="appointments" className="mt-6">
              <Card className="bg-white dark:bg-slate-800 border-0 shadow-xl">
                <CardContent className="p-6">
                  <div className="grid lg:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                        Appointment Scheduler
                      </h4>
                      <div className="space-y-4">
                        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-gray-900 dark:text-white">Dr. Smith - Cardiology</span>
                            <span className="text-sm text-blue-600">Today 2:00 PM</span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300">Follow-up consultation</p>
                        </div>
                        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-gray-900 dark:text-white">Dr. Johnson - ICU</span>
                            <span className="text-sm text-green-600">Tomorrow 10:00 AM</span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300">Routine check-up</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h4>
                      <div className="space-y-3">
                        <Button className="w-full justify-start">
                          <Calendar className="w-4 h-4 mr-2" />
                          Schedule New Appointment
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <Clock className="w-4 h-4 mr-2" />
                          View Calendar
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <User className="w-4 h-4 mr-2" />
                          Patient Availability
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="prescriptions" className="mt-6">
              <Card className="bg-white dark:bg-slate-800 border-0 shadow-xl">
                <CardContent className="p-6">
                  <div className="grid lg:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Active Prescriptions</h4>
                      <div className="space-y-4">
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-gray-900 dark:text-white">Metoprolol 50mg</span>
                            <span className="text-sm text-green-600">Active</span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300">Twice daily, with food</p>
                          <p className="text-xs text-gray-500 mt-1">Prescribed: Jan 15, 2024</p>
                        </div>
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-gray-900 dark:text-white">Aspirin 81mg</span>
                            <span className="text-sm text-green-600">Active</span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300">Once daily, morning</p>
                          <p className="text-xs text-gray-500 mt-1">Prescribed: Jan 15, 2024</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Prescription Tools</h4>
                      <div className="space-y-3">
                        <Button className="w-full justify-start">
                          <Pill className="w-4 h-4 mr-2" />
                          New Prescription
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <FileText className="w-4 h-4 mr-2" />
                          Drug Interactions
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <Download className="w-4 h-4 mr-2" />
                          Print Prescription
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="discharge" className="mt-6">
              <Card className="bg-white dark:bg-slate-800 border-0 shadow-xl">
                <CardContent className="p-6">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Discharge Summary Generator
                  </h4>
                  <div className="grid lg:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
                        <h5 className="font-medium text-gray-900 dark:text-white mb-2">Admission Details</h5>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Admitted: Jan 12, 2024
                          <br />
                          Diagnosis: Acute Myocardial Infarction
                          <br />
                          Length of Stay: 3 days
                        </p>
                      </div>
                      <div className="p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
                        <h5 className="font-medium text-gray-900 dark:text-white mb-2">Treatment Summary</h5>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          • Cardiac catheterization performed
                          <br />• Stent placement successful
                          <br />• Stable vital signs maintained
                        </p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
                        <h5 className="font-medium text-gray-900 dark:text-white mb-2">Discharge Instructions</h5>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          • Follow-up in 1 week
                          <br />• Take medications as prescribed
                          <br />• Avoid strenuous activity
                          <br />• Monitor for chest pain
                        </p>
                      </div>
                      <Button className="w-full">
                        <Download className="w-4 h-4 mr-2" />
                        Generate Discharge Summary
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history" className="mt-6">
              <Card className="bg-white dark:bg-slate-800 border-0 shadow-xl">
                <CardContent className="p-6">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                    Patient History Dashboard
                  </h4>
                  <div className="space-y-4">
                    {patientHistory.map((entry, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                      >
                        <div
                          className={`w-3 h-3 rounded-full mr-4 ${
                            entry.status === "active" ? "bg-green-500" : "bg-gray-400"
                          }`}
                        ></div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-gray-900 dark:text-white">{entry.type}</span>
                            <span className="text-sm text-gray-500">{entry.date}</span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{entry.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </section>
  )
}
