export default function RoboverseHero() {
    return (
      <div id="events">
      <div className="max-w-6xl mx-auto px-4 text-center mb-16 pt-20">
        <div className="mb-4">
          <span className="text-sm font-bold text-accent uppercase tracking-wider px-4 py-2 rounded-full border-2 border-black bg-yellow-300 shadow-[3px_3px_0px_0px_black]">
            MMITC Presents
          </span>
        </div>

        <h1 className="text-6xl md:text-8xl font-black mb-6 text-foreground leading-tight">
          ROBOVERSE <span className="text-[#73d1fd]">1.0</span>
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto font-semibold">
          Dive into the world of Robotics, Arduino & Sensors!
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-8 text-lg">
          <span className="px-4 py-2 rounded-lg bg-green-100 border border-green-300 font-semibold">
            📅December 2025
          </span>
          <span className="px-4 py-2 rounded-lg bg-purple-100 border border-purple-300 font-semibold">
            📍MMSC, 5th Floor ICT Lab
          </span>
          <span className="px-4 py-2 rounded-lg bg-pink-100 border border-pink-300 font-semibold">
            🎓Free Certificates
          </span>
        </div>
        <div className="flex flex-row justify-center items-center gap-3">
        <a 
          href="https://forms.gle/ViBzt5nMncQUBoME7" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block px-8 py-4 text-xl font-black rounded-xl border-3 border-black bg-[#73d1fd] shadow-[6px_6px_0px_0px_black] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
        >
          REGISTER NOW
        </a>
                <a 
          href="/events" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block px-8 py-4 text-xl font-black rounded-xl border-3 border-black bg-[#73d1fd] shadow-[6px_6px_0px_0px_black] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
        >
          LEARN MORE
        </a></div>
      </div>
      </div>
    )}