"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Award, Users, Building, Zap } from "lucide-react"
import Image from "next/image"

export function RecognitionSection() {
  const recognitions = [
    {
      title: "MeitY Startup Hub",
      description: "Selected for government technology incubation program",
      icon: <Building className="w-8 h-8" />,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "IISER Pune",
      description: "Research collaboration and institutional support",
      icon: <Users className="w-8 h-8" />,
      color: "from-teal-500 to-teal-600",
    },
    {
      title: "AIC-SEED",
      description: "Atal Incubation Centre funding and mentorship",
      icon: <Zap className="w-8 h-8" />,
      color: "from-purple-500 to-purple-600",
    },
  ]

  const partners = [
    { name: "MeitY", logo: "/placeholder.svg?height=60&width=120" },
    { name: "IISER Pune", logo: "/placeholder.svg?height=60&width=120" },
    { name: "AIC-SEED", logo: "/placeholder.svg?height=60&width=120" },
    { name: "Southern Railway", logo: "/placeholder.svg?height=60&width=120" },
    { name: "Apollo Hospitals", logo: "/placeholder.svg?height=60&width=120" },
    { name: "Fortis Healthcare", logo: "/placeholder.svg?height=60&width=120" },
  ]

  return (
    <section id="recognition" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Recognition
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Backed by leading institutions and recognized for innovation in healthcare technology
          </p>
        </motion.div>

        {/* Recognition Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {recognitions.map((recognition, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-white dark:bg-slate-800 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${recognition.color} rounded-2xl flex items-center justify-center mx-auto mb-4 text-white`}
                  >
                    {recognition.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{recognition.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{recognition.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Partners Carousel 
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg"
        >
          <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Trusted Partners & Collaborators
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center justify-center p-4 bg-gray-50 dark:bg-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors"
              >
                <Image
                  src={partner.logo || "/placeholder.svg"}
                  alt={partner.name}
                  width={120}
                  height={60}
                  className="max-w-full h-auto opacity-70 hover:opacity-100 transition-opacity"
                />
              </motion.div>
            ))}
          </div>
        </motion.div> */}

        {/* Key Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-16 grid md:grid-cols-3 gap-8"
        >
          <div className="text-center p-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl text-white">
            <Award className="w-12 h-12 mx-auto mb-4" />
            <h4 className="text-xl font-bold mb-2">Innovation Excellence</h4>
            <p className="opacity-90">Recognized for breakthrough healthcare technology solutions</p>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl text-white">
            <Users className="w-12 h-12 mx-auto mb-4" />
            <h4 className="text-xl font-bold mb-2">Research Collaboration</h4>
            <p className="opacity-90">Strong partnerships with leading academic institutions</p>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl text-white">
            <Building className="w-12 h-12 mx-auto mb-4" />
            <h4 className="text-xl font-bold mb-2">Government Support</h4>
            <p className="opacity-90">Backed by government initiatives and funding programs</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
