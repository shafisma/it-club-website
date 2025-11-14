export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="mb-10">
          <a href="/events" target="_blank" rel="noopener noreferrer">
          <span className="text-sm font-bold text-accent uppercase tracking-wider px-4 py-2 rounded-full border-2 border-black bg-yellow-300 shadow-[3px_3px_0px_0px_black]">
             Join us at RoboVerse (Limited Seats!!!)
          </span></a>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground leading-tight">
          Drop Your <span className="text-[#73d1fd]">Innovation</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
          A community of students passionate about technology, innovation, and creative problem-solving.
        </p>

        <div className="flex flex-row gap-4 justify-center">
          <a href="/#contact"><button
  className="inline-flex items-center justify-center whitespace-nowrap rounded-[5px] text-sm font-medium ring-offset-white transition-all gap-2 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-[oklch(0%_0_0)] bg-[oklch(66.9%_0.18368_248.8066)] border-2 border-black shadow-[4px_4px_0px_0px_black] hover:translate-x-1 hover:translate-y-1 hover:shadow-none h-10 px-4 py-2"
>
  Join The Club
</button></a>
          <a href="/#events"><button
  className="inline-flex items-center justify-center whitespace-nowrap rounded-[5px] text-sm font-medium ring-offset-white transition-all gap-2 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-[oklch(0%_0_0)] bg-[oklch(85%_0.15_145)] border-2 border-black shadow-[4px_4px_0px_0px_black] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none h-10 px-4 py-2"
>Explore RoboVerse
</button></a>
        </div>
      </div>
    </section>
  )
}
