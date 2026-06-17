"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Building2 } from "lucide-react"
import { link } from "fs"

export function PartnersSection() {
  const partners = [
    {
      name: "AIC-SEED",
      logo: "/partners/AIC-SEED-logo-pune.jpg",
      description: "Atal Incubation Centre - SEED",
    },
    {
      name: "MeitY Startup Hub",
      logo: "/partners/MeitYStartupHub-Logo-FINAL_5.png",
      description: "Ministry of Electronics & IT, Government of India",
    },
    {
      name: "IISER Pune",
      logo: "/partners/IISER,_PUNE_Logo.png",
      description: "Indian Institute of Science Education and Research, Pune",
    },
    {
      name: "NIT Andhra Pradesh",
      logo: "/partners/NIT_Andhra.png",
      description: "National Institute of Technology, Andhra Pradesh",
    },
  ]

  return (
    <section id="partners" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-medium text-gray-900 dark:text-white mb-4">
            Trusted by
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Backed by pioneering institutions and national innovation programs
          </p>
        </motion.div>

        {/* Partners Logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br 
                  from-white via-slate-50 to-blue-50 
                  dark:from-slate-950/80 dark:via-slate-900/70 dark:to-slate-800/60
                  backdrop-blur-xl
                  shadow-[0_8px_32px_rgba(0,0,0,0.08)] rounded-2xl p-12 shadow-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 justify-items-center">
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center space-y-2"
              >
                <div className="relative w-36 h-20 flex items-center justify-center">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    className="object-contain hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {partner.name}
                </h3>
                <div className="text-sm text-slate-600 dark:text-slate-200">
                  {partner.description}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div> 
        
        {/* Hospital Deployments - compact square-style cards, 4 per row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          
          <h3 className="text-2xl font-medium text-center text-gray-900 dark:text-white mb-12">Live at</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {[
              {
                name: "Southern Railway HQ Hospital",
                city: "Chennai, Tamilnadu",
                link: "https://srhqh.edu.in/",
                year: 2025,
                status: "Live",
                logo: "/hospitals/southern-railway-hq.jpeg",
              },
              {
                name: "Karnataka ENT Hospital",
                city: "Chitradurga, Karnataka",
                link: "https://kenthospitals.com/",
                year: 2025,
                status: "Live",
                logo: "/hospitals/karnataka-ent.jpg",
              },
              {
                name: "Aksha Hospital",
                city: "Bangalore, Karnataka",
                link: "https://www.akshahospital.in/",
                year: 2025,
                status: "Live",
                logo: "/hospitals/aksha.png",
              },
              {
                name: "Seethapathy Clinic",
                city: "Chennai, Tamilnadu",
                link: "https://seethapathyclinic.org/",
                year: 2025,
                status: "Live",
                logo: "/hospitals/seethapathy(1).png",
              },
              {
                name: "K.S. Hospital",
                city: "Kumbakonam, Tamilnadu",
                link: "https://www.kshospital.co.in/",
                year: 2025,
                status: "Live",
                logo: "/hospitals/ks.png",
              },
              {
                name: "Sugam Hospital",
                city: "Kumbakonam, Tamilnadu",
                link: "https://jsdl.in/DT-99B34WUN",
                year: 2026,
                status: "Live",
                logo: "/hospitals/sugam.png"
              },
              {
                name: "Anbu Hospital",
                city: "Kumbakonam, Tamilnadu",
                link: "http://www.anbuhospital.org/",
                year: 2026,
                status: "Live",
                logo: "/hospitals/anbu.png"
              },
            ].map((h, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                viewport={{ once: true }}
                className="w-full max-w-sm"
              >
                <Card className="h-full rounded-2xl shadow-md hover:shadow-lg transition-shadow border-0 bg-white dark:bg-slate-900 flex flex-col justify-between">
                  <CardContent className="p-6 flex flex-col justify-between h-[350px]">
                    <div>
                      <div className="flex flex-col items-center text-center mb-4">
                        <div className="w-24 h-24 rounded-2xl bg-white dark:bg-white flex items-center justify-center overflow-hidden border border-slate-200 dark:border-slate-700 mb-4">
                          {h.logo ? (
                            <Image
                              src={h.logo}
                              alt={h.name}
                              width={96}
                              height={96}
                              className="object-contain"
                            />
                          ) : (
                            <Building2 className="w-8 h-8 text-blue-600" />
                          )}
                        </div>
                        <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
                          {h.name}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{h.city}</p>

                        <div className="flex justify-center gap-2 mb-4">
                          <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-50 dark:bg-green-900/20 text-xs font-medium text-green-800 dark:text-green-300">
                            ● {h.status}
                          </span>
                          <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-xs text-blue-700 dark:text-blue-300">
                            Since {h.year}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <a
                        href={h.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline mb-2"
                      >
                        Visit Website →
                      </a>
                      <div className="text-xs text-slate-500 dark:text-slate-400 text-center">
                        Deployment in collaboration with medical and technical teams.
                      </div>
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
