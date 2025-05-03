import type React from "react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-[#1A1A1A] border-t border-[#333333]">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="text-[#FF5001] font-bold text-2xl">
              ZOOLYUM
            </Link>
            <p className="text-[#E9E7E2]/60 mt-2">Brand Alchemy & Digital Strategy</p>
          </div>
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-8">
            <FooterLink href="/#about">About</FooterLink>
            <FooterLink href="/#services">Services</FooterLink>
            <FooterLink href="/work">Work</FooterLink>
            <FooterLink href="/#testimonials">Testimonials</FooterLink>
            <FooterLink href="/#contact">Contact</FooterLink>
            <FooterLink href="/blog">Blog</FooterLink>
          </div>
        </div>
        <div className="border-t border-[#333333] mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-[#E9E7E2]/60 text-sm">© {new Date().getFullYear()} Sakib. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-[#E9E7E2]/60 hover:text-[#FF5001] text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-[#E9E7E2]/60 hover:text-[#FF5001] text-sm">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

interface FooterLinkProps {
  href: string
  children: React.ReactNode
}

function FooterLink({ href, children }: FooterLinkProps) {
  return (
    <Link href={href} className="text-[#E9E7E2]/80 hover:text-[#FF5001] transition-colors duration-300">
      {children}
    </Link>
  )
}
