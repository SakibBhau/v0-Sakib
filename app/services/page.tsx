"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { PageTransition } from "@/components/page-transition"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceCard3D } from "@/components/service-card-3d"
import { ScrollReveal } from "@/components/scroll-animations/scroll-reveal"
import { StaggerReveal } from "@/components/scroll-animations/stagger-reveal"
import { TextReveal } from "@/components/scroll-animations/text-reveal"

export default function ServicesPage() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-[#161616] text-[#E9E7E2]">
        <Header />

        <main className="pt-24">
          <section className="container mx-auto px-4 py-12">
            <div className="flex flex-col items-center text-center mb-16">
              <ScrollReveal>
                <span className="text-[#FF5001] text-sm uppercase tracking-widest font-medium">What We Offer</span>
                <TextReveal type="words" className="text-4xl md:text-6xl font-bold mt-2 mb-4">
                  Brand Alchemy Services
                </TextReveal>
                <p className="text-lg text-[#E9E7E2]/80 max-w-2xl mx-auto">
                  Transforming visions into powerful brand realities through strategic thinking and creative excellence.
                </p>
              </ScrollReveal>
            </div>

            <StaggerReveal className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
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
              <ServiceCard3D
                title="Visual Identity"
                description="Crafting distinctive visual systems that express your brand's personality and values across all touchpoints."
              />
              <ServiceCard3D
                title="Content Strategy"
                description="Developing strategic content frameworks that tell your brand story and engage your target audience."
              />
              <ServiceCard3D
                title="Market Research"
                description="Conducting in-depth research to uncover insights that inform strategic decision-making and positioning."
              />
            </StaggerReveal>

            {/* Process Section */}
            <div className="py-16 border-t border-[#333333]">
              <ScrollReveal className="text-center mb-16">
                <span className="text-[#FF5001] text-sm uppercase tracking-widest font-medium">Our Approach</span>
                <TextReveal className="text-4xl font-bold mt-2 mb-4">The Alchemy Process</TextReveal>
                <p className="text-lg text-[#E9E7E2]/80 max-w-2xl mx-auto">
                  Our systematic approach transforms ordinary brands into extraordinary market forces through a proven
                  methodology.
                </p>
              </ScrollReveal>

              <StaggerReveal className="grid md:grid-cols-4 gap-8">
                {processSteps.map((step, index) => (
                  <ProcessStep key={index} step={step} />
                ))}
              </StaggerReveal>
            </div>

            {/* CTA Section */}
            <ScrollReveal className="py-16 mt-16 bg-[#1A1A1A] rounded-2xl" delay={0.2}>
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Brand?</h2>
                <p className="text-lg text-[#E9E7E2]/80 max-w-2xl mx-auto mb-8">
                  Let's collaborate to create a strategic brand experience that resonates with your audience and drives
                  results.
                </p>
                <Link
                  href="/contact"
                  className="px-8 py-4 bg-[#FF5001] text-[#161616] font-bold rounded-full hover:bg-[#FF5001]/90 transition-all duration-300 inline-flex items-center group"
                >
                  Start Your Project
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </ScrollReveal>
          </section>
        </main>

        <Footer />
      </div>
    </PageTransition>
  )
}

interface ProcessStepProps {
  step: {
    number: string
    title: string
    description: string
  }
}

function ProcessStep({ step }: ProcessStepProps) {
  return (
    <div className="relative">
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-[#FF5001]/10 rounded-full flex items-center justify-center mb-6">
          <span className="text-[#FF5001] font-bold text-xl">{step.number}</span>
        </div>
        <h3 className="text-xl font-bold mb-4">{step.title}</h3>
        <p className="text-[#E9E7E2]/70">{step.description}</p>
      </div>
    </div>
  )
}

const processSteps = [
  {
    number: "01",
    title: "Discover",
    description: "We dive deep into your brand, market, and audience to uncover insights that inform our strategy.",
  },
  {
    number: "02",
    title: "Define",
    description: "We define your unique positioning, value proposition, and strategic direction.",
  },
  {
    number: "03",
    title: "Design",
    description: "We craft the visual and verbal elements that bring your brand strategy to life.",
  },
  {
    number: "04",
    title: "Deliver",
    description: "We implement the strategy across all touchpoints and measure results for continuous improvement.",
  },
]
