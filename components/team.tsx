import President from "./cards/team/President"
import VicePresident from "./cards/team/VicePresident"
import GeneralSecretary from "./cards/team/GeneralSecretary"
import JointSecretary from "./cards/team/JointSecretary"
import OrganizingSecretary from "./cards/team/OrganizingSecretary"
import OfficeSecretary from "./cards/team/OfficeSecretary"
import Treasurer from "./cards/team/Treasurer"
import MediaPublicationsSecretary from "./cards/team/MediaPublicationsSecretary"
import TechCoordinator from "./cards/team/TechCoordinator"
import TrainingSecretary from "./cards/team/TrainingSecretary"
import HRSecretary from "./cards/team/HRSecretary"
import SecMediaPublicationsSecretary from "./cards/team/2ndMediaPublicationsSecretary"

export default function Team() {
  return (
    <section id="team" className="py-20 bg-card/50">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center text-foreground">Club Structure</h2>
        <p className="text-center text-muted-foreground mb-12 text-lg">Led by a dedicated executive committee</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <President />
          <VicePresident />
          <GeneralSecretary />
          <JointSecretary />
          <OrganizingSecretary />
          <OfficeSecretary />
          <Treasurer />
          <MediaPublicationsSecretary />
          <SecMediaPublicationsSecretary />
          <TechCoordinator />
          <TrainingSecretary />
          <HRSecretary />
        </div>
      </div>
    </section>
  )
}
