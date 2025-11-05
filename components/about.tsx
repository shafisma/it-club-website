export default function About() {
  return (
    <section id="about" className="py-20 bg-card/50">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-foreground">About MMITC</h2>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-foreground">Our Purpose</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              The Motijheel Model IT Club (MMITC) is an independent, social, apolitical, volunteer-based, and secular
              science organization dedicated to fostering technological innovation and excellence among students.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Since its establishment on March 14, 2013, MMITC has been the heart of technological growth at Motijheel
              Model School and College, bringing brilliant minds to explore, learn, and create.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col items-start gap-2 p-6 bg-pink-50 border-2 border-black rounded-[5px] text-sm font-medium text-[oklch(0%_0_0)] shadow-[4px_4px_0px_0px_black] transition-all hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none">
              <h4 className="font-bold text-accent mb-2">Our Motto</h4>
              <p className="text-foreground font-semibold">Drop Your Innovation</p>
            </div>
            <div className="flex flex-col items-start gap-2 p-6 bg-amber-50 border-2 border-black rounded-[5px] text-sm font-medium text-[oklch(0%_0_0)] shadow-[4px_4px_0px_0px_black] transition-all hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none">
              <h4 className="font-bold text-accent mb-2">Founded</h4>
              <p className="text-foreground">March 14, 2013</p>
            </div>
            <div className="flex flex-col items-start gap-2 p-6 bg-rose-50 border-2 border-black rounded-[5px] text-sm font-medium text-[oklch(0%_0_0)] shadow-[4px_4px_0px_0px_black] transition-all hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none">
              <h4 className="font-bold text-accent mb-2">Location</h4>
              <p className="text-foreground">Motijheel Model School and College, Dhaka-1000</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold mb-6 text-foreground">Our Objectives</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "Enhance students' interest and skills in Information & Communication Technology",
              "Organize training and workshops in programming, graphics, robotics, web design, and cybersecurity",
              "Encourage participation in national and international IT competitions",
              "Build a technology-driven culture on campus",
              "Raise awareness about positive use of technology in society",
              "Develop service-oriented projects for technological advancement",
            ].map((objective, index) => (
              <div key={index} className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center mt-1">
                  <span className="text-accent font-bold text-sm">✓</span>
                </div>
                <p className="text-foreground">{objective}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
