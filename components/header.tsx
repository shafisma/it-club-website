"use client"

import { useState, useRef } from "react"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { FloatingNav } from "./ui/floating-navbar"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const headerRef = useRef<HTMLElement | null>(null)
// Yeah, this part is copied from somewhere else lol
  function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    e.preventDefault()
    setIsOpen(false)
    const target = document.getElementById(id)
    if (!target) return
  const headerHeight = headerRef.current?.offsetHeight ?? 0
  const y = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 12
  const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  window.scrollTo({ top: y, behavior: prefersReduced ? "auto" : "smooth" })
  }
//end of copied part
  return (
  <header ref={headerRef} className="sticky top-0 z-50 bg-background backdrop-blur border-b border-border">
      {/* Floating nav for mobile */}
      {(() => {
        const navItems = [
          { name: "Events", link: "events" },
          { name: "About", link: "#about" },
          { name: "Activities", link: "#activities" },
          { name: "Team", link: "#team" },
          { name: "Contact", link: "#contact" },
        ]
        return <FloatingNav navItems={navItems} />
      })()}
      <nav className="hidden md:flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 justify-between items-center">
        <Link href="/" className="text-xl font-bold text-primary">
          <Image src="/logo.png" alt="Motijheel Model IT Club" width={50} height={50} />
        </Link>

        <div className="flex items-center gap-8">
          <a href="/events" onClick={(e) => handleNavClick(e, "events")} className="text-transparent bg-linear-to-br from-blue-500 to-teal-400 bg-clip-text hover:text-accent font-medium transition duration-200">
            Events
          </a>
          <a href="#about" onClick={(e) => handleNavClick(e, "about")} className="text-foreground hover:text-accent font-medium transition duration-200">
            About
          </a>
          <a href="#activities" onClick={(e) => handleNavClick(e, "activities")} className="text-foreground hover:text-accent font-medium transition duration-200">
            Activities
          </a>
          <a href="#team" onClick={(e) => handleNavClick(e, "team")} className="text-foreground hover:text-accent font-medium transition duration-200">
            Team
          </a>
          <a href="#contact" onClick={(e) => handleNavClick(e, "contact")} className="text-foreground hover:text-accent font-medium transition duration-200">
            Contact
          </a>

        </div>
      </nav>

      {isOpen && (
        <div className="md:hidden bg-card border-t border-border">
          <div className="px-4 py-4 flex flex-col gap-4">
            <a href="#about" onClick={(e) => handleNavClick(e, "about")} className="text-foreground hover:text-accent font-medium transition duration-200">
              About
            </a>
            <a href="#activities" onClick={(e) => handleNavClick(e, "activities")} className="text-foreground hover:text-accent font-medium transition duration-200">
              Activities
            </a>
            <a href="#team" onClick={(e) => handleNavClick(e, "team")} className="text-foreground hover:text-accent font-medium transition duration-200">
              Team
            </a>
            <a href="#contact" onClick={(e) => handleNavClick(e, "contact")} className="text-foreground hover:text-accent font-medium transition duration-200">
              Contact
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
