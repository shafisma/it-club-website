export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="mb-6">
          <span className="text-sm font-semibold text-accent uppercase tracking-wide">
            Motijheel Model School & College
          </span>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground leading-tight">
          Drop Your <span className="text-[#73d1fd]">Innovation</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
          A community of students passionate about technology, innovation, and creative problem-solving.
          Founded in 2013 at Motijheel Model School and College, Dhaka.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/#contact">  <button
     className="h-12 border-black border-2 p-2.5 bg-[#A6FAFF] hover:bg-[#79F7FF] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-[#00E1EF] rounded-md"
     >
  &nbsp;&nbsp;Join The Club&nbsp;&nbsp;
  </button></a>
          <a href="/#about">  <button
     className="h-12 border-black border-2 p-2.5 bg-[#A6FAFF] hover:bg-[#79F7FF] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-[#00E1EF] rounded-md"
     >
  &nbsp;&nbsp;Learn More&nbsp;&nbsp;
  </button></a>
        </div>
      </div>
    </section>
  )
}
