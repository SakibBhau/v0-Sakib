import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Providers } from "./providers"
import { EnhancedCursor } from "@/components/enhanced-cursor"
import { EnhancedClickAnimation } from "@/components/enhanced-click-animation"
import { ScrollProgress } from "@/components/scroll-animations"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Sakib Chowdhury | Brand Alchemist & Digital Strategist",
  description: "Founder of Zoolyum, transforming brands through strategic alchemy and visionary design.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <Providers>
            <ScrollProgress />
            <EnhancedCursor />
            <EnhancedClickAnimation />
            {children}
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}
