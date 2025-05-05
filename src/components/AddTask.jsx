import { useState } from "react"
import { useProjectsDispatch } from "@/context/ProjectsContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus } from "lucide-react"

export default function AddTask({ projectId }) {
  const dispatch = useProjectsDispatch()
  const [taskName, setTaskName] = useState("")
  const [isAdding, setIsAdding] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (taskName.trim()) {
      dispatch({
        type: "ADD_TASK",
        payload: { projectId, name: taskName },
      })
      setTaskName("")
      setIsAdding(false)
    }
  }

  if (!isAdding) {
    return (
      <Button variant="outline" size="sm" onClick={() => setIsAdding(true)} className="w-full">
        <Plus className="h-4 w-4 mr-1" /> Add Task
      </Button>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="w-full flex space-x-2">
      <Input value={taskName} onChange={(e) => setTaskName(e.target.value)} placeholder="Enter task name" autoFocus />
      <Button type="submit" size="sm">
        Add
      </Button>
      <Button type="button" variant="outline" size="sm" onClick={() => setIsAdding(false)}>
        Cancel
      </Button>
    </form>
  )
}
