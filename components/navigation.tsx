"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"
import { motion } from "framer-motion"
import { Logo } from "@/components/logo"
import {
  ServerCog, Shuffle, Microscope, LayoutGrid, PackageOpen, SearchCheck, Link2,
  Hospital, Stethoscope, MessageCircle, LineChart, Gift, Handshake, Contact, Users, Monitor
} from "lucide-react"
import { Dropdown } from "react-day-picker"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mediumOpen, setMediumOpen] = useState(false)

  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null)
      }
    }
    window.addEventListener("scroll", handleScroll)
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const navItems = [
    {
      name: "Home",
      href: "/",
      intro: {
        label: "Home", 
        description: "Welcome to Asta HealthTech, transforming healthcare with AI."
      },
    },
    {
      name: "Solutions",
      href: "/solutions",
      intro: {
        label: "Solutions",
        description: "Empowering healthcare delivery with features, compliance, and integration."
      },
      dropdown: [
        { icon: LayoutGrid, title: "Features", desc: "Explore the clinical and admin tools we offer.", href: "/solutions#features" },
        { icon: PackageOpen, title: "Product Overview", desc: "What’s included in our platform suite.", href: "/solutions#product" },
        { icon: Monitor, title: "Patient Monitoring", desc: "End-to-end explanation of the user journey.", href: "/solutions#patient-monitoring" },
        { icon: Link2, title: "NDHM Integration", desc: "APIs and standards compliance with Ayushman Bharat.", href: "/solutions#ndhm-integration" },
      ],
    },
    {
      name: "Platform",
      href: "/platform",
      intro: {
        label: "Platform",
        description: "Our advanced healthcare tools designed for clinics, hospitals, and remote monitoring."
      },
      dropdown: [
        { icon: ServerCog, title: "Technology", desc: "The core technologies powering Asta HealthTech.", href: "/platform#technology" },
        { icon: Shuffle, title: "System Design", desc: "Our approach, data flow, architecture, and system design.", href: "/platform#architecture" },
        { icon: Microscope, title: "Research", desc: "Innovations and studies driving our progress.", href: "/platform#research" },
      ],
    },
    {
      name: "Use Cases",
      href: "/use-cases",
      intro: {
        label: "Use Cases",
        description: "Real-world applications of our platform by hospitals, clinics, and professionals."
      },
      dropdown: [
        { icon: Hospital, title: "Hospitals", desc: "How hospitals are using our platform to improve care.", href: "/use-cases#hospitals" },
      ],
    },
    {
      name: "About",
      href: "/about",
      intro: {
        label: "About",
        description: "Learn about our mission, values, and the team building the future of hospital intelligence."
      },
      dropdown: [
        {
          icon: Users,
          title: "Our Team",
          desc: "Meet the minds behind ASTA Health Tech.",
          href: "/about#team"
        }
      ]
    }    
  ]

  if (!mounted) return null

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white/80 dark:bg-[#0f172a]/90 backdrop-blur-md shadow-lg" : "bg-transparent"}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center h-20 lg:h-20">
          <Link href="/" className="flex items-center">
            <Logo size="lg" variant="adaptive" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <div key={item.name}>
                {item.dropdown ? (
                  <>
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                      className={`text-gray-800 dark:text-white font-medium px-2 py-1 rounded transition-colors ${activeDropdown === item.name ? "text-blue-600" : "hover:text-blue-600"} dark:hover:text-blue-400`}
                    >{item.name}
                    </button>
                    {activeDropdown === item.name && (
                      <div
                        ref={dropdownRef}
                        className="absolute top-20 left-0 w-full p-6 sm:p-8 rounded-2xl shadow-xl z-50 flex flex-col lg:flex-row gap-10
                        bg-white text-black dark:bg-[#0f172a] dark:text-white border border-gray-200 dark:border-zinc-700"
                      >                    
                        <div className="lg:w-1/3 w-full">
                        <Link
                          href={item.href || "#"}
                          className="font-semibold text-base md:text-lg mb-2 inline-flex items-center gap-1 text-blue-700 hover:underline dark:text-blue-400"
                        >
                          {item.intro?.label || item.name} <span className="text-base">→</span>
                        </Link>
                          <p className="text-sm md:text-base leading-relaxed text-muted-foreground dark:text-zinc-400">{item.intro?.description}</p>
                        </div>
                        <div className="lg:w-2/3 w-full grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                          {item.dropdown.map((drop) => (
                            <Link key={drop.title} href={drop.href} className="group flex gap-4 hover:bg-zinc-100 dark:hover:bg-zinc-800 px-4 py-3 rounded-xl transition-all">
                              <div className="flex-shrink-0 pt-1"><drop.icon size={26} className="text-blue-500 group-hover:scale-110 transition-transform" /></div>
                              <div>
                                <p className="font-semibold flex items-center gap-1">{drop.title}<span className="ml-1 text-muted-foreground group-hover:text-blue-500 transition">→</span></p>
                                <p className="text-sm text-muted-foreground dark:text-zinc-400 mt-1">{drop.desc}</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <Link href={item.href} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 font-medium">{item.name}</Link>
                )}
              </div>
            ))}
          </div>

          {/* Theme toggle and Contact */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>{theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</Button>
            <Button className="hidden md:inline-flex bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white" onClick={() => { window.location.href = "/contact" }}>Contact Us</Button>

            {/* Medium Screen Navigation */}
            <div className="hidden md:flex lg:hidden">
              <Sheet open={mediumOpen} onOpenChange={setMediumOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon"><Menu className="w-5 h-5" /></Button>
                </SheetTrigger>
                <SheetContent className="w-full max-w-md bg-white dark:bg-[#0f172a] text-black dark:text-white overflow-y-auto">
                  <div className="flex flex-col mt-8 space-y-8 px-4 pb-8">
                    <Logo size="lg" variant="adaptive" className="mx-auto" />
                    {navItems.map((item) => (
                      <div key={item.name}>
                        <p className="text-xl font-bold border-b border-zinc-200 dark:border-zinc-700 pb-1 mb-3">{item.name}</p>
                        <ul className="space-y-2">
                          {item.dropdown?.map((link) => (
                            <li key={link.title}>
                              <Link href={link.href} onClick={() => setMediumOpen(false)} className="block text-zinc-700 dark:text-zinc-300 text-base hover:text-blue-600 dark:hover:text-white pl-2">
                                {link.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Mobile Navigation */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon"><Menu className="w-5 h-5" /></Button>
              </SheetTrigger>
              <SheetContent className="w-full max-w-sm bg-white dark:bg-[#0f172a] text-black dark:text-white overflow-y-auto">
                <div className="flex flex-col mt-8 space-y-8 px-4 pb-8">
                  <Logo size="lg" variant="adaptive" className="mx-auto" />
                  {navItems.map((item) => (
                    <div key={item.name}>
                      {item.href && (
                        <Link
                          href={item.href}
                          scroll={item.href?.startsWith("/#")}
                          onClick={() => setMobileOpen(false)}
                          className="text-xl font-bold text-zinc-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 block border-b border-zinc-200 dark:border-zinc-700 pb-1 mb-3"
                        >
                          {item.name}
                        </Link>
                      )}

                      {item.dropdown && (
                        <ul className="space-y-2 pl-2">
                          {item.dropdown.map((link) => (
                            <li key={link.title}>
                              <Link
                                href={link.href}
                                scroll={link.href?.startsWith("/#")}
                                onClick={() => setMobileOpen(false)}
                                className="block text-zinc-700 dark:text-zinc-300 text-base hover:text-blue-600 dark:hover:text-white"
                              >
                                {link.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                  <Button className="mt-6 bg-gradient-to-r from-blue-600 to-teal-600 text-lg text-white py-6 w-full" onClick={() => { window.location.href = "/contact" }}>Contact Us</Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}