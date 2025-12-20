export default function CTA() {
  return (
    <section id="joinnow" className="py-16 px-4 md:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto text-center">
        <div className="bg-primary/10 rounded-3xl px-6 py-12 md:py-16 md:px-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Join the IT Club Community
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Be part of our thriving community of tech enthusiasts. Learn, grow,
            and innovate together!
          </p>
          <div className="flex flex-row gap-4 justify-center items-center">
            <a href="/#contact">
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-[5px] text-sm font-medium ring-offset-white transition-all gap-2 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-[oklch(0%_0_0)] bg-[oklch(66.9%_0.18368_248.8066)] border-2 border-black shadow-[4px_4px_0px_0px_black] hover:translate-x-1 hover:translate-y-1 hover:shadow-none h-10 px-4 py-2">
                Join The Club
              </button>
            </a>
            <a href="/#about">
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-[5px] text-sm font-medium ring-offset-white transition-all gap-2 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-[oklch(0%_0_0)] bg-[oklch(85%_0.15_145)] border-2 border-black shadow-[4px_4px_0px_0px_black] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none h-10 px-4 py-2">
                &nbsp;Learn More&nbsp;
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
