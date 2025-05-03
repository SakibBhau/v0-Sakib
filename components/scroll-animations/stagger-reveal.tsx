"use client"

import React from "react"

import { motion } from "framer-motion"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import type { ReactNode } from "react"

interface StaggerRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  staggerDelay?: number
  threshold?: number
  once?: boolean
  animation?: "fade" | "slide" | "scale" | "fade-slide" | "fade-scale"
  direction?: "up" | "down" | "left" | "right"
}

export function StaggerReveal({
  children,
  className = "",
  delay = 0,
  staggerDelay = 0.1,
  threshold = 0.1,
  once = true,
  animation = "fade-slide",
  direction = "up",
}: StaggerRevealProps) {
  const { ref, controls } = useScrollAnimation({
    threshold,
    once,
    delay,
  })

  // Define animation variants based on the animation type and direction
  const getContainerVariants = () => {
    return {
      hidden: { opacity: 1 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: staggerDelay,
          delayChildren: delay,
        },
      },
    }
  }

  const getItemVariants = () => {
    switch (animation) {
      case "fade":
        return {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
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
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
          },
        }
      case "scale":
        return {
          hidden: { scale: 0.8, opacity: 0 },
          visible: {
            scale: 1,
            opacity: 1,
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
          },
        }
      case "fade-scale":
        return {
          hidden: { opacity: 0, scale: 0.9 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
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
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
          },
        }
    }
  }

  const containerVariants = getContainerVariants()
  const itemVariants = getItemVariants()

  return (
    <motion.div ref={ref} className={className} initial="hidden" animate={controls} variants={containerVariants}>
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child

        return (
          <motion.div key={index} variants={itemVariants}>
            {child}
          </motion.div>
        )
      })}
    </motion.div>
  )
}
