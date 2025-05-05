import './App.css'
import { ProjectsProvider } from "@/context/ProjectsContext"
import AddProject from "@/components/AddProject"
import ProjectList from "@/components/ProjectList"

export default function App() {
  return (
    <ProjectsProvider>
      <div className="min-h-screen bg-white py-8">
        <main className="container max-w-4xl mx-auto px-4">
          <h1 className="text-2xl font-bold text-center mb-8">Project Management App</h1>
          <div className="bg-[#0A0A0A] rounded-xl overflow-hidden mb-6">
            <AddProject />
          </div>
          <ProjectList />
        </main>
      </div>
    </ProjectsProvider>
  )
}

