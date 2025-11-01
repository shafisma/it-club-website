import Header from "@/components/header"
import Hero from "@/components/hero"
import About from "@/components/about"
import Activities from "@/components/activities"
import Team from "@/components/team"
import Contact from "@/components/contact"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <About />
      <Activities />
      <Team />
      <Contact />
      <div className="my-4 flex items-center justify-between px-4 pt-8 md:flex-row"><center><p className="text-footer-link text-sm">© 2025-2026 Motijheel Model IT Club. All rights reserved.</p></center></div>
    </main>
  )
}
