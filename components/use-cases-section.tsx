"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Quote, Star, Play, Building2, Users, TrendingUp } from "lucide-react"
import Image from "next/image"

export function UseCasesSection() {
  /*const testimonials = [
    {
      name: "Dr. Rajesh Kumar",
      role: "Chief of ICU, Southern Railway HQ Hospital",
      image: "/placeholder.svg?height=80&width=80",
      quote:
        "ASTA's monitoring system has transformed our ICU operations. We've seen a 25% reduction in critical incidents and our response time has improved dramatically.",
      rating: 5,
    },
    {
      name: "Dr. Priya Sharma",
      role: "Head of Critical Care, Apollo Hospital",
      image: "/placeholder.svg?height=80&width=80",
      quote:
        "The AI-powered alerts have significantly reduced false alarms while ensuring we never miss a critical event. It's a game-changer for patient safety.",
      rating: 5,
    },
    {
      name: "Dr. Amit Patel",
      role: "ICU Director, Fortis Healthcare",
      image: "/placeholder.svg?height=80&width=80",
      quote:
        "Implementation was seamless and the training was excellent. Our nursing staff adapted quickly and now can't imagine working without this system.",
      rating: 5,
    },
  ]*/

  const caseStudies = [
    {
      hospital: "Southern Railway HQ Hospital",
      location: "Chennai",
      beds: 24,
      improvement: "40% faster response",
      description: "This innovative solution by ASTA Health Tech provided real-time vital sign monitoring with customizable thresholds and instant alerts. Its responsiveness and flexibility have the potential to elevate clinical care across hospital units.",
    },
  ]

  return (
    <section
      id="hospitals"
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
            Real-World Success Stories
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            See how leading hospitals across India are transforming their hospital wards to smart wards with our AI-powered monitoring
            system
          </p>
        </motion.div>

        {/* Hospital Deployments - compact square-style cards, 4 per row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          
          <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-12">Live at</h3>

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

        {/* Case Studies */}
        {/* <div className="mb-16">
          <div className="grid md:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full overflow-hidden
                  bg-gradient-to-br 
                  from-white via-slate-50 to-blue-50 
                  dark:from-slate-950/80 dark:via-slate-900/70 dark:to-slate-800/60
                  backdrop-blur-xl
                  shadow-[0_4px_25px_rgba(0,0,0,0.06)]
                  hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)]
                  transition-all duration-300 group
                  border-0 ring-1 ring-slate-200/60 dark:ring-slate-700/40 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Building2 className="w-8 h-8 text-blue-500 mr-3" />
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">{study.hospital}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{study.location}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 mb-4">
                      {/*<div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <div className="text-xl font-bold text-blue-600">{study.beds}</div>
                        <div className="text-xs text-blue-700 dark:text-blue-300">ICU Beds</div>
                      </div>*/}
                     {/* <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <div className="text-sm font-bold text-green-600">{study.improvement}</div>
                        <div className="text-xs text-green-700 dark:text-green-300">Improvement</div>
                      </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{study.description}</p> */}

                    {/*<Button variant="outline" size="sm" className="w-full">
                      <Play className="w-4 h-4 mr-2" />
                      View Case Study
                    </Button>*/}
                  {/* </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div> */}

        {/* Testimonials */}
        {/* <div className="mb-16">
          <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-12">
            What Healthcare Leaders Say
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full bg-white dark:bg-slate-800 border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Quote className="w-8 h-8 text-blue-500 mr-3" />
                      <div className="flex">
                        {Array.from({ length: testimonial.rating }, (_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 mb-6 italic">"{testimonial.quote}"</p>

                    <div className="flex items-center">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={48}
                        height={48}
                        className="rounded-full mr-4"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div> */}

        {/* Key Metrics */}
        {/*<motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg"
        >
          <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Proven Results Across Deployments
          </h3>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">25%</div>
              <div className="text-gray-600 dark:text-gray-300">Mortality Reduction</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">40%</div>
              <div className="text-gray-600 dark:text-gray-300">Faster Response</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">30%</div>
              <div className="text-gray-600 dark:text-gray-300">Cost Savings</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">80%</div>
              <div className="text-gray-600 dark:text-gray-300">Fewer False Alarms</div>
            </div>
          </div>
        </motion.div>*/}
      </div>
    </section>
  )
}
