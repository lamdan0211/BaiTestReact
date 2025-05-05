import { useState } from "react"
import { useProjectsDispatch } from "@/context/ProjectsContext"
import TaskItem from "./TaskItem"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus } from "lucide-react"

export default function TaskList({ tasks, projectId }) {
  const dispatch = useProjectsDispatch()
  const [newTaskName, setNewTaskName] = useState("")
  const [isAddingTask, setIsAddingTask] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newTaskName.trim()) {
      dispatch({
        type: "ADD_TASK",
        payload: { projectId, name: newTaskName.trim() }
      })
      setNewTaskName("")
      setIsAddingTask(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2.5">
        {tasks.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-6 bg-gray-50 rounded-lg">
            No tasks yet. Add your first task below.
          </p>
        ) : (
          <ul className="space-y-2.5">
            {tasks.map((task) => (
              <TaskItem key={task.id} task={task} projectId={projectId} />
            ))}
          </ul>
        )}
      </div>

      {isAddingTask ? (
        <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
          <Input
            type="text"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            placeholder="Enter task name"
            autoFocus
            className="flex-1"
          />
          <Button type="submit" size="sm" className="w-20">
            Add
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            size="sm"
            className="w-20"
            onClick={() => {
              setIsAddingTask(false)
              setNewTaskName("")
            }}
          >
            Cancel
          </Button>
        </form>
      ) : (
        <Button
          variant="outline"
          className="w-full justify-center text-sm py-5 mt-4 bg-gray-50 hover:bg-gray-100 border-gray-200"
          onClick={() => setIsAddingTask(true)}
        >
          <Plus className="h-4 w-4 mr-1.5" />
          Add Task
        </Button>
      )}
    </div>
  )
}
