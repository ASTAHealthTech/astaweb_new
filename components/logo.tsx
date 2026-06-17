"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

interface LogoProps {
  className?: string
  size?: "sm" | "md" | "lg" | "xl" | "2xl"
  variant?: "default" | "light" | "dark" | "adaptive"
}

export function Logo({ className = "", size = "lg", variant = "adaptive" }: LogoProps) {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Much larger responsive sizing
  const sizeClasses = {
    sm: "h-8 sm:h-10 md:h-12", // 32px → 48px
    md: "h-12 sm:h-14 md:h-16 lg:h-18", // 48px → 72px
    lg: "h-16 sm:h-18 md:h-20 lg:h-22 xl:h-24", // 64px → 96px
    xl: "h-20 sm:h-22 md:h-24 lg:h-28 xl:h-32", // 80px → 128px
    "2xl": "h-24 sm:h-28 md:h-32 lg:h-36 xl:h-40", // 96px → 160px
  }

  const widthMap = {
    sm: { base: 140, sm: 160, md: 180 },
    md: { base: 180, sm: 200, md: 240, lg: 260 },
    lg: { base: 220, sm: 260, md: 300, lg: 320, xl: 360 },
    xl: { base: 280, sm: 320, md: 360, lg: 400, xl: 480 },
    "2xl": { base: 340, sm: 400, md: 480, lg: 520, xl: 600 },
  }

  const heightMap = {
    sm: { base: 32, sm: 40, md: 48 },
    md: { base: 48, sm: 56, md: 64, lg: 72 },
    lg: { base: 64, sm: 72, md: 80, lg: 88, xl: 96 },
    xl: { base: 80, sm: 88, md: 96, lg: 112, xl: 128 },
    "2xl": { base: 96, sm: 112, md: 128, lg: 144, xl: 160 },
  }

  // Don't render until mounted to avoid hydration issues
  if (!mounted) {
    return (
      <div className={`${sizeClasses[size]} w-auto bg-gray-200 dark:bg-gray-700 animate-pulse rounded ${className}`} />
    )
  }

  const getLogoStyle = () => {
    const isDark = resolvedTheme === "dark"

    switch (variant) {
      case "light":
        return {
          filter: "brightness(0) invert(1)", // Makes it white
          dropShadow: "0 4px 8px rgba(0,0,0,0.4)",
        }
      case "dark":
        return {
          filter: "none",
          dropShadow: "0 4px 8px rgba(255,255,255,0.1)",
        }
      case "adaptive":
        return isDark
          ? {
              filter: "brightness(0) invert(1)",
              dropShadow: "0 4px 12px rgba(0,0,0,0.6)",
            }
          : {
              filter: "none",
              dropShadow: "0 4px 8px rgba(0,0,0,0.15)",
            }
      default:
        return {
          filter: "none",
          dropShadow: "0 4px 8px rgba(0,0,0,0.1)",
        }
    }
  }

  const logoStyle = getLogoStyle()

  return (
    <motion.div
      className={`flex items-center ${className}`}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <div
        className="relative"
        style={{
          filter: `drop-shadow(${logoStyle.dropShadow})`,
        }}
      >
        <Image
          src="/logo-asta.png"
          alt="ASTA Health Tech"
          width={widthMap[size].xl || widthMap[size].base}
          height={heightMap[size].xl || heightMap[size].base}
          className={`${sizeClasses[size]} w-auto object-contain transition-all duration-300 hover:brightness-110`}
          style={{
            filter: logoStyle.filter,
          }}
          priority
        />
      </div>
    </motion.div>
  )
}
