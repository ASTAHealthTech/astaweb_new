"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function ResearchSection() {
  return (
    <section
        id="research"
        className="py-24 bg-slate-50 dark:bg-[#0a1d38] border-t border-gray-100 dark:border-zinc-700"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
        >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Behind the System: AI + Computer Vision in Practice
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                This section walks through the machine intelligence powering ASTA Health Tech’s real-time monitoring from detection pipelines to OCR, layout understanding, and performance optimization.
            </p>
        </motion.div>

        {/* Abstract */}
        <div className="bg-white dark:bg-zinc-900 p-8 md:p-10 rounded-3xl shadow-md mb-20 text-base leading-8 text-slate-800 dark:text-gray-200 tracking-tight">
            <p className="mb-4">
                <strong>Abstract:</strong> Continuous patient monitoring is essential in modern healthcare but traditional systems are expensive, closed, and hardware-dependent. ASTA’s system introduces a lightweight, AI-powered visual pipeline that interprets real-time vitals from patient monitors using only camera input.
            </p>
            <p>
                Designed to be infrastructure-agnostic, the system supports multiple device types, layouts, and conditions — no vendor lock-in, no need for direct integrations. The intelligent architecture uses layout classifiers, perspective correction, and optimized OCR to enable scalable deployment across both high-end hospitals and low-resource care environments.
            </p>
        </div>

        {/* Performance Metrics Explanation + Table */}
        <div className="space-y-8">
        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none mb-20 leading-8 tracking-tight">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Evaluation Metrics</h3>
            <p>
              We evaluate our system using standard metrics:
              <strong> Precision</strong> (P) reflects how many of the detected values were correct, 
              <strong> Recall</strong> (R) indicates how many actual values were successfully detected, and
              <strong> F1 Score</strong> is the harmonic mean of precision and recall — balancing both. 
              <strong> Intersection over Union (IoU)</strong> is used for segmentation to measure the overlap between predicted and actual regions.
            </p>
          </div>

          {/* Metrics Table */}
          <div className="overflow-x-auto rounded-2xl shadow ring-1 ring-black/[0.05] dark:ring-white/[0.05]">
          <table className="w-full table-auto text-sm text-left text-slate-800 dark:text-gray-200">
            {/* Section 1: Overall System Metrics */}
            <thead className="bg-slate-100 dark:bg-zinc-800 text-sm text-slate-700 dark:text-slate-300">
              <tr>
                <th colSpan={3} className="text-center font-bold bg-slate-200 dark:bg-zinc-700 text-slate-800 dark:text-slate-100 py-3 tracking-wide">
                  Overall Performance
                </th>
              </tr>
              <tr>
                <th className="px-6 py-4">Component</th>
                <th className="px-6 py-4">Metric</th>
                <th className="px-6 py-4">Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
              <tr className="hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors">
                <td className="px-6 py-4 font-medium">Screen Segmentation</td>
                <td className="px-6 py-4">IoU</td>
                <td className="px-6 py-4">92.3%</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors">
                <td className="px-6 py-4 font-medium">Vital Detection (OCR)</td>
                <td className="px-6 py-4">Precision, Recall, F1</td>
                <td className="px-6 py-4">1.000, 1.000, 1.000</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors">
                <td className="px-6 py-4 font-medium">Layout Classification</td>
                <td className="px-6 py-4">Accuracy</td>
                <td className="px-6 py-4">100%</td>
              </tr>
            </tbody>

            {/* Section 2: Per-Vital Metrics */}
            <thead className="bg-slate-100 dark:bg-zinc-800 text-sm text-slate-700 dark:text-slate-300">
              <tr>
                <th colSpan={3} className="text-center font-bold bg-slate-200 dark:bg-zinc-700 text-slate-800 dark:text-slate-100 py-3 tracking-wide">
                  Per-Label Scores
                </th>
              </tr>
              <tr>
                <th className="px-6 py-4">Label</th>
                <th className="px-6 py-4">GT, Pred</th>
                <th className="px-6 py-4">Precision, Recall, F1</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
              {[
                ["NBPMap", "75, 75", "1.000, 1.000, 1.000"],
                ["NBPDiastolic", "71, 71", "1.000, 1.000, 1.000"],
                ["NBPSystolic", "71, 71", "1.000, 1.000, 1.000"],
                ["SpO2", "64, 64", "1.000, 1.000, 1.000"],
                ["Heart Rate", "84, 84", "1.000, 1.000, 1.000"],
                ["Respiration Rate", "82, 82", "1.000, 1.000, 1.000"],
                ["Pulse", "37, 37", "1.000, 1.000, 1.000"],
              ].map(([vital, gtPred, metrics], i) => (
                <tr key={i} className="hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors">
                  <td className="px-6 py-4 font-medium">{vital}</td>
                  <td className="px-6 py-4">{gtPred}</td>
                  <td className="px-6 py-4">{metrics}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>

        {/* Conclusion */}
        <p className="text-base leading-7 text-slate-600 dark:text-slate-400 mt-16 max-w-3xl">
        ASTA Health Tech builds AI-native infrastructure for scalable, cost-effective care. This is one of many intelligence-first modules in our broader platform transforming medical vision into actionable data.
        </p>
      </div>
    </section>
  )
}
