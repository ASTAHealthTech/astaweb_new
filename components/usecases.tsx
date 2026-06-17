"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { BriefcaseMedical, Stethoscope, Hospital, ActivitySquare, Video, Syringe, BookOpenCheck, HeartPulse } from "lucide-react"

export default function UseCasesPage() {
  const useCases = [
    {
      icon: <BriefcaseMedical className="w-6 h-6" />,
      title: "Smart Wards in General Hospitals",
      description:
        "Convert regular beds into smart beds for live vitals, alerting, and clinician support — without disrupting current workflows.",
    },
    {
      icon: <Stethoscope className="w-6 h-6" />,
      title: "Remote Monitoring for Peripheral Centers",
      description:
        "Enable specialist coverage in tier-2/tier-3 cities and rural hospitals via AI-enabled remote monitoring and alerts.",
    },
    {
      icon: <Hospital className="w-6 h-6" />,
      title: "ICU & HCU Optimization",
      description:
        "Reduce ICU and HCU stays with early risk detection on general floors, improving bed availability and care quality.",
    },
    {
      icon: <ActivitySquare className="w-6 h-6" />,
      title: "Hospital-at-Home Services",
      description:
        "Support chronic care, post-surgical recovery, or quarantine at home using AI-based monitoring kits and dashboards.",
    },
    {
      icon: <Video className="w-6 h-6" />,
      title: "AI-Backed Clinical Training",
      description:
        "Use real-case alert footage and vitals data for academic training, research, and protocol development.",
    },
    {
      icon: <Syringe className="w-6 h-6" />,
      title: "Blood & Organ Bank Monitoring",
      description:
        "Ensure compliance and reduce wastage through real-time temperature and storage condition tracking.",
    },
    {
      icon: <BookOpenCheck className="w-6 h-6" />,
      title: "Medical Research Enablement",
      description:
        "Structured, anonymized clinical data enables real-world studies, AI algorithm validation, and clinical papers.",
    },
    {
      icon: <HeartPulse className="w-6 h-6" />,
      title: "Wellness & Mental Health Programs",
      description:
        "Use bio-feedback from live monitoring to run preventive wellness, lifestyle, or stress therapy programs.",
    },
  ]

  return (
    <section id="applications" className="py-20 bg-white dark:bg-slate-950 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card className="h-full overflow-hidden
                  bg-gradient-to-br 
                  from-white via-slate-50 to-blue-50 
                  dark:from-slate-950/80 dark:via-slate-900/70 dark:to-slate-800/60
                  backdrop-blur-xl
                  shadow-[0_4px_25px_rgba(0,0,0,0.06)]
                  hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)]
                  transition-all duration-300 group
                  border-0 ring-1 ring-slate-200/60 dark:ring-slate-700/40 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-blue-600 dark:from-indigo-400 dark:to-blue-500 rounded-xl flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform duration-300">
                    {useCase.icon}
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {useCase.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {useCase.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
