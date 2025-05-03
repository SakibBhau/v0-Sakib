"use client"

import { useEffect } from "react"
import { useAnimation, useInView } from "framer-motion"
import { useRef } from "react"

interface UseScrollAnimationProps {
  threshold?: number
  once?: boolean
  delay?: number
}

export function useScrollAnimation({ threshold = 0.2, once = true, delay = 0 }: UseScrollAnimationProps = {}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, amount: threshold })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    } else if (!once) {
      controls.start("hidden")
    }
  }, [isInView, controls, once])

  return {
    ref,
    controls,
    isInView,
    variants: {
      hidden: { opacity: 0, y: 30 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
          delay,
        },
      },
    },
  }
}
