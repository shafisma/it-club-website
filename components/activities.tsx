import ActivityWorkshops from "./cards/activities/ActivityWorkshops"
import ActivityHackathons from "./cards/activities/ActivityHackathons"
import ActivityProjects from "./cards/activities/ActivityProjects"
import ActivityTechTalks from "./cards/activities/ActivityTechTalks"
import ActivityCompetitions from "./cards/activities/ActivityCompetitions"
import ActivityMentorship from "./cards/activities/ActivityMentorship"

export default function Activities() {
  return (
    <section id="activities" className="py-20">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center text-foreground">What We Do</h2>
        <p className="text-center text-muted-foreground mb-12 text-lg">
          A variety of events and opportunities throughout the year
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ActivityWorkshops />
          <ActivityHackathons />
          <ActivityProjects />
          <ActivityTechTalks />
          <ActivityCompetitions />
          <ActivityMentorship />
        </div>
      </div>
    </section>
  )
}
