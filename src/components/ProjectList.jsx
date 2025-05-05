import { useProjects } from "@/context/ProjectsContext"
import ProjectItem from "./ProjectItem"

export default function ProjectList() {
  const projects = useProjects()

  if (projects.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-xl">
        <p className="text-gray-600">No projects yet. Create your first project above!</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {projects.map((project) => (
        <ProjectItem key={project.id} project={project} />
      ))}
    </div>
  )
}
