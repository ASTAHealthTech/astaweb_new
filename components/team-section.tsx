"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Github, Linkedin, Twitter, GraduationCap } from "lucide-react"
import Image from "next/image"

export function TeamSection() {
  // Core team data
  const coreMembers = [
    {
      name: "Dr. Vikram Paramasivan",
      role: "CEO & Co-Founder",
      bio: "Visionary leader with 15+ years at Microsoft, contributed to multiple AI-driven innovations in M365 and Azure that contributed to $4B+ ARR.",
      image: "/team/1.jpeg?height=300&width=300",
      social: {
        linkedin: "https://www.linkedin.com/in/vikramparamasivan/",
      },
    },
    {
      name: "Adyanta Dubey",
      role: "CTO & Co-Founder",
      bio: "Passionate AI & robotics enthusiast from NIT‑AP, spearheading tech development with strong full‑stack, ML/data science.",
      image: "/team/3.jpeg?height=300&width=300",
      social: {
        linkedin: "https://www.linkedin.com/in/adyanta-dubey-a57895225/",
      },
    },
    {
      name: "Dr. Kumaresh Krishnamoorthy",
      role: "CMO & Co-Founder",
      bio: "ENT surgeon and health tech innovator with 20+ years’ experience, mentoring AI/IoT-driven medical startups and scaling real-world solutions.",
      image: "/team/2.jpeg?height=300&width=300",
      social: {
        linkedin: "https://www.linkedin.com/in/drkumaresh/",
      },
    },
    {
      name: "Mr. Varun Singh",
      role: "Chief Business Officer",
      bio: "Managing Director of XIPHIAS Immigration, XIPHIAS Projects and TUR. A certified Fellow and CPD holder from the Investment Migration Council.",
      image: "/team/11.jpeg?height=300&width=300",
      social: {
        linkedin: "https://www.linkedin.com/in/varunxiphias/",
      },
    },
  ]

  // Advisors data
  const advisors = [
    {
      name: "Dr. Karthick Seshadri",
      role: "Advisor",
      bio: "Assistant Professor at NIT‑AP and AI researcher with a PhD in distributed ML, focused on scalable and real-world deep learning systems.",
      image: "/team/6.webp?height=300&width=300",
      social: {
        scholar: "https://scholar.google.co.in/citations?user=7KmAy8AAAAAJ"
      },
    },
    {
      name: "Dr. Balaraman Ravindran",
      role: "Advisor",
      bio: "Founding Head, Wadhwani School of Data Science & AI, IIT Madras and leading researcher in AI, ML, and robotics with over 20 years of experience.",
      image: "/team/7.jpeg?height=300&width=300",
      social: {
        linkedin: "https://www.linkedin.com/in/balaraman-ravindran-427a307/",
        scholar: "https://scholar.google.co.in/citations?user=nGUcGrYAAAAJ&hl=en"
      },
    },
    {
      name: "Mr. Krishnakumar Srinivasan",
      role: "Advisor",
      bio: "Investment Professional. Founder & Director at Lion Hill Capital Pvt.Ltd. Independent Director at DEXIT Global (formerly NSE IT)",
      image: "/team/9.jpeg?height=300&width=300",
      social: {
        linkedin: "https://www.linkedin.com/in/krishnakumar-srinivasan-32b1b51b/"
      },
    },
    {
      name: "Dr. Sandeep Murali",
      role: "Advisor",
      bio: "Health care Professional, Surgeon and Administrator with a passion for Medicine, Education, Research and Innovation",
      image: "/team/10.png?height=300&width=300",
      social: {
        linkedin: "https://www.linkedin.com/in/sandeep-murali-2080714/"
      },
    },
  ]

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case "linkedin":
        return <Linkedin size={18} />
      case "scholar":
        return <GraduationCap size={18} />
      default:
        return null
    }
  }

  const getSocialHoverColor = (platform: string) => {
    switch (platform) {
      case "linkedin":
        return "hover:text-blue-700 dark:hover:text-blue-400"
      case "scholar":
        return "hover:text-green-600 dark:hover:text-green-400"
      default:
        return "hover:text-blue-500"
    }
  }

  return (
    <section id="team" className="py-20 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Meet Our <span className="text-blue-600 dark:text-blue-500">Expert Team</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Our team combines expertise in medicine, technology, and business to revolutionize critical care.
          </p>
        </motion.div>

        <div className="space-y-16">
          {/* Core Members Section */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                Core <span className="text-blue-600 dark:text-blue-500">Members</span>
              </h3>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {coreMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                      <div className="relative w-full aspect-square">
                        <Image
                          src={member.image || "/placeholder.svg"}
                          alt={member.name}
                          fill
                          className="object-cover rounded-t-xl"
                          sizes="(max-width: 768px) 100vw, 33vw"
                          priority={index < 3} // prioritize loading first 3 for above-the-fold
                        />
                      </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{member.name}</h3>
                      <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">{member.role}</p>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">{member.bio}</p>

                      {/* Only show social links that exist */}
                      {Object.keys(member.social).length > 0 && (
                        <div className="flex space-x-3">
                          {Object.entries(member.social).map(([platform, url]) => (
                            <a
                              key={platform}
                              href={url}
                              className={`text-gray-500 dark:text-gray-400 transition-colors ${getSocialHoverColor(platform)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {getSocialIcon(platform)}
                              <span className="sr-only">{platform.charAt(0).toUpperCase() + platform.slice(1)}</span>
                            </a>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Advisors Section */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                <span className="text-blue-600 dark:text-blue-500">Advisors</span>
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Distinguished experts guiding our vision and providing strategic insights.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {advisors.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                      <div className="relative w-full aspect-square">
                        <Image
                          src={member.image || "/placeholder.svg"}
                          alt={member.name}
                          fill
                          className="object-cover rounded-t-xl"
                          sizes="(max-width: 768px) 100vw, 33vw"
                          priority={false}
                        />
                      </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{member.name}</h3>
                      <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">{member.role}</p>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">{member.bio}</p>

                      {/* Only show social links that exist */}
                      {Object.keys(member.social).length > 0 && (
                        <div className="flex space-x-3">
                          {Object.entries(member.social).map(([platform, url]) => (
                            <a
                              key={platform}
                              href={url}
                              className={`text-gray-500 dark:text-gray-400 transition-colors ${getSocialHoverColor(platform)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {getSocialIcon(platform)}
                              <span className="sr-only">{platform.charAt(0).toUpperCase() + platform.slice(1)}</span>
                            </a>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
