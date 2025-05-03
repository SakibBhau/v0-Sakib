"use client"

import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { PageTransition } from "@/components/page-transition"
import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function WorkPage() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-[#161616] text-[#E9E7E2]">
        <Header />

        <main className="pt-24">
          <section className="container mx-auto px-4 py-12">
            <div className="flex flex-col items-center text-center mb-16">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <span className="text-[#FF5001] text-sm uppercase tracking-widest font-medium">Portfolio</span>
                <h1 className="text-4xl md:text-6xl font-bold mt-2 mb-4">Our Work</h1>
                <p className="text-lg text-[#E9E7E2]/80 max-w-2xl mx-auto">
                  Explore our portfolio of brand transformations and digital strategy projects that have helped
                  businesses achieve their goals.
                </p>
              </motion.div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <ProjectCard key={index} project={project} index={index} />
              ))}
            </div>

            <div className="mt-16 flex justify-center">
              <Link
                href="/#contact"
                className="px-8 py-4 bg-[#FF5001] text-[#161616] font-bold rounded-full hover:bg-[#FF5001]/90 transition-all duration-300 inline-flex items-center group"
              >
                Start Your Project
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </PageTransition>
  )
}

function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group"
    >
      <Link href={`/work/${project.slug}`} className="block">
        <div className="overflow-hidden rounded-xl">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            width={600}
            height={400}
            className="w-full aspect-[3/2] object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="mt-4">
          <span className="text-[#FF5001] text-sm">{project.category}</span>
          <h3 className="text-xl font-bold mt-1 group-hover:text-[#FF5001] transition-colors">{project.title}</h3>
          <p className="text-[#E9E7E2]/70 mt-2">{project.description}</p>
        </div>
      </Link>
    </motion.div>
  )
}

const projects = [
  {
    title: "Nexus Rebrand",
    slug: "nexus-rebrand",
    category: "Brand Strategy",
    description: "Complete brand transformation for a tech company entering new markets.",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    title: "Elevate Digital Transformation",
    slug: "elevate-digital",
    category: "Digital Strategy",
    description: "Digital ecosystem development for a growing lifestyle brand.",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    title: "Horizon Market Entry",
    slug: "horizon-market",
    category: "Consultancy",
    description: "Strategic positioning for a startup entering a competitive market.",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    title: "Pulse E-commerce",
    slug: "pulse-ecommerce",
    category: "Digital Strategy",
    description: "E-commerce strategy and implementation for a fashion retailer.",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    title: "Vertex Brand Identity",
    slug: "vertex-identity",
    category: "Brand Strategy",
    description: "Complete visual identity system for an architectural firm.",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    title: "Quantum Positioning",
    slug: "quantum-positioning",
    category: "Consultancy",
    description: "Market positioning strategy for a financial services provider.",
    image: "/placeholder.svg?height=400&width=600",
  },
]
