"use client"
import { motion } from "framer-motion"
import { ArrowRight, Mail } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { PageTransition } from "@/components/page-transition"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ScrollIndicator } from "@/components/scroll-animations/scroll-indicator"
import { ServiceCard3D } from "@/components/service-card-3d"
import { TestimonialCard3D } from "@/components/testimonial-card-3d"
import { ScrollReveal } from "@/components/scroll-animations/scroll-reveal"
import { StaggerReveal } from "@/components/scroll-animations/stagger-reveal"
import { TextReveal } from "@/components/scroll-animations/text-reveal"
import { ImageReveal } from "@/components/scroll-animations/image-reveal"

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
                <Link
                  href="/contact"
                  className="px-8 py-4 bg-[#FF5001] text-[#161616] font-bold rounded-full hover:bg-[#FF5001]/90 transition-all duration-300 inline-flex items-center group"
                  data-cursor="button"
                  data-cursor-text="Connect"
                >
                  Let's Connect
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>

            {/* Background elements */}
            <div className="absolute inset-0 z-0">
              <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#FF5001]/10 rounded-full filter blur-3xl"></div>
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#FF5001]/5 rounded-full filter blur-3xl"></div>
            </div>
          </section>

          {/* About Section */}
          <section id="about">
            <div className="container mx-auto px-4 py-20 md:py-32">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <ScrollReveal animation="fade-slide" direction="right">
                  <div className="relative">
                    <div className="relative z-10 rounded-2xl overflow-hidden">
                      <ImageReveal
                        src="/placeholder.svg?height=600&width=500"
                        alt="Sakib Chowdhury"
                        width={500}
                        height={600}
                        direction="left"
                      />
                    </div>
                    <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-[#FF5001]/20 rounded-full filter blur-xl z-0"></div>
                    <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#FF5001]/10 rounded-full filter blur-lg z-0"></div>
                  </div>
                </ScrollReveal>

                <ScrollReveal animation="fade-slide" direction="left" delay={0.2}>
                  <span className="text-[#FF5001] text-sm uppercase tracking-widest font-medium">About Me</span>
                  <TextReveal className="text-4xl md:text-5xl font-bold mt-2 mb-8">
                    The Visionary Behind Zoolyum
                  </TextReveal>
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
                  <StaggerReveal className="flex flex-wrap gap-4" staggerDelay={0.05}>
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
                  </StaggerReveal>
                </ScrollReveal>
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section id="services" className="bg-[#1A1A1A]">
            <div className="container mx-auto px-4 py-20 md:py-32">
              <ScrollReveal className="text-center mb-16">
                <span className="text-[#FF5001] text-sm uppercase tracking-widest font-medium">Services</span>
                <TextReveal className="text-4xl md:text-5xl font-bold mt-2 mb-4">Brand Alchemy Services</TextReveal>
                <p className="text-lg text-[#E9E7E2]/80 max-w-2xl mx-auto">
                  Transforming visions into powerful brand realities through strategic thinking and creative excellence.
                </p>
              </ScrollReveal>

              <StaggerReveal className="grid md:grid-cols-3 gap-8">
                <ServiceCard3D
                  title="Brand Strategy"
                  description="Developing comprehensive brand strategies that position your business for success in competitive markets."
                />
                <ServiceCard3D
                  title="Digital Strategy"
                  description="Creating digital ecosystems that amplify your brand's presence and engage audiences across platforms."
                />
                <ServiceCard3D
                  title="Consultancy"
                  description="Providing expert guidance to navigate complex brand challenges and identify growth opportunities."
                />
              </StaggerReveal>

              <ScrollReveal className="mt-12 text-center" delay={0.3}>
                <Link
                  href="/services"
                  className="px-8 py-4 bg-[#FF5001] text-[#161616] font-bold rounded-full hover:bg-[#FF5001]/90 transition-all duration-300 inline-flex items-center group"
                  data-cursor="button"
                  data-cursor-text="View Services"
                >
                  View All Services
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </ScrollReveal>
            </div>
          </section>

          {/* Portfolio Section */}
          <section id="portfolio">
            <div className="container mx-auto px-4 py-20 md:py-32">
              <ScrollReveal className="text-center mb-16">
                <span className="text-[#FF5001] text-sm uppercase tracking-widest font-medium">Portfolio</span>
                <TextReveal className="text-4xl md:text-5xl font-bold mt-2 mb-4">Featured Projects</TextReveal>
                <p className="text-lg text-[#E9E7E2]/80 max-w-2xl mx-auto">
                  A showcase of transformative brand and digital strategy work across diverse industries.
                </p>
              </ScrollReveal>

              <StaggerReveal className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <PortfolioItem title="Nexus Rebrand" category="Brand Strategy" />
                <PortfolioItem title="Elevate Digital Transformation" category="Digital Strategy" />
                <PortfolioItem title="Horizon Market Entry" category="Consultancy" />
              </StaggerReveal>

              <ScrollReveal className="mt-12 text-center" delay={0.3}>
                <Link
                  href="/work"
                  className="px-8 py-4 bg-[#FF5001] text-[#161616] font-bold rounded-full hover:bg-[#FF5001]/90 transition-all duration-300 inline-flex items-center group"
                  data-cursor="button"
                  data-cursor-text="View Work"
                >
                  View All Projects
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </ScrollReveal>
            </div>
          </section>

          {/* Testimonials Section */}
          <section id="testimonials" className="bg-[#1A1A1A]">
            <div className="container mx-auto px-4 py-20 md:py-32">
              <ScrollReveal className="text-center mb-16">
                <span className="text-[#FF5001] text-sm uppercase tracking-widest font-medium">Testimonials</span>
                <TextReveal className="text-4xl md:text-5xl font-bold mt-2 mb-4">Client Success Stories</TextReveal>
                <p className="text-lg text-[#E9E7E2]/80 max-w-2xl mx-auto">
                  Hear from the brands and businesses that have experienced the transformative power of strategic
                  alchemy.
                </p>
              </ScrollReveal>

              <StaggerReveal className="grid md:grid-cols-2 gap-8">
                <TestimonialCard3D
                  quote="Sakib's strategic approach completely transformed our brand positioning. His insights helped us connect with our audience in ways we never thought possible."
                  author="Sarah Johnson"
                  company="CEO, Nexus Technologies"
                />
                <TestimonialCard3D
                  quote="Working with Zoolyum was a game-changer for our digital presence. The strategic vision and creative execution exceeded our expectations at every turn."
                  author="Michael Chen"
                  company="Marketing Director, Elevate"
                />
              </StaggerReveal>

              <ScrollReveal className="mt-12 text-center" delay={0.3}>
                <Link
                  href="/testimonials"
                  className="px-8 py-4 bg-[#FF5001] text-[#161616] font-bold rounded-full hover:bg-[#FF5001]/90 transition-all duration-300 inline-flex items-center group"
                  data-cursor="button"
                  data-cursor-text="View Testimonials"
                >
                  View All Testimonials
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </ScrollReveal>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact">
            <div className="container mx-auto px-4 py-20 md:py-32">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <ScrollReveal animation="fade-slide" direction="right">
                  <span className="text-[#FF5001] text-sm uppercase tracking-widest font-medium">Contact</span>
                  <TextReveal className="text-4xl md:text-5xl font-bold mt-2 mb-8">
                    Let's Create Something Extraordinary
                  </TextReveal>
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
                  <StaggerReveal className="flex space-x-4 mt-8" staggerDelay={0.1}>
                    <SocialIcon name="twitter" />
                    <SocialIcon name="linkedin" />
                    <SocialIcon name="instagram" />
                    <SocialIcon name="behance" />
                  </StaggerReveal>
                </ScrollReveal>

                <ScrollReveal animation="fade-slide" direction="left" delay={0.3}>
                  <Link
                    href="/contact"
                    className="block w-full p-8 bg-[#1A1A1A] rounded-2xl border border-[#333333] hover:border-[#FF5001] transition-all duration-300 text-center"
                    data-cursor="button"
                    data-cursor-text="Contact"
                  >
                    <h3 className="text-2xl font-bold mb-4">Get in Touch</h3>
                    <p className="text-[#E9E7E2]/80 mb-6">
                      Ready to discuss your project? Visit our contact page to send a message or schedule a
                      consultation.
                    </p>
                    <span className="inline-flex items-center text-[#FF5001] font-medium">
                      Contact Us
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </span>
                  </Link>
                </ScrollReveal>
              </div>
            </div>
          </section>
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

// Portfolio Item Component
function PortfolioItem({ title, category }) {
  return (
    <div className="group relative overflow-hidden rounded-xl">
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
        <Link
          href="/work"
          className="mt-4 inline-flex items-center text-[#E9E7E2] hover:text-[#FF5001] transition-colors"
        >
          View Project
          <ArrowRight className="ml-2 w-4 h-4" />
        </Link>
      </div>
    </div>
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
