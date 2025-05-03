"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"
import { Card3D } from "./card-3d"
import { EnhancedLink } from "./interactive-elements"

interface ServiceCardProps {
  title: string
  description: string
  delay?: number
}

export function ServiceCard3D({ title, description, delay = 0 }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay, duration: 0.5 }}
    >
      <Card3D depth={20} glareIntensity={0.15} cursorText={title}>
        <div className="bg-[#212121] p-8 rounded-2xl border border-[#333333] hover:border-[#FF5001]/50 transition-all duration-300 group h-full transform-gpu">
          <div className="w-16 h-16 bg-[#FF5001]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#FF5001]/20 transition-all duration-300">
            <div className="w-8 h-8 text-[#FF5001]">
              <Star className="w-full h-full" />
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-4 group-hover:text-[#FF5001] transition-colors duration-300">{title}</h3>
          <p className="text-[#E9E7E2]/70">{description}</p>
          <div className="mt-6 pt-6 border-t border-[#333333]">
            <EnhancedLink
              href="#contact"
              className="text-[#FF5001] font-medium inline-flex items-center group/link"
              cursorText="Learn More"
              effectType="pulse"
            >
              Learn More
              <svg
                className="ml-2 w-4 h-4 group-hover/link:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </EnhancedLink>
          </div>
        </div>
      </Card3D>
    </motion.div>
  )
}
