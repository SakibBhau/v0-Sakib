"use client"

import { ArrowRight, Calendar } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { PageTransition } from "@/components/page-transition"
import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BlogCard3D } from "@/components/blog-card-3d"

export default function BlogPage() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-[#161616] text-[#E9E7E2]">
        <Header />

        <main className="pt-24">
          <section className="container mx-auto px-4 py-12">
            <div className="flex flex-col items-center text-center mb-16">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <span className="text-[#FF5001] text-sm uppercase tracking-widest font-medium">Insights</span>
                <h1 className="text-4xl md:text-6xl font-bold mt-2 mb-4">Brand Alchemy Blog</h1>
                <p className="text-lg text-[#E9E7E2]/80 max-w-2xl mx-auto">
                  Thoughts, strategies, and insights on brand development, digital transformation, and market
                  positioning.
                </p>
              </motion.div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <BlogCard3D key={index} post={post} index={index} />
              ))}
            </div>

            <div className="mt-16 flex justify-center">
              <Link
                href="/#contact"
                className="px-8 py-4 bg-[#FF5001] text-[#161616] font-bold rounded-full hover:bg-[#FF5001]/90 transition-all duration-300 inline-flex items-center group"
              >
                Subscribe to Newsletter
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

function BlogCard({ post, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group"
    >
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="overflow-hidden rounded-xl">
          <Image
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            width={600}
            height={400}
            className="w-full aspect-[3/2] object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="mt-4">
          <div className="flex items-center text-[#E9E7E2]/60 text-sm mb-2">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{post.date}</span>
          </div>
          <h3 className="text-xl font-bold group-hover:text-[#FF5001] transition-colors">{post.title}</h3>
          <p className="text-[#E9E7E2]/70 mt-2">{post.excerpt}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag, i) => (
              <span key={i} className="px-3 py-1 bg-[#252525] rounded-full text-xs">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

const blogPosts = [
  {
    title: "The Art of Strategic Brand Positioning",
    slug: "strategic-brand-positioning",
    date: "May 15, 2023",
    excerpt: "How to position your brand effectively in a crowded marketplace and stand out from competitors.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Brand Strategy", "Positioning", "Marketing"],
  },
  {
    title: "Digital Transformation: Beyond the Buzzword",
    slug: "digital-transformation-beyond-buzzword",
    date: "April 22, 2023",
    excerpt: "What digital transformation really means for businesses and how to implement it successfully.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Digital Strategy", "Transformation", "Technology"],
  },
  {
    title: "Building Brand Narratives That Resonate",
    slug: "brand-narratives-that-resonate",
    date: "March 10, 2023",
    excerpt: "The power of storytelling in brand development and how to craft narratives that connect with audiences.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Storytelling", "Brand Development", "Communication"],
  },
  {
    title: "The Psychology of Color in Brand Identity",
    slug: "psychology-color-brand-identity",
    date: "February 28, 2023",
    excerpt: "How color choices impact brand perception and influence consumer behavior.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Design", "Psychology", "Brand Identity"],
  },
  {
    title: "Measuring Brand Success: Beyond Metrics",
    slug: "measuring-brand-success",
    date: "January 15, 2023",
    excerpt: "Holistic approaches to evaluating brand performance that go beyond traditional KPIs.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Analytics", "Brand Strategy", "Performance"],
  },
  {
    title: "The Future of Digital Brand Experiences",
    slug: "future-digital-brand-experiences",
    date: "December 5, 2022",
    excerpt: "Emerging technologies and trends shaping how brands connect with audiences online.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Innovation", "Digital Experience", "Trends"],
  },
]
