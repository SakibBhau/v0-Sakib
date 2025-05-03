"use client"

import type React from "react"

import { useState } from "react"
import { Menu } from "lucide-react"
import { MobileMenu } from "./mobile-menu"
import { EnhancedLink, EnhancedButton } from "./interactive-elements"
import { MagneticElement } from "./magnetic-element"

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#161616]/80 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <MagneticElement
          as="a"
          href="/"
          className="text-[#FF5001] font-bold text-xl"
          strength={30}
          cursorType="link"
          cursorText="Home"
        >
          Sakib Chowdhury
        </MagneticElement>

        <nav className="hidden md:flex space-x-8">
          <NavLink href="/#about">About</NavLink>
          <NavLink href="/#services">Services</NavLink>
          <NavLink href="/work">Work</NavLink>
          <NavLink href="/#testimonials">Testimonials</NavLink>
          <NavLink href="/#contact">Contact</NavLink>
          <NavLink href="/blog">Blog</NavLink>
        </nav>

        <EnhancedButton
          className="md:hidden text-[#E9E7E2] p-2 rounded-md hover:bg-[#252525] transition-colors"
          onClick={() => setIsMobileMenuOpen(true)}
          cursorText="Menu"
          effectType="burst"
        >
          <Menu className="h-6 w-6" />
        </EnhancedButton>
      </div>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </header>
  )
}

interface NavLinkProps {
  href: string
  children: React.ReactNode
}

function NavLink({ href, children }: NavLinkProps) {
  return (
    <EnhancedLink
      href={href}
      className="text-[#E9E7E2]/80 hover:text-[#FF5001] transition-colors duration-300"
      cursorText={children as string}
      effectType="pulse"
    >
      {children}
    </EnhancedLink>
  )
}
