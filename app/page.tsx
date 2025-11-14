import Header from "@/components/header"
import Hero from "@/components/hero"
import About from "@/components/about"
import Activities from "@/components/activities"
import Team from "@/components/team"
import CTA from "@/components/cta"
import Contact from "@/components/contact"
import RoboverseHero from "@/components/roboverse"
export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <RoboverseHero />
      <Team />
      <About />
      <Contact />
      <CTA />
      <div className="my-4 flex items-center justify-between px-4 pt-8 md:flex-row"><center><p className="text-footer-link text-sm">© 2025-2026 Motijheel Model IT Club. All rights reserved.</p></center></div>
    </main>
  )
}
