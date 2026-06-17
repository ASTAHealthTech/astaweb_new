"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"
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
  User,
  Calendar,
  Phone,
  MapPin,
} from "lucide-react"
import { useState } from "react"

export function NDHMABHASection() {
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
    emergencyContact: "+91 98765 43210",
    address: "123 Main Street, Mumbai, Maharashtra",
  }

  return (
    <section id="ndhm-integration" className="py-20 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
           <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/10 to-teal-500/10 border border-blue-200/50 dark:border-blue-700/50 text-blue-700 dark:text-blue-300 text-sm font-medium rounded-full backdrop-blur-sm mb-6">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
            Upcoming Feature
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">NDHM Integration</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Fetch patient records using Aadhaar/ABHA ID via NDHM-compliant APIs for unified health data access (For Indians)
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
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

                <div className="relative space-y-4 mb-6">
                  <div>
                    <Label htmlFor="abha-id" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Enter ABHA ID or Aadhaar Number
                    </Label>
                    <div className="flex space-x-3 mt-2">
                      <Input
                        id="abha-id"
                        placeholder="12-3456-7890-1234"
                        value={abhaId}
                        onChange={(e) => setAbhaId(e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        onClick={handleSearch}
                        disabled={isSearching || !abhaId}
                        className="bg-blue-600 hover:bg-blue-700 px-6"
                      >
                        {isSearching ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                          />
                        ) : (
                          <Search className="w-4 h-4" />
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
                    <p className="text-gray-600 dark:text-gray-300 mb-4">Fetching patient records from NDHM...</p>
                    <div className="space-y-2">
                      <div className="text-sm text-gray-500">• Validating ABHA ID</div>
                      <div className="text-sm text-gray-500">• Accessing health records</div>
                      <div className="text-sm text-gray-500">• Retrieving patient data</div>
                    </div>
                  </motion.div>
                )}

                {/* Patient Data Display */}
                {patientFound && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                    <div className="flex items-center text-green-600 mb-4">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      <span className="font-medium">Patient Record Found</span>
                    </div>

                    <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center mb-6">
                        <User className="w-6 h-6 text-blue-600 mr-3" />
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Patient Information</h4>
                      </div>

                      {/* Basic Info Grid */}
                      <div className="grid grid-cols-2 gap-6 mb-6">
                        <div>
                          <span className="text-sm text-gray-500 block mb-1">Full Name</span>
                          <p className="font-medium text-gray-900 dark:text-white">{patientData.name}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500 block mb-1">ABHA ID</span>
                          <p className="font-medium text-gray-900 dark:text-white">{patientData.abhaId}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500 block mb-1">Age</span>
                          <p className="font-medium text-gray-900 dark:text-white">{patientData.age} years</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500 block mb-1">Gender</span>
                          <p className="font-medium text-gray-900 dark:text-white">{patientData.gender}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500 block mb-1">Blood Group</span>
                          <p className="font-medium text-gray-900 dark:text-white">{patientData.bloodGroup}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500 block mb-1">Last Visit</span>
                          <p className="font-medium text-gray-900 dark:text-white">{patientData.lastVisit}</p>
                        </div>
                      </div>

                      {/* Contact Information */}
                      <div className="mb-6 p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
                        <h5 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                          <Phone className="w-4 h-4 mr-2" />
                          Contact Information
                        </h5>
                        <div className="space-y-2">
                          <div className="flex items-center text-sm">
                            <Phone className="w-3 h-3 mr-2 text-gray-400" />
                            <span className="text-gray-600 dark:text-gray-300">{patientData.emergencyContact}</span>
                          </div>
                          <div className="flex items-start text-sm">
                            <MapPin className="w-3 h-3 mr-2 mt-0.5 text-gray-400" />
                            <span className="text-gray-600 dark:text-gray-300">{patientData.address}</span>
                          </div>
                        </div>
                      </div>

                      {/* Medical Information */}
                      <div className="space-y-4 mb-6">
                        <div>
                          <span className="text-sm text-gray-500 block mb-2">Medical Conditions</span>
                          <div className="flex flex-wrap gap-2">
                            {patientData.conditions.map((condition, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 text-sm rounded-full"
                              >
                                {condition}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <span className="text-sm text-gray-500 block mb-2">Allergies</span>
                          <div className="flex flex-wrap gap-2">
                            {patientData.allergies.map((allergy, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300 text-sm rounded-full"
                              >
                                {allergy}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                        <Button className="w-full bg-green-600 hover:bg-green-700">
                          <Calendar className="w-4 h-4 mr-2" />
                          Admit Patient
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
                {/* Demo Disclaimer */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="mt-12 text-center"
                >
                  <div className="inline-flex items-center px-6 py-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 mr-3" />
                    <div className="text-left">
                      <p className="text-xs text-amber-700 dark:text-amber-300">
                        All patient data, ABHA IDs, and health records shown above are simulated for demonstration purposes
                        only. No real patient information is displayed.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          {/* NDHM Compliance Features */}
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
                  <FileText className="w-6 h-6 text-green-600 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">NDHM Compliance Features</h3>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Unified Health Records</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Access complete patient history from multiple healthcare providers across India
                    </p>
                  </div>

                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">FHIR Compliance</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Seamless data exchange using international healthcare standards
                    </p>
                  </div>

                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Consent Management</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Patient-controlled consent for health data sharing and access
                    </p>
                  </div>

                  <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Real-time Sync</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Automatic synchronization with NDHM health records
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-600 to-teal-600 text-white border-0">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Shield className="w-6 h-6 mr-3" />
                  <h3 className="text-lg font-semibold">Security & Privacy</h3>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-3 flex-shrink-0" />
                    <span className="text-sm">End-to-End Encryption</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-3 flex-shrink-0" />
                    <span className="text-sm">NDHM API Compliance</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-3 flex-shrink-0" />
                    <span className="text-sm">Audit Trail Logging</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-3 flex-shrink-0" />
                    <span className="text-sm">Patient Data Protection</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-3 flex-shrink-0" />
                    <span className="text-sm">Consent-based Access</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Integration Benefits */}
            <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-0 shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 text-center">
                  Integration Benefits
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-indigo-600 mb-2">100%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">NDHM Compliant</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600 mb-2">24x7</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Data Access</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-2">Secure</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Data Transfer</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 mb-2">Unified</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Health Records</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        

      </div>
    </section>
  )
}
