import { createContext, useContext, useReducer } from "react"

// Context
export const ProjectsContext = createContext([])
export const ProjectsDispatchContext = createContext(null)

// Reducer
function projectsReducer(state, action) {
  switch (action.type) {
    case "ADD_PROJECT": {
      const { name, description } = action.payload
      return [
        ...state,
        {
          id: Date.now().toString(),
          name,
          description,
          tasks: [],
        },
      ]
    }
    case "EDIT_PROJECT": {
      const { id, name, description } = action.payload
      return state.map((project) => (project.id === id ? { ...project, name, description } : project))
    }
    case "DELETE_PROJECT": {
      const { id } = action.payload
      return state.filter((project) => project.id !== id)
    }
    case "ADD_TASK": {
      const { projectId, name } = action.payload
      return state.map((project) => {
        if (project.id === projectId) {
          return {
            ...project,
            tasks: [
              ...project.tasks,
              {
                id: Date.now().toString(),
                name,
                completed: false,
              },
            ],
          }
        }
        return project
      })
    }
    case "EDIT_TASK": {
      const { projectId, taskId, name } = action.payload
      return state.map((project) => {
        if (project.id === projectId) {
          return {
            ...project,
            tasks: project.tasks.map((task) => (task.id === taskId ? { ...task, name } : task)),
          }
        }
        return project
      })
    }
    case "TOGGLE_TASK": {
      const { projectId, taskId } = action.payload
      return state.map((project) => {
        if (project.id === projectId) {
          return {
            ...project,
            tasks: project.tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)),
          }
        }
        return project
      })
    }
    case "DELETE_TASK": {
      const { projectId, taskId } = action.payload
      return state.map((project) => {
        if (project.id === projectId) {
          return {
            ...project,
            tasks: project.tasks.filter((task) => task.id !== taskId),
          }
        }
        return project
      })
    }
    default:
      return state
  }
}

// Provider
export function ProjectsProvider({ children }) {
  const [projects, dispatch] = useReducer(projectsReducer, [])

  return (
    <ProjectsContext.Provider value={projects}>
      <ProjectsDispatchContext.Provider value={dispatch}>{children}</ProjectsDispatchContext.Provider>
    </ProjectsContext.Provider>
  )
}

// Custom hooks
export function useProjects() {
  return useContext(ProjectsContext)
}

export function useProjectsDispatch() {
  const dispatch = useContext(ProjectsDispatchContext)
  if (!dispatch) {
    throw new Error("useProjectsDispatch must be used within a ProjectsProvider")
  }
  return dispatch
}
