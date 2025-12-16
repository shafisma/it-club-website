import Header from "@/components/header";

export default function EventsPage() {
  const projects = [
    { icon: "🚗", name: "Auto Car Parking", desc: "Smart parking automation" },
    { icon: "🚧", name: "Obstacle Avoidance", desc: "Navigate around obstacles" },
    { icon: "🔥", name: "Fire Fighter", desc: "Detect and fight fires" },
    { icon: "⚽", name: "Soccer Bot", desc: "Play robot soccer" },
    { icon: "⬛", name: "Line Follower", desc: "Follow lines autonomously" },
    { icon: "⚖️", name: "Digital Scale", desc: "Measure weight digitally" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="bg-[url('/download (1).png')]">
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
            December 2025
          </span>
          <span className="px-4 py-2 rounded-lg bg-purple-100 border border-purple-300 font-semibold">
            5th Floor ICT Lab
          </span>
          <span className="px-4 py-2 rounded-lg bg-pink-100 border border-pink-300 font-semibold">
            Free Certificates
          </span>
        </div>

        <a 
          href="https://forms.gle/ViBzt5nMncQUBoME7" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block px-8 py-4 text-xl font-black rounded-xl border-3 border-black bg-[#73d1fd] shadow-[6px_6px_0px_0px_black] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
        >
          REGISTER NOW
        </a>
      </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 mb-16">
        <h2 className="text-4xl md:text-5xl font-black mb-8 text-center">
          Build 6 Awesome <span className="text-[#73d1fd]">Projects</span> 💥
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="p-6 rounded-2xl border-3 border-black bg-white shadow-[6px_6px_0px_0px_black] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
            >
              <div className="text-5xl mb-4">{project.icon}</div>
              <p className="text-2xl font-bold mb-2">{project.name}</p>
              <p className="text-muted-foreground font-semibold">{project.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 mb-16">
        <h2 className="text-4xl md:text-5xl font-black mb-8 text-center">
          Rewards & <span className="text-[#73d1fd]">Recognition</span> 🏆
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-8 rounded-2xl border-3 border-black bg-yellow-200 shadow-[6px_6px_0px_0px_black]">
            <div className="text-5xl mb-4">🎓</div>
            <p className="text-2xl font-bold mb-2">Participation Certificates</p>
            <p className="text-lg font-semibold">All participants receive certificates of completion!</p>
          </div>
          
          <div className="p-8 rounded-2xl border-3 border-black bg-orange-200 shadow-[6px_6px_0px_0px_black]">
            <div className="text-5xl mb-4">🏆</div>
            <p className="text-2xl font-bold mb-2">Achievement Awards</p>
            <p className="text-lg font-semibold">Top 3 quiz winners earn special Achievement Awards!</p>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 mb-16">
        <h2 className="text-4xl md:text-5xl font-black mb-8 text-center">
          What You'll <span className="text-[#73d1fd]">Learn</span> 💻
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border-3 border-black bg-blue-200 shadow-[6px_6px_0px_0px_black] text-center">
            <div className="text-4xl mb-3">🤖</div>
            <p className="text-xl font-bold mb-2">Robotics Fundamentals</p>
            <p className="font-semibold text-muted-foreground">Master the basics of robotics and automation</p>
          </div>
          
          <div className="p-6 rounded-2xl border-3 border-black bg-green-200 shadow-[6px_6px_0px_0px_black] text-center">
            <div className="text-4xl mb-3">⚡</div>
            <p className="text-xl font-bold mb-2">Arduino Programming</p>
            <p className="font-semibold text-muted-foreground">Code microcontrollers like a pro</p>
          </div>
          
          <div className="p-6 rounded-2xl border-3 border-black bg-purple-200 shadow-[6px_6px_0px_0px_black] text-center">
            <div className="text-4xl mb-3">📡</div>
            <p className="text-xl font-bold mb-2">Sensor Integration</p>
            <p className="font-semibold text-muted-foreground">Work with various sensors and components</p>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 mb-16">
        <div className="p-8 rounded-2xl border-3 border-black bg-gradient-to-br from-pink-200 to-purple-200 shadow-[8px_8px_0px_0px_black]">
          <h2 className="text-4xl md:text-5xl font-black mb-6 text-center">
            Event <span className="text-[#73d1fd]">Details</span> 📋
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg font-bold">
            <div className="flex items-center gap-3">
              <span className="text-3xl">📍</span>
              <div>
                <div className="font-black">Venue:</div>
                <div>ICT Lab, 5th Floor</div>
                <div>Motijheel Model School & College</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-3xl">📅</span>
              <div>
                <div className="font-black">Date:</div>
                <div>Coming Soon - December 2025</div>
                <div className="text-sm text-muted-foreground">Stay tuned for the exact date!</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-3xl">💰</span>
              <div>
                <div className="font-black">Registration:</div>
                <div>Open Now!</div>
                <div className="text-sm text-muted-foreground">Limited seats available</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-3xl">👥</span>
              <div>
                <div className="font-black">Who Can Join:</div>
                <div>Students of all levels</div>
                <div className="text-sm text-muted-foreground">No prior experience needed!</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}