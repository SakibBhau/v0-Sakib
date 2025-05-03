"use client"

import { motion } from "framer-motion"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import type { ReactNode } from "react"

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  threshold?: number
  once?: boolean
  animation?: "fade" | "slide" | "scale" | "fade-slide" | "fade-scale"
  direction?: "up" | "down" | "left" | "right"
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  threshold = 0.2,
  once = true,
  animation = "fade-slide",
  direction = "up",
}: ScrollRevealProps) {
  const {
    ref,
    controls,
    variants: defaultVariants,
  } = useScrollAnimation({
    threshold,
    once,
    delay,
  })

  // Define animation variants based on the animation type and direction
  const getVariants = () => {
    switch (animation) {
      case "fade":
        return {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
          },
        }
      case "slide":
        return {
          hidden: {
            x: direction === "left" ? -50 : direction === "right" ? 50 : 0,
            y: direction === "up" ? 50 : direction === "down" ? -50 : 0,
          },
          visible: {
            x: 0,
            y: 0,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
          },
        }
      case "scale":
        return {
          hidden: { scale: 0.8, opacity: 0 },
          visible: {
            scale: 1,
            opacity: 1,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
          },
        }
      case "fade-scale":
        return {
          hidden: { opacity: 0, scale: 0.9 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
          },
        }
      case "fade-slide":
      default:
        return {
          hidden: {
            opacity: 0,
            x: direction === "left" ? -30 : direction === "right" ? 30 : 0,
            y: direction === "up" ? 30 : direction === "down" ? -30 : 0,
          },
          visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
          },
        }
    }
  }

  const variants = getVariants()

  return (
    <motion.div ref={ref} initial="hidden" animate={controls} variants={variants} className={className}>
      {children}
    </motion.div>
  )
}
