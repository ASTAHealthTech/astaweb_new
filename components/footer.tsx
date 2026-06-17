"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Mail, Phone, MapPin, Linkedin, Twitter, Youtube, Heart } from "lucide-react"
import { Logo } from "@/components/logo"

export function Footer() {
  const footerLinks = {
    company: [
      { name: "Home", href: "/" },
      { name: "Team", href: "/about#team" },
      { name: "Contact", href: "/contact" },
    ],
    product: [
      { name: "Features", href: "/solutions#features" },
      { name: "Technology", href: "/platform#technology" },
      { name: "Product", href: "/solutions#product" },
    ],
    other: [
      { name: "Partners", href: "/#partners" },
      { name: "Hospitals", href: "/use-cases#hospitals" },
    ],
  }

  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <Link href="/" className="flex items-center mb-8">
              <Logo size="lg" variant="light" />
            </Link>
            <p className="text-gray-300 mb-6 text-sm leading-relaxed">
              Revolutionizing critical care through AI-powered real-time monitoring. Saving lives with smart
              surveillance technology.
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex items-center text-gray-300">
                <Mail className="w-4 h-4 mr-3 flex-shrink-0" />
                info@astahealthtech.com
              </div>
            </div>
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8 lg:col-span-3"
          >
            <div>
              <h4 className="font-semibold mb-4 text-lg">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-gray-300 hover:text-white transition-colors text-sm">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-lg">Product</h4>
              <ul className="space-y-3">
                {footerLinks.product.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-gray-300 hover:text-white transition-colors text-sm">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-lg">Other</h4>
              <ul className="space-y-3">
                {footerLinks.other.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-gray-300 hover:text-white transition-colors text-sm">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="border-t border-slate-800 mt-12 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col items-center md:items-start space-y-2 mb-4 md:mb-0">
              <p className="text-gray-300 text-sm">
                © {new Date().getFullYear()} ASTA Health Tech. All rights reserved.
              </p>
              <div className="flex items-center text-gray-400 text-sm">
                <span>Developed with </span>
                <Heart className="w-4 h-4 mx-1 text-red-500 fill-current animate-pulse" />
                <span>by </span>
                <Link
                  href="https://www.linkedin.com/in/adithyasaisrinivas/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-1 text-blue-400 hover:text-blue-300 transition-colors flex items-center"
                >
                  Adithya Sai Srinivas
                </Link>
              </div>
            </div>
            <div className="flex space-x-4">
              <Link href="https://www.linkedin.com/company/astahealthtech/" className="text-gray-300 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
