"use client"

import { useEffect, useRef } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import { ArrowRight, Mail } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { PageTransition } from "@/components/page-transition"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ScrollIndicator } from "@/components/scroll-animations"
import { AnimatedLink, AnimatedButton } from "@/components/animated-link"
import { ServiceCard3D } from "@/components/service-card-3d"
import { TestimonialCard3D } from "@/components/testimonial-card-3d"

export default function Home() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-[#161616] text-[#E9E7E2]">
        <Header />
        <ScrollIndicator />

        <main>
          {/* Hero Section */}
          <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
            <div className="container mx-auto px-4 py-20 flex flex-col items-center text-center z-10">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="mb-6"
              >
                <span className="text-[#FF5001] text-lg uppercase tracking-widest font-medium">
                  Brand Alchemist & Digital Strategist
                </span>
              </motion.div>

              <NameAnimation />

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3.5, duration: 0.8 }}
                className="mt-8 text-xl md:text-2xl max-w-2xl mx-auto text-[#E9E7E2]/80"
              >
                Transforming brands through strategic alchemy and visionary design. Creating digital experiences that
                resonate and inspire.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 4, duration: 0.8 }}
                className="mt-12"
              >
                <AnimatedButton
                  className="px-8 py-4 bg-[#FF5001] text-[#161616] font-bold rounded-full hover:bg-[#FF5001]/90 transition-all duration-300 inline-flex items-center group"
                  cursorText="Connect"
                >
                  Let's Connect
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </AnimatedButton>
              </motion.div>
            </div>

            {/* Background elements */}
            <div className="absolute inset-0 z-0">
              <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#FF5001]/10 rounded-full filter blur-3xl"></div>
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#FF5001]/5 rounded-full filter blur-3xl"></div>
            </div>
          </section>

          {/* About Section */}
          <AnimatedSection id="about">
            <div className="container mx-auto px-4 py-20 md:py-32">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="relative">
                  <div className="relative z-10 rounded-2xl overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=600&width=500"
                      alt="Sakib Chowdhury"
                      width={500}
                      height={600}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-[#FF5001]/20 rounded-full filter blur-xl z-0"></div>
                  <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#FF5001]/10 rounded-full filter blur-lg z-0"></div>
                </div>
                <div>
                  <span className="text-[#FF5001] text-sm uppercase tracking-widest font-medium">About Me</span>
                  <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-8">The Visionary Behind Zoolyum</h2>
                  <p className="text-lg text-[#E9E7E2]/80 mb-6">
                    As the founder of Zoolyum, I blend strategic thinking with creative innovation to transform brands
                    into powerful market forces. With over a decade of experience in digital strategy and brand
                    development, I've helped businesses across industries find their unique voice and amplify their
                    presence.
                  </p>
                  <p className="text-lg text-[#E9E7E2]/80 mb-8">
                    My approach combines analytical precision with creative intuition, resulting in brand experiences
                    that not only capture attention but create lasting connections with audiences. I believe in the
                    power of storytelling and the art of strategic positioning to elevate brands beyond the ordinary.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <span className="px-4 py-2 border border-[#FF5001]/30 rounded-full text-sm">Brand Strategy</span>
                    <span className="px-4 py-2 border border-[#FF5001]/30 rounded-full text-sm">
                      Digital Transformation
                    </span>
                    <span className="px-4 py-2 border border-[#FF5001]/30 rounded-full text-sm">
                      Creative Direction
                    </span>
                    <span className="px-4 py-2 border border-[#FF5001]/30 rounded-full text-sm">
                      Market Positioning
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Services Section */}
          <AnimatedSection id="services" className="bg-[#1A1A1A]">
            <div className="container mx-auto px-4 py-20 md:py-32">
              <div className="text-center mb-16">
                <span className="text-[#FF5001] text-sm uppercase tracking-widest font-medium">Services</span>
                <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4">Brand Alchemy Services</h2>
                <p className="text-lg text-[#E9E7E2]/80 max-w-2xl mx-auto">
                  Transforming visions into powerful brand realities through strategic thinking and creative excellence.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <ServiceCard3D
                  title="Brand Strategy"
                  description="Developing comprehensive brand strategies that position your business for success in competitive markets."
                  delay={0.1}
                />
                <ServiceCard3D
                  title="Digital Strategy"
                  description="Creating digital ecosystems that amplify your brand's presence and engage audiences across platforms."
                  delay={0.3}
                />
                <ServiceCard3D
                  title="Consultancy"
                  description="Providing expert guidance to navigate complex brand challenges and identify growth opportunities."
                  delay={0.5}
                />
              </div>
            </div>
          </AnimatedSection>

          {/* Portfolio Section */}
          <AnimatedSection id="portfolio">
            <div className="container mx-auto px-4 py-20 md:py-32">
              <div className="text-center mb-16">
                <span className="text-[#FF5001] text-sm uppercase tracking-widest font-medium">Portfolio</span>
                <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4">Featured Projects</h2>
                <p className="text-lg text-[#E9E7E2]/80 max-w-2xl mx-auto">
                  A showcase of transformative brand and digital strategy work across diverse industries.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <PortfolioItem title="Nexus Rebrand" category="Brand Strategy" delay={0.1} />
                <PortfolioItem title="Elevate Digital Transformation" category="Digital Strategy" delay={0.2} />
                <PortfolioItem title="Horizon Market Entry" category="Consultancy" delay={0.3} />
                <PortfolioItem title="Pulse E-commerce" category="Digital Strategy" delay={0.4} />
                <PortfolioItem title="Vertex Brand Identity" category="Brand Strategy" delay={0.5} />
                <PortfolioItem title="Quantum Positioning" category="Consultancy" delay={0.6} />
              </div>
            </div>
          </AnimatedSection>

          {/* Testimonials Section */}
          <AnimatedSection id="testimonials" className="bg-[#1A1A1A]">
            <div className="container mx-auto px-4 py-20 md:py-32">
              <div className="text-center mb-16">
                <span className="text-[#FF5001] text-sm uppercase tracking-widest font-medium">Testimonials</span>
                <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4">Client Success Stories</h2>
                <p className="text-lg text-[#E9E7E2]/80 max-w-2xl mx-auto">
                  Hear from the brands and businesses that have experienced the transformative power of strategic
                  alchemy.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <TestimonialCard3D
                  quote="Sakib's strategic approach completely transformed our brand positioning. His insights helped us connect with our audience in ways we never thought possible."
                  author="Sarah Johnson"
                  company="CEO, Nexus Technologies"
                  delay={0.1}
                />
                <TestimonialCard3D
                  quote="Working with Zoolyum was a game-changer for our digital presence. The strategic vision and creative execution exceeded our expectations at every turn."
                  author="Michael Chen"
                  company="Marketing Director, Elevate"
                  delay={0.3}
                />
                <TestimonialCard3D
                  quote="Sakib has an incredible ability to identify the essence of a brand and translate it into powerful market positioning. His work was instrumental to our success."
                  author="Jessica Williams"
                  company="Founder, Horizon"
                  delay={0.5}
                />
                <TestimonialCard3D
                  quote="The depth of strategic thinking combined with creative excellence makes Zoolyum truly unique. Our brand transformation has driven measurable business results."
                  author="David Rodriguez"
                  company="COO, Pulse"
                  delay={0.7}
                />
              </div>
            </div>
          </AnimatedSection>

          {/* Contact Section */}
          <AnimatedSection id="contact">
            <div className="container mx-auto px-4 py-20 md:py-32">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <span className="text-[#FF5001] text-sm uppercase tracking-widest font-medium">Contact</span>
                  <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-8">Let's Create Something Extraordinary</h2>
                  <p className="text-lg text-[#E9E7E2]/80 mb-8">
                    Ready to transform your brand through strategic alchemy? Let's connect and explore how we can
                    elevate your business to new heights.
                  </p>
                  <div className="flex items-center mb-6">
                    <Mail className="text-[#FF5001] mr-4" />
                    <a href="mailto:hello@zoolyum.com" className="text-lg hover:text-[#FF5001] transition-colors">
                      hello@zoolyum.com
                    </a>
                  </div>
                  <div className="flex space-x-4 mt-8">
                    <SocialIcon name="twitter" />
                    <SocialIcon name="linkedin" />
                    <SocialIcon name="instagram" />
                    <SocialIcon name="behance" />
                  </div>
                </div>
                <div>
                  <form className="bg-[#1A1A1A] p-8 rounded-2xl">
                    <div className="mb-6">
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-3 bg-[#252525] border border-[#333333] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5001]/50 text-[#E9E7E2]"
                        placeholder="Your name"
                      />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-3 bg-[#252525] border border-[#333333] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5001]/50 text-[#E9E7E2]"
                        placeholder="Your email"
                      />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        className="w-full px-4 py-3 bg-[#252525] border border-[#333333] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5001]/50 text-[#E9E7E2]"
                        placeholder="Tell me about your project"
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="w-full px-6 py-4 bg-[#FF5001] text-[#161616] font-bold rounded-lg hover:bg-[#FF5001]/90 transition-all duration-300"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </main>

        <Footer />
      </div>
    </PageTransition>
  )
}

// Name Animation Component with Typewriter + Sparkle Effect
function NameAnimation() {
  return (
    <div className="relative">
      <motion.h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-[#E9E7E2] relative z-10">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.01 }}
          className="inline-block"
        >
          S
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.01 }}
          className="inline-block"
        >
          a
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.01 }}
          className="inline-block"
        >
          k
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.01 }}
          className="inline-block"
        >
          i
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.01 }}
          className="inline-block"
        >
          b
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.01 }}
          className="inline-block"
        >
          {" "}
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.01 }}
          className="inline-block"
        >
          C
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.01 }}
          className="inline-block"
        >
          h
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.01 }}
          className="inline-block"
        >
          o
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.01 }}
          className="inline-block"
        >
          w
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.01 }}
          className="inline-block"
        >
          d
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.01 }}
          className="inline-block"
        >
          h
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.01 }}
          className="inline-block"
        >
          u
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.01 }}
          className="inline-block"
        >
          r
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.01 }}
          className="inline-block"
        >
          y
        </motion.span>
      </motion.h1>

      {/* Golden sparkle effect */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0], x: [0, 10, -10, 0], y: [0, -10, 10, 0] }}
        transition={{
          delay: 2,
          duration: 1.5,
          times: [0, 0.5, 1],
          ease: "easeInOut",
        }}
        className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-full bg-gradient-to-r from-[#FF5001]/0 via-[#FF5001]/30 to-[#FF5001]/0 blur-xl"></div>
        </div>
      </motion.div>

      {/* Cursor */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 2, duration: 0.3 }}
        className="absolute bottom-0 right-0 w-1 h-16 bg-[#FF5001] translate-x-2"
      ></motion.div>
    </div>
  )
}

// Animated Section Component
function AnimatedSection({ children, id, className = "" }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  return (
    <section id={id} ref={ref} className={className}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={controls}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </section>
  )
}

// Service Card Component
function PortfolioItem({ title, category, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay, duration: 0.5 }}
      className="group relative overflow-hidden rounded-xl"
    >
      <div className="aspect-[4/3] bg-[#212121] overflow-hidden">
        <Image
          src="/placeholder.svg?height=300&width=400"
          alt={title}
          width={400}
          height={300}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#161616] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
        <span className="text-[#FF5001] text-sm">{category}</span>
        <h3 className="text-xl font-bold mt-2">{title}</h3>
        <AnimatedLink
          href="#"
          className="mt-4 inline-flex items-center text-[#E9E7E2] hover:text-[#FF5001] transition-colors"
        >
          View Project
          <ArrowRight className="ml-2 w-4 h-4" />
        </AnimatedLink>
      </div>
    </motion.div>
  )
}

// Social Icon Component
function SocialIcon({ name }) {
  return (
    <a
      href={`https://${name}.com`}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full bg-[#252525] flex items-center justify-center hover:bg-[#FF5001] transition-colors duration-300"
    >
      <span className="sr-only">{name}</span>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2Z"
          fill="currentColor"
        />
      </svg>
    </a>
  )
}

function NavLink({ href, children }) {
  return (
    <Link href={href} className="text-[#E9E7E2]/60 hover:text-[#FF5001] transition-colors">
      {children}
    </Link>
  )
}
