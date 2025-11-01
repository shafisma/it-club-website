"use client"

import { useState, useRef } from "react"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

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
    <header ref={headerRef} className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="#" className="text-xl font-bold text-primary">
          <Image src="/logo.png" alt="Motijheel Model IT Club" width={90} height={100} />
        </Link>

        <div className="hidden md:flex gap-8">
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

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-foreground">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
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
