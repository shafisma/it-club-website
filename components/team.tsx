import President from "./cards/team/President"
import VicePresident from "./cards/team/VicePresident"
import GeneralSecretary from "./cards/team/GeneralSecretary"
import JointSecretary from "./cards/team/JointSecretary"
import Treasurer from "./cards/team/Treasurer"
import MediaPublicationsSecretary from "./cards/team/MediaPublicationsSecretary"
import TechCoordinator from "./cards/team/TechCoordinator"
import TrainingSecretary from "./cards/team/TrainingSecretary"
import HRSecretary from "./cards/team/HRSecretary"
import SecMediaPublicationsSecretary from "./cards/team/2ndMediaPublicationsSecretary"

export default function Team() {
  return (
    <section id="team" className="py-20 bg-card/50 dark:bg-[#011627]">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center text-foreground">Club Structure</h2>
        <p className="text-center text-muted-foreground mb-12 text-lg">Led by a dedicated executive committee</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <President />
          <VicePresident />
          <GeneralSecretary />
          <JointSecretary />
          <Treasurer />
          <MediaPublicationsSecretary />
          <SecMediaPublicationsSecretary />
          <TechCoordinator />
          <TrainingSecretary />
          <HRSecretary />
        </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 mt-4 text-center text-foreground">Executive Members</h1>
            <div className="grid lg:grid-cols-2 md:grid-cols-2 gap-6">
            <div className="flex flex-col items-center gap-2 p-6 bg-rose-50 border-2 border-black rounded-[5px] text-sm font-medium text-black shadow-[4px_4px_0px_0px_black] transition-all hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-accent/10 rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold text-accent">✦</span>
                </div>
                <h3 className="text-lg font-bold text-black mb-1">Executive Member</h3>
                <p className="text-accent font-semibold text-sm mb-1">MD. JOBAYER PATWARY</p>
                <p className="text-muted-foreground text-sm mb-1">Class: 9 - B/EV</p>
              </div>
                <div className="flex flex-col items-center gap-2 p-6 bg-rose-50 border-2 border-black rounded-[5px] text-sm font-medium text-black shadow-[4px_4px_0px_0px_black] transition-all hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-accent/10 rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold text-accent">✦</span>
                </div>
                <h3 className="text-lg font-bold text-black mb-1">Executive Member</h3>
                <p className="text-accent font-semibold text-sm mb-1">Swagata Sana</p>
                <p className="text-muted-foreground text-sm mb-1">Class: 9 - Beli</p>
              </div>
              </div>
      </div>
    </section>
  )
}
