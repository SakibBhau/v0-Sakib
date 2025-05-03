"use client"

import type React from "react"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { X } from "lucide-react"
import { usePathname } from "next/navigation"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname()

  // Close the menu when navigating to a new page
  useEffect(() => {
    if (isOpen) {
      onClose()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Menu panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-[80%] max-w-sm bg-[#161616] border-l border-[#333333] z-50 overflow-y-auto"
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center p-6 border-b border-[#333333]">
                <Link href="/" className="text-[#FF5001] font-bold text-xl" onClick={onClose}>
                  ZOOLYUM
                </Link>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-[#252525] transition-colors"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <nav className="flex-1 p-6">
                <ul className="space-y-6">
                  <MobileNavItem href="/#about" onClick={onClose}>
                    About
                  </MobileNavItem>
                  <MobileNavItem href="/#services" onClick={onClose}>
                    Services
                  </MobileNavItem>
                  <MobileNavItem href="/work" onClick={onClose}>
                    Work
                  </MobileNavItem>
                  <MobileNavItem href="/#testimonials" onClick={onClose}>
                    Testimonials
                  </MobileNavItem>
                  <MobileNavItem href="/#contact" onClick={onClose}>
                    Contact
                  </MobileNavItem>
                  <MobileNavItem href="/blog" onClick={onClose}>
                    Blog
                  </MobileNavItem>
                </ul>
              </nav>

              <div className="p-6 border-t border-[#333333]">
                <Link
                  href="/#contact"
                  onClick={onClose}
                  className="block w-full py-3 px-4 bg-[#FF5001] text-[#161616] font-bold rounded-lg text-center hover:bg-[#FF5001]/90 transition-colors"
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

interface MobileNavItemProps {
  href: string
  onClick: () => void
  children: React.ReactNode
}

function MobileNavItem({ href, onClick, children }: MobileNavItemProps) {
  return (
    <li>
      <Link
        href={href}
        onClick={onClick}
        className="block text-xl font-medium text-[#E9E7E2] hover:text-[#FF5001] transition-colors"
      >
        {children}
      </Link>
    </li>
  )
}
