"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function FlowchartDisplaySection() {
  return (
    <section
      id="architecture"
      className="py-24 bg-white dark:bg-slate-950"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            System Design
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          A modular AI-first pipeline that translates visual input from medical monitors into structured vitals in real time, without proprietary integrations.
          </p>
        </motion.div>

        {/* Detailed explanation: Approach */}
        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none mb-20 leading-8 tracking-tight">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Approach
            </h3>

            <p>
                In post-operative wards and critical care settings, continuous monitoring of patients is essential yet still largely dependent on manual observation by nursing staff. While clinicians strive to maintain close oversight, it’s not humanly feasible to monitor every patient continuously, especially in high-volume environments.
            </p>

            <p>
                To address this gap, our platform introduces an AI-powered, camera-based vital sign monitoring system designed to operate continuously and autonomously. Unlike conventional systems that rely on proprietary integrations or hardware, our approach is completely vendor-agnostic, offering real-time performance with minimal latency.
            </p>

            <p className="font-medium">
                The system architecture includes four core components:
            </p>

            <ul className="list-disc list-inside">
                <li><strong>Screen Segmentation</strong>: Isolating monitor displays within the video stream</li>
                <li><strong>Monitor Detection</strong>: Identifying relevant patient monitor areas in each frame</li>
                <li><strong>Vitals Detection & OCR</strong>: Extracting numerical vital signs via robust optical character recognition</li>
                <li><strong>Layout Classification</strong>: Using an encoder to generate embedding vectors for detecting and adapting to diverse monitor formats</li>
            </ul>

            <p>
                To ensure reliable performance at scale, the system leverages message queues and parallelized processing pipelines — reducing computational load and enabling real-time throughput. This architecture supports both structured hospital environments and resource-constrained deployments like field clinics or temporary wards.
            </p>

            <p>
                Overall, this solution offers a <strong>non-invasive</strong>, <strong>low-cost</strong>, and <strong>rapidly deployable</strong> alternative to traditional vitals monitoring, ideal for <strong>telemedicine</strong>, <strong>remote observation</strong>, and <strong>hybrid AI-assisted care models</strong>.
            </p>
        </div>

        {/* Flowchart Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-2xl shadow-xl ring-1 ring-black/[0.05] dark:ring-white/[0.05]"
        >
          <Image
            src="/flowchart.png"
            alt="Workflow diagram"
            width={1600}
            height={1000}
            className="w-full h-auto object-contain"
            priority
          />
        </motion.div>
      </div>
    </section>
  )
}
