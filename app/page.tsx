import Header from "@/components/header"
import Hero from "@/components/hero"
import About from "@/components/about"
import Team from "@/components/team"
import CTA from "@/components/cta"
import Contact from "@/components/contact"

export default function Home() {
  return (
    <main className="min-h-screen bg-background dark:bg-[#011627]">
      <Header />
      <Hero />
      <About />
      <Team />
      <Contact />
      <CTA />
      <div className="pb-4 flex items-center justify-between px-4 pt-8 md:flex-row dark:bg-[#011627]">
        <p className="text-footer-link text-sm">© 2025-2026 Motijheel Model IT Club. All rights reserved.</p>
      </div>
    </main>
  )
}
