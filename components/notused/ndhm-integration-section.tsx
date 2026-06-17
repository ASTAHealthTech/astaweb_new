"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  CreditCard,
  Database,
  Shield,
  CheckCircle,
  Search,
  FileText,
  Users,
  Globe,
  Lock,
  Zap,
  Cloud,
  Activity,
} from "lucide-react"
import { useState } from "react"

export function NDHMIntegrationSection() {
  const [abhaId, setAbhaId] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [patientFound, setPatientFound] = useState(false)

  const handleSearch = () => {
    setIsSearching(true)
    setTimeout(() => {
      setIsSearching(false)
      setPatientFound(true)
    }, 2000)
  }

  const patientData = {
    name: "Rajesh Kumar",
    abhaId: "12-3456-7890-1234",
    age: 45,
    gender: "Male",
    bloodGroup: "O+",
    allergies: ["Penicillin", "Shellfish"],
    conditions: ["Hypertension", "Diabetes Type 2"],
    lastVisit: "2024-01-10",
  }

  const integrationBenefits = [
    {
      icon: <Database className="w-8 h-8" />,
      title: "Unified Health Records",
      description: "Access complete patient history from multiple healthcare providers across India",
      features: [
        "Cross-hospital data access",
        "Real-time synchronization",
        "Complete medical history",
        "Lab reports integration",
      ],
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Advanced Security & Privacy",
      description: "Patient-controlled access with military-grade security measures",
      features: ["End-to-end encryption", "Patient consent management", "Audit trail logging", "GDPR compliance"],
      color: "from-green-500 to-green-600",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "National Interoperability",
      description: "Seamless integration with NDHM ecosystem and government health initiatives",
      features: ["FHIR R4 standards", "API-first architecture", "Government compliance", "Multi-language support"],
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Real-time Data Exchange",
      description: "Instant access to patient data with lightning-fast API responses",
      features: [
        "Sub-second response times",
        "99.9% uptime guarantee",
        "Auto-scaling infrastructure",
        "Edge computing",
      ],
      color: "from-orange-500 to-orange-600",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Multi-stakeholder Access",
      description: "Controlled access for doctors, nurses, pharmacists, and authorized personnel",
      features: ["Role-based permissions", "Temporary access grants", "Emergency override", "Activity monitoring"],
      color: "from-teal-500 to-teal-600",
    },
    {
      icon: <Activity className="w-8 h-8" />,
      title: "Clinical Decision Support",
      description: "AI-powered insights and recommendations based on comprehensive health data",
      features: ["Drug interaction alerts", "Treatment recommendations", "Risk assessment", "Predictive analytics"],
      color: "from-indigo-500 to-indigo-600",
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">NDHM & ABHA Integration</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Seamless integration with National Digital Health Mission for unified patient health records and ABHA ID
            management
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* ABHA ID Patient Fetch */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-0 shadow-xl">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <CreditCard className="w-8 h-8 text-blue-600 mr-3" />
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">ABHA ID Patient Lookup</h3>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <Label htmlFor="abha-id" className="text-base font-medium">
                      Enter ABHA ID
                    </Label>
                    <div className="flex space-x-2 mt-2">
                      <Input
                        id="abha-id"
                        placeholder="12-3456-7890-1234"
                        value={abhaId}
                        onChange={(e) => setAbhaId(e.target.value)}
                        className="flex-1 h-12 text-lg"
                      />
                      <Button
                        onClick={handleSearch}
                        disabled={isSearching || !abhaId}
                        className="bg-blue-600 hover:bg-blue-700 h-12 px-6"
                      >
                        {isSearching ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          />
                        ) : (
                          <Search className="w-5 h-5" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Animated Search Process */}
                {isSearching && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-8"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                      className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <Database className="w-8 h-8 text-white" />
                    </motion.div>
                    <p className="text-gray-600 dark:text-gray-300 font-medium">
                      Fetching patient records from NDHM...
                    </p>
                  </motion.div>
                )}

                {/* Patient Data Display */}
                {patientFound && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                    <div className="flex items-center text-green-600 mb-4">
                      <CheckCircle className="w-6 h-6 mr-2" />
                      <span className="font-semibold text-lg">Patient Found</span>
                    </div>

                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <span className="text-sm text-gray-500 font-medium">Full Name</span>
                            <p className="font-semibold text-gray-900 dark:text-white text-lg">{patientData.name}</p>
                          </div>
                          <div>
                            <span className="text-sm text-gray-500 font-medium">ABHA ID</span>
                            <p className="font-mono text-gray-900 dark:text-white">{patientData.abhaId}</p>
                          </div>
                          <div>
                            <span className="text-sm text-gray-500 font-medium">Age & Gender</span>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {patientData.age} years, {patientData.gender}
                            </p>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <span className="text-sm text-gray-500 font-medium">Blood Group</span>
                            <p className="font-semibold text-red-600 text-lg">{patientData.bloodGroup}</p>
                          </div>
                          <div>
                            <span className="text-sm text-gray-500 font-medium">Last Visit</span>
                            <p className="font-medium text-gray-900 dark:text-white">{patientData.lastVisit}</p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <span className="text-sm text-gray-500 font-medium">Medical Conditions</span>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {patientData.conditions.map((condition, index) => (
                                <span
                                  key={index}
                                  className="px-3 py-1 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 text-sm rounded-full font-medium"
                                >
                                  {condition}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <span className="text-sm text-gray-500 font-medium">Allergies</span>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {patientData.allergies.map((allergy, index) => (
                                <span
                                  key={index}
                                  className="px-3 py-1 bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 text-sm rounded-full font-medium"
                                >
                                  {allergy}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* API Integration Features */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Card className="bg-white dark:bg-slate-800 border-0 shadow-xl">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <FileText className="w-8 h-8 text-green-600 mr-3" />
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    Health Record API Integration
                  </h3>
                </div>

                <div className="space-y-6">
                  <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3 text-lg">Real-time Data Sync</h4>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Automatic synchronization with NDHM health records for up-to-date patient information
                    </p>
                    <div className="flex items-center text-green-600">
                      <Cloud className="w-5 h-5 mr-2" />
                      <span className="font-medium">99.9% Uptime Guaranteed</span>
                    </div>
                  </div>

                  <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3 text-lg">Interoperability</h4>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Seamless data exchange between healthcare providers using FHIR standards
                    </p>
                    <div className="flex items-center text-blue-600">
                      <Globe className="w-5 h-5 mr-2" />
                      <span className="font-medium">FHIR R4 Compliant</span>
                    </div>
                  </div>

                  <div className="p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3 text-lg">Consent Management</h4>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Patient-controlled consent for health data sharing and access
                    </p>
                    <div className="flex items-center text-purple-600">
                      <Lock className="w-5 h-5 mr-2" />
                      <span className="font-medium">Blockchain-secured Consent</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-600 to-teal-600 text-white border-0">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Shield className="w-8 h-8 mr-3" />
                  <h3 className="text-xl font-semibold">Security & Compliance</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    <span className="text-sm">NDHM Compliant APIs</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    <span className="text-sm">End-to-End Encryption</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    <span className="text-sm">Audit Trail Logging</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    <span className="text-sm">Patient Consent Management</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    <span className="text-sm">ISO 27001 Certified</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    <span className="text-sm">HIPAA Compliant</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Expanded Integration Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Comprehensive Integration Benefits
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {integrationBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full bg-white dark:bg-slate-800 border-0 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                  <CardContent className="p-8">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${benefit.color} rounded-2xl flex items-center justify-center text-white mb-6`}
                    >
                      {benefit.icon}
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{benefit.title}</h4>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{benefit.description}</p>
                    <div className="space-y-3">
                      {benefit.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                          <span className="text-sm text-gray-600 dark:text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
