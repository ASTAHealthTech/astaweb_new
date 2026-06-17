"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DollarSign,
  Shield,
  Brain,
  Bell,
  Database,
  Lock,
  Plug,
  Award,
  TrendingUp,
  Building,
  Users,
  Heart,
  Droplets,
  GraduationCap,
  ChevronDown,
  ChevronUp,
  ArrowRight,
} from "lucide-react"

export function Benefits() {
  const [expandedBenefit, setExpandedBenefit] = useState<number | null>(null)
  const [hoveredStrategic, setHoveredStrategic] = useState<number | null>(null)

  const coreBenefits = [
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: "No CAPEX. Predictable OPEX.",
      description: "Subscription-based model ensures zero upfront investment",
      details: [
        "Zero upfront capital expenditure required",
        "Predictable monthly operational expenses",
        "Preserve capital for teaching, research, and community health",
        "Flexible scaling based on hospital needs",
        "No maintenance or upgrade costs",
      ],
      color: "from-green-500 to-emerald-600",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "End-to-End Compliance & Legal Protection",
      description: "Compliant with CDSCO, DISHA, NDHM, and IT Act Section 43A",
      details: [
        "CDSCO regulatory compliance for medical devices",
        "DISHA guidelines adherence for digital health",
        "NDHM integration for national health stack",
        "IT Act Section 43A data protection compliance",
        "Tamper-proof records for medico-legal protection",
      ],
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Smart Monitoring Without Clinical Risk",
      description: "Real-time, high-fidelity data that supports clinicians",
      details: [
        "Non-invasive monitoring technology",
        "Supports clinical decision-making without replacing judgment",
        "High-fidelity data capture and analysis",
        "Every bed becomes a smart bed",
        "Transparent AI algorithms, not black-box systems",
      ],
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: "Instant Alerts to the Right People",
      description: "Real-time notifications with 30-60 seconds of video context",
      details: [
        "Real-time alert system for critical events",
        "30-60 seconds of video context with each alert",
        "Multi-channel notification delivery",
        "Role-based alert routing to appropriate staff",
        "Faster, safer decision-making even while offsite",
      ],
      color: "from-orange-500 to-red-600",
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Fully NDHM & ABHA Integrated",
      description: "Tailored to India's national health stack with custom HIS integration",
      details: [
        "Complete NDHM (National Digital Health Mission) integration",
        "ABHA (Ayushman Bharat Health Account) compatibility",
        "Custom HIS (Hospital Information System) integration",
        "Future-proof compliance with evolving regulations",
        "Seamless data exchange with national health infrastructure",
      ],
      color: "from-indigo-500 to-indigo-600",
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Your Data. Your Control.",
      description: "All data resides securely on your servers with full sovereignty",
      details: [
        "Complete data sovereignty and ownership",
        "On-premises or private cloud deployment options",
        "Full compliance with Indian data regulations",
        "Research-ready structured data formats",
        "No vendor lock-in or data dependency",
      ],
      color: "from-teal-500 to-teal-600",
    },
    {
      icon: <Plug className="w-6 h-6" />,
      title: "Plug-and-Play Deployment",
      description: "Runs on existing devices - easy to adopt, easy to scale",
      details: [
        "Compatible with existing hospital infrastructure",
        "Minimal setup and configuration required",
        "Scalable deployment from single beds to entire hospitals",
        "No disruption to current workflows",
        "Quick implementation and go-live process",
      ],
      color: "from-cyan-500 to-cyan-600",
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "A National Role Model for Digital Health",
      description: "Showcase as an academic and clinical leader",
      details: [
        "Position as a digital health innovation leader",
        "Attract top medical talent and partnerships",
        "National recognition and media coverage",
        "Academic research and publication opportunities",
        "Government and industry collaboration prospects",
      ],
      color: "from-pink-500 to-rose-600",
    },
  ]

  const strategicBenefits = [
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "New Revenue from Smart Ward Upgrades",
      revenue: "₹50-100L Annual",
      description: "Transform general wards into premium, monitored beds",
      hoverDetails: "Premium bed charges of ₹2,000-5,000 extra per day for smart monitoring capabilities",
    },
    {
      icon: <Building className="w-6 h-6" />,
      title: "Maximize ICU and HCU Efficiency",
      revenue: "₹50-100L Annual",
      description: "10% increase in turnover for 500-bed hospital",
      hoverDetails: "Early intervention reduces ICU/HCU stay duration, increasing bed availability and revenue",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Launch Remote Monitoring Services",
      revenue: "₹91L Annual",
      description: "50-bed peripheral hospital at ₹500/day/bed",
      hoverDetails: "Extend specialist care to satellite centers and rural hospitals through telemedicine",
    },
    {
      icon: <Droplets className="w-6 h-6" />,
      title: "Protect Blood and Organ Inventory",
      revenue: "15-25% Waste Reduction",
      description: "Continuous temperature tracking and compliance",
      hoverDetails: "Automated monitoring prevents spoilage and ensures regulatory compliance for blood banks",
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Monetize Wellness Programs",
      revenue: "New Revenue Stream",
      description: "AI-driven bio-feedback therapy services",
      hoverDetails: "Chronic care management and mental health programs create additional revenue opportunities",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Save on Staffing and Errors",
      revenue: "20-30% Cost Reduction",
      description: "Automated monitoring reduces workload",
      hoverDetails: "Reduced documentation errors, improved patient safety, and optimized nurse-to-patient ratios",
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: "Enable Research & Training",
      revenue: "Academic Excellence",
      description: "Structured clinical data for publications",
      hoverDetails: "Real-world data supports research publications, grants, and academic partnerships",
    },
  ]

  const toggleBenefit = (index: number) => {
    setExpandedBenefit(expandedBenefit === index ? null : index)
  }

  return (
    <section id="benefits" className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        {/*<motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Why Choose ASTA Health Tech
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Comprehensive benefits that transform healthcare delivery while ensuring strong financial returns
          </p>
        </motion.div>*/}

        {/* Core Benefits */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Core Benefits of ASTA Health Tech
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Card className="relative h-full rounded-2xl overflow-hidden
                  bg-gradient-to-br 
                  from-white via-slate-50 to-blue-50 
                  dark:from-slate-950/80 dark:via-slate-900/70 dark:to-slate-800/60
                  backdrop-blur-xl
                  shadow-[0_4px_25px_rgba(0,0,0,0.06)]
                  hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)]
                  transition-all duration-300 group
                  border-0 ring-1 ring-slate-200/60 dark:ring-slate-700/40
                  transition-all duration-300 cursor-pointer">
                  <CardContent className="p-6">
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${benefit.color} rounded-xl flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform duration-300`}
                    >
                      {benefit.icon}
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{benefit.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{benefit.description}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleBenefit(index)}
                      className="w-full justify-between text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-900/20"
                    >
                      Learn More
                      {expandedBenefit === index ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </Button>

                    {expandedBenefit === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
                      >
                        <ul className="space-y-2">
                          {benefit.details.map((detail, detailIndex) => (
                            <li key={detailIndex} className="text-xs text-gray-600 dark:text-gray-400 flex items-start">
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 mr-2 flex-shrink-0" />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Strategic & Financial Benefits */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Strategic and Financial Benefits
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {strategicBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                onMouseEnter={() => setHoveredStrategic(index)}
                onMouseLeave={() => setHoveredStrategic(null)}
                className="group"
              >
                <Card className="relative h-full rounded-2xl overflow-hidden
                  bg-gradient-to-br 
                  from-white via-slate-50 to-blue-50 
                  dark:from-slate-950/80 dark:via-slate-900/70 dark:to-slate-800/60
                  backdrop-blur-xl
                  shadow-[0_4px_25px_rgba(0,0,0,0.06)]
                  hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)]
                  transition-all duration-300 group
                  border-0 ring-1 ring-slate-200/60 dark:ring-slate-700/40
                  transition-all duration-300 group-hover:scale-105">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform duration-300">
                      {benefit.icon}
                    </div>
                    <div className="mb-2">
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      >
                        {benefit.revenue}
                      </Badge>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{benefit.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{benefit.description}</p>

                    {hoveredStrategic === index && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg"
                      >
                        {benefit.hoverDetails}
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}